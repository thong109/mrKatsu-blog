/**
 * ****************************************************************************
 * password.js
 *
 * Description		:	Methods and events for password
 * Created at		:	19/10/2022
 * Created by		:	Thong109 – Thong109@outfiz.vn
 * package		    :	Client
 * ****************************************************************************
 */

 $(document).ready(function () {
    UpdatePasswordModule.Init();
    UpdatePasswordModule.InitEvents();
});

/**
 * Module contains handling for system login.
 * @author Thong109 - 19/10/2022 - create
 * @param
 * @return { Function } UpdatePasswordModule.Init() - Initialize values
 * @return { Function } UpdatePasswordModule.InitEvents() - Initiating events
 */
var UpdatePasswordModule = (function () {
    /**
     * Objects associated with items on the screen
     */
    var obj = {
        'password': { 'type': 'password', 'attr': { 'minlength': 8, 'maxlength': 100, 'class': 'required', 'type-err': 'bottom'  } },
        'password_confirmation': { 'type': 'password', 'attr': { 'minlength': 8, 'class': 'required', 'type-err': 'bottom'  } },
        'email': { 'type': 'text', 'attr': { 'maxlength': 100 } },
        'token': { 'type': 'text', 'attr': { 'maxlength': 200 } },
    };

    /**
     * Does it show a failed password check message?
     */
    var error = false;

    /**
     * Initialize system values
     *
     * @author Thong109 - 12/10/2022 - create
     * @param
     * @return
     */
    var Init = function () {
        try {
            Common.InitItem(obj);
            $('#password').focus();
        }
        catch (e) {
            console.log('Init: ' + e.message);
        }
    };

    /**
     * Initiating events in the page
     *
     * @author Thong109 - 12/10/2022 - create
     * @param
     * @return
     */
    var InitEvents = function () {
        try {
            $('#btn-renew').on('click', function () {
                error = false;
                SubmitUpdatePassword();
            });
            document.onkeypress = function (event) {
                if ((event.which === 13 || event.keyCode === 13) && !error && $(event.target).attr('id') !== 'popup_ok') {
                    event.preventDefault();
                    SubmitUpdatePassword();
                }
            };
        }
        catch (e) {
            console.log('InitEventUpdatePassword: ' + e.message);
        }
    };

    /**
     * Handle when changing password successfully. Navigate to the page after logging in.
     *
     * @author Thong109 - 12/10/2022 - create
     * @param { Object } res The json object contains the results returned from the server
     * @return
     */
    var CheckUpdatePasswordSuccess = function (res) {
        try {
            if (res.code === 200) {
                // redirect to page accessed before login
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
                // show popup error password
                error = true;
                Notification.Alert(res.msgNo, function () {
                    error = false;
                });
            }
        }
        catch (e) {
            console.log('CheckUpdatePasswordSuccess: ' + e.message);
        }
    };

    /**
     * Submit the information entered by the user to the server for verification
     *
     * @author Thong109 - 12/10/2022 - create
     * @param
     * @return
     */
     var SubmitUpdatePassword = function () {
        try {
            // Check for errors of input data
            if (ValidateModule.Validate(obj)) {
                var data = Common.GetData(obj);
                // Submit to the server
                $.ajax({
                    type: 'POST',
                    url: urls.renew,
                    dataType: 'json',
                    data: data,
                    success: CheckUpdatePasswordSuccess,
                    error: function (res) {
                        var object = res.responseJSON.errors.data;
                        var ob = object[Object.keys(object)[0]];
                        if(ob){
                            Notification.Alert(ob[0]);
                        }else{
                            Notification.Alert(MSG_NO.SERVER_ERROR);
                        }
                    }
                });
            }
            else {
                ValidateModule.FocusFirstError();
            }
        }
        catch (e) {
            console.log('SubmitUpdatePassword: ' + e.message);
        }
    };

    return {
        Init: Init,
        InitEvents: InitEvents
    };
})();

