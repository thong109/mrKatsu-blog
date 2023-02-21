 $(document).ready(function () {
    BlogsModule.InitEvents();
 });

 var BlogsModule = (function () {

    var InitEvents = function () {
       try {
          $(window).on("scroll", function () {
             var scrolled = window.scrollY;
             var comment = document.getElementById('comments').scrollWidth;
             if (Math.ceil(scrolled) > comment) {
                UpdateViewUser();
                $(window).off("scroll");
             }
             return;
          });
       } catch (e) {
          console.log('InitEvent: ' + e.message);
       }
    };

    var UpdateViewUser = function () {
       try {
         var blog_id = $('.blog_id').val();
          $.ajax({
             type: 'POST',
             url: urls.viewed,
             data: {
                blog_id
             },
             dataType: 'json',
          });
       } catch (e) {
          console.log('UpdateViewUser: ' + e.message);
       }
    };
    return {
       InitEvents: InitEvents
    };
 })();
