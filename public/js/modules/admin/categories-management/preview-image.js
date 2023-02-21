/**
 * ****************************************************************************
 * preview-image.js
 *
 * Description		:
 * Created at		:	10/12/2022
 * Created by		:	thong109 – thong.phan109@gmail.com
 * package		    :	Admin
 * ****************************************************************************
 */

$(document).ready(function () {
    PreviewImageModule.InitEvents();
 });
 /**
  * @author thong109 - 10/12/2022 - create
  * @param
  * @return { Function } PreviewImageModule.InitEvents() - Initiating events
  */
 var PreviewImageModule = (function () {
    var InitEvents = function () {
       try {
          // Choose image
          $("#images").change(function () {
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
