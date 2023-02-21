$(document).ready(function () {
    $(document).on('click','.btn-delete',function(){
        DeleteBlog($(this));
    });
    $('#btn-bulk-delete').on('click', function() {
        BulkDeleteBlog();
    });
    $('#btn-bulk-lock').on('click', function() {
        LockBlog();
    });
    $('#btn-bulk-unlock').on('click', function() {
        UnLockBlog();
    });
    listOfBlogs();
    function listOfBlogs() {
       $.ajax({
          type: 'GET',
          url: urls.fetchBlogs,
          dataType: 'json',
          success: function (res) {
             var blogs = res.blogs;
             var html = '';
             var urlPost = 'http://127.0.0.1:8000/post/';
             var urlEdit = 'http://127.0.0.1:8000/admin/blog/edit/';
             if (blogs.length > 0) {
                for (let i = 0; i < blogs.length; i++) {
                   html += ('<tr role="row" class="odd">\
                   <td style="width:5%" class="text-center">\
                       <input type="checkbox" class="check-item" name="check-item" value="'+ blogs[i]['id']+'" item-id="'+ blogs[i]['id']+'">\
                   </td>\
                   <td style="width:10%" class="sorting_1 dtr-control cursor bold p-3"><a href="'+urlPost+blogs[i]['slug']+'" target="_blank">'+blogs[i]['name']+'</a></td>\
                   <td style="width:20%" class="p-3">'+blogs[i]['description']+'</td>\
                   <td style="width:5%" class="p-3"><a href="">'+blogs[i]['author']+'</a></td>\
                   <td class="p-3">'+blogs[i]['content']+'</td>\
                   <td class="p-3">\
                       <div class="flex-center">\
                           <a class="mb-2 mr-2 btn-icon btn btn-info flex-center" href="'+urlEdit + blogs[i]['id']+'" item-id=""><i class="far fa-edit mr-1"></i>Sửa</a>\
                           <a class="mb-2 mr-2 btn-icon btn btn-danger btn-delete flex-center abc" item-id="'+ blogs[i]['id']+'"><i class="fa fa-trash mr-1">\
                               </i>Xoá</a>\
                       </div>\
                   </td>\
               </tr>');
                }
             } else {
                html += ('<tr>\
                     <td colspan="7" class="text-center">\
                     <span>No data</span>\
                     </td>\
                     </tr>');
             }
             $('#featchBlogs').html(html);

          },
          error: function () {
             // Notification.Alert(MSG_NO.SERVER_ERROR);
          }
       });
    }

    var BulkDeleteBlog = function () {
        try {
            var ids = [];
            $('#example').find('td .check-item:checked').each(function () {
                ids.push($(this).attr('item-id'));
            });
            if (ids.length === 0) {
                Notification.Alert(MSG_NO.SELECT_AT_LEAST_1_LINE);
                return;
            }
            Notification.Alert(MSG_NO.CONFIRM_DELETE_DATA, function (ok) {
                if (ok) {
                    DeleteSelectedBlog(ids);
                }
            });
        } catch (e) {
            console.log("UnlockAccount: " + e.message);
        }
    };

    var DeleteBlog = function ($btn) {
        try {
            DeleteSelectedBlog([$btn.attr('item-id')]);
        } catch (e) {
            console.log("DeleteBlog: " + e.message);
        }
    };

    var DeleteSelectedBlog = function (ids) {
        try {
            $.ajax({
                type: 'POST',
                url: urls.deleteBlogs,
                dataType: 'json',
                data: {
                    ids
                },
                success: function (res) {
                    if (res.code === 200) {
                        Notification.Alert(MSG_NO.DELETE_DATA_SUCCESS, function () {
                            listOfBlogs();
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
            console.log("DeleteSelectedBlog: " + e.message);
        }
    };

    var LockBlog = function () {
        try {
            var ids = [];
            $('#example').find('td .check-item:checked').each(function () {
                ids.push($(this).attr('item-id'));
            });
            if (ids.length === 0) {
                Notification.Alert(MSG_NO.SELECT_AT_LEAST_1_LINE);
                return;
            }
            Notification.Alert(MSG_NO.CONFIRM_LOCK_BLOG, function (ok) {
                if (ok) {
                    SelectedBlog(ids, 0);
                }
            });
        } catch (e) {
            console.log("LockBlog: " + e.message);
        }
    }

    var UnLockBlog = function () {
        try {
            var ids = [];
            $('#example').find('td .check-item:checked').each(function () {
                ids.push($(this).attr('item-id'));
            });
            if (ids.length === 0) {
                Notification.Alert(MSG_NO.SELECT_AT_LEAST_1_LINE);
                return;
            }
            Notification.Alert(MSG_NO.CONFIRM_UNLOCK_BLOG, function (ok) {
                if (ok) {
                    SelectedBlog(ids, 1);
                }
            });
        } catch (e) {
            console.log("LockBlog: " + e.message);
        }
    }

    var SelectedBlog = function (ids ,status){
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
                            listOfBlogs();
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
            console.log("LockSelectedBlog: " + e.message);
        }
    }
 });
