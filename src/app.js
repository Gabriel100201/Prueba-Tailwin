import { animarBarras } from "./anime.js";

const matchHistory = (nombre, tag) =>{
    return fetch(`https://api.henrikdev.xyz/valorant/v3/matches/na/${nombre}/${tag}?filter=competitive`)
    .then((respone) => respone.json())
    .catch((err) => console.log(err));
}
const valorantInfo = () => {
    return fetch("https://valorant-api.com/v1/agents")
    .then((respone) => respone.json())
    .catch((err) => console.log(err));
}
const graficoDahno = (made, received, indice) => {
    const green = document.querySelectorAll(".green");
    const red = document.querySelectorAll(".red");
    animarBarras(green[indice], made);
    animarBarras(red[indice], received);
}
const obtenerDanho = (indice, made, received) => {
    const total = made + received;
    const porcMade = ((made * 100) / total);
    const porcRecieved = ((received * 100) / total);
    if (porcMade > porcRecieved){
        const diferencia = porcMade - porcRecieved;
        console.log(`Realizaste un ${diferencia} de daño más del que reciviste`);
    }
    else if (porcRecieved > porcMade){
        const diferencia = porcRecieved - porcMade;
        console.log(`Realizaste un ${diferencia} de daño menos del que reciviste`);
    }
    graficoDahno(porcMade, porcRecieved, indice);
}
const colocarImagen = (agente, ciclo) => {
    const containers = document.querySelectorAll(".img-container");
    if (ciclo == 4){
        const loader = document.querySelectorAll(".loader");
        loader.forEach((load) => {
            load.remove();
        })
    }
    containers[ciclo].style = `background-image: url("./characters/${agente}.jpg"); background-size: 100% 100%;`;
}
/* const recuperarImagen = (agente, ciclo) => {
    valorantInfo().then((data) => {
        data = data.data;
        data.forEach((dato) => {
            if (dato.displayName == agente){
                colocarImagen(dato.displayIcon, ciclo);
            }
        })
    })
} */
const recuperarImagen = (agente, ciclo) => {
    
}
const capturarPlayer = () => {
    const nombrePlayer = document.querySelector("#input-nombre").value;
    const tagPlayer = document.querySelector("#input-tag").value;
    matchHistory(nombrePlayer, tagPlayer).then((data) => {
        data = data.data;
        console.log(data);
        for (let i = 0 ; i < 5 ; i++){
            let ciclo = i;
            for (let k = 0 ; k < 10 ; k++){
                if (data[i].players.all_players[k].name == nombrePlayer){
                    console.log(data[i].players.all_players[k].character);
                    const danhoHecho = data[i].players.all_players[k].damage_made;
                    const danhoRecivido = data[i].players.all_players[k].damage_received
                    obtenerDanho(i, danhoHecho, danhoRecivido);
                    colocarImagen(data[i].players.all_players[k].character, ciclo);
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