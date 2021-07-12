/*global $, alert, jquery, console*/
let country_open = false; // We need this variable global to used in many functions

/* =============================================================== */
/*                   Start website main function                   */
/* =============================================================== */

$(function () {

 	'use strict'; // For Javascript Lint Error

 	// Variables Definition Area
	var sections     = "section",
		login_show   = false,
		pass_visible = false,
	    navbar     	 = $(".navbar"),
	    html_body    = $("html, body"),
	    nav_height   = navbar.outerHeight(),
	    nav_offset   = navbar.offset().top,
	    the_window   = $(window),
	    countries    = $('.statistics .container .countries'),
	    user_country = 'Worldwide';

	new WOW().init(); // Fire WOW JS

	$(document).ready(function() { $('.loader').fadeOut(); });

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

			var top    = $(this).offset().top - nav_height,
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
	navbar.find("a").on("click", function (event) {

		// Open and close login form
		if( $(this).hasClass('corona-button') ) {
			event.preventDefault();
			if( login_show ) {
				$(this).removeClass('active');
				$(this).blur();
				$('#login-form').fadeOut(); 
				login_show = false;
			} else {
				$(this).addClass('active');
				$('#login-form').fadeIn(); 
				login_show = true;
			}
		} else {
			var id = $(this).attr("href");
			// Scroll To The Top Of Section
			html_body.animate({ scrollTop: $(id).offset().top - (nav_height - 10) }, 800);
			
			// Hide Login form on click a link
			$(this).removeClass('active');
			$(this).blur();
			$('#login-form').fadeOut(); 
			login_show = false;
		}

	});

	// Hide or show placehoder function
    $('input:not([name="filter-country"])').on('focus', function () {
    	$(this).attr('data-text', $(this).attr('placeholder')); // Get placeholder text to save it when hide
    	$(this).attr('placeholder', '');                        // Hide the placeholder on focus
    }).on('blur', function () {
    	$(this).attr('placeholder', $(this).attr('data-text')); // Show placeholder on blur  
    });

    // Password show or hide on click eye icon in the input
    $('.show-password').on('click', function () {
        if(pass_visible) {
            $(this).find('i').removeClass('ion-eye').addClass('ion-eye-disabled');
            $('input[name="password"]').attr('type', 'password'); 
            pass_visible = false;
        } else {
            $(this).find('i').removeClass('ion-eye-disabled').addClass('ion-eye');
            $('input[name="password"]').attr('type', 'text'); 
            pass_visible = true;
        }
    });

    // Fire Nice Scroll & Set Options country_open
 	countries.niceScroll({ cursorcolor: 'transparent', cursorwidth: '1px', cursorborder: 'none', background: 'transparent' });

 	// View or hide country list
 	$('.select-country').on('click', function() { 
 		if(country_open) {
 			countries.slideUp(); 
 			country_open = false;
 			resetCountryList();
 		} else {
 			countries.slideDown(); 
			country_open = true;
 		}
 	});

 	// Close filter after search or select country
 	$('.filter-box .ion-android-close').on('click', function() { 
 		countries.slideUp(); 
 		country_open = false;
 		resetCountryList();
 	});
 	
 	createCountryList();       // Create country list function call
 	filterCountries()          // Call filter countries function	
	
	// Call Fetch Data function every 5 minute to update Data from API
	setInterval(fetchData( user_country ), 300000);

 });

/* =============================================================== */
/* Start working with the API to get the data to statstics section */
/* =============================================================== */

// Variables definition area for store data
let confirmed_cases_list = [], recovered_cases_list = [], totla_deaths_list = [];

// Start fetching data from API using user country
function fetchData( user_country ) {
	$('.statistics .container .countries').slideUp();
	country_open = false;
	resetCountryList();
	let statistic_link = ( user_country == 'Worldwide' ) ? "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php" : "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=" + user_country;
	// Reset arrays every time we change country to remove old country data
	confirmed_cases_list = []; recovered_cases_list = []; totla_deaths_list = [];
	// Fetch the date from the API
	$.ajax({ url: statistic_link, method: 'GET', headers: { "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com", "x-rapidapi-key": "3b53e90291mshca4464fb0bd396fp1ccd13jsn48e82d0e1337" },
		success: function(data) {
			let convertedData = JSON.parse(data);
			if( user_country == 'Worldwide' ) {
				confirmed_cases_list.push(convertedData.total_cases);
				recovered_cases_list.push(convertedData.total_recovered);
				totla_deaths_list.push(convertedData.total_deaths);
			} else {
				confirmed_cases_list.push(convertedData.latest_stat_by_country[0].total_cases);
				recovered_cases_list.push(convertedData.latest_stat_by_country[0].total_recovered);
				totla_deaths_list.push(convertedData.latest_stat_by_country[0].total_deaths);
			}
			updateStatistics( user_country ); 			  // Update Frontend UI
		}, error: function(error) { console.log(error); } // Handle server errors
	});
}

// Update statistics in the interface function
function updateStatistics( user_country ) {
	// Start Update data in the UI
	$('.statistics .country .country-name').html(user_country);
	$('.statistics .country-stats .confirmed-cases').html(confirmed_cases_list);
	$('.statistics .country-stats .recovered-cases').html(recovered_cases_list);
	$('.statistics .country-stats .total-deaths').html(totla_deaths_list);

	// Update next section text ( number of deaths in threats section )
	if( user_country == 'Worldwide' ) {
		let number_of_deaths = totla_deaths_list.toString().split(',');
		$('.world-deaths').html(number_of_deaths[0]);
	}
	// Counter Up To A Number In Statistics Section
	$('.counter').counterUp({ delay: 10, time: 1000 });
}