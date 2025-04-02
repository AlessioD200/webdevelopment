const setup = () => {

    let geboorteDatum = new Date(2006, 8, 10);

    const updateDate = () => {
        let date = new Date();
        let verschilSeconde = date - geboorteDatum;
        let verschilDatum = Math.floor(verschilSeconde / (1000 * 60 * 60 * 24));
        const text = document.getElementById('datum');
        text.innerText = "Alessio is " + verschilDatum + " dagen oud";
        console.log(`Alessio is ${verschilDatum} dagen oud`);
    }

    updateDate();
    setInterval(updateDate, 500);
}
window.addEventListener("load", setup);