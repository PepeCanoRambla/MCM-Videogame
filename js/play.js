//const Phaser = require("./lib/phaser");

let playState = {
    preload: preloadPlay,
    create: createPlay,
    update: updatePlay
};

let cont;
let contPau;


let contSafezone;
let contSZbool;
let player;
const HUD_HEIGHT = 50;

let cursors;
const PLAYER_VELOCITY = 450;
const PLAYER_VELOCITY_PLUS = 650;

let stars;

const LASERS_GROUP_SIZE = 40;
let lasers;

const LEFT_LASER_OFFSET_X = 11;
const RIGHT_LASER_OFFSET_X = 12;
const LASERS_OFFSET_Y = 27;
const LASERS_OFFSET_X = -20;
const LASERS_VELOCITY = 500;
const MAX_HEALTH = 100;
const MAX_HEALTH_PLUS = 150;
let fireButton;
let GrenadeButton;
let MacheteBtn;
//let rechargeButton;

let soundLaser;

const TIMER_RHYTHM=0.1*Phaser.Timer.SECOND;

const BLASTS_GROUP_SIZE = 30;
let blasts;

let soundBlast;

const DAMG_EASY = 10;
const DAMG_NORMAL = 15;
const DAMG_HARD = 20;

let score; // Repeated declaration in hof.js
let scoreText;
let level;
let levelText;
let lives;
let livesText;
let pesos;
let pesosText;
let dolares;
let dolaresText;
let safezonetext;
let difficultyText;
let difficulty_img;
let puesto;
let granacuateHUD;
let granacuateTienda;
let municionTienda;
let saludTienda;
let velocidadTienda;
let municion_comprada;
let salud_comprada;
let velocidad_comprada;
let granacuates;
let granacuatestext;
let BuyBtn;
let proyectil;
let suelozonasegura;
let zonaoculta;
let zonaseguramuros = [];
let zonaseguraesquinas = [];
let safezone;
let levelToPlay;
let levelsData;
let levelConfig;
let paused;
let enemy2Shooting;
let hudGroup, healthBar, healthValue, healthTween;

let gameMusic;
let timbreSound;
let shootSound;
let fireballSound;
let explosionSound;
let cajaRegistradoraSound;
let alienVoiceSound;
let alienVoiceSound2;
let alarmaSound;
let reloadSound;

const NUM_LEVELS = 5;

const MUNICION = 20;
const MUNICION_PLUS = 30;
let cargador;
let canReload;
let canBuy;

let machete;
let HasMachete;
let MacheteCanSwing;
//let enemys = [];
const ENEMYS_GROUP_SIZE = 20;
const FIREBALLS_GROUP_SIZE = 20;
let enemyExist
let enemys;
let enemys2;
let murolista;
let barrerafinal;
let currentEnemyProbability;
let currentEnemy2Probability
let currentEnemyVelocity;
let currentEnemy2Velocity;
let Animacion_Recarga;
let fireBall;
const LEVEL_ENEMY_PROBABILITY = [0.05, 0.4, 0.6, 0.8, 1.0];
const LEVEL_ENEMY_VELOCITY = [0, 100, 150, 200, 250];
const LEVEL_ENEMY2_PROBABILITY = [0.03, 0.2, 0.4, 0.6, 0.8];
const LEVEL_ENEMY2_VELOCITY = [0, 50, 100, 150, 200];
let angIni1;
let angIni2;
let win;

const DROPS_GROUP_SIZE = 20;

function preloadPlay() {
    game.load.image('player', 'assets/character_play.png');
    game.load.image('bgplay', 'assets/bgplay.png');
    game.load.image("verja", "assets/barrerafinal.png");
    suelozonasegura = game.load.image('sueloseguro', 'assets/safezone_floor.png');
    game.load.image('muroseguro', 'assets/safezone_wall.png');
    game.load.image("zonaoculta", "assets/zonaoculta.png")
    game.load.image("esquinasegura", "assets/safezone_corner.png");
    game.load.spritesheet('enemy', 'assets/enemy1sprites.png', 85, 87);
    game.load.spritesheet('enemy2', 'assets/enemysprites2mejor.png', 91, 100);
    game.load.spritesheet('fireBall', 'assets/fuegoalien.png', 73, 45);
    game.load.image('roca', 'assets/roca.png');
    game.load.image('totopo', 'assets/totopo.png');
    game.load.image('granacuatehud', 'assets/granacuate_hud.png');
    game.load.image('granacuate', 'assets/granacuate_proyectil.png');
    game.load.image('tienda_granacuate', 'assets/granacuate_tienda.png');
    game.load.image('tienda_municion', 'assets/municionextra_tienda.png');
    game.load.image('tienda_salud', 'assets/salud_extra_tienda.png');
    game.load.image('tienda_speed', 'assets/velocidad_tienda.png');
    game.load.image('puesto', "assets/reloadzone.png");
    game.load.image('roca', "assets/roca.png");
    game.load.image('cactus', "assets/cactus.png");
    game.load.image('pesos', "assets/pesos.png");
    game.load.image('dolar', "assets/dolar.png");
    game.load.image('healthBar', "assets/healthbar.png");
    game.load.image('healthHolder', "assets/health_holder.png");
    game.load.spritesheet('blast', 'assets/blast.png', 128, 128);
    game.load.spritesheet('recargar', 'assets/animacion_recarga.png', 1100, 825);
    game.load.image('chile1', 'assets/chile1.png');
    game.load.image('chile2', 'assets/chile2.png');
    game.load.image('chile3', 'assets/chile3.png');
    game.load.audio('gameBackSound', 'assets/gameBackSound.wav');
    game.load.audio('timbreSound', 'assets/timbre.wav');
    game.load.audio('shootSound', 'assets/shoot.wav');
    game.load.audio('fireballSound', 'assets/fireball.wav');
    game.load.audio('explosionSound', 'assets/explosion.wav');
    game.load.audio('cajaRegistradoraSound', 'assets/caja-registradora.wav');
    game.load.audio('alienVoiceSound', 'assets/alien-voice.wav');
    game.load.audio('alienVoiceSound2', 'assets/alien-voice2.wav');
    game.load.audio('alarmaSound', 'assets/alarma.wav');
    game.load.audio("reloadSound", "assets/recarga.wav")
    game.load.spritesheet("machete", "assets/machete.png", 96, 100);
    levelToPlay = 1;
    loadLevel(levelToPlay);
}

