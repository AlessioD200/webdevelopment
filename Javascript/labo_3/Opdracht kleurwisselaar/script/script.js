const setup = () => {
    let knoppen = document.querySelectorAll("button"); // Selecteer alle knoppen

    knoppen.forEach((knop) => {
        knop.addEventListener("click", () => {
            if (knop.style.backgroundColor === "white" || knop.style.backgroundColor === "") {
                knop.style.backgroundColor = "lightblue";
            } else {
                knop.style.backgroundColor = "white";
            }
        });
    });
}

window.addEventListener("load", setup);