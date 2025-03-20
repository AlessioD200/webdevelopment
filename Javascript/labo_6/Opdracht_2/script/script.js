const setup = () => {
    let colorChange = document.querySelector("ul");
    colorChange.style.color = "red";

    let nieuweAfbeelding = document.createElement("img");
    nieuweAfbeelding.src = "./img/test.png";
    document.body.appendChild(nieuweAfbeelding);
}

window.addEventListener("load", setup);