function loadLevel(level) {
    levelsData = ['levels/level01.json'];
    game.load.text('level', levelsData[level - 1], true);
}

function createPlay() {
    cont = 0;
    contPau = true;

    contSafezone = 10;
    contSZbool = false;

    angIni1=0;
    angIni2=0;

    levelsData = ['levels/level01.json'];

    HasMachete = true;
    MacheteCanSwing = true;
    paused = false;
    pesos = 0;
    dolares = 0;
    score = 0;
    granacuates = 0;
    level = 1;
    lives = 3;
    enemy2Shooting = false;
    enemyExist = false;
    murolista = [];
    canReload = true;
    canBuy = true;
    levelConfig = JSON.parse(game.cache.getText('level'));
    cargador = MUNICION;
    municion_comprada=false;
    salud_comprada=false;
    velocidad_comprada=false;
    createKeyControls();
    let w = game.world.width * 2;
    let h = game.world.height * 2;
    //console.log(first);
    if (first){
        game.world.setBounds(0, 0, w, h);
    }
    let bgplay = game.add.tileSprite(0, 0, w, h, 'bgplay');
    barrerafinal = game.add.tileSprite(0, 0, w, 68, 'verja');
    game.physics.arcade.enable(barrerafinal);
    barrerafinal.body.immovable = true;
    bgplay.scrollFactorX = 0.7;
    bgplay.scrollFactorY = 0.7;
    suelozonasegura.scaleY = 0.5;
    safezone = game.add.tileSprite(game.world.centerX-150, game.world.centerY-250 ,324 ,567 , 'sueloseguro');
    zonaoculta = game.add.sprite(game.world.centerX-150, game.world.centerY-250, "zonaoculta");
    game.physics.arcade.enable(zonaoculta);
    zonaoculta.body.immovable = true;
    //safezone.scrollFactorX = 1;
    //safezone.scrollFactorY = 1;
    game.physics.arcade.enable(safezone);
    safezone.body.immovable = true;
    //safezone.body.enbable = true;
    puesto = game.add.sprite(game.world.width-levelConfig.reloadzone.x, game.world.height-levelConfig.reloadzone.y, 'puesto');
    granacuateTienda = game.add.sprite(650, 800, "tienda_granacuate");
    municionTienda = game.add.sprite(900, 800, "tienda_municion");
    puesto.scale.setTo(1.5);
    game.physics.arcade.enable(puesto);
    game.physics.arcade.enable(granacuateTienda);
    for (let i = 0; i<3; i++)
        {
            game.add.sprite(levelConfig.cactus[i].x, levelConfig.cactus[i].y, "cactus");
            game.add.sprite(levelConfig.rock[i].x, levelConfig.rock[i].y, "roca");
        }
    //zonaseguramuros = game.add.group();
    //zonaseguramuros.forEach()

    for (let i = 0; i<levelConfig.safewall.length; i++)
        {
            //zonaseguramuro = zonaseguramuros.createMultiple(1, "muroseguro", levelConfig.safewall[i].x, levelConfig.safewall[i].y)
            let zonaseguramuro = game.add.sprite(levelConfig.safewall[i].x, levelConfig.safewall[i].y, "muroseguro" );
            game.physics.arcade.enable(zonaseguramuro);
            zonaseguramuro.angle = levelConfig.safewall[i].a;
            if (levelConfig.safewall[i].a == 90)
                {
                    zonaseguramuro.body.offset.setTo(-70, 0);
                } else if (levelConfig.safewall[i].a == 180)
                    {
                        zonaseguramuro.body.offset.setTo(-81, -68);
                    } else if (levelConfig.safewall[i].a == 270)
                        {
                            zonaseguramuro.body.offset.setTo(0, -68);
                        }
            zonaseguramuro.body.immovable = true;
            zonaseguramuros.push(zonaseguramuro);
        }
    for (let i=0; i<levelConfig.safewall_corner.length;i++)
        {
            let zonaseguraesquina = game.add.sprite(levelConfig.safewall_corner[i].x, levelConfig.safewall_corner[i].y, "esquinasegura" );
            game.physics.arcade.enable(zonaseguraesquina);
            zonaseguraesquina.angle = levelConfig.safewall_corner[i].a;
            if (levelConfig.safewall_corner[i].a == 90)
                {
                    zonaseguraesquina.body.offset.setTo(-70, 0);
                } else if (levelConfig.safewall_corner[i].a == 180)
                    {
                        zonaseguraesquina.body.offset.setTo(-81, -68);
                    } else if (levelConfig.safewall_corner[i].a == 270)
                        {
                            zonaseguraesquina.body.offset.setTo(0, -68);
                        }
            zonaseguraesquina.body.immovable = true;
            zonaseguraesquinas.push(zonaseguraesquina);
        }
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    BuyBtn = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    GrenadeButton = game.input.keyboard.addKey(Phaser.Keyboard.X);
    MacheteBtn = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    
    //rechargeButton = game.input.keyboard.addKey(Phaser.Keyboard.R);
    createPlayer();
    player.body.sprite.angle = ((Math.atan2(game.input.activePointer.worldY - player.body.y, game.input.activePointer.worldX - player.body.x ) * 180) / Math.PI) + 90;
    player.body.inmovable = true;
    createLasers(LASERS_GROUP_SIZE);
    createBlasts(BLASTS_GROUP_SIZE);
    createEnemys(ENEMYS_GROUP_SIZE);
    createFireBalls(FIREBALLS_GROUP_SIZE);
    createDrops(DROPS_GROUP_SIZE);
    createDollarDrops(DROPS_GROUP_SIZE/2)
    createHUD();
    game.camera.follow(player);
    game.time.events.loop(Phaser.Timer.SECOND, contarpabajo);
    //player.collidesWith = [puesto, enemys, safezone];
    createSounds();
}

