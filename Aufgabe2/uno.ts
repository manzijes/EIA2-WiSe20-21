namespace MiniUno {

//Main
let pcHand: HTMLDivElement = <HTMLDivElement>document.querySelector("#pcHand");
let playerHand: HTMLDivElement = <HTMLDivElement>document.querySelector("#playerHand");
const possibleColors: string [] = ["yellow", "blue", "green", "red"];
const possibleNumbers: number [] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let randomColorValue: string;
let randomNumberValue: string;
let currentCard: HTMLSpanElement = <HTMLSpanElement>document.querySelector("#currentCard");
let deck: HTMLSpanElement = <HTMLSpanElement>document.querySelector("#deck");
let pass: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#pass");
let pcTurn: boolean = false;
let passAllowed: boolean = false;
let pcNoMatch: boolean = false;

let userPrompt: string | null = prompt("How many cards do you want to start the game with?", "");
let cardsNumber: number = parseInt(<string>userPrompt);

//Generate the starting cards of player
generatePlayerCards();
function generatePlayerCards(): void {
    let i: number = 0;
    while (i < cardsNumber) {
            createRandomValues();
            let card: HTMLSpanElement = document.createElement("span");
            playerHand.appendChild(card);
            card.textContent = randomNumberValue;
            card.className = randomColorValue;
            card.addEventListener("click", chooseCard);
            i++;
        }
}

//Generate the starting cards of pc
generatePcCards();
function generatePcCards(): void {
    let i: number = 0;
    while (i < cardsNumber) {
            createRandomValues();
            let card: HTMLSpanElement = document.createElement("span");
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
    },     1000);

function createFirstCard(): void {
    createRandomValues();
    currentCard.textContent = randomNumberValue;
    currentCard.className = randomColorValue;
}

// function to pick random card qualities
function createRandomValues(): void {
    randomColorValue = possibleColors[Math.floor(Math.random() * possibleColors.length)];
    let x: number = possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)];
    randomNumberValue = x.toString();
}

// Listener
deck.addEventListener("click", drawCard);
pass.addEventListener("click", playerPass);

//function for drawing a card from deck
function drawCard(_event: MouseEvent): void {
    createRandomValues();
    let card: HTMLSpanElement = document.createElement("span");
    playerHand.appendChild(card);
    card.textContent = randomNumberValue;
    card.className = randomColorValue;
    card.addEventListener("click", chooseCard);
    passAllowed = true;
}

function chooseCard(_event: MouseEvent): void {
    let chosenCard: HTMLSpanElement = <HTMLSpanElement>_event.target;
    if (chosenCard.textContent === currentCard.textContent || chosenCard.className === currentCard.className) {
        currentCard.textContent = chosenCard.textContent;
        currentCard.className = chosenCard.className;
        playerHand.removeChild(chosenCard);
        setTimeout(() => {
            evaluateWinner();
            },     800);
        pcTurn = true;
        handlePcTurn();
    }
}

//function for passing
function playerPass(_event: MouseEvent): void {
    if (passAllowed == true) {
        pcTurn = true;
        handlePcTurn();
    }
}

//function for comparing the PCs cards with the currentCard
function pcMove(): void {
    let allCardsPc: HTMLCollection = pcHand.children;
    pcNoMatch = true;
    for (let i: number = 0; i < allCardsPc.length; i++) {

        if (allCardsPc[i].textContent == currentCard.textContent || allCardsPc[i].className == currentCard.className) {
            currentCard.textContent = allCardsPc[i].textContent;
            currentCard.className = allCardsPc[i].className;
            pcHand.removeChild(allCardsPc[i]);
            setTimeout(() => {
                evaluateWinner();
                },     1000);
            passAllowed = false;
            pcTurn = false;
            pcNoMatch = false;
            break;
        }
    }
    if (pcNoMatch) {
        setTimeout(() => {
            pcDraw();
            },     800);
    }
}

//function for when no PC card matches the currentCard, the PC draws a new card
function pcDraw(): void {
    createRandomValues();
    let card: HTMLSpanElement = document.createElement("span");
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

function handlePcTurn(): void {
    if (pcTurn) {
        setTimeout(() => {
            pcMove();
            },     800);
        }
    }

function evaluateWinner(): void {
    let allCardsPc: HTMLCollection = pcHand.children;
    let allCardsPlayer: HTMLCollection = playerHand.children;
    
    if (allCardsPc.length == 0) {
        alert("Du hast verloren :(");
        location.reload();
    }
    if (allCardsPlayer.length == 0) {
        alert("Du hast gewonnen :)");
        location.reload();
    }
}
}