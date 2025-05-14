const setup = () => {
    let button = document.getElementById("btn");
    let search = document.getElementById("search");
    let clearBtn = document.getElementById("clearBtn");

    const maakKaart = (site, searchTerm) => {
        const kaart = document.createElement('div');
        kaart.classList.add('history-card');
        kaart.style.backgroundColor = site === 'YouTube' ? 'red' :
            site === 'X' ? 'blue' :
                site === 'Google' ? 'green' :
                    'pink';

        const title = document.createElement('h3');
        title.classList.add('title');
        title.textContent = site;

        const searchP = document.createElement('p');
        searchP.textContent = searchTerm;
        searchP.classList.add('search');

        const linkButton = document.createElement('button');
        linkButton.textContent = 'Go!';
        linkButton.classList.add('link-button');
        linkButton.addEventListener('click', () => {
            const url = genereerURL(site, searchTerm);
            if (url) {
                window.open(url, '_blank');
            }
        });

        kaart.appendChild(title);
        kaart.appendChild(searchP);
        kaart.appendChild(linkButton);
        document.body.appendChild(kaart);
    };

    const genereerURL = (site, zoekterm) => {
        switch (site) {
            case 'YouTube':
                return "https://www.youtube.com/results?search_query=" + zoekterm;
            case 'X':
                return "https://x.com/hashtag/" + zoekterm;
            case 'Google':
                return "https://google.com/search?q=" + zoekterm;
            case 'Instagram':
                return "https://instagram.com/explore/tags/" + zoekterm;
            default:
                return null;
        }
    };

    const slaKaartenOp = (site, zoekterm) => {
        let kaarten = JSON.parse(localStorage.getItem('geschiedenis')) || [];
        kaarten.push({ site, zoekterm });
        localStorage.setItem('geschiedenis', JSON.stringify(kaarten));
    };

    const laadKaartenVanLocalStorage = () => {
        const kaarten = JSON.parse(localStorage.getItem('geschiedenis')) || [];
        kaarten.forEach(kaart => maakKaart(kaart.site, kaart.zoekterm));
    };

    const verwijderAlleKaarten = () => {
        localStorage.removeItem('geschiedenis');
        document.querySelectorAll('.history-card').forEach(card => card.remove()); //uit google search gevonden
    };

    button.addEventListener("click", () => {
        let vraag = search.value.trim();

        let zoekterm = "";
        let site = "";

        if (vraag.startsWith("/y ") || vraag.startsWith("/youtube ")) {
            zoekterm = vraag.substring(vraag.indexOf(" ") + 1);
            site = "YouTube";
        } else if (vraag.startsWith("/x ")) {
            zoekterm = vraag.substring(vraag.indexOf(" ") + 1);
            site = "X";
        } else if (vraag.startsWith("/g ") || vraag.startsWith("/google ")) {
            zoekterm = vraag.substring(vraag.indexOf(" ") + 1);
            site = "Google";
        } else if (vraag.startsWith("/i ") || vraag.startsWith("/instagram ")) {
            zoekterm = vraag.substring(vraag.indexOf(" ") + 1);
            site = "Instagram";
        } else if (vraag.startsWith("/")) {
            alert("Unknown command prefix");
        } else {
            alert("invalid command");
        }

        if (site && zoekterm) {
            maakKaart(site, zoekterm);
            slaKaartenOp(site, zoekterm);

            const url = genereerURL(site, zoekterm);
            if (url) {
                window.open(url, '_blank');
            }
        }
    });

    clearBtn.addEventListener("click", verwijderAlleKaarten);

    laadKaartenVanLocalStorage();
};


window.addEventListener("load", setup);