(function(){

    "use strict";

    // inits
    immediateInit();
    $(document).ready(domInit);
    $(window).load(pageInit);


    /*
    * Run immediately
    */
    function immediateInit() {

    }

    /*
    * Run on DOM load
    */
    function domInit(){
        SL.shop.init();
        SL.menu.init();
        SL.smoothScroll.initLinks();
        SL.smoothScroll.initParallax();
        SL.smoothScroll.initSticky();
        SL.collections.init();
    }

    /*
    * Run on page (window) load
    */
    function pageInit() {
        SL.shop.initMasonry();
        SL.smoothScroll.initAltClassDetection();
    }

})();
