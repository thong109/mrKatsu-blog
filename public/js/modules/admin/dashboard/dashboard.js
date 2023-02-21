$(document).ready(function () {
    fetchDashboard();

    function fetchDashboard() {
       $.ajax({
          type: 'GET',
          url: urls.fetchDashboard,
          dataType: 'json',
          success: function (res) {
             var time = res.time;
             var html = '';
             var htmlUser = '';
             var postByUser = res.PostByUser;
             html += (' <div class="col-lg-6 col-xl-4 px-3">\
                 <div class="card mb-3 widget-content bg-premium-dark">\
                     <div class="widget-content-wrapper text-white">\
                         <div class="widget-content-left">\
                             <div class="widget-heading">Từ khoá tìm kiếm nhiều</div>\
                             <div class="widget-subheading">' + res.time + '</div>\
                         </div>\
                         <div class="widget-content-right">\
                             <div class="widget-numbers text-white"><span>' + res.keyword.keyword + '</span></div>\
                         </div>\
                     </div>\
                 </div>\
             </div>\
             <div class="col-lg-6 col-xl-4 px-3">\
                 <div class="card mb-3 widget-content bg-premium-dark">\
                     <div class="widget-content-wrapper text-white">\
                         <div class="widget-content-left">\
                             <div class="widget-heading">Bài viết xem nhiều</div>\
                             <div class="widget-subheading">' + res.time + '</div>\
                         </div>\
                         <div class="widget-content-right">\
                             <div class="widget-numbers text-white"><a target="_blank" class="text-white" href="' + res.view.slug + '">' + res.view.name + '</a></div>\
                         </div>\
                     </div>\
                 </div>\
             </div>\
             <div class="col-lg-6 col-xl-4 px-3">\
                 <div class="card mb-3 widget-content bg-premium-dark">\
                     <div class="widget-content-wrapper text-white">\
                         <div class="widget-content-left">\
                             <div class="widget-heading">Tất cả bài viết (Bài viết/Tổng bài viết)</div>\
                             <div class="widget-subheading">' + res.time + '</div>\
                         </div>\
                         <div class="widget-content-right">\
                             <div class="widget-numbers text-white"><span>' + res.totalPosts + '/' + res.countPosts + '</span></div>\
                         </div>\
                     </div>\
                 </div>\
             </div>\
             ');
             if (postByUser.length > 0) {
                for (let i = 0; i < postByUser.length; i++) {
                   htmlUser += ('<tr>\
                         <td>\
                             <div class="d-flex align-items-center">\
                                 <div class="avatar-icon-wrapper avatar-icon-sm">\
                                     <div class="avatar-icon">\
                                         <img src="' + postByUser[i]['avatar'] + '" alt="">\
                                     </div>\
                                 </div>\
                                 <div class="ml-2">\
                                     <div class="widget-heading"><a target="_blank" href="' + urls.postsByAdmin + '/' + postByUser[i]['authorId'] + '">' + postByUser[i]['author'] + '</a></div>\
                                 </div>\
                             </div>\
                         </td>\
                         <td colspan="2">' + postByUser[i]['total'] + '</td>\
                     </tr>');
                }
                htmlUser = htmlUser + ('<tr>\
                     <td>Tổng</td>\
                     <td>' + res.totalPosts + '</td>\
                     </tr>');
             } else {
                htmlUser += ('<tr>\
                     <td colspan="4" class="text-center">\
                     <span>Không có dữ liệu</span>\
                     </td>\
                     </tr>');
             }
             $('#dashboard').html(html);
             $('#timeAjax').html(time);
             $('#postByUser').html(htmlUser);

          },
          error: function () {
             // Notification.Alert(MSG_NO.SERVER_ERROR);
          }
       });
    }
    $(document).on('click', '#filter', function () {
       var dashboard = $('#dashborad-filter').val();
       $.ajax({
          type: 'POST',
          url: urls.dashboardFilter,
          dataType: 'json',
          data: {
             dashboard: dashboard
          },
          success: function (res) {
             var time = res.time;
             var htmlUser = '';
             var postByUser = res.PostByUser;
             var html = '';
             html += (' <div class="col-lg-6 col-xl-4 px-3">\
                 <div class="card mb-3 widget-content bg-premium-dark">\
                     <div class="widget-content-wrapper text-white">\
                         <div class="widget-content-left">\
                             <div class="widget-heading">Từ khoá tìm kiếm nhiều</div>\
                             <div class="widget-subheading">' + res.time + '</div>\
                         </div>\
                         <div class="widget-content-right">\
                             <div class="widget-numbers text-white"><span>' + res.keyword.keyword + '</span></div>\
                         </div>\
                     </div>\
                 </div>\
             </div>\
             <div class="col-lg-6 col-xl-4 px-3">\
                 <div class="card mb-3 widget-content bg-premium-dark">\
                     <div class="widget-content-wrapper text-white">\
                         <div class="widget-content-left">\
                             <div class="widget-heading">Bài viết xem nhiều</div>\
                             <div class="widget-subheading">' + res.time + '</div>\
                         </div>\
                         <div class="widget-content-right">\
                             <div class="widget-numbers text-white"><a target="_blank" class="text-white" href="' + res.view.slug + '">' + res.view.name + '</a></div>\
                         </div>\
                     </div>\
                 </div>\
             </div>\
             <div class="col-lg-6 col-xl-4 px-3">\
                 <div class="card mb-3 widget-content bg-premium-dark">\
                     <div class="widget-content-wrapper text-white">\
                         <div class="widget-content-left">\
                             <div class="widget-heading">Tất cả bài viết (Bài viết/Tổng bài viết)</div>\
                             <div class="widget-subheading">' + res.time + '</div>\
                         </div>\
                         <div class="widget-content-right">\
                             <div class="widget-numbers text-white"><span>' + res.totalPosts + '/' + res.countPosts + '</span></div>\
                         </div>\
                     </div>\
                 </div>\
             </div>\
            ');
             if (postByUser.length > 0) {
                for (let i = 0; i < postByUser.length; i++) {
                   htmlUser += ('<tr>\
                     <td>\
                         <div class="d-flex align-items-center">\
                             <div class="avatar-icon-wrapper avatar-icon-sm">\
                                 <div class="avatar-icon">\
                                     <img src="' + postByUser[i]['avatar'] + '" alt="">\
                                 </div>\
                             </div>\
                             <div class="ml-2">\
                                 <div class="widget-heading"><a target="_blank" href="' +  urls.postsByAdmin + '/' + postByUser[i]['authorId'] + '">' + postByUser[i]['author'] + '</a></div>\
                             </div>\
                         </div>\
                     </td>\
                     <td colspan="2">' + postByUser[i]['total'] + '</td>\
                 </tr>\
                 ');
                }
                htmlUser = htmlUser + ('<tr>\
                 <td>Tổng</td>\
                 <td>' + res.totalPosts + '</td>\
                 </tr>');
             } else {
                htmlUser += ('<tr>\
                 <td colspan="4" class="text-center">\
                 <span>Không có dữ liệu</span>\
                 </td>\
                 </tr>');
             }
             $('#dashboard').html(html);
             $('#timeAjax').html(time);
             $('#postByUser').html(htmlUser);
          },
          error: function () {
             // Notification.Alert(MSG_NO.SERVER_ERROR);
          }
       });
    })
 });
