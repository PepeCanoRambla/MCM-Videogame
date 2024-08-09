let endState = {
    preload: loadAssets,
    create: displayScreen
};

let title_text;
//let win = true;
let btnReturn;
let dinero;
function loadAssets()
{
    game.load.image('bg', 'assets/bgmain.png');
    game.load.image("returnBtn", "assets/backbtn.png")
}

function displayScreen()
{
    dinero = pesos;
    game.add.image(0, 0, 'bg');
    if (win == true)
        {
            title_text = "YOU WON!"
            game.add.text(50, 300, "Remaining health:" + healthValue);
        } else
        {
            title_text = "You lose..."
        }
    game.add.text(50, 50, title_text)
    game.add.text(50, 150, "Pesos:" + dinero);
    game.add.text(50, 200, "Dollars:" + dolares);
    game.add.text(50, 250, "Score:" + score);
    btnReturn = game.add.button(330, 460,
        'returnBtn', onReturnButtonPressed);
}

function onReturnButtonPressed()
{
    first = false;
    game.state.start("welcome");
    
}