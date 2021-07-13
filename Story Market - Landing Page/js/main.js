/*global $, alert, jquery, console*/

$(function () {

 	'use strict'; // For Javascript Lint Error

 	var heart = true; // Check the heart icon clicked or not

    // Main Slider
 	$("#main-slider").owlCarousel({ autoPlay: true, stopOnHover: true, pagination: false, singleItem: true, transitionStyle: 'fade' });

 	// Make the heart icon fill or empty when mouse click
 	$('.love i').on('click', function() {
 		if(heart) {
    		$(this).removeClass('ion-ios-heart-outline').addClass('ion-ios-heart'); heart = false;
    	} else {
    		$(this).removeClass('ion-ios-heart').addClass('ion-ios-heart-outline'); heart = true;
    	}
 	});

 });