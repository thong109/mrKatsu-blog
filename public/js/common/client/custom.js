/*
Template:Gymster-Fitness and Gym HTML5 Template
Author: peacefulqode.com
Version: 1.0
Design and Developed by: Peaceful Qode
NOTE: This is main javasctipt file of template.
*/
/*====================================
[  Table of contents  ]
======================================
==> Page Loader
==> Search Button
==> Sidebar Toggle
==> Sticky Header
==> Owl Carousel
==> Counter
==> Masonry
==> Progress Bar
==> Accordion
==> Back To Top
======================================
[ End table content ]
======================================
*/
(function(jQuery) {
"use strict";
jQuery(window).on('load', function(e) {
// var Scrollbar = window.Scrollbar;
// console.log('Scrollbar');
/*------------------------
Page Loader
--------------------------*/
jQuery("#pt-loading").fadeOut();
jQuery("#pt-loading").delay(0).fadeOut("slow");
/*------------------------
Search Button
--------------------------*/
jQuery('#pt-seacrh-btn').on('click', function() {
jQuery('.pt-search-form').slideToggle();
jQuery('.pt-search-form').toggleClass('pt-form-show');
if (jQuery('.pt-search-form').hasClass("pt-form-show")) {
jQuery(this).html('<i class="fa fa-times"></i>');
} else {
jQuery(this).html('<i class="fa fa-search"></i>');
}
});
/*------------------------
Sidebar Toggle
--------------------------*/
jQuery("#pt-toggle-btn").on('click', function() {
jQuery('#pt-sidebar-menu-contain').toggleClass("active");
});
jQuery('.pt-toggle-btn').click(function() {
jQuery('body').addClass('pt-siderbar-open');
});
jQuery('.pt-close').click(function() {
jQuery('body').removeClass('pt-siderbar-open');
});

	/*------------------------
				Sticky Header
	--------------------------*/


		if (jQuery('header').hasClass('pt-has-sticky')) {
			var height = jQuery('header').height();
			jQuery('.pt-breadcrumb').css('padding-top', height * 2 - 52);

			jQuery(window).scroll(function () {

				var scrollTop = jQuery(window).scrollTop();

				if (scrollTop >= 100) {
					jQuery('header').addClass('pt-header-sticky animated fadeInDown animate__faster');


				} else {

					jQuery('header').removeClass('pt-header-sticky animated fadeInDown animate__faster');


				}
			});
		}
/*------------------------
Owl Carousel
--------------------------*/
jQuery('.owl-carousel').each(function() {
var app_slider = jQuery(this);
app_slider.owlCarousel({
items: app_slider.data("desk_num"),
loop: app_slider.data("loop"),
margin: app_slider.data("margin"),
nav: app_slider.data("nav"),
dots: app_slider.data("dots"),
autoplay: app_slider.data("autoplay"),
autoplayTimeout: app_slider.data("autoplay-timeout"),
navText: ["<i class='ion-ios-arrow-back'></i><span></span>", "<span></span><i class='ion-ios-arrow-forward'></i>"],
responsiveClass: true,
responsive: {
// breakpoint from 0 up
0: {
items: app_slider.data("mob_sm"),
nav: false
},
// breakpoint from 480 up
480: {
items: app_slider.data("mob_num"),
nav: false
},
// breakpoint from 786 up
786: {
items: app_slider.data("tab_num")
},
// breakpoint from 1023 up
1023: {
items: app_slider.data("lap_num")
},
1199: {
items: app_slider.data("desk_num")
}
}
});
});
/*----------------
Counter
---------------------*/
jQuery('.timer').countTo();
/*------------------------
Accordion
--------------------------*/
jQuery('.pt-accordion-block .pt-accordion-box .pt-accordion-details').hide();
jQuery('.pt-accordion-block .pt-accordion-box:first').addClass('pt-active').children().slideDown('slow');
jQuery('.pt-accordion-block .pt-accordion-box').on("click", function () {
if (jQuery(this).children('div.pt-accordion-details').is(':hidden')) {
jQuery('.pt-accordion-block .pt-accordion-box').removeClass('pt-active').children('div.pt-accordion-details').slideUp('slow');
jQuery(this).toggleClass('pt-active').children('div.pt-accordion-details').slideDown('slow');
}
});


	/*----------------
		Masonry
		   ---------------------*/
		jQuery('.pt-masonry').isotope({
			itemSelector: '.pt-masonry-item',
			masonry: {
				columnWidth: '.grid-sizer',
				gutter: 0

			}

		});

		jQuery('.pt-grid').isotope({
			itemSelector: '.pt-grid-item',
		});

		jQuery('.pt-filter-button-group').on('click', '.pt-filter-btn', function () {

			var filterValue = jQuery(this).attr('data-filter');
			jQuery('.pt-masonry').isotope({
				filter: filterValue
			});
			jQuery('.pt-grid').isotope({
				filter: filterValue
			});
			jQuery('.pt-filter-button-group .pt-filter-btn').removeClass('active');
			jQuery(this).addClass('active');


		});

		var initial_items = 5;
		var next_items = 3;

		if (jQuery('.pt-masonry').length > 0) {
			var initial_items = jQuery('.pt-masonry').data('initial_items');
			var next_items = jQuery('.pt-masonry').data('next_items');
		}

		if (jQuery('.pt-grid').length > 0) {
			var initial_items = jQuery('.pt-grid').data('initial_items');
			var next_items = jQuery('.pt-grid').data('next_items');
		}

		
/*------------------------
Back To Top
--------------------------*/
jQuery('#back-to-top').fadeOut();
jQuery(window).on("scroll", function() {
if (jQuery(this).scrollTop() > 250) {
jQuery('#back-to-top').fadeIn(1400);
} else {
jQuery('#back-to-top').fadeOut(400);
}
});
jQuery('#top').on('click', function() {
jQuery('top').tooltip('hide');
jQuery('body,html').animate({
scrollTop: 0
}, 800);
return false;
});
jQuery('.pt-circle-progress-bar').each(function() {
var number = jQuery(this).data('skill-level');
var empty_color = jQuery(this).data('empty-color');
var fill_color = jQuery(this).data('fill-color');
var size = jQuery(this).data('size');
var thickness = jQuery(this).data('thickness');
jQuery(this).circleProgress({
value: '0.' + number,
size: size,
emptyFill: empty_color,
fill: {
color: fill_color
}
}).on('circle-animation-progress', function(event, progress) {
jQuery(this).find('.pt-progress-count').html(Math.round(number * progress) + '%');
});
}); 
jQuery('.pt-progressbar-box > span').each(function() {
var progress_bar = jQuery(this);
var width = jQuery(this).data('percent');
progress_bar.css({
'transition': 'width 2s'
});
jQuery('.progress-value').css({'transition': 'margin 2s'});
setTimeout(function() {
jQuery(this).show(function() {
progress_bar.css('width', width + '%');
});
}, 500);
setTimeout(function() {
jQuery('.pt-progressbar-style-1 .progress-value').show(function() {
jQuery('.pt-progressbar-style-1 .progress-value').css('margin-left', width + 'px');
});
}, 500);
setTimeout(function() {
jQuery('.pt-progressbar-style-3 .progress-tooltip').show(function() {
jQuery('.pt-progressbar-style-3 .progress-tooltip').css('margin-left', width + 'px');
});
}, 500);
});
});
})(jQuery);
$(".pt-progressbar-content .show-progress").each(function() {
$(this).animate({
width: $(this).attr("data-percent") + "%",
},
1000
);
});