/**
 * ****************************************************************************
 * list-of-users.js
 *
 * Description		:	Methods and events for page list of users
 * Created at		:	25/10/2022
 * Created by		:	QuyPN – quypn@outfiz.vn
 * package		    :	Admin
 * ****************************************************************************
 */

 $(document).ready(function () {
    ListOfUsersModule.Init();
    ListOfUsersModule.InitEvents();
});

/**
 * Module contains handling for page list of users.
 * @author QuyPN - 25/10/2022 - create
 * @param
 * @return { Function } ListOfUsersModule.Init() - Initialize values
 * @return { Function } ListOfUsersModule.InitEvents() - Initiating events
 */
var ListOfUsersModule = (function () {
    /**
     * Objects associated with items on the screen
     */
    var obj = {
        'username': { 'type': 'text', 'attr': { 'maxlength': 100 } },
        'fullname': { 'type': 'text', 'attr': { 'maxlength': 100 } },
        'role': { 'type': 'select', 'attr': { } }
    };

    /**
     * Column of table list of users
     */
    const columns = [
        {
            data: 'id',
            orderable: false,
            className: 'max-30',
            render: function(data) {
                return `<input type="checkbox" class="check-item" name="check-item" value="${data}" item-id="${data}">`;
            }
        },
        {
            data: 'username',
            render: function(data, type, row) {
                return `<h2 class="table-avatar">
                    <a href="profile.html" class="avatar"><img src="${row.info.avatar}" alt="${row.username}"></a>
                    <a href="profile.html">${data} <span>${row.info.first_name} ${row.info.last_name} </span></a>
                </h2>`;
            }
        },
        {
            data: 'email',
            render: function(data) {
                return `<a href="mailto:${data}">${data}</a>`;
            }
        },
        {
            data: 'info.phone',
            render: function(data) {
                if (data) {
                    return `<a href="tel:${data}">${data}</a>`;
                }
                return '';
            }
        },
        {
            data: 'last_login_at',
            className: 'text-center',
            render: function(data) {
                if (data) {
                    return (new Date(data)).HHmmssddMMyyyy();
                }
                return ``;
            }
        },
        {
            data: 'last_logout_at',
            className: 'text-center',
            render: function(data) {
                if (data) {
                    return (new Date(data)).HHmmssddMMyyyy();
                }
                return ``;
            }
        },
        {
            data: 'is_active',
            render: function(data) {
                let  checked = false;
                if (data == 1) {
                    checked = true;
                }
                return `<div class="status-toggle">
                    <input type="checkbox" disabled="disabled" class="check" ${checked ? 'checked="checked"' : ''}>
                    <label class="checktoggle">active</label>
                </div>`;
            }
        },
        {
            data: 'roles',
            orderable: false,
            render: function(data) {
                let html = '';
                for (let i = 0 ; i < data.length; i++) {
                    html += `<span class="badge bg-inverse-${data[i].id == 'DEV' ? 'danger' : data[i].id == 'ADM' ? 'warning' : 'primary'}">${data[i].name}</span>`;
                }
                return html;
            }
        },
        {
            data: 'status',
            render: function(data) {
                return `<span class="badge bg-inverse-${data == CONSTANTS.ACCOUNT_STATUS.LOCK ? 'danger' : 'primary'}">${data == CONSTANTS.ACCOUNT_STATUS.LOCK ? 'Locking' : 'Using'}</span>`;
            }
        },
        {
            data: 'id',
            orderable: false,
            className: 'text-right max-30',
            render: function(data, type, row) {
                return canDoAction ?
                `<div class="dropdown dropdown-action">
                    <a href="javascript:void(0)" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                    <div class="dropdown-menu dropdown-menu-right">
                        ${canEdit ? `<a class="dropdown-item" href="${urls.editUser}/${data}"><i class="fa fa-pencil m-r-5"></i> Edit</a>` : ''}
                        ${canChangeStatus ? `${row.status == CONSTANTS.ACCOUNT_STATUS.LOCK ?
                            `<a class="dropdown-item btn-unlock" item-id="${data}" href="javascript:void(0);"><i class="fa fa-unlock-alt m-r-5"></i> Unlock</a>` :
                            `<a class="dropdown-item btn-lock" item-id="${data}" href="javascript:void(0);"><i class="fa fa-lock m-r-5"></i> Lock</a>`}` : ''}
                        ${canDelete ? `<a class="dropdown-item btn-delete" item-id="${data}" href="javascript:void(0);"><i class="fa fa-trash-o m-r-5"></i> Delete</a>` : ''}
                    </div>
                </div>` : '';
            }
        },
    ]

    /**
     * table have data of users
     */
    var Table = null;

    /**
     * Initialize system values
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return
     */
    var Init = function () {
        try {
            Common.InitItem(obj);
            InitDatatable();
            $('#username').focus();
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
            $('#btn-search').on('click', function() {
                Search();
            });
            $(document).on('click', '.btn-lock', function() {
                LockAccount($(this));
            });
            $(document).on('click', '.btn-unlock', function() {
                UnlockAccount($(this));
            });
            $(document).on('click', '.btn-delete', function() {
                DeleteUser($(this));
            });
            $('#btn-bulk-lock').on('click', function() {
                BulkLockAccount();
            });
            $('#btn-bulk-unlock').on('click', function() {
                BulkUnlockAccount();
            });
            $('#btn-bulk-delete').on('click', function() {
                BulkDeleteUser();
            });
        }
        catch (e) {
            console.log('InitEvents: ' + e.message);
        }
    };

    /**
     * Create datatable for list of users
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return
     */
    var InitDatatable = function () {
        try {
            if (!canDoAction) {
                $('.col-for-action').remove();
                columns.splice(0, 1);
                columns.splice(columns.length - 1, 1);
            }
            Table = AdminCommonModule.InitDataTable({
                id: 'listOfUsers',
                haveSelect: true,
                ajax: {
                    url: urls.searchUsers,
                    data: function(s) {
                        s.search = Common.GetData(obj);
                    },
                    complete: function () {
                        Common.ChangeUrl('listOfUsers', Common.GetLastOfUrl(urls.listOfUsers) + '?' + Common.Serialize(Common.GetData(obj)));
                    },
                },
                columns: columns
            });
        }
        catch (e) {
            console.log('InitDatatable: ' + e.message);
        }
    };

    /**
     * Recall ajax of datatable to search
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return
     */
    var Search = function () {
        try {
            if (Table) {
                Table.ajax.reload();
            }
        }
        catch (e) {
            console.log('Search: ' + e.message);
        }
    }

    /**
     * Lock account of user
     *
     * @author QuyPN - 25/10/2022 - create
     * @param {Object} $btn Button clicked
     * @return
     */
     var LockAccount = function ($btn) {
        try {
            Notification.Alert(MSG_NO.CONFIRM_LOCK_ACCOUNT, function (ok) {
                if (ok) {
                    ChangeAccountStatus([$btn.attr('item-id')], CONSTANTS.ACCOUNT_STATUS.LOCK);
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
     * @param {Object} $btn Button clicked
     * @return
     */
    var UnlockAccount = function ($btn) {
        try {
            Notification.Alert(MSG_NO.CONFIRM_UNLOCK_ACCOUNT, function (ok) {
                if (ok) {
                    ChangeAccountStatus([$btn.attr('item-id')], CONSTANTS.ACCOUNT_STATUS.USING);
                }
            });
        } catch (e) {
            console.log("UnlockAccount: " + e.message);
        }
    };

    /**
     * Delete user
     *
     * @author QuyPN - 25/10/2022 - create
     * @param {Object} $btn Button clicked
     * @return
     */
     var DeleteUser = function ($btn) {
        try {
            Notification.Alert(MSG_NO.CONFIRM_DELETE_DATA, function (ok) {
                if (ok) {
                    DeleteSelectedUser([$btn.attr('item-id')]);
                }
            });
        } catch (e) {
            console.log("DeleteUser: " + e.message);
        }
    };

    /**
     * Lock account of selected users
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return
     */
     var BulkLockAccount = function () {
        try {
            var ids = [];
            $('#listOfUsers').find('td .check-item:checked').each(function () {
                ids.push($(this).attr('item-id'));
            });
            if (ids.length === 0) {
                Notification.Alert(MSG_NO.SELECT_AT_LEAST_1_LINE);
                return;
            }
            Notification.Alert(MSG_NO.CONFIRM_LOCK_ACCOUNT, function (ok) {
                if (ok) {
                    ChangeAccountStatus(ids, CONSTANTS.ACCOUNT_STATUS.LOCK);
                }
            });
        } catch (e) {
            console.log("LockAccount: " + e.message);
        }
    };

    /**
     * UnLock account of selected users
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return
     */
    var BulkUnlockAccount = function () {
        try {
            var ids = [];
            $('#listOfUsers').find('td .check-item:checked').each(function () {
                ids.push($(this).attr('item-id'));
            });
            if (ids.length === 0) {
                Notification.Alert(MSG_NO.SELECT_AT_LEAST_1_LINE);
                return;
            }
            Notification.Alert(MSG_NO.CONFIRM_UNLOCK_ACCOUNT, function (ok) {
                if (ok) {
                    ChangeAccountStatus(ids, CONSTANTS.ACCOUNT_STATUS.USING);
                }
            });
        } catch (e) {
            console.log("UnlockAccount: " + e.message);
        }
    };

    /**
     * Delete selected user
     *
     * @author QuyPN - 25/10/2022 - create
     * @param
     * @return
     */
     var BulkDeleteUser = function () {
        try {
            var ids = [];
            $('#listOfUsers').find('td .check-item:checked').each(function () {
                ids.push($(this).attr('item-id'));
            });
            if (ids.length === 0) {
                Notification.Alert(MSG_NO.SELECT_AT_LEAST_1_LINE);
                return;
            }
            Notification.Alert(MSG_NO.CONFIRM_DELETE_DATA, function (ok) {
                if (ok) {
                    DeleteSelectedUser(ids);
                }
            });
        } catch (e) {
            console.log("UnlockAccount: " + e.message);
        }
    };

    /**
     * Change status of account to lock or unlock
     *
     * @author QuyPN - 25/10/2022 - create
     * @param {Array} ids list id of user need to change status
     * @param {Number} status new status of user
     * @return
     */
     var ChangeAccountStatus = function (ids, status) {
        try {
            $.ajax({
                type: 'POST',
                url: urls.changeStatus,
                dataType: 'json',
                data: {
                    ids,
                    status
                },
                success: function (res) {
                    if (res.code === 200) {
                        Notification.Alert(MSG_NO.SAVE_DATA_SUCCESS, function () {
                            Search();
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
     * Delete selected user
     *
     * @author QuyPN - 25/10/2022 - create
     * @param {Array} ids list id of user need to delete
     * @param {Number} status new status of user
     * @return
     */
     var DeleteSelectedUser = function (ids) {
        try {
            $.ajax({
                type: 'POST',
                url: urls.deleteUsers,
                dataType: 'json',
                data: {
                    ids
                },
                success: function (res) {
                    if (res.code === 200) {
                        Notification.Alert(MSG_NO.DELETE_DATA_SUCCESS, function () {
                            Search();
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
            console.log("DeleteSelectedUser: " + e.message);
        }
    };

    return {
        Init: Init,
        InitEvents: InitEvents
    };
})();

