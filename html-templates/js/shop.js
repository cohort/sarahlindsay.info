/*
 * Shop
 */
SL.shop = (function() {

    "use strict";

    var init, initMasonry;

    init = function() {
    };

    initMasonry = function() {
        var shopContainer = document.querySelector('.shop-products');
        if (shopContainer) {
            var msnry = new Masonry( shopContainer, {
                columnWidth: 480,
                gutter: 20,
                itemSelector: '.shop-product',
                isFitWidth: true
            });
        }
    };

    // expose public methods
    return {
        init: init,
        initMasonry: initMasonry
    };

})();