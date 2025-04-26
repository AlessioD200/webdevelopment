const setup = () => {
    const sliders = document.querySelectorAll(".slider");
    const saveButton = document.getElementById("bewaarKleur");
    const savedColorsContainer = document.getElementById("bewaardeKleuren");

    // Herstel sliders en favoriete kleuren bij laden van pagina
    restoreSliderValues();
    restoreFavorites();

    sliders.forEach(slider => {
        slider.addEventListener("input", () => {
            update();
            saveSliderValues();
        });
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
        saveSliderValues();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "deleteBtn";
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        swatch.remove();
        saveFavorites();
    });

    swatch.appendChild(deleteBtn);
    bewaardeKleuren.appendChild(swatch);

    saveFavorites();
};

// Sla slider waarden op in localStorage
const saveSliderValues = () => {
    const sliders = document.querySelectorAll(".slider");
    const sliderValues = Array.from(sliders).map(slider => slider.value);
    localStorage.setItem("sliderValues", JSON.stringify(sliderValues));
};

// Herstel slider waarden vanuit localStorage
const restoreSliderValues = () => {
    const sliderValues = JSON.parse(localStorage.getItem("sliderValues"));
    if (sliderValues) {
        const sliders = document.querySelectorAll(".slider");
        sliders.forEach((slider, index) => {
            slider.value = sliderValues[index];
        });
        update();
    }
};

// Sla favoriete kleuren op in localStorage
const saveFavorites = () => {
    const swatches = document.querySelectorAll(".swatch");
    const colors = Array.from(swatches).map(swatch => swatch.style.backgroundColor);
    localStorage.setItem("favoriteColors", JSON.stringify(colors));
};

// Herstel favoriete kleuren vanuit localStorage
const restoreFavorites = () => {
    const favoriteColors = JSON.parse(localStorage.getItem("favoriteColors"));
    if (favoriteColors) {
        const bewaardeKleuren = document.getElementById("bewaardeKleuren");

        favoriteColors.forEach(color => {
            const swatch = document.createElement("div");
            swatch.className = "swatch";
            swatch.style.backgroundColor = color;

            const rgbValues = color.match(/\d+/g);

            swatch.addEventListener("click", () => {
                const sliders = document.querySelectorAll(".slider");
                sliders[0].value = rgbValues[0];
                sliders[1].value = rgbValues[1];
                sliders[2].value = rgbValues[2];
                update();
                saveSliderValues();
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            deleteBtn.className = "deleteBtn";
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                swatch.remove();
                saveFavorites();
            });

            swatch.appendChild(deleteBtn);
            bewaardeKleuren.appendChild(swatch);
        });
    }
};

window.addEventListener("DOMContentLoaded", setup);