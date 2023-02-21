$(document).ready(function () {
    ProfileModule.InitEvents();
});

var ProfileModule = (function () {
    /**
     * Objects associated with items on the screen
     */
    var obj = {
        'id': { 'type': 'text', 'attr': {  'maxlength': 50, 'class': 'required', 'type-err': 'bottom' } },
        'name': { 'type': 'text', 'attr': {  'maxlength': 50, 'class': 'required', 'type-err': 'bottom' } },
        'password': { 'type': 'text', 'attr': {  'maxlength': 50, 'class': 'required', 'type-err': 'bottom' } },
        'birthday': { 'type': 'text', 'attr': { 'class': 'for-select2', 'maxlength': 10, 'class': 'required' } },
        'gender': { 'type': 'select', 'attr': { 'class': 'for-select2' } },
        'phone': { 'type': 'text', 'attr': { 'class': 'only-number', 'maxlength': 10, 'class': 'required' } },
        'address_detail': { 'type': 'text', 'attr': { 'maxlength': 100, 'class': 'required' } },
        'full_name': { 'type': 'text', 'attr': { 'class': 'required alphabet', 'maxlength': 100, 'class': 'required' } },
        'facebook': { 'type': 'text', 'attr': { 'maxlength': 100 } },
        'youtube': { 'type': 'text', 'attr': { 'maxlength': 100 } },
        'instagram': { 'type': 'text', 'attr': { 'class': 'only-number', 'maxlength': 100 } },
        'groupFB': { 'type': 'text', 'attr': { 'class': 'only-number', 'maxlength': 100 } },
    };

    var InitEvents = function () {
        try {
            $('#btn-save').on('click', function () {
                SaveUser();
            });
            // Enter press event
            document.onkeypress = function (event) {
                // If the button being pressed is enter and is not showing a signup failure message, then submit the signup information
                if ((event.which === 13 || event.keyCode === 13) && !error && $(event.target).attr('id') !== 'popup_ok') {
                    SaveUser();
                }
            };
        }
        catch (e) {
            console.log('InitEvents: ' + e.message);
        }
    };

    var SaveUser = function () {
        try {
            var validate = ValidateModule.Validate(obj);
            console.log(validate);
            if (validate) {
                var data = Common.GetData(obj);
                // Submit to the server
                $.ajax({
                    type: 'POST',
                    url: urls.editProfile,
                    dataType: 'json',
                    data: data,
                    success: function(res){
                        if(res.code == 200){
                            return;
                        }
                    },
                });
            }
            else {
                ValidateModule.FocusFirstError();
            }
        } catch (e) {
            console.log("SaveUser: " + e.message);
        }
    };

    return {
        InitEvents: InitEvents
    };
})();

