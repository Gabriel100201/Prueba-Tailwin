import { animarBarras } from "./anime.js";
import { graficarPorc } from "./anime.js";
import { bajar } from "./anime.js";
const mmrHistory = (nombre, tag) => {
    return fetch(`https://api.henrikdev.xyz/valorant/v1/mmr-history/na/${nombre}/${tag}`)
    .then((respone) => respone.json())
    .catch((err) => console.log(err));
}
const mapList = () => {
    return fetch(`https://valorant-api.com/v1/maps`)
    .then((respone) => respone.json())
    .catch((err) => console.log(err));
}
const matchHistory = (nombre, tag) =>{
    return fetch(`https://api.henrikdev.xyz/valorant/v3/matches/na/${nombre}/${tag}?filter=competitive`)
    .then((respone) => respone.json())
    .catch((err) => console.log(err));
}
const graficarPorcentaje = (made, received, indice) => {
    let logEl = document.querySelectorAll('.porcentaje');
    graficarPorc(logEl[indice*2] ,made, 1000);
    graficarPorc(logEl[indice*2 + 1] ,received, 1600);
}
const graficoDahno = (made, received, indice) => {
    const green = document.querySelectorAll(".green");
    const red = document.querySelectorAll(".red");
    animarBarras(green[indice], made);
    animarBarras(red[indice], received);
    graficarPorcentaje(made, received, indice);
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
    console.log(agente);
    const containers = document.querySelectorAll(".img-container");
    if (agente == "KAY/O"){
        containers[ciclo].style = `background-image: url("./characters/KAYO.jpg"); background-size: 100% 100%;`;
    }
    else{
        containers[ciclo].style = `background-image: url("./characters/${agente}.jpg"); background-size: 100% 100%;`;
    }
}
const pintarMarcador = (leftNumbers, rightNumbers, result, ciclo) => {
    console.log(result);
    const marker = document.querySelectorAll(".marcador");
    const marker2 = document.querySelectorAll(".marcador-2");
    marker[ciclo].classList.remove("text-green-500", "text-red-500");
    marker2[ciclo].classList.remove("text-red-500", "text-green-500");
    marker[ciclo].innerText = `${leftNumbers}`;
    marker2[ciclo].innerText = `${rightNumbers}`;
    if (result == true){
        marker[ciclo].classList.add("text-green-500");
        marker2[ciclo].classList.add("text-red-500");
    }
    else{
        marker[ciclo].classList.add("text-red-500");
        marker2[ciclo].classList.add("text-green-500");
    }
}
const addMarcador = (equipo, matchInfo, ciclo) => {
    let resultado;
    let leftNumbers;
    let rightNumbers;
    if (equipo == "Blue"){
        resultado = matchInfo.blue.has_won;
        if (resultado == true){
            leftNumbers = matchInfo.blue.rounds_won;
            rightNumbers = matchInfo.red.rounds_won;
        }
        else {
            leftNumbers = matchInfo.blue.rounds_won;
            rightNumbers = matchInfo.red.rounds_won;
        }
    }
    else {
        resultado = matchInfo.red.has_won;
        if (resultado == true){
            leftNumbers = matchInfo.red.rounds_won;
            rightNumbers = matchInfo.blue.rounds_won;
        }
        else {
            leftNumbers = matchInfo.red.rounds_won;
            rightNumbers = matchInfo.blue.rounds_won;
        }
    }
    pintarMarcador(leftNumbers, rightNumbers, resultado, ciclo);
}
const colocarMapa = (mapa, ciclo) => {
    const imgContainer = document.querySelectorAll(".map-img-container");
    mapList().then((data) => {
        data = data.data;
        data.forEach((datos) => {
            if (datos.displayName == mapa){
                console.log("MAPA ENCONTRADO");
                imgContainer[ciclo].setAttribute("src", datos.splash);
            }
        })
    })
}
const colocarNombre = (nombre, ciclo) => {
    const character = document.querySelectorAll(".character");
    character[ciclo].innerText = nombre;
}
const bajarTelon = () => {
    bajar();
}
const colocarRango = (nombre, tag, ciclo) => {
    if (ciclo == 4){
        const rang = document.querySelectorAll(".img-rango");
        const rangText = document.querySelectorAll(".rang-text");
        mmrHistory(nombre, tag).then((data) => {
            data = data.data;
            for (let i = 0; i <= 4; i++){
                rang[i].setAttribute("src", data[i].images.small);
                rangText[i].innerText = data[i].currenttierpatched;
            }
        })
        bajarTelon();
    }
}
const capturarPlayer = () => {
    let nombrePlayer = document.querySelector("#input-nombre").value;
    let tagPlayer = document.querySelector("#input-tag").value;
    if (nombrePlayer.includes(" ")){
        nombrePlayer.replace("%20", " ");
    }
    matchHistory(nombrePlayer, tagPlayer).then((data) => {
        data = data.data;
        console.log(data);
        for (let i = 0 ; i < 5 ; i++){
            let ciclo = i;
            colocarMapa(data[i].metadata.map, ciclo);
            colocarRango(nombrePlayer, tagPlayer, ciclo);
            for (let k = 0 ; k < 10 ; k++){
                if (data[i].players.all_players[k].name == nombrePlayer){
                    colocarNombre(data[i].players.all_players[k].character, ciclo);
                    const danhoHecho = data[i].players.all_players[k].damage_made;
                    const danhoRecivido = data[i].players.all_players[k].damage_received
                    obtenerDanho(i, danhoHecho, danhoRecivido);
                    colocarImagen(data[i].players.all_players[k].character, ciclo);
                    const team = data[i].players.all_players[k].team;
                    addMarcador(team, data[i].teams, ciclo);
                }
            }
        }
    })    
}
/* const loader = () => {
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
} */

const inputButton = document.querySelector("#input-button");
inputButton.addEventListener("click", capturarPlayer);
/* inputButton.addEventListener("click", loader); */