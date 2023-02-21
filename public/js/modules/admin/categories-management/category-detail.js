$(document).ready(function () {
    CategoryDetailModel.Init();
    CategoryDetailModel.InitEvents();
 });

 var CategoryDetailModel = (function () {
    var obj = {
       'id': {
          'type': 'text',
          'attr': {
             'maxlength': 150
          }
       },
       'name': {
          'type': 'text',
          'attr': {
             'class': 'required',
             'maxlength': 150
          }
       },
       'status': {
          'type': 'select',
          'attr': {
             'class': 'for-select2'
          }
        },
    };

    var Init = function () {
       try {
          Common.InitItem(obj);
          $('#name').focus();
       } catch (e) {
          console.log('Init: ' + e.message);
       }
    };

    var InitEvents = function () {
       try {
          // Click button save
          $('#btn-save').on('click', function () {
             SaveCategory();
          });
          // Click button lock account
          $('#btn-lock').on('click', function () {
             LockCategories();
          });
          // Click button unlock account
          $('#btn-unlock').on('click', function () {
             UnlockCategories();
          });
          // Click button delete Category
          $('#btn-delete').on('click', function () {
             DeleteCategory();
          });
       } catch (e) {
          console.log('InitEvents: ' + e.message);
       }
    };

    var SaveCategory = function () {
       try {
          var validate = ValidateModule.Validate(obj);
          if (validate) {
             // submit form
             $("#form-category").ajaxSubmit({
                beforeSubmit: function (a, f, o) {
                   o.dataType = "json";
                },
                complete: function (XMLHttpRequest, textStatus) {
                  console.log(XMLHttpRequest);
                   var res = XMLHttpRequest.responseJSON;
                   if (res) {
                      Common.SaveSuccess(res, function () {
                         window.location = `${urls.editCategory}/${res.data.id}`;
                      });
                   } else {
                      Notification.Alert(MSG_NO.SERVER_ERROR, function () {
                         $("#name").focus();
                      });
                   }
                },
             });
          } else {
             ValidateModule.FocusFirstError();
          }
       } catch (e) {
          console.log("SaveCategory: " + e.message);
       }
    };

    var LockCategories = function () {
       try {
          Notification.Alert(MSG_NO.CONFIRM_UNACTIVE_Category, function (ok) {
             if (ok) {
                ChangeCategoriestatus(CONSTANTS.CATEGORY_STATUS.BLOCK)
             }
          });
       } catch (e) {
          console.log("LockCategories: " + e.message);
       }
    };

    var UnlockCategories = function () {
       try {
          Notification.Alert(MSG_NO.CONFIRM_ACTIVE_Category, function (ok) {
             if (ok) {
                ChangeCategoriestatus(CONSTANTS.CATEGORY_STATUS.USING)
             }
          });
       } catch (e) {
          console.log("UnlockCategories: " + e.message);
       }
    };

    var ChangeCategoriestatus = function (status) {
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
                } else {
                   Notification.Alert(MSG_NO.SERVER_ERROR);
                }
             },
             error: function () {
                Notification.Alert(MSG_NO.SERVER_ERROR);
             }
          });
       } catch (e) {
          console.log("ChangeCategoriestatus: " + e.message);
       }
    };

    var DeleteCategory = function () {
       try {
          Notification.Alert(MSG_NO.CONFIRM_DELETE_DATA, function (ok) {
             if (ok) {
                $.ajax({
                   type: 'POST',
                   url: urls.deleteCategories,
                   dataType: 'json',
                   data: {
                      ids: [$('#id').val()]
                   },
                   success: function (res) {
                      if (res.code === 200) {
                         Notification.Alert(MSG_NO.DELETE_DATA_SUCCESS, function () {
                            window.location = urls.createCategory;
                         });
                      } else {
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
          console.log("DeleteCategory: " + e.message);
       }
    };

    return {
       Init: Init,
       InitEvents: InitEvents
    };
 })();
