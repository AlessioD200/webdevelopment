const setup =  () => {
    let startBtn = document.getElementById("start");
    startBtn.addEventListener("click", updateStart);

    let restartBtn = document.getElementById("restart");
    restartBtn.addEventListener("click", restartQuiz);

    let resetBtn = document.getElementById("reset");
    resetBtn.addEventListener("click", () => {
        localStorage.removeItem('highscores');
        const existingScoresList = document.querySelector('#highscores .list-group');
        if (existingScoresList) {
            existingScoresList.remove();
        }
    });

    const existingHighscores = JSON.parse(localStorage.getItem('highscores'));
    if (existingHighscores) {
        displayHighscores(existingHighscores);
    }
}

const updateStart = () => {
    const wijzigClass = document.getElementById("start");
    wijzigClass.style.display = "none";
    const quizDiv = document.getElementById("quiz");
    quizDiv.classList.remove("d-none");
    changeDate();
    questions();
    antwoorden();
    window.currentScore = 0;
    window.currentQuestion = 0;
}

const restartQuiz = () => {
    const scoreContainer = document.querySelector('.container.d-none');
    scoreContainer.classList.add('d-none');
    
    const quizDiv = document.getElementById("quiz");
    quizDiv.classList.remove("d-none");
    
    const questionsList = document.getElementById("questions");
    questionsList.innerHTML = '';
    
    vragen.forEach(vraag => {
        vraag.selected = "";
        vraag.answered = false;
    });
    
    window.currentScore = 0;
    window.currentQuestion = 0;
    
    questions();
    antwoorden();
}

const updateHighscores = (score) => {
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    
    const newScore = {
        score: score,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        percentage: ((score / vragen.length) * 100).toFixed(1)
    };
    
    highscores.push(newScore);
    highscores.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`);
    });
    
    highscores = highscores.slice(0, 5);
    localStorage.setItem('highscores', JSON.stringify(highscores));
    displayHighscores(highscores);
}

const displayHighscores = (highscores) => {
    const highscoresContainer = document.getElementById('highscores');
    const scoresList = document.createElement('div');
    scoresList.className = 'list-group mt-3';
    
    highscores.forEach((score, index) => {
        const scoreElement = document.createElement('div');
        scoreElement.className = 'list-group-item';
        scoreElement.textContent = `#${index + 1}: ${score.score}/${vragen.length} (${score.percentage}%) - ${score.date} ${score.time}`;
        scoresList.appendChild(scoreElement);
    });
    
    const existingScoresList = highscoresContainer.querySelector('.list-group');
    if (existingScoresList) {
        existingScoresList.remove();
    }
    highscoresContainer.appendChild(scoresList);
}

const questions = () => {
   const addVraag = document.getElementById("quiz");
   addVraag.classList.remove("d-none")
    vraag();
}

const vraag = () => {
    const vraag = document.getElementById("questions");
    const card1 = document.getElementsByClassName("card-header");
    const vraagstelling = document.getElementsByClassName("card-body");
    updateQuestionDisplay(0);
    
    for (let i = 0; i < vragen.length; i++) {
        const li = document.createElement("li");
        li.setAttribute("data-question", i);
        li.className = 'list-group-item';
        if (i === 0) {
            li.classList.add('bg-info');
        }
        li.textContent = `Vraag ${i + 1}`;
        vraag.appendChild(li);
    }
    
    updateAnswers(0);
    
    const opslaanButton = document.querySelector('.btn-success');
    opslaanButton.addEventListener('click', checkAnswerAndProgress);
}

const updateQuestionDisplay = (questionIndex) => {
    const card1 = document.getElementsByClassName("card-header");
    const vraagstelling = document.getElementsByClassName("card-body");
    card1[0].textContent = `Vraag ${questionIndex + 1}`;
    vraagstelling[0].innerHTML = vragen[questionIndex].question;
}

const updateQuestionAndAnswers = (questionIndex) => {
    const allQuestions = document.querySelectorAll("#questions .list-group-item");
    allQuestions.forEach(q => q.classList.remove('bg-info'));
    allQuestions[questionIndex].classList.add('bg-info');
    const card1 = document.getElementsByClassName("card-header");
    const vraagstelling = document.getElementsByClassName("card-body");
    card1[0].textContent = `Vraag ${questionIndex + 1}`;
    vraagstelling[0].innerHTML = vragen[questionIndex].question;


    updateAnswers(questionIndex);
}

const updateAnswers = (questionIndex) => {
    const antwoordenContainer = document.getElementById("answers");
    const vraagData = vragen[questionIndex];
    

    antwoordenContainer.innerHTML = '';
    

    vraagData.answers.forEach((antwoord) => {
        const li = document.createElement("li");
        li.setAttribute("data-answer", antwoord);
        li.className = 'list-group-item';
        li.textContent = antwoord;
        li.addEventListener("click", selectAnswer);
        antwoordenContainer.appendChild(li);
    });
}

const selectAnswer = (event) => {
    const li = event.target;
    const selectedAnswer = li.getAttribute("data-answer");
    const currentQuestion = document.querySelector(".card-header").textContent;
    const questionIndex = parseInt(currentQuestion.split(" ")[1]) - 1;
    
    vragen[questionIndex].selected = selectedAnswer;
    
    const allAnswers = document.querySelectorAll("#answers .list-group-item");
    allAnswers.forEach(answer => {
        answer.classList.remove("bg-success", "bg-danger", "bg-info");
    });
    
    li.classList.add("bg-info");
}

const checkAnswer = () => {
    const currentQuestion = document.querySelector(".card-header").textContent;
    const questionIndex = parseInt(currentQuestion.split(" ")[1]) - 1;
    const vraagData = vragen[questionIndex];

    const selectedAnswerElement = document.querySelector("#answers .list-group-item.bg-info");

    if (selectedAnswerElement) {
        const selectedAnswer = selectedAnswerElement.getAttribute("data-answer");

        selectedAnswerElement.classList.remove("bg-info");

        if (selectedAnswer === vraagData.correct) {
            selectedAnswerElement.classList.add("bg-success");
        } else {
            selectedAnswerElement.classList.add("bg-danger");
        }
    }
}

const checkAnswerAndProgress = () => {
    const selectedAnswerElement = document.querySelector("#answers .list-group-item.bg-info");
    
    if (selectedAnswerElement) {
        const selectedAnswer = selectedAnswerElement.getAttribute("data-answer");
        const questionElement = document.querySelector(`#questions .list-group-item[data-question="${window.currentQuestion}"]`);
        
        const isCorrect = selectedAnswer === vragen[window.currentQuestion].correct;
        
        if (isCorrect) {
            questionElement.classList.remove('bg-info');
            questionElement.classList.add('bg-success');
            window.currentScore++;
        } else {
            questionElement.classList.remove('bg-info');
            questionElement.classList.add('bg-danger');
        }
        
        vragen[window.currentQuestion].answered = true;
        vragen[window.currentQuestion].selected = selectedAnswer;
        
        if (window.currentQuestion < vragen.length - 1) {
            window.currentQuestion++;
            updateQuestionDisplay(window.currentQuestion);
            updateAnswers(window.currentQuestion);
            const nextQuestionElement = document.querySelector(`#questions .list-group-item[data-question="${window.currentQuestion}"]`);
            nextQuestionElement.classList.add('bg-info');
        } else {
            console.log("Score: " + window.currentScore);
        }
    }
}



const changeDate = () => {
    const date = document.getElementById("started");
    date.innerText = new Date().toLocaleDateString();
}
const antwoorden = () => {
    updateAnswers(0)
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