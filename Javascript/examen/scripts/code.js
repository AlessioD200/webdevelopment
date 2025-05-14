const setup =  () => {
    let btn = document.getElementById("start");
    btn.addEventListener("click", updateStart);
}

const updateStart = () => {
    const wijzigClass = document.getElementById("start");
    wijzigClass.style.display = "none";
    changeDate();
    questions();
    antwoorden();
}

const questions = () => {
   const addVraag = document.getElementById("quiz");
   addVraag.classList.remove("d-none")
    vraag();
}

const vraag = () => {
    const vraag = document.getElementById("questions");
    const card1 = document.getElementsByClassName("card-header");
    for (let i = 0; i < vragen.length; i++) {
        card1[0].textContent = `Vraag ${i + 1}`;
    }
    const vraagstelling = document.getElementsByClassName("card-body");
    vraagstelling[0].innerHTML = vragen[0].question;

    for (let i = 0; i < vragen.length; i++) {
        const li = document.createElement("li");
        li.setAttribute("data-question", i);
        li.className = 'list-group-item';
        li.textContent = `Vraag ${i + 1}`;
        vraag.appendChild(li);
        shuffle()
    }
}

const antwoorden = () => {
    const antwoorden = document.getElementById("answers");
    let i = 0;
        const li = document.createElement("li");
        li.className = 'list-group-item';
        li.textContent = vragen[i].answers[0];
        vragen[i].answers = [vragen[i].answers[0], vragen[i].correct]
        antwoorden.appendChild(li);

}

const shuffle = () => {
    let i = vragen.length;
    while (i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [vragen[i], vragen[j]] = [vragen[j], vragen[i]];
    }
}

const changeDate = () => {
    const date = document.getElementById("started");
    date.innerText = new Date().toLocaleDateString();
}


const vragen = [
    {
        question: "Wie is de hoofdpersoon in Final Fantasy VII Remake?",
        answers: ["Cloud Strife", "Sephiroth", "Tifa Lockhart"],
        correct: "Cloud Strife",
        selected: ""
    },
    {
        question: "Welke wereld wordt verkend in Final Fantasy XV?",
        answers: ["Gaia", "Eos", "Spira", "Cocoon"],
        correct: "Eos",
        selected: ""
    },
    {
        question: "Wie is de antagonist in Final Fantasy VIII?",
        answers: ["Ultimecia", "Kefka", "Seymour", "Kuja", "Edea"],
        correct: "Ultimecia",
        selected: ""
    },
    {
        question: "Heeft hoofdrolspeler in Final Fantasy IX een staart?",
        answers: ["Ja", "Nee"],
        correct: "Ja",
        selected: ""
    },
    {
        question: "Hoe heet de stad waarin het verhaal van Final Fantasy VII Remake begint?",
        answers: ["Midgar", "Junon", "Nibelheim", "Wutai"],
        correct: "Midgar",
        selected: ""
    },
    {
        question: "Welke summon is prominent aanwezig in Final Fantasy XV?",
        answers: ["Ifrit", "Shiva", "Ramuh", "Titan"],
        correct: "Ifrit",
        selected: ""
    },
    {
        question: "Wat is de naam van het luchtschip in Final Fantasy VIII?",
        answers: ["Ragnarok", "Highwind", "Invincible", "Falcon"],
        correct: "Ragnarok",
        selected: ""
    },
    {
        question: "Welke rol vervult Cid Highwind in Final Fantasy VII?",
        answers: ["Luchtschipkapitein", "Wapensmid", "Koning"],
        correct: "Luchtschipkapitein",
        selected: ""
    },
    {
        question: "Wat is het kenmerkende aan Cactuar-wezens in de Final Fantasy-serie?",
        answers: ["Ze zijn altijd groen", "Ze gebruiken de aanval 1000 Needles", "Ze zijn planten"],
        correct: "Ze gebruiken de aanval 1000 Needles",
        selected: ""
    },
    {
        question: "Welk Final Fantasy-wezen zorgt, met zijn aanval genaamd Bad Breath, voor verschillende statuseffecten?",
        answers: ["Malboro", "Chocobo", "Behemoth", "Tonberry"],
        correct: "Malboro",
        selected: ""
    }
]

window.addEventListener("load", setup);