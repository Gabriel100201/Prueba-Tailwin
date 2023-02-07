const inputForAnimate = document.querySelectorAll(".animable-input");
const spanForAnimate = document.querySelectorAll(".animable-span");

inputForAnimate.forEach((input) => {
    input.addEventListener("focus", () => {
        const spanAnimate = input.previousElementSibling;
        spanAnimate.classList.remove("translate-y-1.5");
        spanAnimate.classList.remove("translate-x-1.5");
    });
});
inputForAnimate.forEach((input) => {
    input.addEventListener("blur", () => {
        const spanAnimate = input.previousElementSibling;
        spanAnimate.classList.add("translate-y-1.5");
        spanAnimate.classList.add("translate-x-1.5");
    });
});