function createSounds(){
    timbreSound = game.add.audio('timbreSound');
    shootSound = game.add.audio('shootSound');
    fireballSound = game.add.audio('fireballSound');
    explosionSound = game.add.audio('explosionSound');
    cajaRegistradoraSound = game.add.audio('cajaRegistradoraSound');
    alienVoiceSound = game.add.audio('alienVoiceSound');
    alienVoiceSound2 = game.add.audio('alienVoiceSound2');
    alarmaSound = game.add.audio('alarmaSound');
    reloadSound = game.add.audio("reloadSound");
    gameMusic = game.add.audio('gameBackSound');
    gameMusic.loop = true;
    menuMusic.stop();
    gameMusic.play();
}

function createHUD()
{
    hudGroup = game.add.group();
    hudGroup.create(50, 5, 'healthHolder');
    healthBar = hudGroup.create(50, 5, 'healthBar');
    scoreText = game.add.text(295, 5, "Score: " + score);
    livesText = game.add.text(40, 50, "Lives: " + lives);
    levelText = game.add.text(40, 80, "Level: " + level);
    difficultyText = game.add.text(40, 110, "Difficulty: ");
    if (difficulty=="easy")
        {
            difficulty_img = hudGroup.create(170, 100, "chile1");
        } else if (difficulty=="normal")
            {
                difficulty_img = hudGroup.create(170, 100, "chile2");
            } else{
                difficulty_img = hudGroup.create(170, 100, "chile3");
            }
    pesosText = game.add.text(20, 530, pesos + " pesos");
    dolaresText = game.add.text(20, 560, dolares + " dollars");
    safezonetext = game.add.text(520, 5, "Safe zone time\nremaining: " + contSafezone);
    hudGroup.add(scoreText);
    hudGroup.add(livesText);
    hudGroup.add(levelText);
    hudGroup.add(pesosText);
    hudGroup.add(dolaresText);
    hudGroup.add(safezonetext);
    hudGroup.add(difficultyText);
    hudGroup.fixedToCamera = true;
    healthValue = MAX_HEALTH;
}

function createObject(object, number){
    objects = game.add.group();
    objects.enableBody = true;
    objects.createMultiple(number, object);
    objects.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetMember);
    objects.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
    objects.setAll('checkWorldBounds', true);
    return objects;
}

function resetMember(item) {
    item.kill();
}

function updatePlay() {
    game.physics.arcade.overlap(lasers, enemys, laserHitsEnemy, null, this)
    game.physics.arcade.overlap(lasers, enemys2, laserHitsEnemy2, null, this)
    game.physics.arcade.overlap(lasers, zonaseguramuros, laserHitsWall);
    game.physics.arcade.overlap(lasers, zonaseguraesquinas, laserHitsWall);
    enemys.forEach(changeEnemyAnimation, this);
    enemys2.forEach(changeEnemyAnimation2, this);
    enemys.forEach(manageEnemyMovements, this);
    enemys2.forEach(manageEnemy2Movements, this);
    drops.forEach(manageDropMovements, this);
    dolardrops.forEach(manageDolarDropMovements, this);
    managePlayerMovements();
    cargador = managePlayerShots(cargador);
    manageGranacuateShots();
    manageShopping();
    manageMachete();
    //game.physics.arcade.collide(player, safezone, enemigovsafezone, null, this);
    game.physics.arcade.collide(enemys, safezone, enemigovsafezone);
    game.physics.arcade.collide(enemys2, safezone, enemigovsafezone);
    game.physics.arcade.collide(enemys, zonaseguramuros, enemigovsafezone);
    game.physics.arcade.collide(enemys2, zonaseguramuros, enemigovsafezone);
    game.physics.arcade.collide(player, zonaseguramuros);
    game.physics.arcade.collide(player, zonaseguraesquinas);
    game.physics.arcade.collide(player, zonaoculta);
    //la variable MacheteCanSwing se usa para que no aparezcan dos machetes a la vez. Si la variable está en
    //verdadero, significa que el jugador no está moviendo el machete
    if (MacheteCanSwing==true)
        {
            game.physics.arcade.collide(player, enemys, playerVSenemy, null, this);
            game.physics.arcade.collide(player, enemys2, playerVSenemy, null, this);
        } else{
            game.physics.arcade.collide(enemys, player, enemyVexplosion, null, this);
            game.physics.arcade.collide(enemys2, player, enemyVexplosion, null, this);
        }
    game.physics.arcade.collide(player, fireBall, playerVSenemy, null, this);
    if (game.physics.arcade.overlap(player, safezone))
        {
            if (contSZbool == false)
                {
                    console.log("entra zona segura")
                    timbreSound.play();
                }
            contSZbool = true;
        }else{
            if (contSZbool == true)
                {
                    canBuy = true;
                    console.log("sale zona segura")
                    timbreSound.play();
                }
            contSZbool = false;
            contSafezone = 10;
            safezonetext.setText("Safe zone time\nremaining: " + contSafezone);
            //console.log("sale de la zona segura")
        }
    
    updateHealthBar();
    console.log(player.body.x);
    console.log(player.body.y);
    if (lives <=0)
        {
            win = false;
            game.state.start("end");
        }
}

