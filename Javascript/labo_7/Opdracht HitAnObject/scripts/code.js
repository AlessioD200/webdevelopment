const setup = () => {
    window.addEventListener("resize", updateSize);
    updateSize();

    let startGame = document.getElementById("startBtn");
    if (startGame) {
        startGame.addEventListener("click", startBtn);
    }
};

const imageSources = ["./images/1.png", "./images/2.png", "./images/3.png", "./images/4.png", "./images/0.png"]; // "0.png" is the bomb
let clickCount = 0;
let bombTimer = null;

const updateSize = () => {
    let playField = document.getElementById("playField");
};

const spawnSprite = () => {
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

    if (bombTimer) {
        clearTimeout(bombTimer);
        bombTimer = null;
    }

    if (newImage === "./images/0.png") {
        bombTimer = setTimeout(() => {
            // Ensure it's still the bomb before replacing it
            if (sprite.src.endsWith("0.png")) {
                spawnSprite();
            }
        }, 2500);

        sprite.onclick = () => {
            clearTimeout(bombTimer);
            alert("GAME OVER!");
            resetGame();
        };
    } else {
        sprite.onclick = () => {
            updateClicks();
            spawnSprite();
        };
    }
};

const updateClicks = () => {
    clickCount++;
    let clickDisplay = document.getElementById("clicks");
    if (clickDisplay) {
        clickDisplay.textContent = `Aantal clicks: ${clickCount}`;
    }
};

const resetGame = () => {
    clickCount = 0;
    updateClicks();
    document.getElementById("startBtn").style.display = "block";
    document.getElementById("deleteBomb").style.display = "block";

    let sprite = document.getElementById("spriteImg");
    if (sprite) sprite.remove();
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
            spawnSprite();
        }
    }
};

window.addEventListener("load", setup);
