const setup = () => {
    const herberekenKnop = document.getElementsByTagName("button")[0];

    herberekenKnop.addEventListener("click", () => {
        const prijzen = document.getElementsByClassName("prijs");
        const aantallen = document.getElementsByClassName("aantal");
        const btwTarieven = document.getElementsByClassName("btw");
        const subtotals = document.getElementsByClassName("subtotaal");
        const totaalCel = document.getElementsByClassName("totaal")[0];

        let totaal = 0;

        for (let i = 0; i < prijzen.length; i++) {
            const prijs = parseFloat(prijzen[i].textContent);
            const aantal = parseInt(aantallen[i].value);
            const btw = parseInt(btwTarieven[i].textContent);

            let subtotaal = (prijs * aantal) * (1 + btw / 100);
            subtotals[i].textContent = `${subtotaal.toFixed(2)} Eur`;

            totaal += subtotaal;
        }

        totaalCel.textContent = `${totaal.toFixed(2)} Eur`;
    });
}
window.addEventListener("load", setup);