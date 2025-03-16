const setup = () => {
    const knop = document.getElementById("toonResultaat");

    knop.addEventListener("click", () => {
        let isRoker = document.getElementById("roker").checked ? "is roker" : "is geen roker";
        const taalElement = document.querySelector('input[name="taal"]:checked');
        const taal = taalElement ? taalElement.value : "Geen taal geselecteerd";
        const buurland = document.getElementById("buurland").value;
        const bestelling = Array.from(document.getElementById("bestelling").selectedOptions).map(optie => optie.value);

        console.log(isRoker);
        console.log("Gekozen taal:", taal);
        console.log("Favoriete buurland:", buurland);
        console.log("Bestelling bestaat uit: ", bestelling);
    });
};

window.addEventListener("load", setup);