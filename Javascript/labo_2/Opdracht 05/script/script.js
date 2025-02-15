const setup = () => {
    let button = document.getElementById("btnWijzig");
    button.addEventListener("click", wijzigTekst);
}

const wijzigTekst = () => {
    let pElement = document.getElementById("txtOutput");
    pElement.innerHTML = "Welkom!";
}

window.addEventListener("load", setup);