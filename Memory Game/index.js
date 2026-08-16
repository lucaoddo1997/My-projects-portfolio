let cardsUncovered = [];
let attempts = 0;
let gameOver = false;

const gameArea = document.getElementById("game_area");
const difficulty = new URLSearchParams(window.location.search).get("difficulty");
if (!difficulty) {
    window.location.href = "index.html";
}

let numbers = [];
if (difficulty === "veryeasy") {
    for (let i = 1; i <= 5; i++) {
        numbers.push(i, i);
        attempts = 15;
    }
} else if (difficulty === "easy") {
    for (let i = 1; i <= 10; i++) {
        numbers.push(i, i);
        attempts = 25;
    }
} else if (difficulty === "normal") {
    for (let i = 1; i <= 15; i++) {
        numbers.push(i, i);
        attempts = 35;
    }
} else if (difficulty === "hard") {
    for (let i = 1; i <= 20; i++) {
        numbers.push(i, i);
        attempts = 45;
    }
} else if (difficulty === "veryhard") {
    for (let i = 1; i <= 25; i++) {
        numbers.push(i, i);
        attempts = 55;
    }
}
document.getElementById("number_of_attempts").textContent = attempts;

numbers.sort(() => Math.random() - 0.5);
numbers.forEach(num => gameArea.innerHTML += `<div class="card" data-num="${num}">?</div>`);
const cards = document.querySelectorAll(".card");

function restart() {
    document.location.reload();
}

function checkVictoryCondition() {
    if (document.querySelectorAll(".uncovered").length === cards.length) {
        alert("YOU HAVE WON!");
    } else if (document.querySelectorAll(".uncovered").length !== cards.length && attempts === 0) {
        gameOver = true;
        alert("YOU HAVE LOST!");
    }
}


cards.forEach(card => {
    card.addEventListener("click", function () {
        if (gameOver) {
            return;
        }
        if (card.classList.contains("uncovered") || cardsUncovered.length === 2) {
            return;
        }

        card.classList.add("uncovered");
        card.textContent = card.dataset.num;
        cardsUncovered.push(card);

        if (cardsUncovered.length === 2) {
            attempts--;
            document.getElementById("number_of_attempts").textContent = attempts;

            if (cardsUncovered[0].dataset.num === cardsUncovered[1].dataset.num) {
                cardsUncovered = [];

                checkVictoryCondition();

            } else {
                setTimeout(() => {
                    cardsUncovered[0].classList.remove("uncovered");
                    cardsUncovered[1].classList.remove("uncovered");
                    cardsUncovered[0].textContent = "?";
                    cardsUncovered[1].textContent = "?";
                    cardsUncovered = [];

                    checkVictoryCondition();

                }, 750);
            }
        }
    });
});
