/**
 * ****************************************************************************
 * renewPassword.js
 *
 * Description		:	Methods and events for renewPassword
 * Created at		:	19/10/2022
 * Created by		:	Thong109 – Thong109@outfiz.vn
 * package		    :	Client
 * ****************************************************************************
 */

 $(document).ready(function () {
    ForgotPasswordModule.Init();
    ForgotPasswordModule.InitEvents();
});

/**
 * Module contains handling forgot password
 * @author Thong109 - 19/10/2022 - create
 * @param
 * @return { Function } ForgotPasswordModule.Init() - Initialize values
 * @return { Function } ForgotPasswordModule.InitEvents() - Initiating events
 */
var ForgotPasswordModule = (function () {
    /**
     * Objects associated with items on the screen
     */
    var obj = {
        'email': { 'type': 'text', 'attr': { 'maxlength': 100, 'class': 'required', 'type-err': 'bottom'  } },
    };

    /**
     * Is it Password Retrieval failure message?
     */
    var error = false;

    /**
     * Initialize system values
     *
     * @author Thong109 - 19/10/2022 - create
     * @param
     * @return
     */
    var Init = function () {
        try {
            Common.InitItem(obj);
            $('#email').focus();
        }
        catch (e) {
            console.log('Init: ' + e.message);
        }
    };

    /**
     * Initiating events in the page
     *
     * @author Thong109 - 19/10/2022 - create
     * @param
     * @return
     */
    var InitEvents = function () {
        try {
            // Event when clicking the Password Retrieval button
            $('#btn-lost').on('click', function () {
                error = false;
                SubmitForgotPassword();
            });
            // Enter press event
            document.onkeypress = function (event) {
                // If the button being pressed is enter and there is no message that the email input failed, then send the email information
                if ((event.which === 13 || event.keyCode === 13) && !error && $(event.target).attr('id') !== 'popup_ok') {
                    event.preventDefault();
                    SubmitForgotPassword();
                }
            };
        }
        catch (e) {
            console.log('InitEventForgotPassword: ' + e.message);
        }
    };

    /**
     * Submit the information entered by the user to the server for verification
     *
     * @author Thong109 - 19/10/2022 - create
     * @param
     * @return
     */
     var SubmitForgotPassword = function () {
        try {
            // Check for errors of input data
            if (ValidateModule.Validate(obj)) {
                var data = Common.GetData(obj);
                // Submit to the server
                $.ajax({
                    type: 'POST',
                    url: urls.email,
                    dataType: 'json',
                    data: data,
                    success: CheckForgotPasswordSuccess,
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
            console.log('SubmitForgotPassword: ' + e.message);
        }
    };

    /**
     * Process when sending confirmation email successfully.
     *
     * @author Thong109 - 19/10/2022 - create
     * @param { Object } res The json object contains the results returned from the server
     * @return
     */
    var CheckForgotPasswordSuccess = function (res) {
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
                // show popup error login
                error = true;
                Notification.Alert(res.msgNo, function () {
                    error = false;
                });
            }
        }
        catch (e) {
            console.log('CheckForgotPasswordSuccess: ' + e.message);
        }
    };


    return {
        Init: Init,
        InitEvents: InitEvents
    };
})();

