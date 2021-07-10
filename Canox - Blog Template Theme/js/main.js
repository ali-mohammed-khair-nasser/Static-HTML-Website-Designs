/*global $, alert, jquery, console*/

$(function () {

 	'use strict'; // For Javascript Lint Error

    $(window).on("load", function () { $(".loader").fadeOut(); }); // Page Loader

 	// Main Slider
 	$("#main-slider").owlCarousel({ autoPlay: true, stopOnHover: true, pagination: false, items : 4, itemsDesktop : [768, 3] });

    // Sidedar Slider
 	$(".slide").owlCarousel({ autoPlay: true, stopOnHover: true, pagination: false, items : 1, itemsDesktop : [768, 1], itemsDesktopSmall: [980, 1] });

    // Related Posts Slider
    $("#related-carousel").owlCarousel({ autoPlay: true, pagination: false, items : 4, itemsTablet: [980, 3] });

    // Gellary Post Large Slider
    $("#gellary-post-large").owlCarousel({ autoPlay: true, pagination: false, items : 1, transitionStyle: "fadeUp", navigation: true, itemsDesktop : [768, 1], itemsDesktopSmall : [980, 1],
    navigationText: ["<i class='ion-ios-arrow-left' style='font-size: 2em;'></i>", "<i class='ion-ios-arrow-right' style='font-size: 2em;'></i>"], itemsTablet: [768,1] });

    // Gellary Post Small Slider
    $("#gellary-post-small").owlCarousel({ autoPlay: true, pagination: false, items : 1, navigation: true, itemsDesktop : [768, 1], itemsDesktopSmall : [980, 1],
    navigationText: ["<i class='ion-ios-arrow-left' style='font-size: 1.5em;'></i>", "<i class='ion-ios-arrow-right' style='font-size: 1.5em;'></i>"], itemsTablet: [768,1] });

    // Variable Definition Area
    var left_post   = $('.left-post'),
        right_post  = $('.right-post'),
        screen_over = $(".screen-overlay"),
        related     = $("#related-carousel"),
        the_height  = left_post.height() - 30;

    // Make The Height Of Left Post Equal To Right Post Height
    right_post.height(the_height); left_post.height(the_height);

	// Custom Navigation Events
	$(".next").click(function(){ related.trigger('owl.next'); })
	$(".prev").click(function(){ related.trigger('owl.prev'); })

    // Post Image Preview
    $(".post img").on("click", function () { 
        
        // Get Image Src And Add It To Image In Preview
        var attr = $(this).attr("src");
        screen_over.fadeIn(300); 
        screen_over.find("img").attr("src", attr);

    });

    // Post Video Preview
    $(".video-post .overlay").on("click", function () { screen_over.fadeIn(300); });
    $(".screen-overlay .fa-close").on("click", function () { screen_over.fadeOut(300); });

    // Main Navbar Collapse
    $( '.main-nav .open-menu' ).on( 'click', function() {
        $( '.main-nav nav > ul' ).slideToggle( 300 );                                    // Hide Or Show Navbar Dropdown
        $(".fa-navicon").toggleClass("hidden-xs").siblings().toggleClass("hidden-xs");   // Change Navbar Icon
    });

    $( '.main-nav ul li.sub' ).on( 'click', function() {
        $(this).children( 'ul' ).slideToggle( 300 );   // Hide Or Show Child Dropdwon
        $(this).toggleClass( 'minus' );                // Change Childe Icon
    });

    $( '.main-nav ul li.sub ul, .main-nav ul li.sub a' ).on( 'click', function(e) { e.stopPropagation(); });

    $('.video-post .post-image .play-button').on('click', function () {

        $(this).fadeOut();
        $('.large-post .overlay-right').css('transform', 'translateX(100%)');
        $('.video-post .post-image .fa-close').delay(400).fadeIn();
        $('.video-post .post-image iframe').fadeIn();

    });

    $(".video-post .post-image .fa-close").on("click", function () { 

        $(this).fadeOut();
        $('.large-post .overlay-right').css('transform', 'translateX(0)');
        $('.video-post .post-image .play-button').fadeIn();
        $('.video-post .post-image iframe').fadeOut();

    });

 });