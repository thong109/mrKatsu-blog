/**
 * ****************************************************************************
 * video.js
 *
 * Description		:	Methods and events for watch video
 * Created at		:	29/11/2022
 * Created by		:	SangVT – ThanhSang0139@gmail.com
 * package		    :	Client
 * ****************************************************************************
 */
$(document).ready(function() {
    var $videoSrc;  
    var $videoId;
    var $limitSecond;
    var $videoLevel;
    var $id;
    var vdo_play = "";
    VideoModule.InitEvents();
    VideoModule.OnModal();
    VideoModule.OffModal();
});

var VideoModule = (function(){
    var InitEvents = function(){
        try {
            $('.video-btn').click(function() {
                $videoSrc = $(this).data( "src" );
                $videoId = $(this).data( "id" );
                $limitSecond = $(this).data( "limit-second" );
                $id = $(this).data( "video-id" );
                $videoLevel = $(this).data("video-level");
            });
        } catch (e) {
            console.log('InitEvent: ' + e.message);
        }
    }

     /**
     * Check user's level to watch video
     *
     * @author SangVT - 29/11/2022 - create
     * @param
     * @return
     */
    var CheckUserLevel = function () {
        try {
            $.ajax({
                type: "POST",
                url: urls.pageVideo,
                data: {
                    $id
                },
                success: CheckUserLevelSuccess,
            });
        } catch (e) {
        console.log('SubmitLogin: ' + e.message);
        }
    };

    /**
     * When the modal is opened autoplay it
     *
     * @author SangVT - 29/11/2022 - create
     * @param
     * @return
     */
    var OnModal = function () {
        try {
            $('#myModal').on('shown.bs.modal', function (e) {
                // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
                $(".videojs").attr('src', 'https://player.vimeo.com/video/' + $videoSrc + "?autoplay=1&modestbranding=1&showinfo=0");
                $('.videojs').attr('class', 'videojs dark');
                $('.videojs').attr('id', $videoId);
                CheckUserLevel();
            });
        } catch (e) {
            console.log('InitEvent: ' + e.message);
        }
    };

     /**
     * Stop playing the youtube video when I close the modal
     *
     * @author SangVT - 29/11/2022 - create
     * @param
     * @return
     */
    var OffModal = function () {
        try {
            $('#myModal').on('hide.bs.modal', function (e) {
                // a poor man's stop video
                $(".videojs").attr('src', '');
                $(".videojs").attr('class', 'videojs');
                $('.videojs').attr('id', $videoId);
                clearInterval(vdo_play);
            });
        } catch (e) {
            console.log('InitEvent: ' + e.message);
        }
    };

    /**
     * Handling when checking user level
     *
     * @author SangVT - 29/11/2022 - create
     * @param { Object } res The json object contains the results returned from the server
     * @return
     */
    var CheckUserLevelSuccess = function (res) {
        try {
            var player = new Vimeo.Player($videoId);
            if (res.code === 200) {
                vdo_play = "";
                player.play();
                return;
            }
            if (res.code === 423) {
                if($videoLevel == 0){
                    vdo_play = "";
                    player.play();
                    return;
                }
                vdo_play = setInterval(function() {
                    player.getCurrentTime().then(function(seconds) {
                        if(seconds > $limitSecond){
                            player.pause();
                            Notification.Alert(MSG_NO.VIDEO_NOT_ACTIVE, function(){
                                window.location = "/home?foo=pricing-plan";
                            });
                        }
                    });
                }, 1000);
            }
            if(res.code === 403){
                if($videoLevel == 0){
                    vdo_play = "";
                    player.play();
                    return;
                }
                vdo_play = setInterval(function() {
                    player.getCurrentTime().then(function(seconds) {
                        if(seconds > $limitSecond){
                            player.pause();
                            Notification.Alert(MSG_NO.YOU_MUST_LOGIN, function(){
                                window.location = "/login";
                            });
                        }
                    });
                }, 1000);
            }
        } catch (e) {
            console.log('CheckUserLevelSuccess: ' + e.message);
        }
    };
    return {
        InitEvents: InitEvents,
        OnModal: OnModal,
        OffModal: OffModal
    };
})();