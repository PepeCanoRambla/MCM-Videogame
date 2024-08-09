let game;

let wfConfig = {
    active: function () {
        startGame();
    }
};

window.onload = startGame;
//WebFont.load(wfConfig);

function startGame() {
    game = new Phaser.Game(800, 600, Phaser.CANVAS, 'platformGameStage');

    // Welcome Screen
    game.state.add('welcome', initialState);
    // About Screen
    game.state.add('instructions', instructionsState);
    // Play Screen
    game.state.add('play', playState);
    //Final Screen
    game.state.add('end', endState);

    // Your Turn 1 - Add the instruction to start the 'welcome' state
    game.state.start("welcome")
}