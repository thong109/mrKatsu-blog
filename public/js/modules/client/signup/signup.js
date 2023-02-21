/**
 * ****************************************************************************
 * signup.js
 *
 * Description		:	Methods and events for signup
 * Created at		:	18/10/2022
 * Created by		:	SangVT
 * package		    :	Client
 * ****************************************************************************
 */

$(document).ready(function () {
    SignupModel.Init();
    SignupModel.InitEvents();
});

/**
 * Module contains handling for system signup.
 * @author SangVT - 18/10/2022 - create
 * @param
 * @return { Function } SignupModel.Init() - Initialize values
 * @return { Function } SignupModel.InitEvents() - Initiating events
 */
var SignupModel = (function () {
    /**
     * Objects associated with items on the screen
     */
    var obj = {
        'firstname': { 'type': 'text', 'attr': { 'maxlength': 100, 'class': 'required', 'type-err': 'bottom'  } },
        'lastname': { 'type': 'text', 'attr': { 'maxlength': 100, 'class': 'required', 'type-err': 'bottom'  } },
        'username': { 'type': 'text', 'attr': { 'maxlength': 100, 'class': 'required','regex':'/^[a-zA-Z]+$/', 'type-err': 'bottom'  } },
        'email': { 'type': 'text', 'attr': { 'maxlength': 100, 'class': 'required', 'type-err': 'bottom'  } },
        'password': { 'type': 'password', 'attr': { 'minlength': 8, 'class': 'required', 'type-err': 'bottom'  } },
        'password_confirmation': { 'type': 'password', 'attr': { 'minlength': 8, 'class': 'required', 'type-err': 'bottom'  } },
        'term_of_service' : {'type': 'checkbox', 'attr': { 'maxlength': 100, 'class': 'required', 'type-err': 'bottom'  }},
        'lat': { 'type': 'text', 'attr': { 'maxlength': 20 } },
        'long': { 'type': 'text', 'attr': { 'maxlength': 20 } },
        'browser': { 'type': 'text', 'attr': { 'maxlength': 200 } },
    };

    /**
     * Is it showing Signup failure message?
     */
    var error = false;

    /**
     * Initialize system values
     *
     * @author SangVT - 18/10/2022 - create
     * @param
     * @return
     */
    var Init = function () {
        try {
            Common.InitItem(obj);
            // FillRemember();
            FillLocation();
            // $('#username').focus();
        }
        catch (e) {
            console.log('Init: ' + e.message);
        }
    };

    /**
     * Initiating events in the page
     *
     * @author SangVT - 18/10/2022 - create
     * @param
     * @return
     */
    var InitEvents = function () {
        try {
            // Event when clicking the signup button
            $('#btn-signup').on('click', function () {
                error = false;
                CheckTermOfService();
                SubmitSignUp();
            });
            // Enter press event
            document.onkeypress = function (event) {
                // If the button being pressed is enter and is not showing a signup failure message, then submit the signup information
                if ((event.which === 13 || event.keyCode === 13) && !error && $(event.target).attr('id') !== 'popup_ok') {
                    SubmitSignUp();
                }
            };
        }
        catch (e) {
            console.log('InitEventSignUp: ' + e.message);
        }
    };

    /**
     * Submit the information entered by the user to the server for verification
     *
     * @author SangVT - 18/10/2022 - create
     * @param
     * @return
     */
    var SubmitSignUp = function () {
        try {
            // Check for errors of input data
            if (ValidateModule.Validate(obj)) {
                var data = Common.GetData(obj);
                // Submit to the server
                $.ajax({
                    type: 'POST',
                    url: urls.signup,
                    dataType: 'json',
                    data: data,
                    success: CheckSignUpSuccess,
                    error: function (res) {
                        var object = res.responseJSON.errors.data;
                        var ob = object[Object.keys(object)[0]];
                        if(ob){
                            Notification.Alert(ob[0]);
                        }
                    }
                });
            }
            else {
                ValidateModule.FocusFirstError();
            }
        }
        catch (e) {
            console.log('SubmitSignUp: ' + e.message);
        }
    };

    /**
     * Handle on successful signup. Save the cookie token and navigate to the page after signup.
     *
     * @author SangVT - 18/10/2022 - create
     * @param { Object } res The json object contains the results returned from the server
     * @return
     */
    var CheckSignUpSuccess = function (res) {
        try {
            if (res.code === 200) {
                error = true;
                Notification.Alert(res.msgNo, function () {
                    error = false;
                    window.location = res.data;
                });
            }
            else if (res.code === 422) {
                // fill error from server to view
                ValidateModule.FillError(res.errors.data);
                ValidateModule.FocusFirstError();
            }
            else {
                // show popup error signup
                error = true;
                Notification.Alert(res.msgNo, function () {
                    error = false;
                });
            }
        }
        catch (e) {
            console.log('CheckSignUpSuccess: ' + e.message);
        }
    };

    /**
     * Check if the user has agreed to the terms of use
     *
     * @author SangVT - 25/10/2022 - create
     * @param
     * @return
     */
    var CheckTermOfService = function () {
        try {
            if (!$('#term_of_service').is(':checked')) {
                return Notification.Alert(MSG_NO.YOU_MUST_AGREE_WITH_US);
            }
        }
        catch (e) {
            console.log('CheckTermOfService: ' + e.message);
        }
    };

    /**
     * Get current position of signup user
     *
     * @author SangVT - 18/10/2022 - create
     * @param
     * @return
     */
    var FillLocation = function () {
        try {
            if (!IsSafari() && navigator) {
                if (navigator.geolocation && !IsSafari()) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        $('#lat').val(position.coords.latitude);
                        $('#long').val(position.coords.longitude);
                    });
                }
                $('#browser').val(navigator.userAgent);
            }
        }
        catch (e) {
            console.log('FillLocation: ' + e.message);
        }
    };

    /**
     * Check browser is safari or not
     *
     * @author SangVT - 26/10/2022 - create
     * @param
     * @return
     */
    var IsSafari = function () {
        try {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf('safari') != -1 && ua.indexOf('chrome') < 0) {
                return true;
            }
            return false;
        }
        catch (e) {
            return false;
        }
    };

    return {
        Init: Init,
        InitEvents: InitEvents
    };
})();

