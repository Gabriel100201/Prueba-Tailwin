import { menuBajar } from "./anime.js";
import { menuSubir } from "./anime.js";
const menuButton = document.querySelector(".menu-button");
const subirButton = document.querySelector(".subir-button");
const abrirMenu = () => {
    const menu = document.querySelector(".menu-mobile");
    menu.classList.remove("hidden");
    menu.classList.add("flex");
    menuBajar();
}
const cerrarMenu = () => {
    const menu = document.querySelector(".menu-mobile");
    menuSubir();
}

menuButton.addEventListener("click", abrirMenu);
subirButton.addEventListener("click", cerrarMenu);