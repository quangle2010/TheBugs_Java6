(function($) {
    "use strict";
    
    var nav_offset_top = $('header').height(); 

    // Navbar Fixed  
    function navbarFixed() {
        if ($('.main_header_area, .main_header_three, .box_header_four').length) {
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();   
                if (scroll >= nav_offset_top) {
                    $(".main_header_area, .main_header_three, .box_header_four").addClass("navbar_fixed");
                } else {
                    $(".main_header_area, .main_header_three, .box_header_four").removeClass("navbar_fixed");
                }
            });
        }
    }
    navbarFixed();

    // General Slider Function
    function initializeSlider(sliderId, sliderHeight) {
        if ($(sliderId).length) {
            $(sliderId).revolution({
                sliderType: "standard",
                sliderLayout: "auto",
                delay: 4000000,
                disableProgressBar: "on",
                navigation: {
                    onHoverStop: 'off',
                    touch: { touchenabled: "on" },
                    arrows: {
                        style: "zeus",
                        enable: true,
                        hide_onmobile: true,
                        hide_under: 992,
                        hide_onleave: true,
                        hide_delay: 200,
                        hide_delay_mobile: 1200,
                        tmp: '<div class="tp-title-wrap"><div class="tp-arr-imgholder"></div></div>',
                        left: { h_align: "left", v_align: "center", h_offset: 50, v_offset: 0 },
                        right: { h_align: "right", v_align: "center", h_offset: 50, v_offset: 0 }
                    }
                },
                responsiveLevels: [4096, 1199, 992, 767, 480],
                gridwidth: [1170, 970, 750, 700, 400],
                gridheight: [sliderHeight, sliderHeight, 550, 550, 500],
                lazyType: "smart",
                fallbacks: {
                    simplifyAll: "off",
                    nextSlideOnWindowFocus: "off",
                    disableFocusListener: false
                }
            });
        }
    }

    // Initialize Sliders with different heights
    initializeSlider("#main_slider", 625);
    initializeSlider("#main_slider3", 798);
    initializeSlider("#main_slider4", 767);
    initializeSlider("#main_slider5", 620);

    // Cake Feature Slider
    function cakeCarousel() {
        if ($('.cake_feature_slider').length) {
            $('.cake_feature_slider').owlCarousel({
                loop: true,
                margin: 30,
                items: 4,
                nav: true,
                autoplay: true,
                smartSpeed: 1500,
                dots: true,
                navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                responsive: {
                    0: { items: 1 },
                    430: { items: 2 },
                    768: { items: 3 },
                    992: { items: 4 }
                }
            });
        }
    }
    cakeCarousel();

    // Client Says Slider
    function clientSaySlider() {
        if ($('.client_says_slider').length) {
            $('.client_says_slider').owlCarousel({
                loop: true,
                margin: 30,
                items: 1,
                nav: true,
                autoplay: true,
                smartSpeed: 1500,
                dots: false,
                navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>']
            });
        }
    }
    clientSaySlider();

    // Arrivals Slider
    function arrivalsSlider() {
        if ($('.arivals_slider').length) {
            $('.arivals_slider').owlCarousel({
                loop: true,
                margin: 30,
                items: 2,
                nav: false,
                autoplay: true,
                smartSpeed: 1500,
                dots: true,
                responsive: {
                    0: { items: 1 },
                    420: { items: 2 }
                }
            });
        }
    }
    arrivalsSlider();

    // Recipe Slider
    function recipeSlider() {
        if ($('.special_recipe_slider').length) {
            $('.special_recipe_slider').owlCarousel({
                loop: true,
                margin: 0,
                items: 1,
                nav: false,
                autoplay: true,
                smartSpeed: 1500,
                dots: true
            });
        }
    }
    recipeSlider();

    // Product Select and Short Dropdowns
    $(document).ready(function() {
        $('.product_select, .short').niceSelect();
    });

    // Portfolio Isotope
    function gridGallery() {
        if ($('.grid_portfolio_area').length) {
            $(".grid_portfolio_area").imagesLoaded(function() {
                $(".grid_portfolio_area").isotope({
                    layoutMode: 'masonry',
                    percentPosition: true,
                    columnWidth: 1
                });
            });
        }
    }
    gridGallery();

    // Portfolio Isotope Filter
    function portfolioIsotope() {
        if ($('.portfolio_filter ul li').length) {
            $(".portfolio_filter ul li").on('click', function() {
                $(".portfolio_filter ul li").removeClass("active");
                $(this).addClass("active");
                var selector = $(this).attr("data-filter");
                $(".grid_portfolio_area").isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 450,
                        easing: "linear",
                        queue: false
                    }
                });
                return false;
            });
        }
    }
    portfolioIsotope();

    // Range Slider
    $(function() {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [10, 250],
            slide: function(event, ui) {
                $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
        $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
    });

    // Search Popup
    $(document).ready(function() {
        $('.popup-with-zoom-anim').magnificPopup({
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-zoom-in'
        });

        $('.popup-with-move-anim').magnificPopup({
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        });
    });

    // Simple Lightbox
    $('.imageGallery1 .light').simpleLightbox();

})(jQuery);
