/**
 * ****************************************************************************
 * filling-coupon.js
 *
 * Description		:	Methods and events for login
 * Created at		:	17/11/2022
 * Created by		:	SangVT – thanhsang0139@gmail.com
 * package		    :	Client
 * ****************************************************************************
 */

 $(document).ready(function () {
    LoginModule.Init();
    LoginModule.InitEvents();
});

/**
 * Module contains handling for system login.
 * @author SangVT - 17/11/2022 - create
 * @param
 * @return { Function } LoginModel.Init() - Initialize values
 * @return { Function } LoginModel.InitEvents() - Initiating events
 */
var LoginModule = (function () {
    /**
     * Objects associated with items on the screen
     */
    var obj = {
        'filling-coupon': { 'type': 'text', 'attr': { 'maxlength': 100, 'class': 'required', 'type-err': 'bottom'  } },
    };

    /**
     * Is it showing login failure message?
     */
    var error = false;

    /**
     * Initialize system values
     *
     * @author SangVT - 17/11/2022 - create
     * @param
     * @return
     */
    var Init = function () {
        try {
            Common.InitItem(obj);
            $('#filling-coupon').focus();
        }
        catch (e) {
            console.log('Init: ' + e.message);
        }
    };

    /**
     * Initiating events in the page
     *
     * @author SangVT - 17/11/2022 - create
     * @param
     * @return
     */
    var InitEvents = function () {
        try {
            // Event when clicking the login button
            $('#btn-confirm').on('click', function () {
                error = false;
                SubmitConfirm();
            });
            // Enter press event
            document.onkeypress = function (event) {
                // If the button being pressed is enter and is not showing a login failure message, then submit the login information
                if ((event.which === 13 || event.keyCode === 13) && !error && $(event.target).attr('id') !== 'popup_ok') {
                    SubmitConfirm();
                }
            };
        }
        catch (e) {
            console.log('InitEventLogin: ' + e.message);
        }
    };

    /**
     * Submit the information entered by the user to the server for verification
     *
     * @author SangVT - 17/11/2022 - create
     * @param
     * @return
     */
    var SubmitConfirm = function () {
        try {
            // Check for errors of input data
            if (ValidateModule.Validate(obj)) {
                var data = Common.GetData(obj);
                // Submit to the server
                $.ajax({
                    type: 'POST',
                    url: urls.coupon,
                    dataType: 'json',
                    data: data,
                    success: CheckConfirmSuccess,
                    error: function () {
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
            console.log('SubmitLogin: ' + e.message);
        }
    };

    /**
     * Handle on successful login. Save the cookie token and navigate to the page after login.
     *
     * @author SangVT - 17/11/2022 - create
     * @param { Object } res The json object contains the results returned from the server
     * @return
     */
    var CheckConfirmSuccess = function (res) {
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
            console.log('CheckLoginSuccess: ' + e.message);
        }
    };

    /**
     * Check browser is safari or not
     *
     * @author QuyPN - 12/10/2022 - create
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

