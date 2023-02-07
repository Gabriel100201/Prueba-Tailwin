import anime from "./anime-master/lib/anime.es.js"

export const animarImagenes = () => {
    anime({
        targets: '.img-container-1',
        translateX: -100,
        delay: 100,
        easing: 'easeInOutExpo' // increase delay by 100ms for each elements.
    });
    anime({
        targets: '.img-container-3',
        translateX: 100,
        delay: 100,
        easing: 'easeInOutExpo' // increase delay by 100ms for each elements.
    });
}
