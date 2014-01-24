/*
 * Collections
 */
SL.collections = (function() {

    "use strict";

    var

        // global variables
        $collectionBlocks, $activeCollectionBlock, $headings,
        activeCollectionBlockId,

        $activeCarousel,
        $carouselPrevBtn, $carouselNextBtn,
        activeCarouselImg = 0,

        // methods
        init,
        initCollapsables, toggleCollapsable,
        initCarousel, carouselPrev, carouselNext;

    init = function() {
        var collectionsContainer = document.querySelector('.js-collections');
        if (collectionsContainer) {
            initCollapsables();
            $('a[rel^="lightbox"]').magnificPopup({type:'image'});
        }
    };

    initCollapsables = function() {
        $collectionBlocks = $(".collection-block").addClass("js-closed");
        $activeCollectionBlock = $collectionBlocks.first().removeClass("js-closed").addClass("js-open");
        activeCollectionBlockId = "#" + $activeCollectionBlock.attr("id");
        initCarousel($activeCollectionBlock);

        $collectionBlocks.not($activeCollectionBlock).find(".collection-images").hide();

        $headings = $collectionBlocks.find(".collection-title a");
        $headings.off("click").on("click", toggleCollapsable);
    };

    toggleCollapsable = function(e) {
        e.preventDefault();
        var href, $block, $target;
        $target = $(e.target).closest("a");
        $target.blur();
        href = $target.attr("href");
        $block = $(href);
        if (href !== activeCollectionBlockId) {
            if ($activeCollectionBlock) {
                $activeCollectionBlock
                    .removeClass("js-open")
                    .addClass("js-closed")
                    .find(".collection-images").slideUp();
            }

            $block
                .removeClass("js-closed")
                .addClass("js-open")
                .find(".collection-images").slideDown();
            $activeCollectionBlock = $block;
            activeCollectionBlockId = href;

            initCarousel($activeCollectionBlock);
        } else {
            $block
                .removeClass("js-open")
                .addClass("js-closed")
                .find(".collection-images").slideUp();
            $activeCollectionBlock = null;
            activeCollectionBlockId = null;
        }
    };

    initCarousel = function($el) {

        // reset last carousel
        if ($activeCarousel) {
            $carouselPrevBtn.off("click");
            $carouselNextBtn.off("click");
            $activeCarousel.find(".collection-images ul").animate({"left": 0}, 250);
            activeCarouselImg = 0;
        }

        $activeCarousel = $el;

        $carouselPrevBtn = $el.find(".prev");
        $carouselNextBtn = $el.find(".next");

        $carouselPrevBtn.off("click").on("click", carouselPrev);
        $carouselNextBtn.off("click").on("click", carouselNext);
    };

    carouselPrev = function(e) {
        e.preventDefault();
        $(e.target).closest("a").blur();
        if (activeCarouselImg > 0) {
            var $images = $activeCarousel.find("img");
            var left = $($images[--activeCarouselImg]).position().left;
            $activeCarousel.find(".collection-images ul").animate({"left":-left}, 250);
        }
    };

    carouselNext = function(e) {
        e.preventDefault();
        $(e.target).closest("a").blur();
        var $images = $activeCarousel.find("img");
        if (activeCarouselImg < $images.length - 1) {
            var left = $($images[++activeCarouselImg]).position().left;
            $activeCarousel.find(".collection-images ul").animate({"left":-left}, 250);
        }
    };


    // expose public methods
    return {
        init: init
    };

})();