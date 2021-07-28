let gifs = ["bobrossparrot.gif", "explodyparrot.gif", "fiestaparrot.gif", "metalparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "unicornparrot.gif"];

let gif_alts = ["Parrote do Bob Ross", "Parrote Explosivo", "Parrote Festivo", "Parrote Metaleiro", "Parrote Marinheiro", "Parrotes Triplos", "Parrotes Unicórnios"];

let pair = 1, numberOfPlays = 0, correctCards = 0;
let cardNumber, currentTurnedCard, timeElapsed, start, time;



function gameStart(){
    cardNumber = prompt("Com quantas cartas você deseja jogar? (4-14)");

    while(cardNumber < 4 || cardNumber > 14 || cardNumber % 2 === 1){
        if(cardNumber >= 4 && cardNumber <= 14){
            cardNumber = prompt("Por favor digite um número par. \nCom quantas cartas você deseja jogar? (4-14)");
        }
        else{
            cardNumber = prompt("Por favor digite um número entre 4 e 14. \nCom quantas cartas você deseja jogar? (4-14)");
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
    
    if(pair === 1){
        backFace.style.transform = "rotateY(0deg)";
        frontFace.style.transform = "rotateY(180deg)";
        currentTurnedCard = element;
        pair = 2;
        numberOfPlays += 1;
    }
    else{
        if(element !== currentTurnedCard){
            backFace.style.transform = "rotateY(0deg)";
            frontFace.style.transform = "rotateY(180deg)";
    
            setTimeout(turnCardDown, 1000, element, currentTurnedCard);
            pair = 1;
            numberOfPlays += 1;
            setTimeout(isEnd, 1000);
        }
    }
}

function turnCardDown(element, currentTurnedCard){

    if(element.querySelector(".back-face img").src !== currentTurnedCard.querySelector(".back-face img").src){
        currentTurnedCard.querySelector(".front-face").style.transform = "rotateY(0deg)";
        currentTurnedCard.querySelector(".back-face").style.transform = "rotateY(180deg)";
        element.querySelector(".front-face").style.transform = "rotateY(0deg)";
        element.querySelector(".back-face").style.transform = "rotateY(180deg)";
    }
    else{
        correctCards += 2;
    }

}

function isEnd(){
    if (correctCards === Number(cardNumber)){
        alert(`Você ganhou o jogo em ${numberOfPlays} jogadas e em ${timeElapsed.toFixed(0)} segundos`);
        clearTimeout(time);
    }
}

function startTime(){
    timeElapsed = (Date.now() - start) / 1000;
    document.querySelector(".clock").innerHTML = `${timeElapsed.toFixed(0)} s`;
    time = setTimeout(startTime, 1000);
}

function comparator(){
    return Math.random() - 0.5;
}

gameStart();