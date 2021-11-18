(function() {
    'use strict';
    console.log("reading js");

    function playSound(src) {
        const audioObj = new Audio(src);
        audioObj.play();
    }

    function throwDice() {
        playSound("./media/diceroll.mp3");
        actionArea.innerHTML = '';
        
        // risk only applies on snowballing rolls
        if (gameData.nextRollIsRollAgainRoll) {
            gameData.roll1 = gameData.riskPossibleRolls[Math.floor(Math.random() * gameData.riskPossibleRolls.length)];
            gameData.roll2 = gameData.riskPossibleRolls[Math.floor(Math.random() * gameData.riskPossibleRolls.length)];
        } else {
            gameData.roll1 = Math.floor(Math.random() * (6)) + 1; 
            gameData.roll2 = Math.floor(Math.random() * (6)) + 1;
        }
        
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}"> <img src="${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;
        
        if (gameData.rollSum === 2) {
            playSound("./media/torture.mp3");
            console.log("Snake eyes rolled");
            game.innerHTML += '<p>Oh snap! Snake Eyes!</p>';
            gameData.score[gameData.index] = Math.floor(gameData.score[gameData.index] / 2);
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            // reset only when current roll is a doubles roll
            if (gameData.nextRollIsRollAgainRoll) {
                gameData.riskPossibleRolls = [1, 2, 3, 4, 5, 6]
            }
            
            gameData.nextRollIsRollAgainRoll = false;
            showCurrentScore();
            setTimeout(setUpTurn, 2000);
        }
        
        else if (gameData.roll1 != gameData.roll2) {
            
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            gameData.nextRollIsRollAgainRoll = false;
            // points increment even when switching turns
            if (checkWinningCondition()) {

            } else {
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                game.innerHTML += `<p>Switching to ${gameData.players[gameData.index]}</p>`;
                showCurrentScore();
                setTimeout(setUpTurn, 2000);
            }
            
        }
        // can roll again only if doubles that are not snake eyes
        else {
            playSound("./media/bikehorn.mp3");
            console.log("the game proceeds");
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';
            game.innerHTML += `<p>Rolled doubles, ${gameData.players[gameData.index]} can roll again</p>`;
            document.getElementById('rollagain').addEventListener('click', function() {
                // chance of rolling doubles and snake eyes increases each doubles roll
                if (gameData.riskPossibleRolls.length > 2) {
                    let numberToFilter = gameData.riskPossibleRolls[1];
                    gameData.riskPossibleRolls = gameData.riskPossibleRolls.filter(ele => ele != numberToFilter);
                    console.log(gameData.riskPossibleRolls);
                }
                gameData.nextRollIsRollAgainRoll = true;
                setUpTurn();
            });

            document.getElementById('pass').addEventListener('click', function() {
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                gameData.nextRollIsRollAgainRoll = false;
                setUpTurn();
            });

            checkWinningCondition();
        }
        
    }

    function setUpTurn() {
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
        document.getElementById('roll').addEventListener('click', function() {
            // console.log("roll the dice!");
            throwDice();
        });
    }

    function showCurrentScore() {
        score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]} ${gameData.score[0]}</strong> 
            and <strong>${gameData.players[1]} ${gameData.score[1]}</strong> Chance of Snake Eyes on Next Doubles Re-Roll: ${(1 / Math.pow(gameData.riskPossibleRolls.length,2)) * 100}%</p>`;
    }

    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            console.log("end");
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points</h2>`;

            actionArea.innerHTML = '';

            document.getElementById('quit').innerHTML = "Start a New Game?";
            return true;
        } else {
            console.log("no end");
            showCurrentScore();
            return false;
        }
    }

    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    const score = document.getElementById('score');
    const actionArea = document.getElementById('actions');

    const gameData = {
        dice: ['images/1dice.svg', 'images/2dice.svg', 'images/3dice.svg', 'images/4dice.svg', 'images/5dice.svg', 'images/6dice.svg'],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        riskPossibleRolls: [1, 3, 4, 5, 6],
        rollSum: 0,
        index: 0,
        gameEnd: 99
    };

    startGame.addEventListener("click", function() {
        gameData.index = Math.round(Math.random());
        console.log(gameData.index);
        gameControl.innerHTML = '<h2>The Game Is Ongoing</h2>';
        gameControl.innerHTML += '<button id="quit">Stop Playing</button>'

        document.getElementById('quit').addEventListener("click", function() {
            location.reload();
        })

        console.log(setUpTurn());
    });
})();