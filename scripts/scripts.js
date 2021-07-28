let cardNumber;
let gifs = ["bobrossparrot.gif", "explodyparrot.gif", "fiestaparrot.gif", "metalparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "unicornparrot.gif"];

let gif_alts = ["Parrote do Bob Ross", "Parrote Explosivo", "Parrote Festivo", "Parrote Metaleiro", "Parrote Marinheiro", "Parrotes Triplos", "Parrotes Unicórnios"];


function gameStart(){
    cardNumber = prompt("Com quantas cartas você deseja jogar? (4-14)");

    while(cardNumber < 4 || cardNumber > 14 || cardNumber % 2 == 1){
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

    for(let i = 0; i < cardNumber; i++){
        cardsContainer.innerHTML += `
        <div class="card" onclick="turnCard(this);">
            <div class="front-face face">
                <img src="images/front.png" alt="Carta de papagaio">
            </div>
            <div class="back-face face">
                <img src="images/${cards[i]}">
            </div>
        </div>
        `
    }
    
}

function turnCard(element){
    const frontFace = element.querySelector(".front-face");
    const backFace = element.querySelector(".back-face");
    backFace.style.transform = "rotateY(0deg)";
    frontFace.style.transform = "rotateY(180deg)";
}

function comparator(){
    return Math.random() - 0.5;
}

gameStart();