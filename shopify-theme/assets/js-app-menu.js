/*
 * Menu
 */
SL.menu = (function() {

    "use strict";

    var
        // vars
        $wrapper,
        $menu,
        $openTrigger,
        $closeTrigger,
        $body,
        $content,
        $window = $(window),
        defaultMenuWidth = 230,
        mobileBreakpoint = 600,
        isOpen = false,

        // functions
        init, toggleMenu, openMenu, closeMenu, openImmediateMenu, closeImmediateMenu, onResize;


    // init
    init = function(){
        $body           = $("body");
        $wrapper        = $(".wrapper");
        $content        = $(".content");
        $menu           = $wrapper.find(".menu");
        $openTrigger    = $wrapper.find(".menu-trigger-open");
        $closeTrigger   = $(".menu-trigger-close");

        $openTrigger.find('a').on("click", toggleMenu);
        $closeTrigger.find('a').on("click", closeMenu);

        var menuHasOpened = $.cookie("menuHasOpened");
        if (!menuHasOpened && $window.width() >= mobileBreakpoint && Modernizr.csstransforms3d) {

            openImmediateMenu();
            $.cookie("menuHasOpened", "true", { expires: 31, path: "/" });

            // update on scroll
            $content.on("scroll.init", function() {
                closeImmediateMenu();
            });
        }

        $window.on("resize", onResize);
    };


    // toggle menu
    toggleMenu = function(e) {
        if ($body.hasClass("menu-open")) {
            closeMenu(e);
        } else {
            openMenu(e);
        }
    };


    // open menu
    openMenu = function(e) {
        if (!!e) {
            e.preventDefault();
            e.stopPropagation();
        }

        var windowWidth = $window.width();
        var wrapperWidth, menuWidth;

        if (windowWidth > mobileBreakpoint) {
            menuWidth = defaultMenuWidth;
            wrapperWidth = windowWidth - menuWidth;
        } else {
            menuWidth = windowWidth;
            wrapperWidth = wrapperWidth;
        }

        $wrapper
            .css({
                width:wrapperWidth+"px",
                left:menuWidth+"px"
            });

        $body
            .addClass("menu-open");

        isOpen = true;

        setTimeout(function(){
            SL.shop.updateMasonry();
        }, 500);
    };



    // show flyout on page load
    closeMenu = function(e) {
        if (!!e) {
            e.preventDefault();
            e.stopPropagation();
        }

        var windowWidth = $window.width();
        var wrapperWidth, menuWidth;

        if (windowWidth > mobileBreakpoint) {
            menuWidth = defaultMenuWidth;
            wrapperWidth = windowWidth - menuWidth;
        } else {
            menuWidth = windowWidth;
            wrapperWidth = wrapperWidth;
        }

        $wrapper
            .css({
                  width:windowWidth+"px",
                  left:0
            });


        $body
            .removeClass("menu-open-immediate")
            .removeClass("menu-open");

        isOpen = false;

        setTimeout(function(){
            SL.shop.updateMasonry();
        }, 500);
    };


    openImmediateMenu = function() {
        var windowWidth = $window.width();
        var menuWidth = defaultMenuWidth,
            wrapperWidth = windowWidth - menuWidth;

        $wrapper
            .css({
                width:wrapperWidth+"px",
                left:menuWidth+"px"
            });

        $body
            .addClass("menu-open");

        isOpen = true;
    };


    closeImmediateMenu = function(e) {
        closeMenu();
        $content.off("scroll.init");
    };


    onResize = function(e) {
        var wrapperWidth = $window.width(),
            menuWidth = defaultMenuWidth;

        if (isOpen) {
            if (wrapperWidth > mobileBreakpoint) {
                wrapperWidth = wrapperWidth - menuWidth;
            } else {
                menuWidth = wrapperWidth;
            }
        } else {
            menuWidth = 0;
        }
        $wrapper.css({
            width:wrapperWidth+"px",
            left: menuWidth
        });
    };


    // expose public methods
    return {
        init: init,
        toggleMenu: toggleMenu,
        openMenu: openMenu,
        closeMenu: closeMenu
    };

})();