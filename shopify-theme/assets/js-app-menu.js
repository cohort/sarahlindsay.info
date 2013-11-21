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
        closeTimeout,

        // functions
        init, openMenu, closeMenu, setHideMenuTimeout;


    // init
    init = function(){
        $wrapper        = $(".wrapper");
        $menu           = $wrapper.find(".menu");
        $openTrigger    = $wrapper.find(".menu-trigger-open");
        $closeTrigger   = $wrapper.find(".menu-trigger-close");

        $openTrigger.find('a').on("click", openMenu);
        $closeTrigger.find('a').on("click", closeMenu);

        var menuHasOpened = $.cookie("menuHasOpened");
        if (!menuHasOpened && $(window).width() >= 600 && Modernizr.csstransforms3d) {
            $wrapper.addClass("menu-open-immediate").addClass("menu-open");
            $menu.on("mouseover", function(){ clearTimeout(closeTimeout); });
            $menu.on("mouseout", setHideMenuTimeout);
            setHideMenuTimeout();
            $.cookie("menuHasOpened", "true");
        }
    };


    setHideMenuTimeout = function() {
        clearTimeout(closeTimeout);
        closeTimeout = setTimeout(closeMenu, 3000);
    };


    // open menu
    openMenu = function(e) {
        if (!!e) {
            e.preventDefault();
            e.stopPropagation();
        }
        $wrapper.addClass("menu-open");
        setTimeout(function(){
            SL.shop.updateMasonry();
        }, 1000);
    };


    // show flyout on page load
    closeMenu = function(e) {
        if (!!e) {
            e.preventDefault();
            e.stopPropagation();
        }
        $wrapper.removeClass("menu-open-immediate").removeClass("menu-open");
        clearTimeout(closeTimeout);
        setTimeout(function(){
            SL.shop.updateMasonry();
        }, 1000);
    };


    // expose public methods
    return {
        init: init,
        openMenu: openMenu,
        closeMenu: closeMenu
    };

})();