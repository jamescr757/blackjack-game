const suits = ["clubs", "spades", "hearts", "diamonds"];
const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace"];

const deck = [];
for (const card of cards) {
    for (const suit of suits) {
        let score;
        typeof(card) === "string" ? score = 10 : score = card;
        const obj = {
            value: score,
            url: `images/${card}_of_${suit}.png`
        }
        deck.push(obj);
    }
}

const dealerHand = [];
const playerHand = [];


const swap = (array, i, j) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

const shuffleDeck = () => {
    for (let n = 0; n < 100; n++) {
        const randomIdx1 = Math.floor(Math.random() * 52);
        const randomIdx2 = Math.floor(Math.random() * 52);
        swap(deck, randomIdx1, randomIdx2);
    }
}

const gameStart = () => {
    shuffleDeck();
    playerHand.push(deck.pop())
    dealerHand.push(deck.pop())
    playerHand.push(deck.pop())
    dealerHand.push(deck.pop())
}

const dealerDiv = document.getElementById("dealer-hand");
const playerDiv = document.getElementById("player-hand");

const dealBtn = document.getElementById("deal-button");

dealBtn.addEventListener("click", () => {
    if (dealerHand.length === 0) {
        gameStart();
        playerDiv.innerHTML = `<img src=${playerHand[0].url}>`;
        dealerDiv.innerHTML = `<img src=${dealerHand[0].url}>`;
        playerDiv.innerHTML += `<img src=${playerHand[1].url}>`;
        dealerDiv.innerHTML += `<img src=${dealerHand[1].url}>`;
    }
})

const hitBtn = document.getElementById("hit-button");

hitBtn.addEventListener("click", () => {
    if (playerHand.length > 1) {
        playerHand.push(deck.pop());
        playerDiv.innerHTML += `<img src=${playerHand[playerHand.length - 1].url}>`;
    }
})