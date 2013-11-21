/*
 * Menu
 */
SL.menu = (function() {

    "use strict";

    var
        // vars
        $wrapper,
        $openTrigger,
        $closeTrigger,

        // functions
        init, openMenu, closeMenu;


    // init
    init = function(){
        $wrapper        = $(".wrapper");
        $openTrigger    = $wrapper.find(".menu-trigger-open");
        $closeTrigger   = $wrapper.find(".menu-trigger-close");

        $openTrigger.find('a').on("click", openMenu);
        $closeTrigger.find('a').on("click", closeMenu);
    };


    // open menu
    openMenu = function(e) {
        if (!!e) {
            e.preventDefault();
            e.stopPropagation();
        }
        $wrapper.addClass("menu-open");
    };


    // show flyout on page load
    closeMenu = function(e) {
        if (!!e) {
            e.preventDefault();
            e.stopPropagation();
        }
        $wrapper.removeClass("menu-open");
    };


    // expose public methods
    return {
        init: init,
        openMenu: openMenu,
        closeMenu: closeMenu
    };

})();