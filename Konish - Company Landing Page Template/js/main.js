/*global $, alert, jquery, console*/

$(function () {

  'use strict'; // For Javascript Lint Error

  var sections   = $("section"),
  navbar     = $(".navbar"),
  nav_height = navbar.outerHeight(),
  nav_offset = navbar.offset().top,
  the_window = $(window);

  // Display Close Icon If The Menu Opened And Hide It When Menu Closed
  $(".navbar-toggle").on("click", function () {

    // Add Class Hidden To Icon And Remove It From Siblings Icons
    $(".fa-navicon").toggleClass("hidden-xs").siblings().toggleClass("hidden-xs");

  });

  // Make The Navbar Fixed To The Top Of Layout
  navbar.wrap('<div class="nav-placeholder"></div>');

  $(".nav-placeholder").height(nav_height);

  // Add Class Fixed To The Navbar
  if( the_window.scrollTop() >= the_window.height() ) navbar.addClass("fixed");

  $('.parallax-container').parallax(); // Fire Parallax

  // Navbar Fixed And Links Active Class On Scroll
  the_window.on("scroll", function () {

    var scroll_position = $(this).scrollTop();
    // Add Or Remove Class Fixed To The Navbar
    scroll_position >= nav_offset || scroll_position >= the_window.height() ? 
    navbar.addClass("fixed") : navbar.removeClass("fixed");

    sections.each( function() {

      var top    = $(this).offset().top - nav_height -1,
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

  // Make The Map Scroll Off On Scroll Page 
  $('.contact-us .map').on("click", function () {

      $(this).find('iframe').addClass('clicked');

  }).on("mouseleave", function () {

      $(this).find('iframe').removeClass('clicked');
  });

  // Navbar Active Class On Click
  navbar.find("a").on("click", function () {

    var id = $(this).attr("href");
    // Scroll To The Top Of Section
    $("html, body").animate({ scrollTop: $(id).offset().top - nav_height }, 500);
    
  });

  $(".filter").on("click", function () {
    // Add Class Active To Active Tab And Remove It From Others
    $(this).addClass("active").siblings().removeClass("active");

  });

  $("#work").mixItUp(); // Mix The Works Categorys

  $(".map").height($(".form").height()); // Make The Height Of Mape Equal To Contact Area Height

  the_window.on("load", function () { $(".loader").fadeOut(); }); // Page Loader

  // Start Go To Top button
  the_window.on("scroll", function () {
    // Show Or Hide The Button
    $(this).scrollTop() >= 300 ? $(".go-to-top").show() : $(".go-to-top").hide();

  });

  $(".go-to-top").on("click", function () {
    // Scroll To Top Ease On Click
    $("html, body").animate({ scrollTop: 0 }, 800);

  });
  // End Go To Top button

});