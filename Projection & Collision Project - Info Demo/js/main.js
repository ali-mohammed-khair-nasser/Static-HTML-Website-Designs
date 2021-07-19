/*global $, alert, jquery, console*/

$(function () {

 	'use strict'; // For Javascript Lint Error

	$("#introSlider").owlCarousel({ 
		autoPlay: true,  
		items : 1, 
		transitionStyle: "fadeUp"
	});

	$('.intro a, .more-about .LearnMore a').on('click', function () {

		var id = $(this).attr('href');
		// Scroll To The Top Of Section
		$('html, body').animate({ scrollTop: $(id).offset().top }, 800);

	});

	$("html").niceScroll({
    	cursorcolor: 'transparent', cursorwidth: '1px',
    	cursorborder: 'none', background: 'transparent'
    });

 });