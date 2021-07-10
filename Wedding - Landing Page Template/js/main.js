/*global $, alert, jquery, console*/

// Start Main Function
$(function () {

 	'use strict'; // For Javascript Lint Error

    var the_window = $(window),          // Variable Runs To The Window
        go_to_top  = $('.go-to-top');    // Go To Top Button

    the_window.on("load", function () { $('.loader').fadeOut(); }); // Page Loader
    
    $('.parallax-container').parallax(); // Init Parallax

    counterDown(); // Call Counter Down Function 

    // Call Sizing Function
    the_window.on('resize', function () { sizing (); });
    sizing ();

    // Init About Carousel
    $('#about-slider').owlCarousel({
        slideSpeed : 500,
        autoPlay : true,
        singleItem : true,
        transitionStyle : "fadeUp",
        pagination : false,
        navigation : false
    });

    // Init Wishes Carousel
    $('#wishes-slider').owlCarousel({
        slideSpeed : 500,
        autoPlay : true,
        singleItem : true,
        navigation : false
    });

    // Go To Top Button
    (the_window.scrollTop() >= 300) ? go_to_top.fadeIn(200) : go_to_top.fadeOut(200);
    the_window.on('scroll', function () { ($(this).scrollTop() >= 300) ? go_to_top.fadeIn(200) : go_to_top.fadeOut(200); });
    go_to_top.on('click', function () { $("html, body").animate({ scrollTop: 0 }, 800); });

});
// End Mian Function

// Start Sizing Function
function sizing () { 
    $('.about .item').height($('.about-img').width() - 20);                       // The Height Of Carousel Item Equal To Width
    $('.about-date .inside').height($('.about-date').width());                    // The Height Of Date Equal To Width
    $('.location .map .inside').height($('.map').width() - 20);                   // The Height Of The Map Equal To Width
    $('.about-date .inside').css({ lineHeight: $('.about-date').width()+'px' });  // About Date Line Height
}
// End Sizing Function

// Start Counter Down Function 
function counterDown() {
    var now          = new Date(),                         // The Real Date
        wedding_date = new Date(2022, 4, 30);              // The Wedding Date

    var current_time = now.getTime(),                      // The Real Time
        wedding_time = wedding_date.getTime();             // The Wedding Time

    var the_time     = wedding_time - current_time;        // The Time Between The Real One And The Wedding Time

    var seconds      = Math.floor(the_time / 1000),        // Get The Number Of Seconds
        minutes      = Math.floor(seconds / 60),           // Get The Number Of Minutes
        hours        = Math.floor(minutes / 60),           // Get The Number Of Hours
        days         = Math.floor(hours / 24);             // Get The Number Of Days

    hours %= 24; minutes %=60; seconds %=60;

    hours = ( hours < 10 ) ? '0' + hours : hours;
    minutes = ( minutes < 10 ) ? '0' + minutes : minutes;
    seconds = ( seconds < 10 ) ? '0' + seconds : seconds;

    document.getElementById('days').textContent = days;
    document.getElementById('days').innerText = days;

    // Put The Elements Values To Screen
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    setTimeout(counterDown, 1000);
}
// End Counter Down Function 