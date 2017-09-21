jQuery(window).on("load", function() {
    "use strict";
    var homeSlider = jQuery('#slider');
    if (homeSlider.length > 0) { homeSlider.flexslider({ directionNav: false, controlNav: true, animation: homeSlider.data('animation'), direction: homeSlider.data('direction'), slideshow: homeSlider.data('slideshow'), slideshowSpeed: homeSlider.data('slideshowspeed'), animationSpeed: homeSlider.data('animadtionspeed'), start: function(slider) { slider.removeClass('loading'); } }); }
    jQuery(".room-slider").flexslider({ prevText: '', nextText: '', controlNav: false });
});
jQuery(document).ready(function($) {
    "use strict";
    var mainNav = $('.navigation');
    var mobileNavContainer = $('#mobilemenu');
    var mobileNav = mainNav.clone().removeClass();;
    mobileNav.find('li').removeAttr('id').removeClass();
    mobileNav.appendTo(mobileNavContainer);
    mobileNavContainer.mmenu({ offCanvas: { position: 'top', zposition: 'front' }, "autoHeight": true, "navbars": [{ "position": "top", "content": ["prev", "title", "close"] }] });
    var mobileNavApi = mobileNavContainer.data('mmenu');
    $('.nav-mobile-dismiss').on('click', function(e) {
        mobileNavApi.close();
        e.preventDefault();
    });
    $('ul.navigation').superfish({ delay: 300, animation: { opacity: 'show', height: 'show' }, speed: 'fast', dropShadows: false });
    var $weather = $('#weather');

    function getWeatherData() { return $.ajax({ url: ci_theme_vars.ajaxurl, data: { action: 'ci_theme_get_weather_conditions', weather_nonce: ci_theme_vars.weather_nonce }, dataType: 'json', cache: false }); }
    if ($weather.length) {
        var weatherData = getWeatherData();
        weatherData.done(function(res) {
            if (res.error) {
                if (res.errors && res.errors.length) { res.errors.forEach(function(error) { console.warn(error); }); }
                return false;
            }
            var data = res.data.query.results.channel;
            if (!data.item || !data.location) { return false; }
            var info = data.item.condition;
            var city = data.location.city;
            var country = data.location.country;
            var unit = data.units.temperature;
            $('.ywicon').addClass('wi-yw-' + info.code);
            $('.ywloc').html(city + ", " + country);
            $('.ywtem').html(info.temp + '<span>' + '&deg;' + unit.toUpperCase() + '</span>');
        });
    }
    var box = $(".dk");
    box.dropkick({ theme: 'ci' });
    $("#main").fitVids();
    $("#arrive").datepicker({
        showOn: 'both',
        buttonText: '<i class="fa fa-calendar"></i>',
        dateFormat: 'yy/mm/dd',
        minDate: 0,
        onSelect: function(dateText, dateObj) {
            var minDate = new Date(dateObj.selectedYear, dateObj.selectedMonth, dateObj.selectedDay);
            minDate.setDate(minDate.getDate() + 1);
            $("#depart").datepicker("option", "minDate", minDate);
        }
    });
    $("#depart").datepicker({
        showOn: 'both',
        buttonText: '<i class="fa fa-calendar"></i>',
        dateFormat: 'yy/mm/dd',
        minDate: 0,
        onSelect: function(dateText, dateObj) {
            var maxDate = new Date(dateObj.selectedYear, dateObj.selectedMonth, dateObj.selectedDay);
            maxDate.setDate(maxDate.getDate() - 1);
            $("#arrive").datepicker("option", "maxDate", maxDate);
        }
    });
    var $pp = $("a[data-rel^='prettyPhoto']");
    if ($pp.length) { $pp.prettyPhoto({ show_title: false, hook: 'data-rel', social_tools: false, theme: 'pp_ignited', horizontal_padding: 20, opacity: 0.95, deeplinking: false }); }
    if ($("#map").length) { gmap_initialize('map'); }
});

function gmap_initialize(map_element) {
    if (typeof google === 'object' && typeof google.maps === 'object') {
        myLatlng = new google.maps.LatLng(ThemeOption.map_coords_lat, ThemeOption.map_coords_long);
        var mapOptions = { zoom: parseInt(ThemeOption.map_zoom_level), center: myLatlng, mapTypeId: google.maps.MapTypeId.ROADMAP, scrollwheel: false };
        var map = new google.maps.Map(document.getElementById(map_element), mapOptions);
        if (map_element == 'panel_map')
            panel_map = map;
        var contentString = '<div id="content">' + ThemeOption.map_tooltip + '</div>';
        var infowindow = new google.maps.InfoWindow({ content: contentString });
        var marker = new google.maps.Marker({ position: myLatlng, map: map, title: '' });
        google.maps.event.addListener(marker, 'click', function() { infowindow.open(map, marker); });
    }
}



$(document).ready(function() {
    $('.js-example-basic-single').select2();
    $('.js-example-basic-single1').select2();
    $('.js-example-basic-single2').select2();
});