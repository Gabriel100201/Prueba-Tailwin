import { animarImagenes } from "./anime.js";

const matchHistory = (nombre, tag) =>{
    return fetch(`https://api.henrikdev.xyz/valorant/v3/matches/na/${nombre}/${tag}?filter=competitive`)
    .then((respone) => respone.json())
    .catch((err) => console.log(err));
}
const valorantInfo = () =>{
    return fetch("https://valorant-api.com/v1/agents")
    .then((respone) => respone.json())
    .catch((err) => console.log(err));
}
const colocarImagen = (url, ciclo) => {
    const containers = document.querySelectorAll(".img-container");
    const loader = document.querySelector(".loader");
    containers[ciclo].removeChild(loader);
    containers[ciclo].style = `background-image: url("${url}"); background-size: 100% 100%;`;
    console.log(url, " ",ciclo);
    animarImagenes();

}
const recuperarImagen = (agente, ciclo) => {
    valorantInfo().then((data) => {
        data = data.data;
        data.forEach((dato) => {
            if (dato.displayName == agente){
                colocarImagen(dato.displayIcon, ciclo);
            }
        })
    })
}
const capturarPlayer = () => {
    const nombrePlayer = document.querySelector("#input-nombre").value;
    const tagPlayer = document.querySelector("#input-tag").value;
    console.log(nombrePlayer, tagPlayer);
    matchHistory(nombrePlayer, tagPlayer).then((data) => {
        data = data.data;
        for (let i = 0 ; i < 3 ; i++){
            let ciclo = i;
            for (let k = 0 ; k < 10 ; k++){
                if (data[i].players.all_players[k].name == nombrePlayer){
                    console.log(data[i].players.all_players[k].character);
                    recuperarImagen(data[i].players.all_players[k].character, ciclo);
                }
            }
        }
    })    
}
const loader = () => {
    const container = document.querySelectorAll(".img-container");
    container.forEach((contenedor) => {
        contenedor.classList.add("items-center");
    })
    const loader = `<div class="loader flex justify-center items-center h-64">
    <div class="w-16 h-16 rounded-full border-t-4 border-slate-900 border-opacity-25 animation-spin duration-500"></div>
    </div>`;
    container.forEach((contenedor) => {
        contenedor.innerHTML = loader;
    })
}

const inputButton = document.querySelector("#input-button");
inputButton.addEventListener("click", capturarPlayer);
inputButton.addEventListener("click", loader);