const dealerDiv = document.getElementById("dealer-hand");
const playerDiv = document.getElementById("player-hand");
const dealerPoints = document.getElementById("dealer-points");
const playerPoints = document.getElementById("player-points");
const messageBox = document.getElementById("messages");
const dealBtn = document.getElementById("deal-button");
const hitBtn = document.getElementById("hit-button");
const standBtn = document.getElementById("stand-button");
const resetBtn = document.querySelector(".reset");

let deck = [];
let dealerHand = [];
let playerHand = [];
let playerDone = false;
let dealerDone = false;

const suits = ["clubs", "spades", "hearts", "diamonds"];
const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace"];

// ================= FUNCTIONS ========================

const createDeck = () => {
    for (const card of cards) {
        for (const suit of suits) {
            let score;
            switch (card) {
                case "ace":
                    score = 11;
                    break;
                case "jack":
                case "queen":
                case "king":
                    score = 10;
                    break;
                default: 
                    score = card;
                    break;
            }
            const obj = {
                value: score,
                url: `images/${card}_of_${suit}.png`
            }
            deck.push(obj);
        }
    }
}

const swap = (array, i, j) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

const shuffleDeck = () => {
    for (let n = 0; n < 100; n++) {
        const randomIdx1 = Math.floor(Math.random() * deck.length);
        const randomIdx2 = Math.floor(Math.random() * deck.length);
        swap(deck, randomIdx1, randomIdx2);
    }
}

const gameStart = () => {
    createDeck();
    shuffleDeck();
    playerHand.push(deck.pop())
    dealerHand.push(deck.pop())
    playerHand.push(deck.pop())
    dealerHand.push(deck.pop())
}

const isThereAnAce = (array) => array.some(obj => obj.value === 11);

const calculateScore = (array) => {
    let totalScore = 0;
    for (const obj of array) {
        totalScore += obj.value;
    }
    if (isThereAnAce(array) && totalScore > 21) return totalScore - 10;
    return totalScore;
}

const dealerPlay = () => {
    dealerDiv.innerHTML = `<img src=${dealerHand[0].url}>`;
    dealerDiv.innerHTML += `<img src=${dealerHand[1].url}>`;
    let dealerScore = calculateScore(dealerHand);
    dealerPoints.innerHTML = `${dealerScore}`;
    while (dealerScore <= 16) {
        dealerHand.push(deck.pop());
        dealerDiv.innerHTML += `<img src=${dealerHand.at(-1).url}>`;
        dealerScore = calculateScore(dealerHand);
        dealerPoints.innerHTML = `${dealerScore}`;
    }
    dealerDone = true;
}

const renderReset = () => {
    resetBtn.innerHTML = `<button id="reset-button" type="button" class="btn btn-light py-1">Reset Game</button>`;
}

const determineWinner = () => {
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    if (playerScore > dealerScore) messageBox.innerText = "You Win!";
    else if (dealerScore <= 21 && dealerScore > playerScore) messageBox.innerText = "Dealer Wins!";
    else if (dealerScore > 21) messageBox.innerText = "You Win!";
    else messageBox.innerText = "Push!";
}

// ============== EVENT LISTENERS =========================

dealBtn.addEventListener("click", () => {
    let score;
    if (dealerHand.length === 0) {
        playerDone = false;
        gameStart();
        playerDiv.innerHTML = `<img src=${playerHand[0].url}>`;
        dealerDiv.innerHTML = `<img src=images/facedown_card.png>`;
        playerDiv.innerHTML += `<img src=${playerHand[1].url}>`;
        dealerDiv.innerHTML += `<img src=${dealerHand[1].url}>`;
        score = calculateScore(playerHand);
        playerPoints.innerHTML = `${score}`;
    }
    if (score === 21) {
        dealerPlay();
        messageBox.innerText = "You Win!";
        playerDone = true;
        renderReset();
    }
})

hitBtn.addEventListener("click", () => {
    if (playerHand.length > 1 && !playerDone) {
        playerHand.push(deck.pop());
        playerDiv.innerHTML += `<img src=${playerHand.at(-1).url}>`;
        const score = calculateScore(playerHand);
        playerPoints.innerHTML = `${score}`;
        if (score > 21) {
            messageBox.innerText = "You Busted!";
            playerDone = true;
            dealerPlay();
            messageBox.innerText = "You Lose!";
            renderReset();
        } else if (score === 21) {
            dealerPlay();
            messageBox.innerText = "You Win!";
            playerDone = true;
            renderReset();
        }
    }
})

standBtn.addEventListener("click", () => {
    playerDone = true;
    if (dealerHand.length === 2 && !dealerDone) {
        dealerPlay();
        determineWinner();
        renderReset();
    }
})

resetBtn.addEventListener("click", () => {
    deck = [];
    dealerHand = [];
    playerHand = [];
    dealerDone = false;
    playerDiv.innerHTML = "";
    playerPoints.innerHTML = "";
    dealerDiv.innerHTML = "";
    dealerPoints.innerHTML = "";
    resetBtn.innerHTML = "";
    messageBox.innerText = "DC Blackjack"
})