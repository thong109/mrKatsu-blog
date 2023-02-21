$(document).ready(function () {
    PreviewImageModule.InitEvents();
 });
 var PreviewImageModule = (function () {
    var InitEvents = function () {
       try {
          // Choose image
          $("#image").change(function () {
             readURL(this);
          });
       } catch (e) {
          console.log('InitEvents: ' + e.message);
       }
    };
    var readURL = function (input) {
       if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
             $('#img-tag').attr('src', e.target.result);
          }
          reader.readAsDataURL(input.files[0]);
       }
    }
    return {
       InitEvents: InitEvents
    };
 })();
