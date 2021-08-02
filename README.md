#Score System
The score system is based on the idea that a player that completes the game in less steps should have a higher score than a player who completed in more steps. 

##calculateScore function
A good and simple way to ensure that less steps will yield a higher score is to make the score a subtraction between a constant and the number of plays performed by the player. But, this approach has a clear problem. Games with less cards will always be completed with fewer steps. Therefore, the amount of cards in each game must be accounted in our subtraction in order to balance out the score. Thus, a player that completed a 4-card game in 4 plays will have the same amount of points as the player who completed an 8-card game in 8 plays. 

In order to make 100 points the highest possible score, the chosen function returns:

	100 + cardNumber - numberOfPlays
	
This way, whenever a player finishes the game in the smallest amount of steps (guessing every pair on the first try), his number of plays will be equal to the number of cards and the score will be 100. Any other value of number of plays will produce a smaller amount. 

Time was chosen to be used as a tiebreaker between two players with the same score and that is done via the following line in the arrangeSort() function:

	else if(players[j].score === players[j+1].score){
    	if(players[j].time > players[j+1].time){
    		playerSwap = players[j];
    		players[j] = players[j + 1];
    		players[j + 1] = playerSwap;
    		didSwap = true;
    	}
    }
