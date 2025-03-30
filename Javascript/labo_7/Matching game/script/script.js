const AANTAL_KAARTEN = 6;
const IMAGE_PATH = "img/";

let kaarten = [];
let geselecteerdeKaarten = [];
let isBusy = false;

const setup = () => {
    kaarten = genereerKaarten();
    shuffle(kaarten);
    toonSpeelveld();
};

const genereerKaarten = () => {
    let images = [];
    for (let i = 1; i <= AANTAL_KAARTEN; i++) {
        images.push(`kaart${i}.jpg`, `kaart${i}.jpg`);
    }
    return images;
};

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const toonSpeelveld = () => {
    const speelveld = document.getElementById("speelveld");
    speelveld.innerHTML = "";

    kaarten.forEach((kaart, index) => {
        let kaartElement = document.createElement("div");
        kaartElement.classList.add("kaart");
        kaartElement.dataset.index = index;
        kaartElement.innerHTML = `<img src="${IMAGE_PATH}achterkant.jpg" class="achterkant" alt="achterkant kaart">` +
            `<img src="${IMAGE_PATH}${kaart}" class="voorkant verborgen" alt="kaart">`;
        kaartElement.addEventListener("click", draaiKaartOm);
        speelveld.appendChild(kaartElement);
    });
};

const draaiKaartOm = (event) => {
    if (isBusy) return;
    let kaartElement = event.currentTarget;
    if (kaartElement.classList.contains("open")) return;

    kaartElement.classList.add("open");
    kaartElement.querySelector(".achterkant").classList.add("verborgen");
    kaartElement.querySelector(".voorkant").classList.remove("verborgen");

    geselecteerdeKaarten.push(kaartElement);

    if (geselecteerdeKaarten.length === 2) {
        controleerMatch();
    }
};

const controleerMatch = () => {
    isBusy = true;
    let [kaart1, kaart2] = geselecteerdeKaarten;
    let index1 = kaart1.dataset.index;
    let index2 = kaart2.dataset.index;

    if (kaarten[index1] === kaarten[index2]) {
        setTimeout(() => {
            kaart1.classList.add("verdwenen");
            kaart2.classList.add("verdwenen");
            resetGeselecteerdeKaarten();
            controleerEindeSpel();
        }, 1000);
    } else {
        setTimeout(() => {
            kaart1.classList.remove("open");
            kaart2.classList.remove("open");
            kaart1.querySelector(".achterkant").classList.remove("verborgen");
            kaart1.querySelector(".voorkant").classList.add("verborgen");
            kaart2.querySelector(".achterkant").classList.remove("verborgen");
            kaart2.querySelector(".voorkant").classList.add("verborgen");
            resetGeselecteerdeKaarten();
        }, 1000);
    }
};

const resetGeselecteerdeKaarten = () => {
    geselecteerdeKaarten = [];
    isBusy = false;
};

const controleerEindeSpel = () => {
    if (document.querySelectorAll(".kaart:not(.verdwenen)").length === 0) {
        alert("Gefeliciteerd! Je hebt het spel voltooid.");
    }
};

window.addEventListener("load", setup);
