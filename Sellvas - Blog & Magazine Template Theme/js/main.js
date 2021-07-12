/*global $, alert, jquery, console*/

$(function () {
    
    'use strict'; // For Javascript Lint Error

    // Start Variables Definition Area
    var search_button = $(".navbar-default .navbar-collapse .navbar-right > li > button"),
        search_area   = $(".navbar-default .navbar-collapse .search-area"),
        navbar_link   = $(".navbar-default .navbar-collapse .nav"),
        owl           = $(".owl-carousel"),
        dropdown_menu = $(".dropdown-menus > .dropdown ul > li");
    // End Variables Definition Area
    
    // Start Search Area
    search_button.on("click", function () {
        // Add Class Active For Search Icon
        $(this).toggleClass("active");
        // Toggle Search Area
        search_area.toggleClass("search-area-active");
    });
    // End Search Area

    // Start Image Preview
    $(".home-content .container .row .side .post img").on("click", function () { 
        
        // Get Image Src And Add It To Image In Preview
        var attr = $(this).attr("src");
        $(".home-content > .overlay").fadeIn(300); 
        $(".home-content > .overlay").find("img").attr("src", attr);

    });

    $(".home-content > .overlay .fa-close").on("click", function () { $(".home-content > .overlay").fadeOut(300); });
    // End Image Preview

    // Start Search Area Style 2
    $(".search-area button").on("click", function () {

        $(".search-area input").fadeToggle(200);
        // Hide And Show Brtter Custom Badge
        $(".better-custom-badge").toggle();

    });
    // Small Screen Style
    $(".search-icon").on("click", function () {

        // Add Class Active To Menu Icon Or Remove It
        $(this).toggleClass("search-icon-active");

        $(".small-search-area").toggleClass("small-search-area-show");
        // If The Main Menu Is Open Then Close It When Click On Search Button
        $(".navbar-default .navbar-collapse").removeClass("in");

        $(".navbar-default .navbar-toggle").removeClass("collapsed");

        // Change Menu Icon To Close Icon Or The Reverse
        if ( $(".fa-navicon").hasClass("hidden-xs") ) 
            { $(".fa-navicon").toggleClass("hidden-xs").siblings().toggleClass("hidden-xs"); }

    });

    $(".navbar-default .navbar-toggle").on("click", function () {
        // If The Search Area Is Opend Then Close It When Click The Menu Button And Display The Menu
        $(".small-search-area").removeClass("small-search-area-show");
        // Change Menu Icon To Close Icon Or The Reverse
        $(".fa-navicon").toggleClass("hidden-xs").siblings().toggleClass("hidden-xs");

    });
    // End Search Area Style
    
    // Start Review Navbar Content
    navbar_link.find("li").on("mouseenter", function () {
        // Add Class Active For Navbar Hovered Link And Remove It From Other Links
        $(this).addClass("active").siblings(":not(:contains('home'))").removeClass("active");
    });
    
    navbar_link.on("mouseleave", function () {
        // Remove Class Active From All Links On Mouse Leave
        $(this).children(":not(:contains('home'))").removeClass("active");
    });
    
    // Start Navbar Dropdown 
    dropdown_menu.on("mouseenter", function () {
        // Show Hidden Menu
        $(this).find("ul").fadeIn(200);
    });
    
    dropdown_menu.on("mouseleave", function () {
        // Hide The Menus On Mouse Leave
        $(this).find("ul").hide();
    });
    // End Navbar Dropdown 

    $('[data-toggle="tooltip"]').tooltip(); // Tooltip On Random Icon Hover
    
    $("#tab-list > li").on("click", function () {
        // Get The Id From The Clicked Tab And Cache It In ( tab_id ) Variable
        var tab_id = $(this).find("a").attr("id");
        // Add Class ( active-tab ) To The Active Li And Remove It From Others
        $(this).addClass("active-tab").siblings().removeClass("active-tab");
        // Hide All Content On Click The Li
        $(".tab-content > .content").hide();
        // Show The Right Content Of The Li That Clicked
        $("#" + tab_id + "-content").fadeIn(600);
    });
    // End Review Navbar Content
    
    //  Start Review Navbar Content Carousel
    owl.owlCarousel({
        autoPlay: 6000,
        stopOnHover: true,
		navigation: true,
        navigationText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
        items : 4, //4 items above 768px browser width
        itemsDesktop : [768, 3] //3 items between 0px and 768px
    });
 
    // Custom Navigation Events
    $(".next").click(function () {
        owl.trigger('owl.next');
    });
    
    $(".prev").click(function () {
        owl.trigger('owl.prev');
    });
    //  End Review Navbar Content Carousel
    
    //  Start Fashion Load More
    $(".fashion .load-more").on("click", function () {
        
        $(".fashion .hide-element").fadeIn(600); // Show The Hidden Elements
        
        $(this).hide(); // Hide The Button
        
    });
    //  End Fashion Load More
    
    //  Start Recent Posts Load More
    $(".recent-posts .load-more").on("click", function () {
        
        $(".recent-posts .hide-element").fadeIn(600); // Show The Hidden Elements
        
        $(this).hide(); // Hide The Button
        
    });
    //  End Recent Posts Load More

    //  Start Information & Technology Posts Load More
    $(".info-and-tech .load-more").on("click", function () {
        
        $(".info-and-tech .hide-element").fadeIn(600); // Show The Hidden Elements
        
        $(this).hide(); // Hide The Button
        
    });
    //  End Information & Technology Posts Load More
    
    // Start Go To Top button
    $(window).on("scroll", function () {
        
        if ($(this).scrollTop() >= 300) {
            // Show the Button
            $(".go-to-top").show();
            
        } else {
            // hide the Button
            $(".go-to-top").hide();
            
        }
        
    });
    
    $(".go-to-top").on("click", function () {
        // Scroll To Top Ease
        $("html, body").animate({ scrollTop: 0 }, 800);
        
    });
    // End Go To Top button

    if ( $(window).width() < 992 ) { 
        // News Arabic RTL Style
        if ( $(".breaking-news").hasClass("rtl") ) { $(this).find(".container .breaking .title").text("الاخبار") }
        // If The Size Of Screen Less Than 992px Change The Title To News
        else { $(".breaking-news .container .breaking .title").text("News");  }

    } else {
        // News Arabic RTL Style
        if ( $(".breaking-news").hasClass("rtl") ) { $(this).find(".container .breaking .title").text("اخر الاخبار") }
        // If Else Change The Title To Breaking News :)
        else { $(".breaking-news .container .breaking .title").text("Breaking News");  }
    }

    $(window).on("resize", function () {

        if ( $(window).width() < 992 ) { 
            // News Arabic RTL Style
            if ( $(".breaking-news").hasClass("rtl") ) { $(this).find(".container .breaking .title").text("الاخبار") }
            // If The Size Of Screen Less Than 992px Change The Title To News
            else { $(".breaking-news .container .breaking .title").text("News");  }

        } else {
            // News Arabic RTL Style
            if ( $(".breaking-news").hasClass("rtl") ) { $(this).find(".container .breaking .title").text("اخر الاخبار") }
            // If Else Change The Title To Breaking News :)
            else { $(".breaking-news .container .breaking .title").text("Breaking News");  }
        }
    });

    // Start Breaking News On Demo 3
    if ( $(".news").hasClass("rtl") ) {

        $(".news > a").typed({
            strings: [ "هذا النص هو مثال للنص ويمكن استبداله باي نص يشغل المساحة ذاتها وتم توليده عشوائيا باللغة العربية" ],
            loop: true,
            showCursor: false,
            backDelay: 3500,
            typeSpeed: '-.5', backSpeed: '-.5'
        });

    } else {

        $(".news > a").typed({
        strings: [
            "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod", 
            "Tempor incididunt ut labore et dolore magna aliqua",
            "Ut enim ad minim veniam quis nostrud exercitation",
            "Ullamco laboris nisi ut aliquip ex ea commodo consequat",
            "Excepteur sint occaecat cupidatat non proident",
            "Sunt in culpa qui officia deserunt mollit anim id est laborum"
        ],
        loop: true,
        showCursor: false,
        backDelay: 3500,
        typeSpeed: '-.5', backSpeed: '-.5'
    });

    }
    // End Breaking News On Demo 3

});