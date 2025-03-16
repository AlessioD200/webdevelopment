const setup = () => {
    document.getElementById("btnValideer").addEventListener("click", valideer);
};
const valideer = () => {
    let geldig = true;
    if (!valideerVoornaam()) geldig = false;
    if (!valideerFamilienaam()) geldig = false;
    if (!valideerGeboortedatum()) geldig = false;
    if (!valideerEmail()) geldig = false;
    if (!valideerAantalKinderen()) geldig = false;
    if (geldig) {
        alert("Proficiat!");
    }
};

const valideerVoornaam = () => {
    let txtVoornaam = document.getElementById("txtVoornaam");
    let errVoornaam = document.getElementById("errVoornaam");
    let voornaam = txtVoornaam.value.trim();
    if (voornaam.length > 30) {
        txtVoornaam.classList.add("invalid");
        errVoornaam.innerHTML = "max. 30 karakters";
        return false;
    } else {
        txtVoornaam.classList.remove("invalid");
        errVoornaam.innerHTML = "";
        return true;
    }
};

const valideerFamilienaam = () => {
    let txtFamilienaam = document.getElementById("txtFamilienaam");
    let errFamilienaam = document.getElementById("errFamilienaam");
    let familienaam = txtFamilienaam.value.trim();
    if (familienaam === "") {
        txtFamilienaam.classList.add("invalid");
        errFamilienaam.innerHTML = "verplicht veld";
        return false;
    } else if (familienaam.length > 50) {
        txtFamilienaam.classList.add("invalid");
        errFamilienaam.innerHTML = "max 50 karakters";
        return false;
    } else {
        txtFamilienaam.classList.remove("invalid");
        errFamilienaam.innerHTML = "";
        return true;
    }
};
const valideerGeboortedatum = () => {
    let txtGeboortedatum = document.getElementById("txtGeboortedatum");
    let errGeboortedatum = document.getElementById("errGeboortedatum");
    let geboortedatum = txtGeboortedatum.value.trim();

    let regex = /^\d{4}-\d{2}-\d{2}$/;
    if (geboortedatum === "") {
        txtGeboortedatum.classList.add("invalid");
        errGeboortedatum.innerHTML = "verplicht veld";
        return false;
    } else if (!regex.test(geboortedatum)) {
        txtGeboortedatum.classList.add("invalid");
        errGeboortedatum.innerHTML = "formaat is niet jjjj-mm-dd";
        return false;
    } else {
        txtGeboortedatum.classList.remove("invalid");
        errGeboortedatum.innerHTML = "";
        return true;
    }
};
const valideerEmail = () => {
    let txtEmail = document.getElementById("txtEmail");
    let errEmail = document.getElementById("errEmail");
    let email = txtEmail.value.trim();
    let regex = /^[^\s@]+@[^\s@]+$/;
    if (email === "") {
        txtEmail.classList.add("invalid");
        errEmail.innerHTML = "verplicht veld";
        return false;
    } else if (!regex.test(email)) {
        txtEmail.classList.add("invalid");
        errEmail.innerHTML = "geen geldig email adres";
        return false;
    } else {
        txtEmail.classList.remove("invalid");
        errEmail.innerHTML = "";
        return true;
    }
};

const valideerAantalKinderen = () => {
    let txtAantalKinderen = document.getElementById("txtAantalKinderen");
    let errAantalKinderen = document.getElementById("errAantalKinderen");
    let aantalKinderen = txtAantalKinderen.value.trim();

    if (aantalKinderen === "" || isNaN(aantalKinderen)) {
        txtAantalKinderen.classList.add("invalid");
        errAantalKinderen.innerHTML = "is geen positief getal";
        return false;
    }

    let getal = parseInt(aantalKinderen, 10);
    if (getal < 0) {
        txtAantalKinderen.classList.add("invalid");
        errAantalKinderen.innerHTML = "is geen positief getal";
        return false;
    } else if (getal >= 99) {
        txtAantalKinderen.classList.add("invalid");
        errAantalKinderen.innerHTML = "is te vruchtbaar";
        return false;
    } else {
        txtAantalKinderen.classList.remove("invalid");
        errAantalKinderen.innerHTML = "";
        return true;
    }
};
window.addEventListener("load", setup);
