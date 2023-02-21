/**
 * ****************************************************************************
 * signup.js
 *
 * Description		:	Methods and events for signup
 * Created at		:	31/10/2022
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
 * @author SangVT - 31/10/2022 - create
 * @param
 * @return { Function } SignupModel.Init() - Initialize values
 * @return { Function } SignupModel.InitEvents() - Initiating events
 */
var SignupModel = (function () {
    /**
     * Objects associated with items on the screen
     */
    var obj = {
        'email': { 'type': 'text', 'attr': { 'maxlength': 100 } },
        'token': { 'type': 'text', 'attr': { 'maxlength': 255 } },
    };

    /**
     * Is it showing Signup failure message?
     */
    var error = false;

    /**
     * Initialize system values
     *
     * @author SangVT - 31/10/2022 - create
     * @param
     * @return
     */
    var Init = function () {
        try {
            Common.InitItem(obj);
            FillLocation();
        }
        catch (e) {
            console.log('Init: ' + e.message);
        }
    };

    /**
     * Initiating events in the page
     *
     * @author SangVT - 31/10/2022 - create
     * @param
     * @return
     */
    var InitEvents = function () {
        try {
            // Event when clicking the expiredToken button
            $('#btn-expiredToken').on('click', function () {
                error = false;
                SubmitExpiredToken();
            });
            // Enter press event
            document.onkeypress = function (event) {
                // If the button being pressed is enter and is not showing a signup failure message, then submit the signup information
                if ((event.which === 13 || event.keyCode === 13) && !error && $(event.target).attr('id') !== 'popup_ok') {
                    SubmitExpiredToken();
                }
            };
        }
        catch (e) {
            console.log('InitEventExpiredToken: ' + e.message);
        }
    };

    /**
     * Submit the information entered by the user to the server for verification
     *
     * @author SangVT - 31/10/2022 - create
     * @param
     * @return
     */
    var SubmitExpiredToken = function () {
        try {
            // Check for errors of input data
            if (ValidateModule.Validate(obj)) {
                var data = Common.GetData(obj);
                // Submit to the server
                $.ajax({
                    type: 'POST',
                    url: urls.expiredToken,
                    dataType: 'json',
                    data: data,
                    success: CheckExpiredTokenSuccess,
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
            console.log('SubmitExpiredToken: ' + e.message);
        }
    };

    /**
     * Handle on successful signup. Save the cookie token and navigate to the page after signup.
     *
     * @author SangVT - 18/10/2022 - create
     * @param { Object } res The json object contains the results returned from the server
     * @return
     */
    var CheckExpiredTokenSuccess = function (res) {
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
            console.log('CheckExpiredTokenSuccess: ' + e.message);
        }
    };

    /**
     * Get current position of signup user
     *
     * @author SangVT - 31/10/2022 - create
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
     * @author SangVT - 31/10/2022 - create
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

