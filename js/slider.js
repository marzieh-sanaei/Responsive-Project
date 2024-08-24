document.addEventListener("DOMContentLoaded", function () {
  const swiperOne = new Swiper(".swiper-one", {
    autoplay: {
      delay: 2000,
    },

    direction: "horizontal",
    loop: true,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
});


document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener('load', function() {
    const swiperTwo = new Swiper(".swiper-two", {
      slidesPerView: 1,
      direction: "horizontal",
      spaceBetween: 20,
      breakpoints: {
        992: {
          direction: "vertical",
          slidesPerView: 50,
          spaceBetween: 15,
          
        },
        1200: {
          direction: "vertical",
          slidesPerView: 50,
          spaceBetween: 25,
     
        },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });

    swiperTwo.update();
  });
});


document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener('load', function() {
    const swiperThree = new Swiper(".swiper-three", {
      slidesPerView: 1,
      spaceBetween: 20,
      direction: "horizontal",
      loop: true,
      // freeMode: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });

    swiperThree.update();
  });
});

document.addEventListener("DOMContentLoaded", function () {

  function initSwiper() {
    swiperThree = new Swiper(".swiper-three", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      freemode:true,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });

    swiperThree.update();
  }

  function updateSwiperSlide(index) {
    if (swiperThree) {
      swiperThree.slideToLoop(index);
    }
  }

  if (window.innerWidth > 992) {
    initSwiper();
  }

  window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
      if (!swiperThree) {
        initSwiper();
      }
    } else {
      if (swiperThree) {
        swiperThree.destroy();
        swiperThree = null;
      }
    }
  });

  const thumbs = document.querySelectorAll('.swiper-thumb');
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('mouseenter', () => {
      updateSwiperSlide(index);
    });
  });
});

