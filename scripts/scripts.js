let cardNumber;

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
    const cards = document.querySelectorAll(".card");

    for(let i = 0; i < cardNumber; i++){
        cards[i].classList.remove("hidden");
    }
}

function turnCard(element){

    const frontFace = element.querySelector(".front-face");
    const backFace = element.querySelector(".back-face");

    backFace.style.transform = "rotateY(0deg)";
    frontFace.style.transform = "rotateY(180deg)";

}

gameStart();
