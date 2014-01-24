/*
 * Shop
 */
SL.shop = (function() {

    "use strict";

    var init, initMasonry, initSiteTitlePositioning, initShare, initPromoBlock, initSelect,
    updateMasonry,
    masonryUpdateTimeout = null,
    $masonry;

    init = function() {
        initSiteTitlePositioning();
        initShare();
        initPromoBlock();
        initSelect();
        $(window).resize(initSiteTitlePositioning);
    };

    initSiteTitlePositioning = function () {
        var $introContainer = $('.site-intro');
        if ($introContainer.length > 0) {
            var windowHeight = $(window).height();
            var $introHeader = $introContainer.find(".site-title");
            var paddingTop = (windowHeight * 0.5) - parseInt($introHeader.css("padding-top"), 10) - (parseInt($introHeader.outerHeight(), 10) * 0.5);
            $introContainer.css({
                "padding-top": paddingTop + "px"
            });
        }

        if (!!masonryUpdateTimeout) {
            clearTimeout(masonryUpdateTimeout);
        }
        masonryUpdateTimeout = setTimeout(function(){
            updateMasonry();
        }, 500);
    };

    initPromoBlock = function () {
        var $shopContainer = $('.shop-products');
        if ($shopContainer.length > 0) {

            var link, title, url;

            if (Math.random() < 0.5) {
                title = $(".content-title:first").text();
                link = "read story";
                var $introContainer = $('.site-intro');
                if ($introContainer.length > 0) {
                    url = "#body-welcome";
                } else {
                    url = "/";
                }
            } else {
                title = "Receive the latest news";
                link = "sign up to newsletter";
                url = "/blogs/news";
            }

            var $promoBlock = $("<a />")
                .attr("href", url)
                .addClass("promo-block")
                .addClass("shop-product");

            $("<span/>")
                .addClass("promo-block-title")
                .addClass("border-below")
                .addClass("caps")
                .text(title)
                .appendTo($promoBlock);

            $("<span/>")
                .addClass("promo-block-link")
                .text(link)
                .appendTo($promoBlock);

            var $products = $shopContainer.find(".shop-product");
            var rand = Math.floor(Math.random() * $products.length);
            $promoBlock.insertAfter($products.eq(rand));
        }
    };

    initMasonry = function() {
        var shopContainer = document.querySelector('.shop-products');
        if (shopContainer) {
            $masonry = new Masonry( shopContainer, {
                itemSelector: '.shop-product',
                isResizeBound: false
            });
        }
    };

    updateMasonry = function() {
        if ($masonry) {
            $masonry.layout();
        }
    };

    initShare = function() {
        var $shareBtn = $(".product-cta .share-btn");
        var $shareOverlay = $(".share-popup");
        var $shareOverlayCloseBtn = $shareOverlay.find(".close");

        $shareBtn.click(showShareOverlay);
        $shareOverlayCloseBtn.click(hideShareOverlay);

        function showShareOverlay(e) {
            e.preventDefault();
            $shareOverlay.fadeIn();
        }
        function hideShareOverlay(e) {
            e.preventDefault();
            $shareOverlay.fadeOut();
        }
    };

    initSelect = function() {
        var $select = $(".shop-categories-list");
        $select.on("change", function(e){
            var $selected = $select.find("option:selected");
            window.location.href = $selected.val();
        });
        var currentHref = window.location.pathname;
        $select.find("option").each(function(counter, el){
            var $el = $(el);
            if ($el.val() === currentHref) {
                $el.attr("selected", "selected");
            }
        });
    };

    // expose public methods
    return {
        init: init,
        initMasonry: initMasonry,
        updateMasonry: updateMasonry
    };

})();