const setup = () => {
    document.getElementById("btnBewaar").addEventListener("click", bewaarBewerktePersoon);
    document.getElementById("btnNieuw").addEventListener("click", bewerkNieuwePersoon);
    document.getElementById("lstPersonen").addEventListener("change", veranderPersoon);
    vulLijst();
};
let personen = [
    {
        voornaam: "Jan",
        familienaam: "Janssens",
        geboorteDatum: new Date("2010-10-10"),
        email: "jan@example.com",
        aantalKinderen: 0
    },
    {
        voornaam: "Mieke",
        familienaam: "Mickelsen",
        geboorteDatum: new Date("1980-01-01"),
        email: "mieke@example.com",
        aantalKinderen: 1
    },
    {
        voornaam: "Piet",
        familienaam: "Pieters",
        geboorteDatum: new Date("1970-12-31"),
        email: "piet@example.com",
        aantalKinderen: 2
    }
];

let geselecteerdeIndex = -1;

const vulLijst = () => {
    let lstPersonen = document.getElementById("lstPersonen");
    lstPersonen.innerHTML = "";

    personen.forEach((persoon, index) => {
        let option = document.createElement("option");
        option.textContent = `${persoon.voornaam} ${persoon.familienaam}`;
        option.value = index.toString();
        lstPersonen.appendChild(option);
    });
};

const toonPersoon = (index) => {
    if (index >= 0 && index < personen.length) {
        let persoon = personen[index];
        document.getElementById("txtVoornaam").value = persoon.voornaam;
        document.getElementById("txtFamilienaam").value = persoon.familienaam;
        document.getElementById("txtGeboorteDatum").value = persoon.geboorteDatum.toISOString().split("T")[0];
        document.getElementById("txtEmail").value = persoon.email;
        document.getElementById("txtAantalKinderen").value = persoon.aantalKinderen;
        geselecteerdeIndex = index;
    }
};

const veranderPersoon = () => {
    let lstPersonen = document.getElementById("lstPersonen");
    toonPersoon(lstPersonen.value);
};

const bewerkNieuwePersoon = () => {
    document.getElementById("txtVoornaam").value = "";
    document.getElementById("txtFamilienaam").value = "";
    document.getElementById("txtGeboorteDatum").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtAantalKinderen").value = "";
    geselecteerdeIndex = -1;
};

const bewaarBewerktePersoon = () => {
    let voornaam = document.getElementById("txtVoornaam").value.trim();
    let familienaam = document.getElementById("txtFamilienaam").value.trim();
    let geboorteDatumStr = document.getElementById("txtGeboorteDatum").value.trim();
    let email = document.getElementById("txtEmail").value.trim();
    let aantalKinderenStr = document.getElementById("txtAantalKinderen").value.trim();
    let geboorteDatum = new Date(geboorteDatumStr);
    let aantalKinderen = parseInt(aantalKinderenStr, 10);

    if (!voornaam || !familienaam || isNaN(geboorteDatum.getTime()) || !email || isNaN(aantalKinderen)) {
        alert("Vul alle velden correct in!");
        return;
    }

    if (geselecteerdeIndex === -1) {
        let persoon = {
            voornaam: voornaam,
            familienaam: familienaam,
            geboorteDatum: geboorteDatum,
            email: email,
            aantalKinderen: aantalKinderen
        };
        personen.push(persoon);
    } else {
        let persoon = personen[geselecteerdeIndex];
        persoon.voornaam = voornaam;
        persoon.familienaam = familienaam;
        persoon.geboorteDatum = geboorteDatum;
        persoon.email = email;
        persoon.aantalKinderen = aantalKinderen;
    }

    vulLijst();
    bewerkNieuwePersoon();
};

window.addEventListener("load", setup);