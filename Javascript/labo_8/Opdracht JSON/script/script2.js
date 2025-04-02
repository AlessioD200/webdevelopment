const setup = () => {
    const jsonString = `{
  "voornaam": "Jan",
  "familienaam": "Janssens",
  "geboorteDatum": "1993-12-31T00:00:00.000Z",
  "adres": {
    "straat": "Kerkstraat 13",
    "postcode": "8500",
    "gemeente": "Kortrijk"
  },
  "isIngeschreven": true,
  "namenVanExen": ["Sofie", "Berta", "Philip", "Albertoooo"],
  "aantalAutos": 2
}`;

    const student2 = JSON.parse(jsonString);

    student2.geboorteDatum = new Date(student2.geboorteDatum);

    console.log(`Naam: ${student2.voornaam} ${student2.familienaam}`);
    console.log(`Geboortedatum: ${student2.geboorteDatum.toISOString()}`);
    console.log(`Woonplaats: ${student2.adres.gemeente}`);
}
window.addEventListener("load", setup);