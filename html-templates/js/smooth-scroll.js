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
        if (Modernizr.touch) { return; }
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
                var svgObjects = document.querySelectorAll('.js-svg');
                var svgPaths = [];
                [].forEach.call(
                    svgObjects, function(el){
                        var nodelist = el.contentDocument.getElementsByTagName("path");
                        for(var i = nodelist.length; i--; svgPaths.unshift(nodelist[i]));
                    }
                );
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
                        svgPaths.forEach(function(el){
                            el.style.fill = "#282828";
                        });
                    }
                    isAltClass = true;
                }
            } else {
                if (isAltClass) {
                    $wrapper.removeClass(altClass);
                    if (Modernizr.svg) {
                        svgPaths.forEach(function(el){
                            el.style.fill = "#fff";
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