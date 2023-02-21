// $(document).ready(function() {
//     $('#search').on('click', function() {
//         var query = $('#keyword').val();
//         $.ajax({
//             type: 'GET',
//             url: urls.search,
//             // dataType: 'json',
//             data: {'keyword': query},
//             success: function(data) {
//                 console.log(data);
//                 $('#search_list').html(data);
//             },
//             error: function (res) {
//                 // var object = res.responseJSON.errors.data;
//                 // var ob = object[Object.keys(object)[0]];
//                 // if(ob){
//                 //     Notification.Alert(ob[0]);
//                 // }else{
//                 //     Notification.Alert(MSG_NO.SERVER_ERROR);
//                 // }
//             }
//         });
//     });

// });


$(document).on('click', 'a.page-numbers',function(event){
    event.preventDefault();
    ajaxLoad($(this).attr('href'));
});

$(document).on('submit','form.search-home',function(event){
    event.preventDefault();
    var form = $(this);
    var data = $('#search').val();
    var url = form.attr('action');
    $.ajax({
        type: form.attr('method'),
        url: url,
        data: data,
        cache : false,
        processData: false,
        contentType: false,
        success: function(data) {
            if(data.fail){
                for(control in data.errors){
                    $('#error-'+control).html(data.errors[control]);
                }
            }else{
                ajaxLoad(data.redirect_url);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Error: '+ errorThrown);
        }
    });
    return false;
});

function ajaxLoad(filename, content){
    console.log(filename);
    content = typeof content !== 'underfined' ? content : 'content';
    $.ajax({
        type: 'GET',
        url: filename,
        contentType: false,
        processData: false,
        success: function(data) {
            $('#render').html(data);
            var filename = filename;
            console.log(filename);
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    });
}
