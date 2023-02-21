/**
 * ****************************************************************************
 * QUYPN COMMON CODE
 * NOTIFICATION.JS
 *
 * description		:	Các phương thức và sự kiện liên quan đến hiển thị alert và tooltip thông báo lỗi
 * created at		:	2018/07/07
 * created by		:	QuyPN – quypn09@gmail.com
 * package		    :	COMMON
 * copyright	    :	Copyright (c) QUYPN
 * version		    :	1.0.0
 * ****************************************************************************
 */

/*********************************/
/**     Module Notification      */
/*********************************/

/**
 * Module chứa các xử lý cho việc hiển thị popup thông báo và thông báo lỗi trên từng item bị lỗi
 *
 * Author       :   QuyPN - 2018/07/07 - create
 *
 * Output       :   Notification.Alert(msgId[,callback][,msgText][,type]) - Hiển thị popup tin nhắn phù hợp với id tin nhắn (file message.js)
 *                  msgId - id thông báo có trong file message.js
 *                  callback - có thể có hoặc không, function sẽ thực hiện khi click button trên thông báo (nếu click ok - giá rị tham số là true, nếu click cancel - giá trị tham số là true)
 *                  msgText - nội dung thông báo sẽ hiển thị, có thể có hoặc không, nếu có sẽ ghi đè nội dung của message đã lấy theo id
 *                  type - Loại thông báo sẽ hiển thị, có thể có hoặc không, nếu có sẽ ghi đè type đã lấy được dựa vào id
 *
 * Output       :   Notification.InitItemError()    - Khởi tạo flugin hiển thị thông báo lỗi cho từng item, chỉ gọi 1 lần duy nhất và đã gọi ở cuối file
 * Output       :   Notification.CONFIRM            - Loại message dùng để hiển thị yêu cầu xác nhận
 * Output       :   Notification.SUCCESS            - Loại message dùng để hiển thị thông báo thành công
 * Output       :   Notification.WARNING            - Loại message dùng để hiển thị cảnh báo
 * Output       :   Notification.ERROR              - Loại message dùng để hiển thị thông báo lỗi
 * Output       :   Notification.INFO               - Loại message dùng để hiển thị thông tin cho người dùng
 * Output       :   Notification.ALERT              - Loại message dùng để hiển thị lời nhắn cho người dùng
 * Output       :   Notification.TOOLTIP_ID         - Class của thẻ hiển thị thông báo
 * Output       :   Notification.TOOLTIP_ATTR       - Thuộc tính chứa nội dung lỗi trên các input bị lỗi
 * Output       :   Notification.STYLE_ERROR        - Class được add thêm vào các item bị lỗi
 */
