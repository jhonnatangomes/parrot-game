function iniciarJogo(){
    let numCartas = prompt("Com quantas cartas você deseja jogar? (4-14)");

    while(numCartas < 4 || numCartas > 14 || numCartas % 2 == 1){
        if(numCartas >= 4 && numCartas <= 14){
            numCartas = prompt("Por favor digite um número par. \nCom quantas cartas você deseja jogar? (4-14)");
        }
        else{
            numCartas = prompt("Por favor digite um número entre 4 e 14. \nCom quantas cartas você deseja jogar? (4-14)");
        }
    }
}

iniciarJogo();