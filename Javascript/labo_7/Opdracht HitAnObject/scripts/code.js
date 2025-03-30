const setup = () => {
    window.addEventListener("resize", updateSize);
    updateSize();

    let playField = document.getElementById("playField");
    let startGame = document.getElementById("startBtn");

    if (startGame) {
        startGame.addEventListener("click", startBtn);
        document.getElementById("clicks").addEventListener("click", updateClicks);
    }
};

const imageSources = ["./images/1.png", "./images/2.png", "./images/3.png", "./images/4.png", "./images/0.png"];

const updateSize = () => {
    let playField = document.getElementById("playField");
    playField.style.width = window.innerWidth + "px";
    playField.style.height = window.innerHeight + "px";
};

const moveSprite = () => {
    let sprite = document.getElementById("spriteImg");
    if (!sprite) return;

    let playField = document.getElementById("playField");
    let maxLeft = playField.clientWidth - sprite.offsetWidth;
    let maxTop = playField.clientHeight - sprite.offsetHeight;

    let left = Math.floor(Math.random() * maxLeft);
    let top = Math.floor(Math.random() * maxTop);

    sprite.style.left = left + "px";
    sprite.style.top = top + "px";

    let randomIndex = Math.floor(Math.random() * imageSources.length);
    let newImage = imageSources[randomIndex];

    sprite.src = newImage;

    if (newImage === "./images/0.png") {
        let bombTimer = setTimeout(() => {
            if (sprite.src === newImage) {
                moveSprite();
            }
        }, 3000);

        sprite.addEventListener("click", () => {
            clearTimeout(bombTimer@);
            window.alert("GAME OVER!");
            clickCount = 0;
            updateClicks();
        });
    } else {
        updateClicks();
    }
};

let clickCount = 0;

const updateClicks = () => {
    clickCount++;
    let clickDisplay = document.getElementById("clicks");
    if (clickDisplay) {
        clickDisplay.textContent = `Aantal clicks: ${clickCount}`;
    }
};

const startBtn = () => {
    let startGame = document.getElementById("startBtn");
    let bombDelete = document.getElementById("deleteBomb");
    let playField = document.getElementById("playField");

    if (startGame) {
        startGame.style.display = "none";
        bombDelete.style.display = "none";
    }

    if (playField) {
        let existingSprite = document.getElementById("spriteImg");
        if (!existingSprite) {
            let sprite = document.createElement("img");
            sprite.id = "spriteImg";
            sprite.src = imageSources[0];
            sprite.classList.add("sprite");
            sprite.style.position = "absolute";

            playField.appendChild(sprite);
            sprite.addEventListener("click", moveSprite);
        }
    }
};

window.addEventListener("load", setup);