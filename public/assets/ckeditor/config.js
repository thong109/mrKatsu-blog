/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */
CKEDITOR.editorConfig = function (config) {
    ;//token = $.cookie('token');
    config.language = 'vi';
    config.htmlEncodeOutput = false;
    //config.filebrowserBrowseUrl = ADMIN_CONSTANTS.CKFINDER_LINK + '/public/assets/ckfinder/ckfinder.html?t=' + token;
    //config.filebrowserImageBrowseUrl = ADMIN_CONSTANTS.CKFINDER_LINK + '/public/assets/ckfinder/ckfinder.html?type=Images&t=' + token;
    //config.filebrowserFlashBrowseUrl = ADMIN_CONSTANTS.CKFINDER_LINK + '/public/assets/ckfinder/ckfinder.html?type=Flash&t=' + token;
    //config.filebrowserUploadUrl = ADMIN_CONSTANTS.CKFINDER_LINK + '/public/assets/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Files&t=' + token;
    //config.filebrowserImageUploadUrl = ADMIN_CONSTANTS.CKFINDER_LINK + '/public/assets/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Images&t=' + token;
    //config.filebrowserFlashUploadUrl = ADMIN_CONSTANTS.CKFINDER_LINK + '/public/assets/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Flash&t=' + token;
    config.toolbarGroups = [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        '/',
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        '/',
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] }
    ];
    config.removeButtons = 'Source,CreateDiv,Iframe,ShowBlocks';
    //config.extraPlugins += (config.extraPlugins.length === 0 ? '' : ',') + 'ckeditor_wiris';
    config.allowedContent = true;
    config.toolbar_Basic = [
        { name: 'document', items: ['ExportPdf', 'Preview', 'Print'] },
        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
        { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
        { name: 'links', items: ['Link', 'Unlink'] },
        { name: 'insert', items: ['Table', 'Smiley', 'SpecialChar'] },
        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        { name: 'tools', items: ['Maximize'] },
        { name: 'about', items: ['About'] }
    ];
};
