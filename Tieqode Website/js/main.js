/*global $, alert, jquery, console*/

$(function () {

 	'use strict'; // For Javascript Lint Error

 	// Variables Definition Area
	var sections   = "section",
		navbar     = $(".navbar"),
		nav_height = navbar.outerHeight(),
		nav_offset = navbar.offset().top,
		the_window = $(window),
		go_to_top  = $(".go-to-top"),
		html_body  = $("html, body");

    the_window.on("load", function () { $(".loader").fadeOut(); }); // Page Loader

    $('.arabic-view').on('click', function() { $('#arabic-form-style').fadeIn(); });

	$('#arabic-form-style .inner-wrap .close-icon').on('click', function() { $('#arabic-form-style').fadeOut(); });

	$('.not-availabe').on('click', function() { $('#not-availabe-form-style').fadeIn(); });

    $('#not-availabe-form-style .inner-wrap .close-icon').on('click', function() { $('#not-availabe-form-style').fadeOut(); });

    $( '[data-toggle="tooltip"]' ).tooltip(); // Fire ToolTip

	// Display Close Icon If The Menu Opened And Hide It When Menu Closed
	$(".navbar-toggle").on("click", function () {

		// Add Class Hidden To Icon And Remove It From Siblings Icons
		$(".ion-android-menu").toggleClass("hidden-xs").siblings().toggleClass("hidden-xs");

	});

	// Make The Navbar Fixed To The Top Of Layout
	navbar.wrap('<div class="nav-placeholder"></div>');

	$(".nav-placeholder").height(nav_height);

	// Add Class ( navbar-fixed-style ) To The Navbar
	( the_window.scrollTop() > 0 ) ? navbar.addClass("navbar-fixed-style") : navbar.removeClass("navbar-fixed-style");

	// Navbar Fixed Style And Links Active Class On Scroll
	the_window.on("scroll", function () {

		var scroll_position = $(this).scrollTop();

		( the_window.scrollTop() > 0 ) ? navbar.addClass("navbar-fixed-style") : navbar.removeClass("navbar-fixed-style");

		$(sections + ', header').each( function() {

			var top    = $(this).offset().top - nav_height - 6,
				bottom = top + $(this).outerHeight(),
				id     = $(this).attr("id");

			if ( scroll_position >= top && scroll_position <= bottom ) {
				// Remove Class Active From Other Links
				navbar.find("a").removeClass("active");

				// Add Class Active To The Section And Remove It From Other Sections
				$(this).addClass("active").siblings().removeClass("active");
				// Add Class Active To The Navbar Link Of This Section
				navbar.find('a[href="#' + id + '"]').addClass("active");
			}
		});

	});

	// Navbar Active Class On Click
	navbar.find("a").on("click", function () {

		var id = $(this).attr("href");
		// Scroll To The Top Of Section
		html_body.animate({ scrollTop: $(id).offset().top - ( nav_height - 6 ) }, 800);

	});

	$('.inner-wrap').find("a").on("click", function () {

		var id = $(this).attr("href");
		// Scroll To The Top Of Section
		html_body.animate({ scrollTop: $(id).offset().top - ( nav_height - 6 ) }, 800);

	});

	$('.team-features .items .item').height($('.team-features .items .item:first-of-type').height()); // Make Height Equal To Another Siblings

	$('.other-works').parallax({imageSrc: './img/parallax-2.jpeg'});  // Fire Parallax For Testimonial Section

	$('.testimonial').parallax({imageSrc: './img/parallax.jpg'});  // Fire Parallax For Testimonial Section

	// Testimonials Carousel
	$( ".testimonial .items" ).owlCarousel({
		autoPlay: 3000,
		stopOnHover: true,
		navigation: false,
		singleItem:true
	});

 	$('.contact').parallax({imageSrc: './img/parallax-2.jpeg'});       // Fire Parallax For Contact Us Section
	$('.contact-form').height($('.contact-info').height());        // Make The Height Of Contact Form Equal To Contact Info Area

	// Show The Map On Click On ( Show Our Location )
 	$('#map').on('click', function () {
 		$('.map').fadeIn();
 	});

 	// Show The Map On Click On ( Close Map Button )
 	$('.close-map').on('click', function () {
 		$('.map').fadeOut();
 	});

	// Start Go To Top button
    the_window.on("scroll", function () {
        
        ($(this).scrollTop() >= 300) ? go_to_top.show() : go_to_top.hide();
        
    });
    
    go_to_top.on("click", function () {
        // Scroll To Top Ease
        html_body.animate({ scrollTop: 0 }, 800);
        
    });
    // End Go To Top button
});

$(function () {

     // Work Details Image Slider
	$( "#owl-theme-img" ).owlCarousel({
		stopOnHover: true,
		navigation: false,
		singleItem:true,
		transitionStyle: "fade"
	});

	$('.team-member .education .edu').height() = $('.team-member .education .lang').height();  // Make Height Equal To Another Siblings

});