/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 50 points on GLOBAL score wins the game

New rules added: 

- A player looses his entire score if it rolls two 6s in a row. After that it's the next players turn. 
- Add an input field to the html where the players can set the winning score, so that they can change the predefined score of 50. 
- Add another dice to the game so that there are two dices now. The player looses his current score when one of them is a one. 

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        //1. Generate random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM1 = document.getElementById('dice-1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        var diceDOM2 = document.getElementById('dice-2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        if (dice1 === 6 && dice2 === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
        //Update the round score if the rolled number was not a 1
        else if(dice1 !== 1 && dice2 !== 1) {
            //add score
            roundScore += (dice1 + dice2);
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            //next player 
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //add current score to global score 
        scores[activePlayer] += roundScore;
        //update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        //get the winning score 
        var winningScore = document.querySelector('.winning-score').value; 
        if(!winningScore) {
            winningScore = 50;
        }
        //check if player won the game
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            diceDisplayNone();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } 
        else {
            //next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    //next player 
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    diceDisplayNone();
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    diceDisplayNone();
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

function diceDisplayNone() {
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
}