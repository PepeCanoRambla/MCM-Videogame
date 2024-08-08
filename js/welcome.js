
const DEFAULT_DAMAGE = 10;
const DEFAULT_HEALTH = 10;
const DEFAULT_TIME = 480;
const DEFAULT_JUMPS_TO_KILL = 2;
const DEFAULT_PLAYER_DEATH_TIME_PENALTY = 15;

let damage = DEFAULT_DAMAGE;
let healthAid = DEFAULT_HEALTH;
let secondsToGo = DEFAULT_TIME;
let jumpsToKill = DEFAULT_JUMPS_TO_KILL;
let playerDeathTimePenalty = DEFAULT_PLAYER_DEATH_TIME_PENALTY;
let chile;
let prota, alien1, alien2;
let protaTween, alien1Tween, alien2Tween;
let menuMusic;

let first = true;

let initialState = {
    preload: loadAssets,
    create: displayScreen
};

let btnInstructions, btnPlay;
let btnIncreaseDiff, btnDecreaseDiff;
let difficulty;

function loadAssets() {
    game.load.image('title', 'assets/title3.png');
    game.load.image('bg', 'assets/bgmain.png');
    game.load.image('chile1', 'assets/chile1.png');
    game.load.image('chile2', 'assets/chile2.png');
    game.load.image('chile3', 'assets/chile3.png');
    game.load.image('alien1', 'assets/alien_inicio.png');
    game.load.image('alien2', 'assets/alien2inicio.png');
    game.load.image('player', 'assets/prota_inicio.png');
    game.load.image('DifficultyBtn', 'assets/diffbtn.png');
    game.load.image('InstructionsBtn', 'assets/instruccionesbtn.png');
    game.load.image('PlayBtn', 'assets/jugarbtn.png');
    game.load.audio('menuBackSound', 'assets/menuBackSound.wav');
}

function displayScreen() {
    if(gameMusic)
        {
            gameMusic.stop();
        }
    difficulty="hard"
    levelToPlay = 1;
    game.input.enabled = true;
    game.add.image(0, 0, 'bg');
    game.add.image(30, 20, 'title');
    prota = game.add.image(-370, 600, "player");
    alien2 = game.add.image(600, 300, "alien2");
    alien1 = game.add.image(900, 600, "alien1");
    


    let textTitle = 'by the El cartel de Nuevo México team';
    let textSubtitle = 'Pepe Cano Rambla y Fernando Rosales Ortiz-Durán';
    let styleTitle = {
        font: 'Rammetto One',
        fontSize: '22pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };

    if (first){
        game.add.text(50, game.world.height / 6, textTitle, styleTitle);
        game.add.text(50, (game.world.height / 6)+30, textSubtitle, styleTitle);
    }
    else{
        game.add.text(50, (game.world.height/2) / 6, textTitle, styleTitle);
        game.add.text(50, ((game.world.height/2) / 6)+30, textSubtitle, styleTitle);
    }
    
    //game.add.text(50, (game.world.height / 6)+60, difficulty, styleTitle);

    protaTween = game.add.tween(prota).to({x:10, y:350}, 1000, Phaser.Easing.Cubic.Out, true);
    alien1Tween = game.add.tween(alien1).to({x:540, y:350}, 1000, Phaser.Easing.Cubic.Out, true);
    alien2Tween = game.add.tween(alien2).to({x:620, y:160}, 3000, Phaser.Easing.Cubic.Out).to({x:600, y:300}, 3000, Phaser.Easing.Cubic.Out);
    alien2Tween.loop(true);
    alien2Tween.start();

    btnInstructions = game.add.button(330, 400,
        'InstructionsBtn', onIntructionsButtonPressed);
    btnPlay = game.add.button(330, 460,
        'PlayBtn', onPlayButtonPressed);
    btnIncreaseDiff = game.add.button(500, 372,
        'DifficultyBtn', increaseDiff);
    btnDecreaseDiff = game.add.button(300, 330,
        'DifficultyBtn', decreaseDiff);
    btnIncreaseDiff.scale.setTo(-1);
    chile = game.add.image(385, 330, "chile3");
    createMenuSounds();
    
}

function increaseDiff(){
    if (difficulty=='easy')
    {
        difficulty='normal';
        chile.kill();
        chile = game.add.image(385, 330, "chile2");
    } else 
    {
        difficulty ='hard';
        chile.kill();
        chile = game.add.image(385, 330, "chile3");
    //console.log(difficulty);
}
}

function createMenuSounds(){
    menuMusic = game.add.audio('menuBackSound');
    menuMusic.loop = true;
    menuMusic.play();
}

function decreaseDiff(){
    if (difficulty=='hard')
    {
        difficulty='normal';
        chile.kill();
        chile = game.add.image(385, 330, "chile2");
    } else 
    {
        difficulty ='easy';
        chile.kill();
        chile = game.add.image(385, 330, "chile1");
    //console.log(difficulty);
}
}

function onIntructionsButtonPressed() {
    game.state.start("instructions")
    //console.log("instructions")
}

function onPlayButtonPressed() {
    //console.log("play")
    game.state.start("play")
}