var Notification = (function () {
    /**
     * ****************************************************************************
     * Hiển thị các loại popup thông báo
     * ****************************************************************************
     */

    /**
     * Các cài đặt cho việc hiển thị thông báo lên màn hình
     * @typedef {Object} OptionsOfAlert
     * @property {number} overlayOpacity Độ mở của nền đen phía sau thông báo
     * @property {string} overlayColor Màu của nền đen phía sau thông báo
     * @property {boolean} draggable Có cho phép di chuyển thông báo hay không
     * @property {string} okButton Text hiển thị trên button đồng ý
     * @property {string} cancelButton Text hiển thị trên button hủy
     * @property {string} yesButton Text hiển thị trên button có thực hiện
     * @property {string} noButton Text hiển thị trên button không thực hiện
     * @property {string} dialogClass Thêm class này vào thẻ cha ngoài cùng của thông báo
     * @property {boolean} showTitle Có hiển thị tiêu đề thông báo hay là không
     * @property {string} imgError Ảnh icon của thông báo nguy hiểm
     * @property {string} imgWarming Ảnh icon của thông báo nguy hiểm
     * @property {string} imgAlert Ảnh icon của thông báo
     * @property {string} imgSuccess Ảnh icon của thông báo thành công
     * @property {string} imgConfirm Ảnh icon của thông báo xác nhận
     * @property {string} imgInfo Ảnh icon của thông báo thông tin
    */

    /**
     * Các cài đặt cho việc hiển thị tooltip error
     * @typedef {Object} OptionsOfTooltipError
     * @property {number} xOffset Tọa độ chiều x bắt đầu thông báo lỗi
     * @property {number} yOffset Tọa độ chiều y bắt đầu thông báo lỗi
     * @property {string} tooltipId Id của tooltip lỗi
     * @property {string} tooltipAttr Thuộc tính sẽ thêm vài item bị lỗi
     * @property {string} styleError Class chứa style sẽ thêm vào item lỗi
     * @property {string} parentOfItemError Class sẽ thêm vào thẻ cha của item bị lỗi
    */

    /**
     * Các tùy chọn hiển thị cho popup thông báo
     * @type {OptionsOfAlert}
     */
    var _optionsAlert = {
        overlayOpacity: 1,
        overlayColor: 'rgba(0, 0, 0, 0.4)',
        draggable: false,
        okButton: 'Ok',
        cancelButton: 'Cancel',
        yesButton: 'Có',
        noButton: 'Không',
        dialogClass: null,
        showTitle: true,
        imgError: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBODIxMzY3ODU2MDAxMUU0QkQ2MERCNkVDNDgzMkVFMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyODAyRTlENjU2MDExMUU0QkQ2MERCNkVDNDgzMkVFMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4MjEzNjc2NTYwMDExRTRCRDYwREI2RUM0ODMyRUUzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4MjEzNjc3NTYwMDExRTRCRDYwREI2RUM0ODMyRUUzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Bdt33QAAAyJJREFUeNrEmTtoFFEUhmcnBmUxjWZ9RE0VdElhimglCIqxCtoYlV1FiIURH4VIwNZgIRYiGkMsUvlMoYhCCsV0FkECdomQRjQKZquVLdbnf/Afua57XzOT3R9+NszOvefLzL3n3Hs3s3DieBBDIbwD3sPPrXAHvJrff4UX4XfwG3ianz99A63wvH8TfAYuwp2G+1bB7fB2+BCvvYfvwaPwR58n4aI18C14Ab5kgdOpk22lj5vsMxXAAXieT25lkFzSx1n2OZAEUF7/GDzJ15W22tn3bdNQ0wFm4SfwULD8Os1YWVfAFvgB3B80Tv2M2eICKAP4QNB4ScwbNsAjfOTNkkzEwzrAHAdsszVGlv8ARxxz01v4cYzA1+GXjjl3pBZQkuigI1wfX8OkB9w1+AJ80BFyMCoGoTLVWx3hvsA/4IIjpMAN8++KI2RrlOJC+phDoIuEi+QCqcIFCuSoQzxhCgVuJ7zZocF9uKfmWgT5yBFOtJ+LBpu2yEop5JLJRTKzXmggizWQJjht1aijvVIDez0GewTZxzFZCxktq9KAE/UKYN4zXZggC5pFaRw4UV5e8cYYOU33utOEE20QwLaYGV8HmRacqC0MkinHvKZTIQHc30pSTtBeZutlw/cnPStOrcoC+CkB3LDlHp+KU0+fQ+4N0oLbZ0jmcSDnBHA2JTiZEE8NyVxXcUyaFcBXKcFFs9Wn4tg0LYAz8IeU4OKURZ2EaSZkcrUV7+/wc888Z4K8wj5NuitsUR6UU4OqZY88Be/2TML1ILt5zXTsUo2WZKHyOCcs/1FWgfSpECpkNw+S1lvaTETDLqOcbslOfw5ea2lcUYB9JIvdX/A6y30leBs//9k0LcHnHQJlY5avnANcwHObkm5fLKvmO03cckrsh7aThXOaGbvcesbY1qOPKk8YphoIJ7GO1sskoWEiyDJqvAFw44xV8Tl+E33j3rSoDtoUVWLfQ4wV+AKqEyfPAVxNAazKp5Zn39YFq4skBZ2Cu+CrwZ8TfF8tsm0Xn9qSS6NMgp8hdnFP3cPE2qHsb8oEmufOT1ZMr4MYP0P8FmAAPVS+35lJP28AAAAASUVORK5CYII=")',
        imgWarming: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyODAyRTlERDU2MDExMUU0QkQ2MERCNkVDNDgzMkVFMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyODAyRTlERTU2MDExMUU0QkQ2MERCNkVDNDgzMkVFMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4MDJFOURCNTYwMTExRTRCRDYwREI2RUM0ODMyRUUzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI4MDJFOURDNTYwMTExRTRCRDYwREI2RUM0ODMyRUUzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+nEkxrQAAAolJREFUeNrMmT1MFEEYhuc2x2lAkuNOiotAQ3LEwkqo8ApoIRhjghGstBB/awtCoTT0GH5CqJSfisTE2EmhlZw9kFApXqMVarEkxPc9viWXzd4xuzN77ps8yd3s3ve9M7M3f5v68XJERZADBsAQ6AdFcAW0yfU/4BDsgzLYBjvgJGyidMj7u8ATMAm6G9x3AeTANXBbyr6Bt+A1+B6mJXSUl8AH4MU55uqpW357ILHytgyOg13wGGSUuTISizHvmBhk9y+ATXBZ2RdjbkiOdFiDrWALTKn4NSW5WnUNsjbrYFQ1T6OSM61jcB6MqeZrTHI3NMiH9qH6f2Luu/UM5oNqoKkSSPkoRYxFD51BBmcN/q1lzTIdcYB/5TfYAx4YdE2HZpmu7ounM4OPQEuCDLaIp6pBcs/w4c4FlGUNY9KT461KugyDddSZv01ETwM0OGxheLDdxZ6GaPB6TAazFuL202BfgluwjwYLFgJlYzJYoMH2BLdgu6PsKC6D1THwyEKcfEwGj2iwEtMzmLMQt0KDewnu4j0a/Jpgg2VHNtWmughu1HwflDJTbXMP8EU20qbz8SfLq2t62nHkOOKNSp7o6cQbB7nTdxNkzhVPZwtWNueKYdCShf2Ip1Xv/KZ2JpkBvwyCfq7zOazoYTpo08QLTxPQvc9rG8o/F/OsZCliYP8wE0XLYM1/zBFUg0KE0wXTYeYdeKZz9OHK7v5DE7v1veR0dQxSf8FNg+4OI+a4JTmVrkHqWJ0ejbFmP2MwxpgTkuO40XrwPPGPcxUsWhrMXYnFmOs6C1bd2nKn3wvm1OkJflgdym97JZZWr6QMX0MMy7a1KIuNS3L9t8wE+7Kc+6givob4J8AArvBupzBR6XIAAAAASUVORK5CYII=")',
        imgAlert: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAoCAYAAAB0HkOaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBODIxMzY3NDU2MDAxMUU0QkQ2MERCNkVDNDgzMkVFMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBODIxMzY3NTU2MDAxMUU0QkQ2MERCNkVDNDgzMkVFMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE4MjEzNjcyNTYwMDExRTRCRDYwREI2RUM0ODMyRUUzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE4MjEzNjczNTYwMDExRTRCRDYwREI2RUM0ODMyRUUzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+LUCWygAAAJFJREFUeNrs1kEKgDAMBMCk9Cl+zze03vx1tVChohgvSaPsguChhyFsQ3ma10L6yfu3SIcC2aRiknQodv+siCkNRE8TsprMqwlZYw5Q9oKhNp3sBXMLGom5gEZjTqBIPpIsMdIOq3soBXIUYIABBhjtSBtY433Mv5gMo8AoMAqMAqPAKDDeM8B86DYVTKbLJsAAsL4SeGGAaDEAAAAASUVORK5CYII=")',
        imgSuccess: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NjY0QzhGRTU2MDExMUU0QkQ2MERCNkVDNDgzMkVFMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NjY0QzhGRjU2MDExMUU0QkQ2MERCNkVDNDgzMkVFMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4MDJFOURGNTYwMTExRTRCRDYwREI2RUM0ODMyRUUzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI4MDJFOUUwNTYwMTExRTRCRDYwREI2RUM0ODMyRUUzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Txz/jQAAA2BJREFUeNrEmVtIFFEcxsdpNTAtaCuQtBdD8SGCUnrpptVDYJZEFy0iutBW1kNBhIRBNwp6KEpSCQm6F1FY0UvkQw9la+8qLGUpEuiTKbGW9f3jWxmGmd0zs2fWD36sO3vmnO/Muf3/Y9aq96cMHzJBBagE5aAELASz+PsYGAR9oBt0giiY9NpQyGP5QnAU7AJFScrNBHPBErCV176D+6AZDHh5EioKs+IYOJ3CnJuKeG+MdYV1GdwOesARkGOkrxzWJXXuSMegDP8t8BjMM/RL6nzENkJeDeaC5yBiBK8I28pVNSi9eQiqjcypmm2GVAzeBDVG5lXDtpMalEl7yJg+Sdt1bgbDTj2YBomH+U4GLwS0Wp30CxwElx1+kw3+vN3gIrA/Q+bkFFkNboOPLmX20dOUwcMgOwPmPvDsjvLzgUu5bHr6b1DYnQFzsilXgR880133Pko8mYmopDBgczKn6jn3xNQrhTbl94oQexWU/oAG0MLvWdyQlyreXykGlwdkLs5hemq5dtbjIVAuBksDMPcT1IK3lmubQJPHekrFYIFmcyNgI1fqVEPgLofYiwpkkeQrDNULxQolzF9pMzebK3aOj87mmwqTvJ7DJdHw3yRlJaRfw0DUsCyKdlDmdzjE4GiS3/eAZ/z7Cnf43w7l+mkuZrveYMlJ/GhUDA4lKbDBNm/ucBWOWa59AWv5adUycDXN+TwkBnuTFNgL2mwm34B1XAz9NPfVdl8eU4V0c5heMfg5RaED4LrNZBcXw3rwzeGea2Cxhh2hO8SkOpWOgQlw0nKtx6VsrcbIqFOe4CfFRPoEuKiQqbVoDMuiJl9H3FO8qZHbjZtugAWaDIqnycQ+2MwNWUWXXIZwC9ip8RxvtgasA4xwVSSLpdV26OdrzmfaE9POepI0cetQ0QyGTSv4/Rzfbuk6y884JU0j3PlVJYHnS7CNq1yXjlsflOkQlrd6qEzSwyd8ojrUZs9TTJcedExDPtzhNBKmywqq45GWKb1mm3HVt1vjYLPH4farVp4+46pvtxKa4Ksx6dlwAMaGGWtG2Jbh1aB14ZTxCItrMBZnXWXcqlIGrKq9lUy/mIHroA9jg7y3mHUpjYrXt/wDPIsbmfBXMW0tYaKdZ8nqpGwfw7l3hs9/Q/wTYABWn6muLWwACQAAAABJRU5ErkJggg==")',
        imgConfirm: 'url("data:image/png;base64,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")',
        imgInfo: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyODAyRTlEOTU2MDExMUU0QkQ2MERCNkVDNDgzMkVFMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyODAyRTlEQTU2MDExMUU0QkQ2MERCNkVDNDgzMkVFMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4MDJFOUQ3NTYwMTExRTRCRDYwREI2RUM0ODMyRUUzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI4MDJFOUQ4NTYwMTExRTRCRDYwREI2RUM0ODMyRUUzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+aMojlQAAA1VJREFUeNq8mUtoE1EUhifTFEux4KOV1kcREe1KF1UEBZ+ILoovrBWiXXShFavoRhR01Y3Z+S4pWlBMK25EqlgUragoFinqqhXcaKwVfGEkQirV/+A/MowzmZl7xxz4GHIzc+6fO/eee85NbF36jaFgJlgEVvE6D0wHE/n9dzACXoFnoJ/X8bAdxUPePwPsBQlQW+C+MlAJFoCtbJORSIOz4F2YkQhiU8AZ8Boc8RHnZbV8Vnycps9IBDaCYY7cBEPfxEcbfTbqCJTX3wGu8nVFbZX0fa7QVPMSWA6ugVbj/9se9lUeVGAJ6AENRvGsgX2WBBEoE3hDBJ1+AwPgc8D7pc+TfgKbOOS6Jiu+CiwBM8HlgM/JQtzmJbCKE1bXnoP9IM/PP8CBEM93UMs/AtuDxiYfuwt+Odq+gJ8hYm67U6AE0ZaIJvxsl7a1IXetFmszMG1LvTQigRsdAVj2666QPkqtEGeSHRGGjDgD8AcwCu4xkQhroskUZ4u50qKwF5yDn5jhJDR8zZJMKc5XoGuPwEGmVHZ7qhkZVsvrrdcUdxysYe7ntF5N3/UisE7DwSFwnq826fJ9habAOhFYo/jwCe6f9/kjb7rcs1JTYLWp+CslEJ/iK5QFlgF9Lvc1aQqsiCs+GGNmHOPnCy47hQTs5bqrT0YwqyHSYCHkFoh32u5RtawIfK/ppI8FkVN8cwTha9RkbaBjnS5tS8HcCAQOicBBDQcjHqs3itETGzS5V6raJZfFUWZLOr+Chxr++02m5RlFBz0ubZvBJJAD68EdRd+iacDkKkwrOJCF8dJDYM52PawoUMqEcdNWQ+RDOnji0f5ANnmOwG2vctLH8jwi+ZuwZhSSyrcFCqZpzHCqFUevy5p29prkGPO4oDbHpa2Gzq+DyYriRMNRt9Otj6zGgs7HLeAik4Wpxp9juE0RnN+02QfKuRd3gxVgV0BnzRHGPCvoX/E7WdgHbhjFt1727Xv0kWeadKuI4qSv7W6RxOt0K8fyMVUEcSn2lQt6umXZGGvTRMjVHWa1JtjHWKF80M+6mdJ3KgRzryCcos/uIAlrEJMQtJspVJJZjErmk6SPVvr0z4o1/oZYxpp6IZjP0wOrvslS0DArPsmYHhsKf0P8FmAAIdiqZYbCvjQAAAAASUVORK5CYII=")',
    };
    /** Các loại thông báo có thể hiển thị */
    var _CONSTANTS = {
        /** Xác nhận 1 hành động nào đó */
        CONFIRM: 1,
        /** Thông báo thực hiện thành công 1 hành động nào đó */
        SUCCESS: 2,
        /** Cảnh báo 1 hành động nguy hiểm */
        WARNING: 3,
        /** Thông báo lỗi */
        ERROR: 4,
        /** Hiển thị 1 thông tin người dùng cần biết */
        INFO: 5,
        /** Đưa 1 thông điệp ra màn hình */
        ALERT: 6
    };
    /**
     * Phương thức hiển thị 1 thông báo dạng alert
     *
     * Author : QuyPN - 2018/07/07 - create
     * @param {string} message Nội dung thông báo sẽ hiển thị lên popup (có thể là html)
     * @param {string} title Tiêu đề của thông báo sẽ hiển thị lên popup
     * @param {NotifyCallback} callback Function sẽ thực hiện khi click button trên thông báo, tham số trả về luôn có giá trị true
     */
    var _alert = function (message, title, callback) {
        if (title === null || title === undefined) title = 'Alert';
        _show(title, message, 'alert', function (result) {
            if (callback) callback(result);
        });
    };
    /**
     * Phương thức hiển thị 1 thông báo yêu cầu thực hiện xác nhận một thao tác nào đó
     *
     * Author : QuyPN - 2018/07/07 - create
     * @param {string} message Nội dung thông báo sẽ hiển thị lên popup (có thể là html)
     * @param {string} title Tiêu đề của thông báo sẽ hiển thị lên popup
     * @param {NotifyCallback} callback Function sẽ thực hiện khi click button trên thông báo (nếu click ok - giá rị tham số là true, nếu click cancel - giá trị tham số là true)
     */
    var _confirm = function (message, title, callback) {
        if (title === null || title === undefined) title = 'Confirm';
        _show(title, message, 'confirm', function (result) {
            if (callback) callback(result);
        });
    };
    /**
     * Phương thức hiển thị 1 thông tin cần thiết ra cho người dùng
     *
     * Author : QuyPN - 2018/07/07 - create
     * @param {string} message Nội dung thông báo sẽ hiển thị lên popup (có thể là html)
     * @param {string} title Tiêu đề của thông báo sẽ hiển thị lên popup
     * @param {NotifyCallback} callback Function sẽ thực hiện khi click button trên thông báo, tham số trả về luôn có giá trị true
     */
    var _info = function (message, title, callback) {
        if (title === null || title === undefined) title = 'Info';
        _show(title, message, 'info', function (result) {
            if (callback) callback(result);
        });
    };
    /**
     * Phương thức hiển thị 1 thông báo thành công của một thao tác nào đó
     *
     * Author : QuyPN - 2018/07/07 - create
     * @param {string} message Nội dung thông báo sẽ hiển thị lên popup (có thể là html)
     * @param {string} title Tiêu đề của thông báo sẽ hiển thị lên popup
     * @param {NotifyCallback} callback Function sẽ thực hiện khi click button trên thông báo, tham số trả về luôn có giá trị true
     */
    var _success = function (message, title, callback) {
        if (title === null || title === undefined) title = 'Success';
        _show(title, message, 'success', function (result) {
            if (callback) callback(result);
        });
    };
    /**
     * Phương thức hiển thị 1 thông báo nguy hiểm đến người dùng
     *
     * Author : QuyPN - 2018/07/07 - create
     * @param {string} message Nội dung thông báo sẽ hiển thị lên popup (có thể là html)
     * @param {string} title Tiêu đề của thông báo sẽ hiển thị lên popup
     * @param {NotifyCallback} callback Function sẽ thực hiện khi click button trên thông báo, (nếu click ok - giá rị tham số là true, nếu click cancel - giá trị tham số là true)
     */
    var _warning = function (message, title, callback) {
        if (title === null || title === undefined) title = 'Warning';
        _show(title, message, 'warning', function (result) {
            if (callback) callback(result);
        });
    };
    /**
     * Phương thức hiển thị 1 thông báo lỗi cho người dùng
     *
     * Author : QuyPN - 2018/07/07 - create
     * @param {string} message Nội dung thông báo sẽ hiển thị lên popup (có thể là html)
     * @param {string} title Tiêu đề của thông báo sẽ hiển thị lên popup
     * @param {NotifyCallback} callback Function sẽ thực hiện khi click button trên thông báo, tham số trả về luôn có giá trị true
     */
    var _error = function (message, title, callback) {
        if (title === null || title === undefined) title = 'Error';
        _show(title, message, 'error', function (result) {
            if (callback) callback(result);
        });
    };
    /**
     * Tạo và hiển thị popup có thông tin cần thiết cho người dùng
     *
     * Author : QuyPN - 2018/07/07 - create
     * @param {string} title Tiêu đề của thông báo sẽ hiển thị lên popup
     * @param {string} msg Nội dung thông báo sẽ hiển thị lên popup (có thể là html)
     * @param {number} type Loại thông báo sẽ hiển thị ("error", "warning", "success", "confirm", "alert", "info")
     * @param {NotifyCallback} callback Function sẽ thực hiện khi click button trên thông báo, dựa vào loại thông báo mà tham số trả về là true hoặc false
     */
    var _show = function (title, msg, type, callback) {
        // Ẩn thông báo đang mở nếu có
        _hide();
        // Hiển thị nền đen cho toàn màn hình
        _overlay('show', callback);
        // Đăng kí sự kiện khi resize windows sẽ điều chỉnh size của thông báo
        _maintainResize(true);
        // Append HTML của thông báo vào body của trang web
        $("body").append(
            '<div id="popup_container">' +
                '<div id="popup_title" class="' + (_optionsAlert.showTitle ? 'show_title' : '') + '">' +
                    '<div id="popup_icon"></div>' +
                    '<p id="popup_title_content"></p>' +
                '</div>' +
                '<div id="popup_content">' +
                    '<div id="popup_message"></div>' +
                '</div>' +
            '</div>'
        );
        // Nếu người dùng cung cấp thêm class cho popup thì add thêm vào
        if (_optionsAlert.dialogClass) $("#popup_container").addClass(_optionsAlert.dialogClass);
        // Thêm class để nhận diện loại popup thông báo
        $("#popup_icon").addClass(type);
        // Thêm tiêu đề thông báo vào popup
        $("#popup_title_content").text(title);
        // Thêm nội dung tin nhắn vào popup hiển thị
        $("#popup_message").html(msg.replace(/\n/g, '<br />'));
        // Thêm css để thiển thị popup
        $("#popup_container").css({
            'position': 'fixed',
            'width': window.innerWidth > 400 ? '400px' : 'calc(100% - 20px)',
            'right': window.innerWidth > 400 ? 'calc(50% - 200px)' : '10px',
            'z-index': '100000',
            'background': '#fff',
            'border-radius': '0px',
            'text-align': 'center',
            'padding': '5px 0px 10px 0px'
        });
        $("#popup_content").css({
            'padding': '5px 15px 5px 15px'
        });
        $("#popup_message").css({
            'text-align': 'center',
            'padding': '0px 0px 10px 0px'
        });
        $("#popup_title").css({
            'margin-right': '15px',
            'margin-left': '15px',
            'border-bottom': _optionsAlert.showTitle ? 'solid 1px #ddd' : 'none'
        });
        $("#popup_title_content").css({
            'display': _optionsAlert.showTitle ? 'inline-block' : 'none',
            'vertical-align': 'middle',
            'width': 'calc(100% - 35px)',
            'margin-bottom': '0px',
            'text-transform': 'uppercase',
            'font-weight': '600',
            'text-align': 'left',
            'padding-top': '2px'
        });
        $("#popup_icon").css({
            'display': 'inline-block',
            'width': '35px',
            'vertical-align': 'middle',
            'background-repeat': 'no-repeat',
            'height': '30px',
            'background-size': '30px 30px',
            'margin-bottom': _optionsAlert.showTitle ? '5px' : '3px',
            'margin-top': _optionsAlert.showTitle ? '5px' : '10px'
        });
        $("#popup_icon.error").css({
            'background-image': _optionsAlert.imgError
        });
        $("#popup_icon.warning").css({
            'background-image': _optionsAlert.imgWarming
        });
        $("#popup_icon.success").css({
            'background-image': _optionsAlert.imgSuccess
        });
        $("#popup_icon.info").css({
            'background-image': _optionsAlert.imgInfo
        });
        $("#popup_icon.confirm").css({
            'background-image': _optionsAlert.imgConfirm
        });
        $("#popup_icon.alert").css({
            'background-image': _optionsAlert.imgAlert
        });
        // Thêm các button phù hợp cho thông báo
        switch (type) {
            // Nếu là thông báo confirm hoặc warning thì thêm 2 nút Ok và cancle
            case 'confirm':
            case 'warning':
                $("#popup_message").after(
                    '<div id="popup_panel">' +
                        '<button id="popup_ok" class="btn btn-primary btn-sm">' +
                            _optionsAlert.yesButton +
                        '</button>' +
                        '<button id="popup_cancel" class="btn btn-light btn-sm">' +
                            _optionsAlert.noButton +
                        '</button>' +
                    '</div>'
                );
                // Khi click ok thì gọi function callback với giá trị tham số là true
                $("#popup_ok").click(function () {
                    _hide();
                    if (callback) callback(true);
                });
                // Khi click cancel thì gọi function callback với giá trị tham số là false
                $("#popup_cancel").click(function () {
                    _hide();
                    if (callback) callback(false);
                });
                $("#popup_ok").focus();
                // Thêm sự kiện để có thể dùng phím thay vì chuột
                $("#popup_ok, #popup_cancel").keypress(function (e) {
                    if (e.keyCode === 27)
                        $("#popup_cancel").trigger('click');
                    if (e.keyCode === 13)
                        if ($("#popup_ok").is(":focus"))
                            $("#popup_ok").trigger('click');
                        else if ($("#popup_cancel").is(":focus"))
                            $("#popup_cancel").trigger('click');
                });
                break;
            default:
                // Với các popup còn lại thì chỉ có 1 button ok
                $("#popup_message").after(
                    '<div id="popup_panel">' +
                        '<button id="popup_ok" class="btn btn-primary btn-sm">' +
                            _optionsAlert.okButton +
                        '</button></div>'
                    );
                // Khi click ok thì gọi function callback với giá trị tham số là true
                $("#popup_ok").click(function () {
                    _hide();
                    callback(true);
                });
                // Thêm sự kiện để có thể dùng phím thay vì chuột
                $("#popup_ok").focus().keypress(function (e) {
                    if (e.keyCode === 13 || e.keyCode === 27) $("#popup_ok").trigger('click');
                });
                break;
        }
        // chỉnh lại vị trí của popup sau khi có đầy đủ các thành phần
        $("#popup_container").css({
            'top': 'calc(50% - ' + ($("#popup_container").height() / 2 + 30) + 'px)'
        });
        // cho phép dùng chuột di chuyển thông báo
        if (_optionsAlert.draggable) {
            try {
                $("#popup_container").draggable({ handle: $("#popup_title") });
                $("#popup_title").css({ cursor: 'move' });
            } catch (e) { /* yêu cầu phải có jQuery UI draggables */ }
        }
    };
    /**
     * Tắt thông báo khi người dùng click button
     *
     * Author : QuyPN - 2018/07/07 - create
     */
    var _hide = function () {
        $("#popup_container").remove();
        _overlay('hide');
        _maintainResize(false);
    };
    /**
     * Hiển thị hoặc xóa nền đen phía sau thông báo, không cho người dùng tương tác với màn hình
     *
     * Author : QuyPN - 2018/07/07 - create
     * @param {string} status
     * 'show' - tạo và hiển thị nền đen
     * 'hide' xóa nền đen
     */
    var _overlay = function (status, callback) {
        if (status === 'show') {
            _overlay('hide');
            $("body").append('<div id="popup_overlay"></div>');
            $("#popup_overlay").css({
                position: 'fixed',
                zIndex: 99999,
                top: '0px',
                left: '0px',
                width: '100%',
                height: '100%',
                background: _optionsAlert.overlayColor,
                opacity: _optionsAlert.overlayOpacity
            });
            $('#popup_overlay').click(function () {
                _hide();
                if (callback) callback(false);
            });
        }
        if (status === 'hide'){
            $("#popup_overlay").remove();
        }
    };
    /**
     * Resize lại khích thước thông báo nếu kích thước màn hình thay đổi
     *
     * Author : QuyPN - 2018/07/07 - create
     */
    var _resize = function () {
        $("#popup_container").css({
            'width': window.innerWidth > 400 ? '400px' : 'calc(100% - 20px)',
            'right': window.innerWidth > 400 ? 'calc(50% - 200px)' : '10px'
        });
    };
    /**
     * Lắng nghe hoặc hủy sự kiện thay đổi kích thước màn hình
     *
     * Author : QuyPN - 2018/07/07 - create
     * @param {boolean} status
     * true - cho lắng nghe sự kiện
     * false - hủy sự kiện
     */
    var _maintainResize = function (status) {
        if (status) {
            $(window).bind('resize', _resize);
        }
        else {
            $(window).unbind('resize', _resize);
        }
    };
    /**
     * Hiển thị popup tin nhắn phù hợp với id tin nhắn (file message.js)
     *
     * Author : QuyPN - 2018/07/07 - create
     * @param {string} msgId id thông báo có trong file message.js
     * @param {NotifyCallback} [callback] Có thể có hoặc không, function sẽ thực hiện khi click button trên thông báo (nếu click ok - giá rị tham số là true, nếu click cancel - giá trị tham số là false)
     * @param {string} [msgText=Có lỗi xảy ra, vui lòng thử lại] Nội dung thông báo sẽ hiển thị, có thể có hoặc không, nếu có sẽ ghi đè nội dung của message đã lấy theo id
     * @param {number} [type=4] Loại thông báo sẽ hiển thị, có thể có hoặc không, nếu có sẽ ghi đè type đã lấy được dựa vào id
     */
    var Alert = function (msgId, callback, msgText, type) {
        // gán các giá trị mặc định
        var typeMsg = _CONSTANTS.ERROR;
        var titleMsg = 'Error';
        var contentMsg = "Có lỗi xảy ra, vui lòng thử lại";
        // lấy thông tin message ở file message.js theo id
        var message = typeof (_msg) !== 'undefined' && _msg[msgId] !== undefined ? _msg[msgId] : null;
        if (message !== null) {
            // nếu tồn tại message có id tương ứng thì set vào các thông tin sẽ hiển thị
            contentMsg = message.content;
            titleMsg = message.title;
            typeMsg = message.type;
        }
        else {
            switch (type) {
                case _CONSTANTS.ALERT: titleMsg = 'Alert'; break;
                case _CONSTANTS.CONFIRM: titleMsg = 'Confirm'; break;
                case _CONSTANTS.ERROR: titleMsg = 'Error'; break;
                case _CONSTANTS.SUCCESS: titleMsg = 'Success'; break;
                case _CONSTANTS.WARNING: titleMsg = 'Warning'; break;
            }
        }
        // Nếu có nhập loại popup thì ghi đè cái đã lấy theo id
        if (type !== undefined) {
            typeMsg = type;
        }
        // Nếu có nhập nội dung thông báo thì ghi đè nội dung thông báo đã lấy theo id
        if (msgText !== undefined) {
            contentMsg = msgText;
        }
        // Nếu không truyền callback thì giá giá trị mặc định vào
        if (callback === undefined || callback === null) {
            callback = function (ok) { };
        }
        // Hiển thị từng popup phù hợp với type của thông báo đã lấy được phía trên
        if (typeMsg === _CONSTANTS.CONFIRM) {
            _confirm(contentMsg, titleMsg, callback);
        }
        else if (typeMsg === _CONSTANTS.SUCCESS) {
            _success(contentMsg, titleMsg, callback);
        }
        else if (typeMsg === _CONSTANTS.WARNING) {
            _warning(contentMsg, titleMsg, callback);
        }
        else if (typeMsg === _CONSTANTS.ERROR) {
            _error(contentMsg, titleMsg, callback);
        }
        else if (typeMsg === _CONSTANTS.INFO) {
            _info(contentMsg, titleMsg, callback);
        }
        else if (typeMsg === _CONSTANTS.ALERT) {
            _alert(contentMsg, titleMsg, callback);
        }
        else {
            _error('Có lỗi xảy ra, vui lòng thử lại', 'Error', callback);
        }
    };
    /**
     * ****************************************************************************
     * Hiển thị thông báo lỗi trên các item
     * ****************************************************************************
     */

    /**
     * Các tùy chọn hiển thị cho tooltip và message thông báo lỗi
     * @type {OptionsOfTooltipError}
     */
    var _optionsErrorTooltip = {
        xOffset: 10,
        yOffset: 0,
        tooltipId: 'has-tooltip-class',
        tooltipAttr: 'has-tooltip-message',
        styleError: 'item-error',
        parentOfItemError: 'have-error'
    };
    /**
     * Tạo thông báo lỗi cho đối tượng bị lỗi
     *
     * Author : QuyPN - 2018/07/08 - create
     * @param {string} message Thông báo lỗi dành cho đối tượng
     * @param {string} type Có thể có hoặc không, nếu không có, sẽ hiển thị dạng tooltip, nếu có sẽ hiển thị dạng text phía dưới
     * @returns {obiect} Các đối tượng HTML sau khi đã thêm thông báo lỗi
     */
    var _itemError = function (message, type) {
        try {
            //Duyệt các đối tượng lấy được theo selector
            return this.each(function (index, dom) {
                try {
                    message = StringModule.CastString(message);
                    // Nếu meassage tồn tại
                    if (message !== '') {
                        var style = _optionsErrorTooltip.styleError;
                        // Nếu item chưa có lỗi trước đó
                        if (!$(this).hasClass(style)) {
                            var typeErr = $(this).attr('type-err');
                            if (!StringModule.IsNullOrEmpty(typeErr)) {
                                type = typeErr;
                            }
                            else {
                                type = StringModule.CastString(type);
                            }
                            // Thêm style báo item lỗi vào đối tượng
                            // Điều chỉnh css cho phù hợp
                            $(this).addClass(style);
                            $(this).css({
                                'border': 'solid 1px #d9534f'
                            });
                            // Add tooltip để hiển thị nếu không truyền giá trị type
                            if (type === '') {
                                $(this).AddTooltip(message);
                            }
                            else {
                                // Nếu có giá trị của type, thêm thẻ <p> hiển thị thông báo lỗi phía dưới item.
                                var parent = $(this).parents('.' + _optionsErrorTooltip.parentOfItemError);
                                if (parent.length > 0) {
                                    parent.append('<p class="msg-err" style="color: #ce4844; margin-bottom: 0px;">' + message + '</p>');
                                }
                            }
                        }
                    }
                } catch (e) {
                    console.log('ItemError: ' + e.message);
                    return false;
                }
            });
        } catch (e) {
            console.log('ItemError: ' + e.message);
            return this.each(function (index, dom) {
            });
        }
    };
    /**
     * Thêm sự kiện hiển thị thông báo lỗi bằng tooltip khi focus hoặc đưa chuột vào item bị lỗi
     * hoặc xóa tooltip khi lostfocus hoặc đưa chuột ra khỏi item lỗi
     *
     * Author : QuyPN - 2018/07/08 - create
     * @param {string} message Thông báo lỗi dành cho đối tượng
     * @returns {obiect} Các đối tượng HTML sau khi đã thêm thông báo lỗi
     */
    var _addTooltip = function (message) {
        try {
            //Duyệt các đối tượng lấy được theo selector
            return this.each(function (index, dom) {
                try {
                    // Đưa nội dung thông báo lỗi vào attribute của đối towngj lỗi, sau đó cho đối tượng lắng nghe các sự kiện phù hợp
                    $(this).attr(_optionsErrorTooltip.tooltipAttr, message).mouseover(function (event) {
                        _tooltipMouseover(event, $(this));
                    }).focus(function (event) {
                        _tooltipMouseover(event, $(this));
                    }).mouseout(function (event) {
                        _tooltipMouseout(event, $(this));
                    }).blur(function (event) {
                        _tooltipMouseout(event, $(this));
                    });

                } catch (e) {
                    console.log('AddTooltip' + e.message);
                    return false;
                }
            });
        } catch (e) {
            console.log('AddTooltip' + e.message);
            return this.each(function (index, dom) {
            });
        }
    };
    /**
     * Xóa thông báo lỗi cho item
     *
     * Author : QuyPN - 2018/07/08 - create
     * @returns {obiect} Các đối tượng HTML sau khi đã xóa thông báo lỗi
     */
    var _removeError = function () {
        try {
            //Duyệt các đối tượng lấy được theo selector
            return this.each(function (index, dom) {
                try {
                    // Xóa các sự kiện liên quan
                    $(this).removeAttr(_optionsErrorTooltip.tooltipAttr).unbind('mouseover',
                        _tooltipMouseover).unbind('focus',
                        _tooltipMouseover).unbind('mouseout',
                        _tooltipMouseout).unbind('blur',
                        _tooltipMouseout);
                    $(this).css({
                        'border': ''
                    });
                    $(this).removeClass(_optionsErrorTooltip.styleError);
                    $('#' + _optionsErrorTooltip.tooltipId).remove();
                    // Xóa thông báo lỗi phía dưới
                    var parent = $(this).parents('.' + _optionsErrorTooltip.parentOfItemError);
                    if (parent.length > 0) {
                        parent.find('.msg-err').remove();
                    }
                } catch (e) {
                    console.log('RemoveToolTip: ' + e.message);
                    return false;
                }
            });
        } catch (e) {
            console.log('RemoveToolTip: ' + e.message);
            return this.each(function (index, dom) {
            });
        }
    };
    /**
     * xử lý hiển thị tooltip thông báo lỗi khi đưa chuột vào item bị lỗi
     *
     * Author : QuyPN - 2018/07/08 - create
     * @param {object} event Sự kiện mouseover
     * @param {object} object Đối tượng được đưa chuột vào
     */
    var _tooltipMouseover = function (event, object) {
        try {
            // Xóa tooltip đã hiển thị trước đó nếu tồn tại
            if ($('#' + _optionsErrorTooltip.tooltipId).length > 0) {
                $('#' + _optionsErrorTooltip.tooltipId).remove();
            }
            // Lấy nội dung thông báo lỗi bằng attribute trên chính item bị lỗi
            var tooltipMessage = StringModule.CastString(object.attr(_optionsErrorTooltip.tooltipAttr));
            // Nếu có tồn tại thông báo lỗi thì tiến hành hiển thị lên
            if (tooltipMessage !== '') {
                // Tạo 1 khối html chưa thông báo lỗi gắn vào body
                $('body').append(
                    '<p id="' + _optionsErrorTooltip.tooltipId + '"><span class="arrow"></span>' + tooltipMessage
                    + '</p>');
                // Tính toán vị trí xuất hiện tooltip cho đúng với item
                var erroutHeight = $('#' + _optionsErrorTooltip.tooltipId).outerHeight();
                var errHeight = $('#' + _optionsErrorTooltip.tooltipId).height();
                var errlineHeight = $('#' + _optionsErrorTooltip.tooltipId).css('line-height');
                var errorgHeight = parseInt(errlineHeight) + erroutHeight - errHeight;
                // Thêm các css cần thiết để tooltip hiển thị phù hợp
                $('#' + _optionsErrorTooltip.tooltipId).css({
                    'top': (object.offset().top - errorgHeight - 10) + 'px',
                    'left': (object.offset().left - errorgHeight + 20 + ($('#layout').val() === 'front' ? 4 : 0)) + 'px',
                    'position': 'absolute',
                    'z-index': '99998',
                    'color': '#fff',
                    'padding': '3px 10px',
                    'border-radius': '3px 4px 4px 3px',
                    'min-width': '100px',
                    'background-color': '#CE5454',
                    'white-space': 'nowrap',
                    'margin': '0 0 5px'
                });
                $('#' + _optionsErrorTooltip.tooltipId + ' .arrow').css({
                    'border-top': '5px solid #CE5454',
                    'border-right': '5px solid transparent',
                    'border-left': '5px solid transparent',
                    'content': '""',
                    'height': '0',
                    'left': '15px',
                    'position': 'absolute',
                    'bottom': '-4px',
                    'width': '0'
                });
                // Hiển thị tooltip lên
                var parent = object.parent();
                $('#' + _optionsErrorTooltip.tooltipId, parent).fadeIn(300,
                    null);
            }
        } catch (e) {
            console.log('_tooltipMouseover: ' + e.message);
        }
    };
    /**
     * Xử lý xóa tooltip thông báo lỗi khi đưa chuột ra khỏi item bị lỗi
     *
     * Author : QuyPN - 2018/07/08 - create
     * @param {object} event Sự kiện mouseout
     * @param {object} object Đối tượng được bị đưa chuột ra
     */
    var _tooltipMouseout = function (event, object) {
        try {
            var isFocus = $(object).is(":focus");
            if (!isFocus) {
                $('#' + _optionsErrorTooltip.tooltipId, object.parents('body')).remove();
            }
        } catch (e) {
            console.log('_tooltipMouseout: ' + e.message);
        }
    };
    /**
     * khởi tạo các flugin cho việc hiển thị thông báo lỗi
     *
     * author : QuyPN - 2018/07/08 - create
     */
    var InitItemError = function () {
        $.fn.ItemError = _itemError;
        $.fn.AddTooltip = _addTooltip;
        $.fn.RemoveError = _removeError;
    };
    // Trả về các function public cho người dùng sử dụng
    return {
        Alert: Alert,
        InitItemError: InitItemError,
        CONFIRM: _CONSTANTS.CONFIRM,
        SUCCESS: _CONSTANTS.SUCCESS,
        WARNING: _CONSTANTS.WARNING,
        ERROR: _CONSTANTS.ERROR,
        INFO: _CONSTANTS.INFO,
        ALERT: _CONSTANTS.ALERT,
        TOOLTIP_ID: _optionsErrorTooltip.tooltipId,
        TOOLTIP_ATTR: _optionsErrorTooltip.tooltipAttr,
        STYLE_ERROR: _optionsErrorTooltip.styleError
    };
})();
// Khởi tạo flugin hiển thị thông báo lỗi cho từng item
Notification.InitItemError();
