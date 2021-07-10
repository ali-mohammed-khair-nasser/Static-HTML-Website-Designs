/*global $, alert, jquery, console*/

$(function () {

  'use strict'; // For Javascript Lint Error

  // Variables Definition Area
  var sections   = "section",
      navbar     = $(".navbar"),
      html_body  = $("html, body"),
      nav_height = navbar.outerHeight(),
      nav_offset = navbar.offset().top,
      the_window = $(window);

  // Start Main Carousel
  $("#main-slider").owlCarousel({ 
    autoPlay: true,
    stopOnHover: true,
    singleItem: true,
    pagination: false,
    transitionStyle: "fade"
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

    $(sections).each( function() {

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

  // Testimonials Carousel
  $( ".testimonials .items" ).owlCarousel({
    autoPlay: 3000,
    stopOnHover: true,
    navigation: false,
    singleItem:true,
    transitionStyle: "fade"
  });

  $('.contact .map i').on('click', function () {

    $(this).toggleClass('open');
    $('.contact .map').toggleClass('opening');

  });

});