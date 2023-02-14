var swiper = new Swiper(".mySwiper", {
    grabCursor: false,
    effect: "creative",
    creativeEffect: {
        prev: {
            shadow: false,
            translate: [0, 0, -400],
        },
        next: {
            translate: ["100%", 0, 0],
        },
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});