function startHOF() {
    game.state.start('hof');
}

function collectPeso(player, peso)
{
    peso.kill();
    pesos++;
}

function collectDolar(player, dolar)
{
    dolar.kill();
    dolares++;
}

function continueGame() {
    game.input.enabled = true;
    if (lives > 0) {
        let x = game.world.centerX;
        let y = game.world.height - HUD_HEIGHT;
        player.reset(x, y);
        cursors.left.reset();
        cursors.right.reset();
    }
    else startHOF();
}

function resumegame()
{
    Animacion_Recarga.destroy();
    paused = false;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///_COLISIONES_///
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function playerVSenemy(player, enemy)
{
    enemy.kill();
    displayBlast(enemy);
    if (difficulty=="easy")
        {
            if (healthValue==DAMG_EASY)
                {
                    if (salud_comprada==true)
                        {
                            healthValue=MAX_HEALTH_PLUS;
                        }else healthValue=MAX_HEALTH;
                    lives= lives-1;
                    livesText.setText("Lives: " + lives);
                }else healthValue = healthValue -DAMG_EASY;
        } else if (difficulty=="normal")
            {
                if (healthValue==DAMG_NORMAL)
                    {
                        if (salud_comprada==true)
                            {
                                healthValue=MAX_HEALTH_PLUS;
                            }else healthValue=MAX_HEALTH;
                        lives= lives-1;
                        livesText.setText("Lives: " + lives);
                    }else healthValue = healthValue -DAMG_NORMAL;
            } else{
                if (healthValue==DAMG_HARD)
                    {
                        if (salud_comprada==true)
                            {
                                healthValue=MAX_HEALTH_PLUS;
                            }else healthValue=MAX_HEALTH;
                        lives= lives-1;
                        livesText.setText("Lives: " + lives);
                    }else healthValue = healthValue -DAMG_HARD;
            }
}

function enemigovsafezone()
{
    if (safezone.body.inmovable == true)
        {
            console.log("enemigo toca zona segura")
        }
}

function createBlasts(number)
{
    blasts = game.add.group();
    blasts.createMultiple(number, 'blast');
    blasts.forEach(setupBlast, this);
}

function setupBlast(blast) 
{
    blast.anchor.x = 0.5;
    blast.anchor.y = 0.5;
    blast.animations.add('blast');
}

function enemyVexplosion(blast, enemy)
{
    enemy.kill();
    enemy.died=true;
    displayBlast(enemy);
    let rand, dolarrand;
    if (difficulty == "easy")
        {
            rand = aleatorio(2,5);
            dolarrand = aleatorio(2,3);
        } else if (difficulty == "normal")
            {
                rand = aleatorio(1,3); 
                dolarrand = aleatorio(0,3);
            } else{
                rand = aleatorio(0,3); 
                dolarrand = aleatorio(0,2);
            }
    console.log(rand);
    for (let i = 0; i < rand ;i++) {spawnDrops(enemy);}
    for (let i = 0; i < dolarrand ;i++) {spawnDolarDrops(enemy);}
}

function laserHitsEnemy(laser, enemy)
{
    enemy.kill();
    laser.kill();
    displayBlast(enemy);
    let rand, dolarrand;
    if (difficulty == "easy")
        {
            rand = aleatorio(2,5);
            dolarrand = aleatorio(2,3);
        } else if (difficulty == "normal")
            {
                rand = aleatorio(1,3); 
                dolarrand = aleatorio(0,3);
            } else{
                rand = aleatorio(0,3); 
                dolarrand = aleatorio(0,2);
            }
    console.log(rand);
    for (let i = 0; i < rand ;i++) {spawnDrops(enemy);}
    for (let i = 0; i < dolarrand ;i++) {spawnDolarDrops(enemy);}
}

function laserHitsEnemy2(laser, enemy)
{
    enemy.kill();
    enemy.died=true;
    laser.kill();
    displayBlast(enemy);
    let rand, dolarrand;
    if (difficulty == "easy")
        {
            rand = aleatorio(2,5);
            dolarrand = aleatorio(2,3);
        } else if (difficulty == "normal")
            {
                rand = aleatorio(1,3); 
                dolarrand = aleatorio(0,3);
            } else{
                rand = aleatorio(0,3); 
                dolarrand = aleatorio(0,2);
            }
    console.log(rand);
    for (let i = 0; i < rand ;i++) {spawnDrops(enemy);}
    for (let i = 0; i < dolarrand ;i++) {spawnDolarDrops(enemy);}
}

function laserHitsWall(wall, laser)
{
    laser.kill();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///_PLAYER_///
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createPlayer() {
    let x = game.world.centerX;
    let y = game.world.centerY;
    player = game.add.sprite(20, 20, 'player');
    player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    
    //player.body.collideWorldBounds = true;
}

function updateHealthBar() {
    if (healthTween)
        {
            //healthTween.stop();
            console.log(healthValue)
        }
    healthTween=game.add.tween(healthBar.scale).to({x:healthValue/MAX_HEALTH}), 50;
    healthTween.start();

}

function createKeyControls() {
    cursors = game.input.keyboard.createCursorKeys();
}

function managePlayerMovements() {
    player.body.velocity.x = 0;
    
    player.body.velocity.y = 0;
    if (!paused){
        if (velocidad_comprada == false)
            {
                if (cursors.left.isDown ) player.body.velocity.x = -PLAYER_VELOCITY;
                if (cursors.right.isDown ) player.body.velocity.x = PLAYER_VELOCITY;
                if (cursors.up.isDown ) player.body.velocity.y = -PLAYER_VELOCITY;
                if (cursors.down.isDown ) player.body.velocity.y = PLAYER_VELOCITY;
            } else{
                if (cursors.left.isDown ) player.body.velocity.x = -PLAYER_VELOCITY_PLUS;
                if (cursors.right.isDown ) player.body.velocity.x = PLAYER_VELOCITY_PLUS;
                if (cursors.up.isDown ) player.body.velocity.y = -PLAYER_VELOCITY_PLUS;
                if (cursors.down.isDown ) player.body.velocity.y = PLAYER_VELOCITY_PLUS;
            }
    }
    player.body.sprite.angle = ((Math.atan2(game.input.activePointer.worldY - player.body.y, game.input.activePointer.worldX - player.body.x ) * 180) / Math.PI) + 90;
}

function managePlayerShots(cargador) {
    
    if ((fireButton.justDown || game.input.mousePointer.leftButton.justPressed(30)) && cargador > 0){
        cargador--;
        fireLasers();
    }
    //|| -50 < player.body.y-puesto.body.y < 50
    if ((player.body.x-puesto.body.x < 50 && -50<player.body.x-puesto.body.x)&& (-50 < player.body.y-puesto.body.y && player.body.y-puesto.body.y < 50))
        {
            if (cargador!=MUNICION && canReload == true)
                {
                    canReload =false;
                    if (municion_comprada==true)
                        {
                            cargador = MUNICION_PLUS;
                        } else{
                            cargador = MUNICION;
                        }
                    paused = true;
                    reloadSound.play();
                    Animacion_Recarga = game.add.sprite(game.world.width-1000, -100, "recargar");
                    Animacion_Recarga.animations.add("reload_anim", [0, 1]);
                    Animacion_Recarga.play("reload_anim", 3, true, true);
                    game.time.events.add(Phaser.Timer.SECOND*1, resumegame);
                    game.time.events.add(Phaser.Timer.SECOND*3, activateReload);
                }
        }
    return cargador;
}

function manageMachete()
{
    if (MacheteBtn.justDown && HasMachete==true && MacheteCanSwing==true)
        {
            MacheteCanSwing=false;
            machete = game.add.sprite(player.x , player.y , "machete");
            game.physics.arcade.enable(machete);
            //machete.scale.setTo(1.5);
            machete.body.sprite.angle = ((Math.atan2(game.input.activePointer.worldY - player.body.y, game.input.activePointer.worldX - player.body.x ) * 180) / Math.PI) - 90;
            machete.animations.add("swing", [0, 1, 2, 3]);
            machete.play("swing", 10, true, true);
            game.time.events.add(Phaser.Timer.SECOND*0.5, MacheteEnd);
        }
}

function MacheteEnd()
{
    machete.kill()
    MacheteCanSwing=true;
}

function manageGranacuateShots()
{
    if (GrenadeButton.justDown && granacuates > 0)
        {
            granacuates--;
            if (granacuates == 0)
                {
                    granacuateHUD.kill()
                    granacuatestext.kill()
                }
            let y = player.y - LASERS_OFFSET_Y;
            let x = player.x - LASERS_OFFSET_X;
            let vy = ((Math.sin(Math.atan2(game.input.activePointer.worldY  - player.body.y, game.input.activePointer.worldX- player.body.x )) * 180) / Math.PI) * 8;
            let vx = ((Math.cos(Math.atan2(game.input.activePointer.worldY  - player.body.y, game.input.activePointer.worldX - player.body.x )) * 180) / Math.PI) * 8;
            proyectil = game.add.sprite(x, y, "granacuate");
            game.physics.arcade.enable(proyectil);
            proyectil.body.velocity.y = vy;
            proyectil.body.velocity.x = vx;
            proyectil.body.sprite.angle = ((Math.atan2(game.input.activePointer.worldY - player.body.y, game.input.activePointer.worldX - player.body.x ) * 180) / Math.PI) + 90;
            game.time.events.add(Phaser.Timer.SECOND*0.5, GrenadeExplode);
            explosionSound.play();
        }
}

function createLasers(number) {
    lasers = createObject('totopo', number);
}

function fireLasers() {
    let y = player.y - LASERS_OFFSET_Y;
    let x = player.x - LASERS_OFFSET_X;
    let vy = ((Math.sin(Math.atan2(game.input.activePointer.worldY  - player.body.y, game.input.activePointer.worldX- player.body.x )) * 180) / Math.PI) * 8;
    let vx = ((Math.cos(Math.atan2(game.input.activePointer.worldY  - player.body.y, game.input.activePointer.worldX - player.body.x )) * 180) / Math.PI) * 8;
    let laser = shootLaser(x, y, vx, vy);
    laser.body.sprite.angle = ((Math.atan2(game.input.activePointer.worldY - player.body.y, game.input.activePointer.worldX - player.body.x ) * 180) / Math.PI) + 90;
}

function shootLaser(x, y, vx, vy) {
    let shot = lasers.getFirstExists(false);
    if (shot) {
        shootSound.play();
        shot.reset(x, y);
        shot.body.velocity.y = vy;
        shot.body.velocity.x = vx;
    }
    return shot;
}

function activateReload()
{
    canReload=true;
}

function GrenadeExplode()
{
    let blast = blasts.getFirstExists(false);
    let x = proyectil.body.center.x;
    let y = proyectil.body.center.y;
    blast.reset(x, y);
    proyectil.kill();
    blast.scale.setTo(2);
    game.physics.arcade.enable(blast);
    blast.play('blast', 30, false, true);
    game.physics.arcade.collide(enemys, blast, enemyVexplosion);
    game.physics.arcade.collide(enemys2, blast, enemyVexplosion);

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///_ENEMIGOS_///
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createEnemys(number) {
    enemys = createObject('enemy', number);
    enemys2 = createObject('enemy2', number)
    currentEnemyProbability = LEVEL_ENEMY_PROBABILITY[level-1];
    currentEnemy2Probability = LEVEL_ENEMY_PROBABILITY[level-1];
    currentEnemyVelocity = LEVEL_ENEMY_VELOCITY[level-1];
    currentEnemy2Velocity = LEVEL_ENEMY2_VELOCITY[level-1];
    game.time.events.loop(TIMER_RHYTHM, activateEnemy, this);
    if (enemyExist) game.time.events.loop(TIMER_RHYTHM, manageEnemyMovements, this);
    //enemys.body.inmovable = true;
    //enemys2.body.inmovable = true;
    
}

function activateEnemy() {
    if (Math.random() < currentEnemyProbability) {
        let enemy = enemys.getFirstExists(false);
        if (enemy) {
            enemy.animations.add ('top1', [0, 1]);
            enemy.animations.add ('bottom1', [2, 3]);
            let ww = game.world.width;
            let wh = game.world.height;
            let uw = enemy.body.width;
            let uh = enemy.body.width;
            if (Math.random() < 0.5){
                if (Math.random() < 0.5){
                    x = player.body.x + ww/2
                    y = player.body.y + wh/2
                }
                else{
                    x = player.body.x + ww/2
                    y = player.body.y - wh/2
                }
            }
            else {
                if (Math.random() < 0.5){
                    x = player.body.x - ww/2
                    y = player.body.y + wh/2
                }
                else{
                    x = player.body.x - ww/2
                    y = player.body.y - wh/2
                }
            }
            if ((486 < x < 1027) && (210 < y < 950))
            {
                if (Math.random() < 0.5){
                    if (Math.random() < 0.5){
                        x = 1027 + ww/2
                        y = 950 + wh/2
                    }
                    else{
                        x = 1027 + ww/2
                        y = 210 - wh/2
                    }
                }
                else {
                    if (Math.random() < 0.5){
                        x = 486 - ww/2
                        y = 950 + wh/2
                    }
                    else{
                        x = 486 - ww/2
                        y = 210 - wh/2
                    }
                }
            }
            if (x > ww) x=ww -uw;
            if (x < 0) x=0;
            if (y > wh) y=wh - uh;
            if (y < 0) y=0;
            enemy.reset(x, y);
            //enemys.push(enemy);
            let w = ww - uw;
            let x2 = Math.floor(Math.random()*w);
            let z = uw / 2 + x2;
            game.physics.arcade.enable(enemy);
            enemy.sound=0;
            enemy.soundFirst=true;
            enemy.play('walking', 7, true, true);
            enemyExist = true;
        }
    }
    if (Math.random() < currentEnemy2Probability)
    {
        let enemy2 = enemys2.getFirstExists(false);
        if (enemy2)
        {
            enemy2.animations.add('top2', [0]);
            enemy2.animations.add('bottom2', [1]);
            enemy2.animations.add("shootup2", [2]);
            enemy2.animations.add("shootdown2", [3]);
            let ww = game.world.width;
            let wh = game.world.height;
            let uw = enemy2.body.width;
            let uh = enemy2.body.width;
            if (Math.random() < 0.5){
                if (Math.random() < 0.5){
                    x = player.body.x + ww/2
                    y = player.body.y + wh/2
                }
                else{
                    x = player.body.x + ww/2
                    y = player.body.y - wh/2
                }
            }
            else {
                if (Math.random() < 0.5){
                    x = player.body.x - ww/2
                    y = player.body.y + wh/2
                }
                else{
                    x = player.body.x - ww/2
                    y = player.body.y - wh/2
                }
            }
            if ((486 < x < 1027) && (210 < y < 950))
            {
                if (Math.random() < 0.5){
                    if (Math.random() < 0.5){
                        x = 1027 + ww/2
                        y = 950 + wh/2
                    }
                    else{
                        x = 1027 + ww/2
                        y = 210 - wh/2
                    }
                }
                else {
                    if (Math.random() < 0.5){
                        x = 486 - ww/2
                        y = 950 + wh/2
                    }
                    else{
                        x = 486 - ww/2
                        y = 210 - wh/2
                    }
                }
            }
            if (x > ww) x=ww -uw;
            if (x < 0) x=0;
            if (y > wh) y=wh - uh;
            if (y < 0) y=0;
            enemy2.reset(x, y);
            //enemys.push(enemy);
            let w = ww - uw;
            let x2 = Math.floor(Math.random()*w);
            let z = uw / 2 + x2;
            game.physics.arcade.enable(enemy2);
            enemy2.play('walking', 7, true, true);
            enemy2.timer=0;
            enemy2.sound=0;
            enemy2.soundFirst=true;
            enemy2.died= false;
            enemyExist = true;
        }
    }
}

function manageEnemyMovements(enemy){
    if (!paused){
        if ((-250 < (player.body.x - enemy.body.x) && (player.body.x - enemy.body.x) < 250) && (-250 < (player.body.y - enemy.body.y) && (player.body.y - enemy.body.y) < 250)){
            let ang = Math.atan2(enemy.body.y  - player.body.y, enemy.body.x - player.body.x );
            enemy.body.velocity.y = - Math.sin(ang) * 100;
            enemy.body.velocity.x = - Math.cos(ang) * 100;
            enemy.sound++;
            if (enemy.sound>=150 || enemy.soundFirst == true){
                enemy.soundFirst = false;
                alienVoiceSound.play();
                enemy.sound=0;
            }
        }
        else{
            enemy.sound=0;
            if (Math.random() < 0.0005 || angIni1 == 0){
                enemy.ang = 2*Math.PI*Math.random();
                angIni1 = 1;
            }
            enemy.body.velocity.y = - Math.sin(enemy.ang) * 50;
            enemy.body.velocity.x = - Math.cos(enemy.ang) * 50;
        }
    }
    else{
        enemy.body.velocity.y = 0;
        enemy.body.velocity.x = 0;
    }   
}

function manageEnemy2Movements(enemy){
    if (!paused){
        if ((-300 < (player.body.x - enemy.body.x) && (player.body.x - enemy.body.x) < 300) && (-300 < (player.body.y - enemy.body.y) && (player.body.y - enemy.body.y) < 300)){
            let ang = Math.atan2(enemy.body.y  - player.body.y, enemy.body.x - player.body.x );
            enemy.body.velocity.y = - Math.sin(ang) * 75;
            enemy.body.velocity.x = - Math.cos(ang) * 75;
            enemy.timer++;
            enemy.sound++;
            if (enemy.sound>=150 || enemy.soundFirst == true){
                enemy.soundFirst = false;
                alienVoiceSound2.play();
                enemy.sound=0;
            }
            if (enemy.timer>=200 && !(enemy.died)){
                fireEnemyFireball(enemy);
                enemy2Shooting = true;
                enemy.timer=0;
                game.time.events.add(Phaser.Timer.SECOND*0.5, shootAnimationEnd);
                if (enemy.body.velocity.y > 0){
                    enemy.play('shootup', 3, true);
                } 
                else {
                    enemy.play('shootdown', 3, true);
                }
            }
        }
        else{
            enemy.timer=0;
            if (Math.random() < 0.0005 || angIni2 == 0){
                enemy.ang = 2*Math.PI*Math.random();
                angIni2 = 1;
            }
            enemy.body.velocity.y = - Math.sin(enemy.ang) * 50;
            enemy.body.velocity.x = - Math.cos(enemy.ang) * 50;
        }
    }
    else{
        enemy.body.velocity.y = 0;
        enemy.body.velocity.x = 0;
    }
}

function changeEnemyAnimation(enemy)
{
    if (enemy.body.velocity.y > 0){
        enemy.play('top1', 7, true, true);
    } 
    else {
        enemy.play('bottom1', 7, true, true);
    }
    if (enemy.body.velocity.x > 0)
    {
        enemy.scale.setTo(1, 1);
    } else
    {
        enemy.scale.setTo(-1, 1);
    }
}

function changeEnemyAnimation2(enemy)
{
    if (enemy2Shooting == false)
        {
            if (enemy.body.velocity.y > 0)
                {
                        enemy.play("top2");
                } else{
                        enemy.play('bottom2');
                }
                if (enemy.body.velocity.x > 0)
                    {
                        enemy.scale.setTo(1, 1);
                    } else
                    {
                        enemy.scale.setTo(-1, 1);
                    }
        }
}

function shootAnimationEnd()
{
    enemy2Shooting=false;
}

function createFireBalls(number) {
    fireBalls = createObject('fireBall', number);
}

function fireEnemyFireball(enemy) {
    let y = enemy.body.y;
    let x = enemy.body.x;
    let ang = Math.atan2(enemy.body.y  - player.body.y, enemy.body.x - player.body.x );
    let vy = - Math.sin(ang) * 500;
    let vx = - Math.cos(ang) * 500;
    fireBall = shootEnemyFireball(x, y, vx, vy);
    fireBall.body.sprite.angle = ang ;
    if (fireBall.body.x > player.body.x)
        {
            fireBall.scale.setTo(-1);
        } else{
            fireBall.scale.setTo(1);
        }
}

function shootEnemyFireball(x, y, vx, vy) {
    let shot = fireBalls.getFirstExists(false);
    shot.animations.add("fireball", [0, 1])
    shot.play("fireball", 10, true, true);
    
    if (shot) {
        fireballSound.play();
        shot.reset(x, y);
        shot.body.velocity.y = vy;
        shot.body.velocity.x = vx;
    }
    return shot;
}

function displayBlast(enemy) 
{
    let blast = blasts.getFirstExists(false);
    let x = enemy.body.center.x;
    let y = enemy.body.center.y;
    blast.reset(x, y);
    blast.play('blast', 30, false, true);
    
}

function createDrops(number) {
    drops = createObject('pesos', number);
    game.physics.arcade.enable(drops);
}

function createDollarDrops(number) {
    dolardrops = createObject('dolar', number);
}

function spawnDrops(enemy){
    let drop = drops.getFirstExists(false);
    drop.ang = 2*Math.PI*Math.random();
    let uw = enemy.body.width;
    let uh = enemy.body.height;
    x = enemy.body.x + uw/2;
    y = enemy.body.y + uh/2;
    drop.reset(x, y);
    drop.scale.setTo(0.5);
    drop.body.velocity.y = - Math.sin(drop.ang) * 50;
    drop.body.velocity.x = - Math.cos(drop.ang) * 50;
}

function spawnDolarDrops(enemy){
    let drop = dolardrops.getFirstExists(false);
    game.physics.arcade.enable(drop);
    drop.ang = 2*Math.PI*Math.random();
    let uw = enemy.body.width;
    let uh = enemy.body.height;
    x = enemy.body.x + uw/2;
    y = enemy.body.y + uh/2;
    drop.reset(x, y);
    drop.scale.setTo(0.5);
    drop.body.velocity.y = - Math.sin(drop.ang) * 50;
    drop.body.velocity.x = - Math.cos(drop.ang) * 50;
}

function manageDropMovements(drop){
    if(!(drop.body.velocity.y == 0) || !(drop.body.velocity.x == 0)){
        drop.body.velocity.y *= 0.99;
        drop.body.velocity.x *= 0.99;
    }
    game.physics.arcade.overlap(player, drop, collectPeso, null, this);
    pesosText.setText(pesos + " pesos");
}

function manageDolarDropMovements(drop){
    if(!(drop.body.velocity.y == 0) || !(drop.body.velocity.x == 0)){
        drop.body.velocity.y *= 0.99;
        drop.body.velocity.x *= 0.99;
    }
    game.physics.arcade.overlap(player, drop, collectDolar, null, this);
    dolaresText.setText(dolares + " dollars");
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///_TIENDA Y ZONA SEGURA_///
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function manageShopping()
{
    if (BuyBtn.justDown && canBuy == true)
        {
            if (game.physics.arcade.collide(player, granacuateTienda) && pesos >= 15)
                {
                    canBuy = false;
                    if (granacuates == 0)
                        {
                            granacuateHUD = hudGroup.create(690, 80, 'granacuatehud');
                            granacuatestext = game.add.text(690, 150, "x " + granacuates);
                            cajaRegistradoraSound.play();
                            hudGroup.add(granacuatestext);
                        }
                    granacuates++;
                    granacuatestext.setText("x " + granacuates);
                    pesos -=15;
                } else if ((game.physics.arcade.collide(player, municionTienda) && pesos >= 25) && municion_comprada==false)
                    {
                        canBuy = false;
                        cargador = MUNICION_PLUS;
                        municion_comprada=true;
                        cajaRegistradoraSound.play();

                        pesos -=25;
                    } else if (game.physics.arcade.collide(player, saludTienda) && dolares >= 25)
                        {
                            canBuy = false;
                            healthValue = MAX_HEALTH_PLUS;
                            salud_comprada=true;
                            dolares -=25;
                            cajaRegistradoraSound.play();
                        } else if ((game.physics.arcade.collide(player, velocidadTienda)&& dolares >= 15)&&velocidad_comprada==false)
                            {
                                canBuy = false;
                                velocidad_comprada=true;
                                dolares -=15;
                                cajaRegistradoraSound.play();
                            }else if (game.physics.arcade.collide(player, barrerafinal)&& pesos >= 100)
                                {
                                    pesos -=100;
                                    cajaRegistradoraSound.play();
                                    win = true;
                                    game.state.start("end");
                                } else if (game.physics.arcade.collide(player, zonaoculta)&& dolares >= 40)
                                    {
                                        canBuy = false;
                                        dolares -=40;
                                        cajaRegistradoraSound.play();
                                        zonaoculta.destroy();
                                        saludTienda = game.add.sprite(650, 500, "tienda_salud");
                                        velocidadTienda = game.add.sprite(900, 500, "tienda_speed");
                                    }
        }
}

function contarpabajo()
{
    if (contSafezone == 3){
        alarmaSound.play();
    }
    if (contSafezone == 0)
        {
            lives = 0;
        }
    if (contSZbool == true)
        {
            contSafezone = contSafezone-1;
        } else{
            return;
        }
        safezonetext.setText("Safe zone time\nremaining: " + contSafezone);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///_FUNCIONES DE SOPORTE_///
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function aleatorio(a, b){
    let y = Math.random();
    let x = y*(b-a) + a;
    return x;
}

