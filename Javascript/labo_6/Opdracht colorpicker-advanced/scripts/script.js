const setup = () => {
    const sliders = document.querySelectorAll(".slider");
    const saveButton = document.getElementById("bewaarKleur");

    sliders.forEach(slider => {
        slider.addEventListener("input", update);
    });
    saveButton.addEventListener("click", bewaarKleur);

    update();
};

const update = () => {
    const sliders = document.querySelectorAll(".slider");
    const red = sliders[0].value;
    const green = sliders[1].value;
    const blue = sliders[2].value;
    const colorDemo = document.querySelector(".colorDemo");

    colorDemo.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

    document.getElementById("red").textContent = red;
    document.getElementById("green").textContent = green;
    document.getElementById("blue").textContent = blue;
};

const bewaarKleur = () => {
    const sliders = document.querySelectorAll(".slider");
    const colorDemo = document.querySelector(".colorDemo");
    const color = colorDemo.style.backgroundColor;
    const bewaardeKleuren = document.getElementById("bewaardeKleuren");

    const swatch = document.createElement("div");
    swatch.className = "swatch";
    swatch.style.backgroundColor = color;

    const rgbValues = color.match(/\d+/g);

    swatch.addEventListener("click", () => {
        sliders[0].value = rgbValues[0];
        sliders[1].value = rgbValues[1];
        sliders[2].value = rgbValues[2];
        update();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "deleteBtn";
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        swatch.remove();
    });

    swatch.appendChild(deleteBtn);
    bewaardeKleuren.appendChild(swatch);
};

window.addEventListener("DOMContentLoaded", setup);