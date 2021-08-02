let gifs = ["bobrossparrot.gif", "explodyparrot.gif", "fiestaparrot.gif", "metalparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "unicornparrot.gif"];

let pair = 1, numberOfPlays = 0, correctCards = 0;
let cardNumber, currentTurnedCard, timeElapsed, start, timeId, playerName;
const players = [];


function gameStart(){
    playerName = prompt("Qual o seu nome?");
    cardNumber = Number(prompt("Com quantas cartas você deseja jogar? (4-14)"));

    while(cardNumber < 4 || cardNumber > 14 || cardNumber % 2 === 1 || Number.isNaN(cardNumber)){
        if(cardNumber >= 4 && cardNumber <= 14){
            cardNumber = Number(prompt("Por favor digite um número par. \nCom quantas cartas você deseja jogar? (4-14)"));
        }
        else{
            cardNumber = Number(prompt("Por favor digite um número entre 4 e 14. \nCom quantas cartas você deseja jogar? (4-14)"));
        }
    }

    generateCards();
}

function generateCards(){
    gifs.sort(comparator);
    const pickedGifs = gifs.slice(0, cardNumber/2);
    const cards = pickedGifs.concat(pickedGifs);
    cards.sort(comparator);
    
    displayCards(cards);
}

function displayCards(cards){
    const cardsContainer = document.querySelector(".cards-container");
    const body = document.querySelector("body");

    for(let i = 0; i < cardNumber; i++){
        cardsContainer.innerHTML += `
        <div class="card" onclick="turnCard(this);">
            <div class="front-face face">
                <img src="images/front.png">
            </div>
            <div class="back-face face">
                <img src="images/${cards[i]}">
            </div>
        </div>
        `
    }

    body.style.display = "initial";
    start = Date.now();
    startTime();
    
}

function turnCard(element){
    const frontFace = element.querySelector(".front-face");
    const backFace = element.querySelector(".back-face");  

    if(!element.classList.contains("turnedCard")){
        if(pair === 1){
            backFace.style.transform = "rotateY(0deg)";
            frontFace.style.transform = "rotateY(180deg)";
            currentTurnedCard = element;
            currentTurnedCard.classList.add("turnedCard");
            pair = 2;
            numberOfPlays += 1;
        }
        else{
            backFace.style.transform = "rotateY(0deg)";
            frontFace.style.transform = "rotateY(180deg)";
        
            setTimeout(isPair, 1000, element, currentTurnedCard);
            pair = 1;
            numberOfPlays += 1;
            setTimeout(isEnd, 1000);
        }
    }
}

function isPair(element, currentTurnedCard){

    if(element.querySelector(".back-face img").src !== currentTurnedCard.querySelector(".back-face img").src){
        currentTurnedCard.querySelector(".front-face").style.transform = "rotateY(0deg)";
        currentTurnedCard.querySelector(".back-face").style.transform = "rotateY(180deg)";
        element.querySelector(".front-face").style.transform = "rotateY(0deg)";
        element.querySelector(".back-face").style.transform = "rotateY(180deg)";
        currentTurnedCard.classList.remove("turnedCard");
    }
    else{
        correctCards += 2;
        element.classList.add("turnedCard");
    }

}

function isEnd(){
    if (correctCards === Number(cardNumber)){
        alert(`Você ganhou o jogo em ${numberOfPlays} jogadas e em ${timeElapsed.toFixed(0)} segundos`);
        clearTimeout(timeId);
        const score = calculateScore();
        addPlayer(score);
        restartGame();
    }
}

function startTime(){
    timeElapsed = (Date.now() - start) / 1000;
    document.querySelector(".clock").innerHTML = `${timeElapsed.toFixed(0)} s`;
    timeId = setTimeout(startTime, 1000);
}

function comparator(){
    return Math.random() - 0.5;
}

function restartGame(){
    const restart = prompt("Você quer jogar novamente?");
    const body = document.querySelector("body");
    const cards = document.querySelector(".cards-container");
    
    if(restart === "sim" || restart === "s"){
        cards.innerHTML = "";
        numberOfPlays = 0;
        correctCards = 0;
        body.style.display = "none";
        gameStart();
    }
    else if(restart === "não" || restart === "n" || restart === "nao"){
        alert("Obrigado por jogar o meu jogo!");
        arrangeScore();
    }
    else{
        alert("Digite sim(s) ou não(n).\n");
        restartGame();
    }
}

function calculateScore(){
    return (100 + cardNumber - numberOfPlays);
}

function addPlayer(score){
    const player = {name: playerName, score: score, time: timeElapsed};
    players.push(player);
}

function arrangeScore(){
    let playerSwap;
    //bubble sort
    for(let i = 0; i < players.length - 1; i++){
        let didSwap = false;
        for(let j = 0; j < players.length - i - 1; j++){
            if(players[j].score < players[j+1].score){
                playerSwap = players[j];
                players[j] = players[j+1];
                players[j+1] = playerSwap;
                didSwap = true;
            }
            else if(players[j].score === players[j+1].score){
                if(players[j].time > players[j+1].time){
                    playerSwap = players[j];
                    players[j] = players[j + 1];
                    players[j + 1] = playerSwap;
                    didSwap = true;
                }
            }
        }

        if(!didSwap){
            break;
        }
    }

    printScore();
}

function printScore(){
    const scores = document.querySelector(".scores");
    const modal = document.querySelector(".modal");
    modal.style.display = "flex";

    for(let i = 0; i < players.length; i++){
        scores.innerHTML += `
        <div class="individual-score">
            <span>${i + 1}. ${players[i].name}</span>
            <span>${players[i].score} pts  ${players[i].time.toFixed(0)} s</span>
        </div>
        `
    }

}

gameStart();