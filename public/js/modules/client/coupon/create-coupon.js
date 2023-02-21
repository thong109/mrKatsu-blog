/**
 * ****************************************************************************
 * create-coupon.js
 *
 * Description		:	Methods and events for create-coupon
 * Created at		:	21/11/2022
 * Created by		:	Thong109 – Thong109@gmail.vn
 * package		    :	Client
 * ****************************************************************************
 */
    function createCoupon() {
        $.ajax({
            type: 'POST',
            url: urls.coupon,
            dataType: 'json',
            success: CouponSuccess,
        });
    }
    $('.changeStatus').on('click',function(){
        let id = $(this).append().data('couponid');
        $.ajax({
            type: 'POST',
            url: urls.coupon,
            dataType: 'json',
            data:{id},
            success: function(res){
                Notification.Alert(res.msgNo, function () {
                    error = false;
                    location.reload();
                });
            },
        });
    });

    var CouponSuccess = function (res) {
        try {
            if (res.code === 200) {
                error = true;
                Notification.Alert(res.msgNo, function () {
                    error = false;
                    location.reload();
                });
            } else {
                error = true;
                Notification.Alert(res.msgNo, function () {
                    error = false;
                });
            }
        } catch (e) {
            console.log('CouponSuccess: ' + e.message);
        }
    };

    document.querySelectorAll(".copy-link").forEach((copyLinkParent) => {
        const inputField = copyLinkParent.querySelector(".copy-link-input");
        const copyButton = copyLinkParent.querySelector(".copy-link-button");
        const text = inputField.value;

        inputField.addEventListener("focus", () => inputField.select());

        copyButton.addEventListener("click", () => {
            inputField.select();
            navigator.clipboard.writeText(text);

            inputField.value = "Copied!";
            setTimeout(() => (inputField.value = text), 2000);
        });
    });

    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#id_password');

    if(togglePassword && password){
        togglePassword.addEventListener('click', function (e) {
            // toggle the type attribute
            const type = password.getAttribute('type') === 'text' ? 'password' : 'text';
            password.setAttribute('type', type);
            // toggle the eye slash icon
            this.classList.toggle('fa-eye-slash');
        });
    }

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })