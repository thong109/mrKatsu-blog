/**
 * ****************************************************************************
 * user-detail.js
 *
 * Description		:	Methods and events for page create/edit user
 * Created at		:	25/10/2022
 * Created by		:	QuyPN – quypn@outfiz.vn
 * package		    :	Admin
 * ****************************************************************************
 */

 $(document).ready(function () {
    UserDetailModule.Init();
    UserDetailModule.InitEvents();
});

/**
 * Module contains handling for page create/edit user
 * @author QuyPN - 25/10/2022 - create
 * @param
 * @return { Function } UserDetailModule.Init() - Initialize values
 * @return { Function } UserDetailModule.InitEvents() - Initiating events
 */
var UserDetailModule = (function () {
    /**
     * Objects associated with items on the screen
     */
    var obj = {
        'first_name': { 'type': 'text', 'attr': { 'class': 'required', 'maxlength': 50 } },
        'last_name': { 'type': 'text', 'attr': { 'class': 'required', 'maxlength': 50 } },
        'email': { 'type': 'text', 'attr': { 'class': 'required email', 'maxlength': 255 } },
        'birthday': { 'type': 'text', 'attr': { 'class': 'date', 'maxlength': 10 } },
        'gender': { 'type': 'select', 'attr': { 'class': 'for-select2' } },
        'phone': { 'type': 'text', 'attr': { 'class': 'only-number', 'maxlength': 10 } },
        'address_detail': { 'type': 'text', 'attr': { 'maxlength': 100 } },
        'province_id': { 'type': 'select', 'attr': { 'class': 'for-select2' } },
        'district_id': { 'type': 'select', 'attr': { 'class': 'for-select2' } },
        'address_commune_id': { 'type': 'select', 'attr': { 'class': 'for-select2' } },
        'username': { 'type': 'text', 'attr': { 'class': 'required alphabet', 'maxlength': 100 } },
        'password': { 'type': 'text', 'attr': { 'class': '', 'maxlength': 100 } },
        'confirm_password': { 'type': 'text', 'attr': { 'class': '', 'maxlength': 100 } },
        'roles': { 'type': 'select', 'attr': { 'class': 'for-select2 required' } },
    };

    /**
     * Type of data need to check in DB
     */
    const CHECKER = {
        USERNAME: 1,
        EMAIL: 2
    }

    /**
     * Initialize system values
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return
     */
    var Init = function () {
        try {
            if (mode === CONSTANTS.MODE.INSERT) {
                obj.password.attr.class = 'required';
                obj.password.attr.confirm_password = 'required';
            }
            Common.InitItem(obj);
            $('#first_name').focus();
        }
        catch (e) {
            console.log('Init: ' + e.message);
        }
    };

    /**
     * Initiating events in the page
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return
     */
    var InitEvents = function () {
        try {
            // Create username when change first name or last name
            $('#first_name, #last_name').on('change', function () {
                if (mode === CONSTANTS.MODE.INSERT) {
                    CreateUsername();
                    CheckInput($('#username'), CHECKER.USERNAME);
                }
            });
            // Check used username
            $('#username').on('change', function () {
                CheckInput($('#username'), CHECKER.USERNAME);
            });
            // Check used email
            $('#email').on('change', function () {
                CheckInput($('#email'), CHECKER.EMAIL);
            });
            // Validate username when input username
            $('#username').on('keyup', function () {
                ValidateUsername();
            });
            // Validate password when input password
            $('#password').on('keyup', function () {
                ValidatePassword();
            });
            // Validate confirm password
            $('#confirm_password').on('keyup', function () {
                ValidateConfirmPassword();
            });
            // Get districts when province_id change
            $('#province_id').on('change', function () {
                GetDistricts();
            });
            // Get communes when district_id change
            $('#district_id').on('change', function () {
                GetCommunes();
            });
            // Click button save
            $('#btn-save').on('click', function () {
                SaveUser();
            });
            // Click button lock account
            $('#btn-lock').on('click', function () {
                LockAccount();
            });
            // Click button unlock account
            $('#btn-unlock').on('click', function () {
                UnLockAccount();
            });
            // Click button delete user
            $('#btn-delete').on('click', function () {
                DeleteUser();
            });
        }
        catch (e) {
            console.log('InitEvents: ' + e.message);
        }
    };

    /**
     * Create username from full name
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return
     */
    var CreateUsername = function () {
        try {
            if (mode === CONSTANTS.MODE.INSERT) {
                var str = $('#first_name').val() + ' ' + $('#last_name').val();
                if (str === '') {
                    $('#username').val('');
                }
                var names = str.toLowerCase().split(' ');
                var name = names[names.length - 1];
                name = Common.ConvertToUnSign(name);
                var length = names.length - 1;
                for (var i = 0; i < length; i++) {
                    if (names[i].length > 0) {
                        name += names[i].substring(0, 1);
                    }
                }
                name = name.replace(/[^a-zA-Z0-9_.-]/g, '');
                var userRule = /^[a-zA-Z0-9_.-]{4,100}$/;
                if (name.match(userRule)) {
                    $('#username').val(name);
                }
            }
        }
        catch (e) {
            console.log('CreateUsername: ' + e.message);
        }
    };

    /**
     * Validate username follow rule or not
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return {boolean} true if data valid, false if data not valid
     */
    var ValidateUsername = function () {
        try {
            var userRule = /^[a-zA-Z0-9_.-]{4,100}$/;
            if ($('#username').val().match(userRule)) {
                $('#username').RemoveError();
                return true;
            }
            else {
                $('#username').ItemError(_msg[MSG_NO.USERNAME_WRONG_FORMAT].content);
                return false;
            }
        }
        catch (e) {
            console.log('ValidateUsername: ' + e.message);
            return false;
        }
    };

    /**
     * Validate confirm password match with password or not
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return {boolean} true if data valid, false if data not valid
     */
    var ValidateConfirmPassword = function () {
        try {
            if ($('#password').val() === '') {
                return true;
            }
            if ($('#password').val() === $('#confirm_password').val()) {
                $('#confirm_password').RemoveError();
                return true;
            }
            else {
                $('#confirm_password').ItemError(_msg[MSG_NO.CORNFIRM_PASSWORD_ERROR].content);
                return false;
            }
        }
        catch (e) {
            console.log('ValidateConfirmPassword: ' + e.message);
            return false;
        }
    };

    /**
     * Validate password follow rule or not
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return {boolean} true if data valid, false if data not valid
     */
    var ValidatePassword = function () {
        try {
            if ($('#password').val() === '') {
                return true;
            }
            var passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,100}$/;
            if ($('#password').val().match(passw)) {
                $('#password').RemoveError();
                return true;
            }
            else {
                $('#password').ItemError(_msg[MSG_NO.PASSWORD_WRONG_FORMAT].content);
                return false;
            }
        }
        catch (e) {
            console.log('ValidatePassword: ' + e.message);
            return false;
        }
    };

    /**
     * Check data input have in DB or not
     *
     * @author QuyPN - 25/10/2022 - create
     * @param {object} $input input in screen have data need to check
     * @param {number} type type of data need to check
     * @return {boolean} false if not used
     */
    var CheckInput = function ($input, type) {
        try {
            if (StringModule.IsNullOrEmpty($input.val())) {
                return false;
            }
            $.ajax({
                type: 'POST',
                url: urls.checkInput,
                global: false,
                dataType: 'json',
                data: {
                    type: type,
                    user_id: $('#id').val(),
                    value: $input.val(),
                    _token: $('meta[name="csrf-token"]').attr('content')
                },
                success: function (res) {
                    if (res.code !== 200) {
                        $input.ItemError(_msg[res.msgNo].content);
                    }
                },
                error: function () {
                }
            });
        }
        catch (e) {
            console.log('CheckInput: ' + e.message);
            return false;
        }
    };

    /**
     * Get districts when province_id change
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return
     */
    var GetDistricts = function () {
        try {
            const provinceId = $('#province_id').val();
            $.ajax({
                type: 'GET',
                url: `${urls.getDistricts}/${provinceId}`,
                success: function (res) {
                    $('#district_id, #address_commune_id').empty();
                    $('#district_id, #address_commune_id').append(`<option value=''></option>`);
                    let districts = res.data;
                    for (let i = 0; i < districts.length; i++) {
                        $('#district_id').append(`<option value='${districts[i].id}'>${districts[i].name}</option>`);
                    }
                    $('#district_id, #address_commune_id').select2({
                        minimumResultsForSearch: -1,
                        width: '100%'
                    });
                },
                error: function () {
                    Notification.Alert(MSG_NO.SERVER_ERROR, function () {
                        $('#province_id').focus();
                    });
                },
            });
        } catch (e) {
            console.log('GetDistricts: ' + e.message);
        }
    };

    /**
     * Get communes when district_id change
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return
     */
    var GetCommunes = function () {
        try {
            let districtId = $('#district_id').val();
            $.ajax({
                type: 'GET',
                url: `${urls.getCommunes}/${districtId}`,
                success: function (res) {
                    $('#address_commune_id').empty();
                    $('#address_commune_id').append(`<option value=''></option>`);
                    let communes = res.data;
                    for (let i = 0; i < communes.length; i++) {
                        $('#address_commune_id').append(`<option value='${communes[i].id}'>${communes[i].name}</option>`);
                    }
                    $('#address_commune_id').select2({
                        minimumResultsForSearch: -1,
                        width: '100%'
                    });
                },
                error: function () {
                    Notification.Alert(MSG_NO.SERVER_ERROR, function () {
                        $('#district_id').focus();
                    });
                },
            });
        } catch (e) {
            console.log('GetCommunes: ' + e.message);
        }
    };

    /**
     * Insert or update data of a user
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return
     */
    var SaveUser = function () {
        try {
            var validate = ValidateModule.Validate(obj);
            var validate1 = ValidateUsername();
            var validate2 = ValidatePassword();
            var validate3 = ValidateConfirmPassword();
            if (validate && validate1 && validate2 && validate3) {
                // convert roles to array
                $("#div-roles").empty();
                let roles = $("#roles").val();
                if (!StringModule.IsNullOrEmpty(roles)) {
                    for (var i = 0; i < roles.length; i++) {
                        $("#div-roles").append(`<input type="hidden" name="roles_arr[${i}]" value="${roles[i]}" />`);
                    }
                }
                // convert datetime to UTC
                if ($('#birthday').val() !== '') {
                    $('#birthday_utc').val(DateModule.ToUTCString($('#birthday').val()));
                }
                // submit form
                $("#form-user").ajaxSubmit({
                    beforeSubmit: function (a, f, o) {
                        o.dataType = "json";
                    },
                    complete: function (XMLHttpRequest, textStatus) {
                        var res = XMLHttpRequest.responseJSON;
                        if (res) {
                            Common.SaveSuccess(res, function () {
                                window.location = `${urls.editUser}/${res.data.id}`;
                            });
                        }
                        else {
                            Notification.Alert(MSG_NO.SERVER_ERROR, function () {
                                $("#first_name").focus();
                            });
                        }
                    },
                });
            }
            else {
                ValidateModule.FocusFirstError();
            }
        } catch (e) {
            console.log("SaveUser: " + e.message);
        }
    };

    /**
     * Lock account of user
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return
     */
    var LockAccount = function () {
        try {
            Notification.Alert(MSG_NO.CONFIRM_LOCK_ACCOUNT, function (ok) {
                if (ok) {
                    ChangeAccountStatus(CONSTANTS.ACCOUNT_STATUS.LOCK)
                }
            });
        } catch (e) {
            console.log("LockAccount: " + e.message);
        }
    };

    /**
     * UnLock account of user
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return
     */
    var UnLockAccount = function () {
        try {
            Notification.Alert(MSG_NO.CONFIRM_UNLOCK_ACCOUNT, function (ok) {
                if (ok) {
                    ChangeAccountStatus(CONSTANTS.ACCOUNT_STATUS.USING)
                }
            });
        } catch (e) {
            console.log("UnLockAccount: " + e.message);
        }
    };

    /**
     * Change status of account to lock or unlock
     *
     * @author QuyPN - 25/10/2022 - create
     * @param {Number} status new status of user
     * @return
     */
    var ChangeAccountStatus = function (status) {
        try {
            $.ajax({
                type: 'POST',
                url: urls.changeStatus,
                dataType: 'json',
                data: {
                    ids: [$('#id').val()],
                    status
                },
                success: function (res) {
                    if (res.code === 200) {
                        Notification.Alert(MSG_NO.SAVE_DATA_SUCCESS, function () {
                            window.location = window.location;
                        });
                    }
                    else {
                        Notification.Alert(MSG_NO.SERVER_ERROR);
                    }
                },
                error: function () {
                    Notification.Alert(MSG_NO.SERVER_ERROR);
                }
            });
        } catch (e) {
            console.log("ChangeAccountStatus: " + e.message);
        }
    };

    /**
     * Delete user
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return
     */
     var DeleteUser = function () {
        try {
            Notification.Alert(MSG_NO.CONFIRM_DELETE_DATA, function (ok) {
                if (ok) {
                    $.ajax({
                        type: 'POST',
                        url: urls.deleteUsers,
                        dataType: 'json',
                        data: {
                            ids: [$('#id').val()]
                        },
                        success: function (res) {
                            if (res.code === 200) {
                                Notification.Alert(MSG_NO.DELETE_DATA_SUCCESS, function () {
                                    window.location = urls.createUser;
                                });
                            }
                            else {
                                Notification.Alert(MSG_NO.SERVER_ERROR);
                            }
                        },
                        error: function () {
                            Notification.Alert(MSG_NO.SERVER_ERROR);
                        }
                    });
                }
            });
        } catch (e) {
            console.log("DeleteUser: " + e.message);
        }
    };

    return {
        Init: Init,
        InitEvents: InitEvents
    };
})();

