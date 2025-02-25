const setup = () => {
    let tekst = "De man van An geeft geen hand aan ambetante verwanten";
    let zoekterm = "an";
    let count = 0;
    let index = 0;

    while (index !== -1) {
        index = tekst.toLowerCase().indexOf(zoekterm, index);
        if (index !== -1) {
            count++;
            index++;
        }
    }
    console.log(count);

    let text = "De man van An geeft geen hand aan ambetante verwanten";
    let search = "an";
    let tellen = 0;
    let i = text.length;

    while (i !== -1) {
        i = tekst.toLowerCase().lastIndexOf(search, i - 1);
        if (i !== -1) {
            tellen++;
        }
    }

    console.log(tellen);
}


window.addEventListener("load", setup);