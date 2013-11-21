/*
 * Smooth scroll
 */
SL.smoothScroll = (function() {

    "use strict";

    var initLinks, initParallax, initSticky, initAltClassDetection;

    // init smooth scroll for internal links
    initLinks = function(){
        $("a[href^='#']").on('click', function(e) {
            e.preventDefault();
            if (this.hash.length > 0) {
                $('html, body').animate({ scrollTop: $(this.hash).offset().top }, SL.transitionTime);
            }
        });
    };

    // init bg parallax scrolling
    initParallax = function() {
        if (Modernizr.touch || !Modernizr.csstransforms3d) { return; }
        var $parallaxEl = $(".js-parallax");
        $(window).on("scroll", function() {
            var speed = 2;
            $parallaxEl.css("backgroundPosition", "center " + (-window.pageYOffset / speed) + "px");
            var parallaxedEl = $parallaxEl.data("parallax-el");
            if (parallaxedEl) {
                var $parallaxedEl = $(parallaxedEl);
                var parallaxedElHeight = $parallaxedEl.height();
                var parallaxElHeight = $parallaxEl.height();
                if (parallaxedElHeight > parallaxElHeight) {
                    $parallaxEl.height(parallaxedElHeight);
                }
            }
        });
    };

    // init sticky elements
    initSticky = function() {
        var $stickies = $(".js-sticky");
        $stickies.each(function(counter, sticky){
            var $sticky = $(sticky);
            var top = $sticky.data("sticky-top");
            $sticky.sticky({topSpacing:top});
        });
    };

    // init element detection
    initAltClassDetection = function() {
        var $alt = $(".js-alt");
        if ($alt.length > 0) {
            var altPos = $alt.position().top;
            var altClass = $alt.data("alt-class");
            var altOffset = $alt.data("alt-offset");
            var isAltClass = false;
            var $wrapper = $(".wrapper");

            if (Modernizr.svg) {
                var $svgObjects = $('.js-svg');
            }

            // update on scroll
            $(window).scroll(function() {
                checkScrollPos();
            });

            // update on load
            checkScrollPos();
        }


        function checkScrollPos() {
            var scrollTop = $(document).scrollTop();
            if (scrollTop > altPos - altOffset) {
                if (!isAltClass) {
                    $wrapper.addClass(altClass);
                    if (Modernizr.svg) {
                        $svgObjects.each(function(count,svg){
                            var $svg = $(svg);
                            $svg
                                .data("src", $svg.attr("src"))
                                .attr("src", $svg.data("alt-src"));
                        });

                    }
                    isAltClass = true;
                }
            } else {
                if (isAltClass) {
                    $wrapper.removeClass(altClass);
                    if (Modernizr.svg) {
                        $svgObjects.each(function(count,svg){
                            var $svg = $(svg);
                            $svg.attr("src", $svg.data("src"));
                        });
                    }
                    isAltClass = false;
                }
            }
        }
    };


    // expose public methods
    return {
        initLinks: initLinks,
        initParallax: initParallax,
        initSticky: initSticky,
        initAltClassDetection: initAltClassDetection
    };

})();