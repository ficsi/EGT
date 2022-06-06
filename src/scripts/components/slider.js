class Slider {
    constructor(container) {
        this.container = container;
        this.DOM = {};
        this.currentSlide = 0;
    }

    cache = () => {
        this.DOM.slides = this.container.querySelectorAll('.slider__slide');
        this.DOM.navlinks = this.container.querySelectorAll('.slider__navlink');
    };
    events = () => {
        this.container.querySelector('.nav-button--next').addEventListener('click', () => {
            this.changeSlide(this.currentSlide + 1);
        });
        this.container.querySelector('.nav-button--prev').addEventListener('click', () => {
            this.changeSlide(this.currentSlide - 1);
        });
    };
    changeSlide = (moveTo) => {
        if (moveTo >= this.DOM.slides.length) {
            moveTo = 0;
        }
        if (moveTo < 0) {
            moveTo = this.DOM.slides.length - 1;
        }

        this.DOM.slides[this.currentSlide].classList.toggle('active');
        if (this.DOM.navlinks.length > 0) {
            this.DOM.navlinks[this.currentSlide].classList.toggle('active');
            this.DOM.navlinks[moveTo].classList.toggle('active');
        }
        this.DOM.slides[moveTo].classList.toggle('active');

        this.currentSlide = moveTo;
    };
    changeThumbs = (container) => {
        const thumbs = container.querySelectorAll('.--thumb');
        if (thumbs.length === 0) {
            return;
        }
        thumbs.forEach((thumb) => {
            thumb.querySelector('img').addEventListener('click', (e) => {
                const currentImage = e.target.closest('.slider__slides').querySelector('.active').querySelector('img');
                currentImage.src = e.target.dataset.src;
            });
        });
    };

    init = () => {
        this.cache();
        this.events();
        this.changeThumbs(this.container);
        this.DOM.navlinks.forEach((navItem, index) => {
            navItem.addEventListener('click', () => {
                if (this.currentSlide !== index) {
                    this.changeSlide(index);
                }
            });
        });
    };
}

document.addEventListener('DOMContentLoaded', () => {
    let slider = new Slider(document.querySelector('.slider__slides__one'));
    slider.init();

    let sliderTwo = new Slider(document.querySelector('.slider__slides__two'));
    sliderTwo.init();

    let sliderThree = new Slider(document.querySelector('.slider__slides__three'));
    sliderThree.init();
});
/////////////////////////////////////////////

(function () {
    var carousels = document.querySelectorAll('.js-product-carousel');

    [].forEach.call(carousels, function (carousel) {
        carouselize(carousel);
    });
})();

function carouselize(carousel) {
    var productList = carousel.querySelector('.js-product-list');
    var productListWidth = 0;
    var productListSteps = 0;
    var products = carousel.querySelectorAll('.product');
    var productAmount = 0;
    var productAmountVisible = 3;
    var carouselPrev = carousel.querySelector('.js-carousel-prev');
    var carouselNext = carousel.querySelector('.js-carousel-next');

    //Count all the products
    [].forEach.call(products, function (product) {
        productAmount++;
        productListWidth += 250;
        productList.style.width = productListWidth + 'px';
    });

    carouselNext.onclick = function () {
        if (productListSteps < productAmount - productAmountVisible) {
            productListSteps++;
            moveProductList();
        }
    };
    carouselPrev.onclick = function () {
        if (productListSteps > 0) {
            productListSteps--;
            moveProductList();
        }
    };

    // This is a bit hacky, let me know if you find a better way to do this!
    // Move the carousels product-list
    function moveProductList() {
        productList.style.transform = 'translateX(-' + 330 * productListSteps + 'px)';
    }
}
