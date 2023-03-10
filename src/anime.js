import anime from "./anime-master/lib/anime.es.js"

export const animarBarras = (target, porc) => {
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


export const graficarPorc = (target, porc, delay) => {
    anime({
        targets: target,
        innerHTML: [0, `${porc}%`],
        easing: 'linear',
        round: 10,
        delay: anime.stagger(100, {start: delay})
    });
}
export const bajar = () => {
    anime({
        targets: '.telon',
        height: '0px', // -> from '28px' to '100%',
        easing: 'easeInSine',
        direction: 'normal',
        duration: 1500,
        loop: false
    });
    anime({
        targets: '.leave-text',
        opacity: '0',
        easing: 'easeInSine',
        direction: 'normal',
        duration: 1600,
        loop: false
    })
}
export const subir = () => {
    anime({
        targets: '.telon',
        height: '500px', // -> from '28px' to '100%',
        easing: 'easeInSine',
        direction: 'normal',
        duration: 1000,
        loop: false
    });
    anime({
        targets: '.leave-text',
        opacity: '1',
        easing: 'easeInSine',
        direction: 'normal',
        duration: 1000,
        loop: false
    })
}
export const menuBajar = () => {
    anime({
        targets: '.menu-mobile',
        height: '100vh', // -> from '28px' to '100%',
        easing: 'easeInSine',
        direction: 'normal',
        duration: 1500,
        loop: false
    });
    anime({
        targets: '.menu-lista',
        opacity: '1',
        easing: 'easeInSine',
        direction: 'normal',
        duration: 1000,
        loop: false
    })
}
export const menuSubir = () => {
    anime({
        targets: '.menu-mobile',
        height: '0vh', // -> from '28px' to '100%',
        easing: 'easeInSine',
        direction: 'normal',
        duration: 1500,
        loop: false
    });
    anime({
        targets: '.menu-lista',
        opacity: '0',
        easing: 'easeInSine',
        direction: 'normal',
        duration: 1000,
        loop: false
    })
}