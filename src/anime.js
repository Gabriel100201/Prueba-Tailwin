import anime from "./anime-master/lib/anime.es.js"

export const animarBarras = (target, porc) => {
    console.log(target);
    if (target.classList.contains("green")){
        anime({
            targets: target,
            width: `${porc}%`, // -> from '28px' to '100%',
            easing: 'easeInOutQuad',
            direction: 'normal',
            loop: false,
            duration: 2500
        });
    }
    else {
        anime({
            targets: target,
            width: `${porc}%`, // -> from '28px' to '100%',
            easing: 'easeInOutQuad',
            direction: 'normal',
            loop: false,
            duration: 2500,
            delay: anime.stagger(100, {start: 1500})
        });
    }

}
