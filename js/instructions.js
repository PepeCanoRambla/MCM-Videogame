let instructionsState = {
    preload: loadAssets,
    create: displayScreen,
    update: updateScreen
};
let text1 = "Extraterrestrials are on sight! Use your\nmost patriotic weapons to protect your\nbeloved home.\n\nMove with arrow keys, aim with\nthe mouse and shoot with \nleft click.\n\nYou have limited ammo, so don't waste it!\nGet close to the Taco Stand and\nyou will reload automatically."
let text2 = "You have a machete, which is a short-range weapon\nthat requires no ammo. Press SHIFT to use it.\n\nAvocado Grenades can be useful to eliminate\nseveral aliens at once. If you have any,\npress X to throw it."
let text3 = "At the center of the area, you will find\nthe SAFE ZONE. Enemies can't hurt you here\nCool!\n\nHowever, you can only stay inside for\nten seconds, so be quick!"
let text4 = "Defeated enemies will drop PESOS and DOLLARS.\n\nYou can use these to buy Avocado Grenades\nat the SAFE ZONE or various other upgrades,\nlike extra ammo, extra speed or extra health.\n\n\n\nStand next to something with a price tag\nand press Z to buy."
let text5 = "Pay the toll at the grid to win.\nGood luck!"
let slide = 1;
let textShown;
let slideText;
let leftBtn;
let rightBtn
let secondCount = 0;


function loadAssets()
{
    //console.log("preload")
}

function displayScreen()
{

    game.load.image('bg', 'assets/bgmain.png');
    game.add.image(0, 0, 'bg');
    slideText = game.add.text(100, 470, "Use arrow keys to move through slides      (" + slide + "/5)")
    
    //leftBtn = game.add.button = (0, game.world.height / 2, 'leftbutton', onLeftBtnPressed)
    leftBtn = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightBtn = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    textShown = game.add.text(50, 50, text1);
    //slidesTimer = Timer(game);
    game.time.events.loop(Phaser.Timer.SECOND*10, slidesTimer);
    


}

function updateScreen()
{
    //secondCount = slidesTimer.getElapsedSeconds();
    //if(secondCount >= 3)
    //{
    //    secondCount=0;
    //    slide=slide+1;
    //}
    if (leftBtn.justDown && slide > 1)
    {
        slide--;
        slideText.setText("Use arrow keys to move through slides      (" + slide + "/5)");
        //console.log(slide);
    }

    if (rightBtn.justDown)
    {
        if (slide==5)
        {
            slide=1;
            if(menuMusic)
                {
                    menuMusic.stop();
                }
            game.state.start("welcome")
        } else{
            slide++;
            slideText.setText("Use arrow keys to move through slides      (" + slide + "/5)");
        }
        //console.log(slide);
    }
    
    if (slide ==1)
    {
        textShown.setText(text1);
        //console.log (textShown)
    } else if (slide == 2)
    {
        textShown.setText(text2);
        //console.log(textShown)
    }else if (slide == 3)
        {
            textShown.setText(text3);
            //console.log(textShown)
        }else if (slide == 4)
            {
                textShown.setText(text4);
                //console.log(textShown)
            }else if (slide == 5)
                {
                    textShown.setText(text5);
                    //console.log(textShown)
                }

}

function slidesTimer()
{
    if (slide >=5)
    {
        slide=1;
        if(menuMusic)
            {
                menuMusic.stop();
            }
        game.state.start("welcome")
    } else{
        slide++;
        slideText.setText("Use arrow keys to move through slides      (" + slide + "/5)");
    }

}