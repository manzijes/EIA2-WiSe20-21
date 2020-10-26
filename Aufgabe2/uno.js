"use strict";
var MiniUno;
(function (MiniUno) {
    //Main
    let pcHand = document.querySelector("#pcHand");
    let playerHand = document.querySelector("#playerHand");
    const possibleColors = ["yellow", "blue", "green", "red"];
    const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let randomColorValue;
    let randomNumberValue;
    let currentCard = document.querySelector("#currentCard");
    let deck = document.querySelector("#deck");
    let pass = document.querySelector("#pass");
    let pcTurn = false;
    let passAllowed = false;
    let pcNoMatch = false;
    let userPrompt = prompt("How many cards do you want to start the game with?", "");
    let cardsNumber = parseInt(userPrompt);
    //Generate the starting cards of player
    generatePlayerCards();
    function generatePlayerCards() {
        let i = 0;
        while (i < cardsNumber) {
            createRandomValues();
            let card = document.createElement("span");
            playerHand.appendChild(card);
            card.textContent = randomNumberValue;
            card.className = randomColorValue;
            card.addEventListener("click", chooseCard);
            i++;
        }
    }
    //Generate the starting cards of pc
    generatePcCards();
    function generatePcCards() {
        let i = 0;
        while (i < cardsNumber) {
            createRandomValues();
            let card = document.createElement("span");
            pcHand.appendChild(card);
            card.textContent = randomNumberValue;
            card.className = randomColorValue;
            card.style.color = "lightslategrey";
            card.style.backgroundColor = "lightslategrey";
            i++;
        }
    }
    // Create first card as currentCard
    setTimeout(() => {
        createFirstCard();
    }, 1000);
    function createFirstCard() {
        createRandomValues();
        currentCard.textContent = randomNumberValue;
        currentCard.className = randomColorValue;
    }
    // function to pick random card qualities
    function createRandomValues() {
        randomColorValue = possibleColors[Math.floor(Math.random() * possibleColors.length)];
        let x = possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)];
        randomNumberValue = x.toString();
    }
    // Listener
    deck.addEventListener("click", drawCard);
    pass.addEventListener("click", playerPass);
    //function for drawing a card from deck
    function drawCard(_event) {
        createRandomValues();
        let card = document.createElement("span");
        playerHand.appendChild(card);
        card.textContent = randomNumberValue;
        card.className = randomColorValue;
        card.addEventListener("click", chooseCard);
        passAllowed = true;
    }
    function chooseCard(_event) {
        let chosenCard = _event.target;
        if (chosenCard.textContent === currentCard.textContent || chosenCard.className === currentCard.className) {
            currentCard.textContent = chosenCard.textContent;
            currentCard.className = chosenCard.className;
            playerHand.removeChild(chosenCard);
            setTimeout(() => {
                evaluateWinner();
            }, 800);
            pcTurn = true;
            handlePcTurn();
        }
    }
    //function for passing
    function playerPass(_event) {
        if (passAllowed == true) {
            pcTurn = true;
            handlePcTurn();
        }
    }
    //function for comparing the PCs cards with the currentCard
    function pcMove() {
        let allCardsPc = pcHand.children;
        pcNoMatch = true;
        for (let i = 0; i < allCardsPc.length; i++) {
            if (allCardsPc[i].textContent == currentCard.textContent || allCardsPc[i].className == currentCard.className) {
                currentCard.textContent = allCardsPc[i].textContent;
                currentCard.className = allCardsPc[i].className;
                pcHand.removeChild(allCardsPc[i]);
                setTimeout(() => {
                    evaluateWinner();
                }, 1000);
                passAllowed = false;
                pcTurn = false;
                pcNoMatch = false;
                break;
            }
        }
        if (pcNoMatch) {
            setTimeout(() => {
                pcDraw();
            }, 800);
        }
    }
    //function for when no PC card matches the currentCard, the PC draws a new card
    function pcDraw() {
        createRandomValues();
        let card = document.createElement("span");
        pcHand.appendChild(card);
        card.textContent = randomNumberValue;
        card.className = randomColorValue;
        card.style.color = "lightslategrey";
        card.style.backgroundColor = "lightslategrey";
        if (card.textContent == currentCard.textContent || card.className == currentCard.className) {
            currentCard.textContent = card.textContent;
            currentCard.className = card.className;
            pcHand.removeChild(card);
        }
        pcTurn = false;
        passAllowed = false;
    }
    function handlePcTurn() {
        if (pcTurn) {
            setTimeout(() => {
                pcMove();
            }, 800);
        }
    }
    function evaluateWinner() {
        let allCardsPc = pcHand.children;
        let allCardsPlayer = playerHand.children;
        if (allCardsPc.length == 0) {
            alert("Du hast verloren :(");
            location.reload();
        }
        if (allCardsPlayer.length == 0) {
            alert("Du hast gewonnen :)");
            location.reload();
        }
    }
})(MiniUno || (MiniUno = {}));
//# sourceMappingURL=uno.js.map