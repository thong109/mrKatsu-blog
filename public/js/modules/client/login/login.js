/**
 * ****************************************************************************
 * login.js
 *
 * Description		:	Methods and events for login
 * Created at		:	12/10/2022
 * Created by		:	QuyPN – quypn@outfiz.vn
 * package		    :	Client
 * ****************************************************************************
 */

$(document).ready(function () {
    LoginModule.Init();
    LoginModule.InitEvents();
});

/**
 * Module contains handling for system login.
 * @author QuyPN - 12/10/2022 - create
 * @param
 * @return { Function } LoginModel.Init() - Initialize values
 * @return { Function } LoginModel.InitEvents() - Initiating events
 */
var LoginModule = (function () {
    /**
     * Objects associated with items on the screen
     */
    var obj = {
        'username': { 'type': 'text', 'attr': { 'maxlength': 100, 'class': 'required', 'type-err': 'bottom'  } },
        'password': { 'type': 'password', 'attr': { 'maxlength': 100, 'class': 'required', 'type-err': 'bottom'  } },
        'lat': { 'type': 'text', 'attr': { 'maxlength': 20 } },
        'long': { 'type': 'text', 'attr': { 'maxlength': 20 } },
        'browser': { 'type': 'text', 'attr': { 'maxlength': 200 } },
    };

    /**
     * Is it showing login failure message?
     */
    var error = false;

    /**
     * Initialize system values
     *
     * @author QuyPN - 12/10/2022 - create
     * @param
     * @return
     */
    var Init = function () {
        try {
            Common.InitItem(obj);
            FillRemember();
            FillLocation();
            $('#username').focus();
        }
        catch (e) {
            console.log('Init: ' + e.message);
        }
    };

    /**
     * Initiating events in the page
     *
     * @author QuyPN - 12/10/2022 - create
     * @param
     * @return
     */
    var InitEvents = function () {
        try {
            // Event when clicking the login button
            $('#btn-login').on('click', function () {
                error = false;
                SubmitLogin();
            });
            // Enter press event
            document.onkeypress = function (event) {
                // If the button being pressed is enter and is not showing a login failure message, then submit the login information
                if ((event.which === 13 || event.keyCode === 13) && !error && $(event.target).attr('id') !== 'popup_ok') {
                    SubmitLogin();
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
     * @author QuyPN - 12/10/2022 - create
     * @param
     * @return
     */
    var SubmitLogin = function () {
        try {
            // Check for errors of input data
            if (ValidateModule.Validate(obj)) {
                var data = Common.GetData(obj);
                // Submit to the server
                $.ajax({
                    type: 'POST',
                    url: urls.login,
                    dataType: 'json',
                    data: data,
                    success: CheckLoginSuccess,
                    error: function () {
                        Notification.Alert(MSG_NO.SERVER_ERROR, function () {
                            $('#username').focus();
                        });
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
     * @author QuyPN - 12/10/2022 - create
     * @param { Object } res The json object contains the results returned from the server
     * @return
     */
    var CheckLoginSuccess = function (res) {
        try {
            if (res.code === 200) {
                // if login success, save token to cookies
                $.cookie('token', res.data.token, { expires: 1, path: '/' });
                $.cookie('refreshToken', res.data.refreshToken, { expires: 1, path: '/' });
                var date = new Date();
                date.setTime(date.getTime() + (NumberModule.ToNumber(res.data.expires) * 60 * 1000));
                $.cookie('expires', date.toUTCString(), { Expires: 1, path: '/' });
                // save login info if user check remember
                CheckRemember();
                // redirect to page accessed before login
                window.location = res.data.before ?? '/';
            }
            else if (res.code === 422) {
                // fill error from server to view
                ValidateModule.FillError(res.errors.data);
                ValidateModule.FocusFirstError();
            }
            else {
                // show popup error login
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
     * If the user chooses to remember login, save the encrypted Username and Password values in the Local store.
     *
     * @author QuyPN - 12/10/2022 - create
     * @param
     * @return
     */
    var FillRemember = function () {
        try {
            if (window.localStorage.getItem("username")) {
                $('#username').val(Secure.DecodeBase64(window.localStorage.getItem("username")));
                $('#password').val(Secure.DecodeBase64(window.localStorage.getItem("password")));
                $('#remember').prop('checked', true);
            }
        }
        catch (e) {
            console.log('FillRemember: ' + e.message);
        }
    };

    /**
     * Check at page load if there is a previously saved Username and Password, then automatically fill the item on the page.
     *
     * @author QuyPN - 12/10/2022 - create
     * @param
     * @return
     */
    var CheckRemember = function () {
        try {
            if ($('#remember').is(':checked')) {
                window.localStorage.setItem("username", Secure.EncodeBase64($('#username').val()));
                window.localStorage.setItem("password", Secure.EncodeBase64($('#password').val()));
            }
            else {
                window.localStorage.removeItem("username");
                window.localStorage.removeItem("password");
            }
        }
        catch (e) {
            console.log('CheckRemember: ' + e.message);
        }
    };

    /**
     * Get current position of login user
     *
     * @author QuyPN - 12/10/2022 - create
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

