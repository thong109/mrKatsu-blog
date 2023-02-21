$(document).ready(function () {
    ListOfCategoriesModules.InitEvents();
});

var ListOfCategoriesModules = (function () {
    var Table = null;

    var InitEvents = function () {
        try {
            $(document).on('click', '.btn-lock', function() {
                LockCategory($(this));
            });
            $(document).on('click', '.btn-unlock', function() {
                UnLockCategory($(this));
            });
            $(document).on('click', '.btn-delete', function() {
                DeleteCategory($(this));
            });
        }
        catch (e) {
            console.log('InitEvents: ' + e.message);
        }
    };

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

     var LockCategory = function ($btn) {
        try {
            Notification.Alert(MSG_NO.CONFIRM_BLOCK_CATEGORY, function (ok) {
                if (ok) {
                    ChangeCategoryStatus([$btn.attr('item-id')], CONSTANTS.CATEGORY_STATUS.BLOCK);
                }
            });
        } catch (e) {
            console.log("LockCategory: " + e.message);
        }
    };

    var UnLockCategory = function ($btn) {
        try {
            Notification.Alert(MSG_NO.CONFIRM_USING_CATEGORY, function (ok) {
                if (ok) {
                    ChangeCategoryStatus([$btn.attr('item-id')], CONSTANTS.CATEGORY_STATUS.USING);
                }
            });
        } catch (e) {
            console.log("UnLockCategory: " + e.message);
        }
    };

     var DeleteCategory = function ($btn) {
        try {
            Notification.Alert(MSG_NO.CONFIRM_DELETE_DATA, function (ok) {
                if (ok) {
                    DeleteSelectedSlide([$btn.attr('item-id')]);
                }
            });
        } catch (e) {
            console.log("DeleteCategory: " + e.message);
        }
    };

     var ChangeCategoryStatus = function (ids, status) {
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
                            location.reload();
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
            console.log("ChangeCategoryStatus: " + e.message);
        }
    };

     var DeleteSelectedSlide = function (ids) {
        try {
            $.ajax({
                type: 'POST',
                url: urls.deleteCategories,
                dataType: 'json',
                data: {
                    ids
                },
                success: function (res) {
                    if (res.code === 200) {
                        Notification.Alert(MSG_NO.DELETE_DATA_SUCCESS, function () {
                            location.reload();
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
            console.log("DeleteSelectedSlide: " + e.message);
        }
    };

    return {
        InitEvents: InitEvents
    };
})();

