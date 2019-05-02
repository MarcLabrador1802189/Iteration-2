// Game File for Game Prototype - Temporary
/*
 *  This game is a work-in-progress project. Few things to remember, I will test for UI Gameplay controls starting from week 20, and will implement collectables as well as an updated tile map
 *  ensuring it's playable, fun and responsive to play for mobile.
 *  Started this project on 04/03/2019 at 11:50
 *  Updated on 12/03/2019 at 09:30 - until 15/03/2019
 */

class GameScene extends Phaser.Scene {
    constructor() {
        super("gameScene");
    }
    preload() {
        //main asset upload
        this.load.image("platforms1", "assets/platforms/platform-100.png");
        this.load.image("platforms2", "assets/platforms/platform-1600.png");
        this.load.image("background", "assets/tileset/scifi_platform_BG1.jpg");
        this.load.image("elevator", "assets/platforms/flyingBrick.png")
        this.load.image("door", "assets/platforms/door.png");
        this.load.image("panel", "assets/platforms/door1_panel.png");
        this.load.image("sci-fi", "assets/tileset/scifi_platformTiles_32x32.png");
        this.load.image("button", "assets/controls/buttons.png");
        this.load.spritesheet("jewel", "assets/item/jewel-sheet.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("ruby", "assets/item/jewel-sheet.png", { frameWidth: 16, frameHeight: 16 });
        this.load.tilemapTiledJSON("tileset", "assets/tileset/level1v2.json");
        this.load.spritesheet("player", "assets/platforms/player.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("enemy", "assets/platforms/robodude.png", { frameWidth: 32, frameHeight: 32 });
    }

    create() {

        // ASPECT RATIO CHECK FOR MOBILE DEVICES (PC - TESTING ONLY)
        window.addEventListener("resize", reSize, false);
        
        // -- OLD CODE FOR DOOR BEFORE TRIGGER -- 14/03/2019
        /*this.door = this.physics.add.staticGroup();
        this.automated = this.door.create(1056, 383.5, "door");
        this.automated.setDisplaySize(75, 190).refreshBody();
        this.automated.setDepth(5);
        */
        //this.door.setDisplaySize(75, 190).refreshBody();

        //Code for platforms, doors and backgrounds - Essentially applying in tilemap into game.
        var background = this.add.image(400, 350, "background").setScrollFactor(0.5, 1);
        background.setScale(1.5, 1.5);
        this.map = this.make.tilemap({ key: "tileset" });
        var landscape = this.map.addTilesetImage("scifi_platformTiles_32x32", "sci-fi");
        this.map.createStaticLayer("foLayer", landscape, 0, 0);

        //To apply static collision for player and tile map
        // this.map.createStaticLayer("collisionLayer", landscape, 0, 0);
        collisionLayer = this.map.createStaticLayer("collisionLayer", landscape, 0, 0);
        collisionLayer.setCollisionBetween(0, 1000);

        //spawn player by relating to the properties of the object type "player"
        player =  this.map.findObject("objectLayer", function (object) {
            if (object.type === "player") {
               
                return object;
            }
        });
        
        this.jewel = this.physics.add.staticGroup();
        
        this.map.findObject("objectLayer", function (object) {
            if (object.type === "jewel") {
                this.jewel.create(object.x + this.map.tileWidth / 2, object.y + this.map.tileHeight / 2, "jewel");
            }
        }, this);


        this.ruby = this.physics.add.sprite(300, 1836, "ruby");
        this.ruby.setTint(0xff0000);
        this.ruby.body.setAllowGravity(true);

        //spawn ruby by x and y location of the object "ruby". Basically triggers the AI to immediately chase after the player
        //this.map.findObject("");

        //spawn robot by relating to the properties of the object type "enemy"
        robot = this.map.findObject("objectLayer", function (object) {
            if (object.type === "enemy") {
                return object;
            }

        });
        
        

        //JEWEL and RUBY ANIMATIONS
        this.anims.create({
            key: "jewelAnims",
            frames: this.anims.generateFrameNumbers("jewel", { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "rubyAnims",
            frames: this.anims.generateFrameNumbers("jewel", { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1,
        });

        //PLAYER ANIMATIONS
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("player", { start: 1, end: 5 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player", { frames: [1, 1] }),
            frameRate: 3,
            repeat: -1
        });

        //ROBOT ANIMATIONS  
        this.anims.create({
            key: "robotmove",
            frames: this.anims.generateFrameNumbers("enemy", { start: 1, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //DOOR
        this.door = this.physics.add.sprite(1054, 383.5, "door");  
        this.door.setDisplaySize(75, 190);
        //this.door.setSize(75, 190); - DETERMINING THE HITBOX OF THE DOOR
        this.door.body.setAllowGravity(false)
        this.door.body.immovable = true;

        //Elevator
        this.elevator = this.physics.add.sprite(1170, 512, "elevator");
        this.elevator.setDisplaySize(160, 64);
        this.elevator.body.setAllowGravity(false);
        this.elevator.body.immovable = true;

        //lower floor door
        this.door1 = this.physics.add.sprite(835, 1263, "door");
        this.door1.setDisplaySize(60, 160);
        this.door1.body.setAllowGravity(false);
        this.door1.body.immovable = true;

        //end game door
        this.panel = this.physics.add.image(1226, 2055, "panel");
        this.panel.body.setAllowGravity(false);
        this.panel.body.immovable = true;

        this.scene.launch('uiscene');
        this.cameras.main.setBounds(0, 0, this.map.width * this.map.tileWidth, this.map.height * this.map.tileHeight);
        this.physics.world.setBounds(0, 0, this.map.tileWidth, this.map.tileHeight);
        this.cameras.main.startFollow(player, true, 0.25);
        button.call(this);
        createPlayer.call(this, player);
        angryRobot.call(this, robot);
        setCamera.call(this, player);
        createCollision.call(this, player, this);
        
        this.physics.add.collider(player, this.door);
        this.physics.add.overlap(player, this.zone);
        this.physics.add.collider(player, this.door1);
        this.physics.add.collider(player, this.elevator);

        //determine if game ends
        this.gameover = false;

        console.log("restart = " + restart);
        this.scene.stop("win");
        this.scene.stop("die");
        this.dieScene = this.scene.manager.getScene('die');
        this.uiscene = this.scene.manager.getScene('uiscene');
        this.winScene = this.scene.manager.getScene('win');
    }

    update() {
        
        //test update for controls
        if (buttonDoor) {
            console.log("Open");

            this.tweens.add({
                targets: this.door,
                y: this.door.y - 250,
                duration: 2500,
            });

        } // updated on 25/03/2019
        if (buttonElev) {
            console.log("Elevator Works");

            this.tweens.add({
                targets: this.elevator,
                y: this.elevator.y + 505,
                duration: 10300,
            });

        }
        if (buttonDoor2) {
            console.log("door works");

            this.tweens.add({
                targets: this.door1,
                y: this.door1.y - 150,
                duration: 2500,
            });
        } 
        

        if (!this.gameover) {
            this.enemyMovement.call(this);
        } else {
            robot.setVelocityX(0);
        }
        
        this.fallOffDie.call(this);
        rubyAnims.call(this);
        jewelAnims.call(this);
        
    }
    endGameDoor() {

        if (isRubyPicked) {
        trackEvent("Win", "Games Won", score);
        //console.log("game complete!");
        //this.physics.pause();
        this.gameover = true;
        isRight = false;
        this.scene.stop("uiscene");
        this.scene.launch("win");
    }
    }
    fallOffDie() {
        // if player falls off the map
        //console.log(player.y);
        if (player.y > 3000) {
            trackEvent("Player Die", "Number of Deaths", deathCount);
            deathCount++;
            playerdie = true;
            this.gameover = true;
            this.scene.stop("uiscene");
            this.scene.launch("die");
            player.disableBody(true);
            player.setVisible(false);
        }
    }
    enemyMovement() {
        // added some ai movement on 28/03/2019
        if (robot.body.blocked.left || robot.body.blocked.right) {
            if (robot.jumpCount < robot.maxJump) {
                robot.jumpCount++;
                robot.setVelocityY(-robotSpeedY);
            }
        } else {
            robot.jumpCount = 0;
        }
        if (robot.x >= player.x) {
            robot.setVelocityX(-robotSpeedX);
            robot.flipX = true;
        } else {
            robot.setVelocityX(robotSpeedX);
            robot.flipX = false;
        }

    }
}
//In order for player to spawn
function createPlayer(playerSpawn) {
    player = this.physics.add.sprite(playerSpawn.x, playerSpawn.y, "player", 4);
    player.setSize(20, 30);
    player.setScale(1.3, 1.3);
    player.maxJump = 1;
    player.jumpCount = 0;
    player.setDepth(1);
    //player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);
}

//Camera function to track player and set viewport
function setCamera() {
    this.cameras.main.startFollow(player, true, 0.25);
    this.cameras.main.setZoom(1.2);

}
// Collision between player and other events
function createCollision(player) {
    player.setBounce(0.01);
    this.physics.add.collider(player, collisionLayer);
    this.physics.add.collider(robot, collisionLayer);
    this.physics.add.collider(this.ruby, collisionLayer);
    this.physics.add.overlap(player, this.jewel, pickUpJewel, null, this);
    this.physics.add.overlap(player, this.ruby, pickUpRuby, null, this);
    this.physics.add.overlap(player, this.panel, this.endGameDoor, null, this);
}
function jewelAnims() {

    this.jewel.playAnimation("jewelAnims", true);
}

function rubyAnims() {
    
    this.ruby.play("rubyAnims", true);
    
}

function pickUpJewel(player, jewel) {
    trackEvent("Score", "Gems Collected", score);
    jewel.disableBody(true, true);
    score += 10;
    this.uiscene.scoreText.setText("Score: " + score);
}

/*function endGameDoor() { // worked on end game screen on april 1
    
    if (isRubyPicked) {
        console.log("game complete!");
        this.pause();
        this.uiscene.setVisible(false);
    }
}*/

function pickUpRuby(player, ruby) {
    trackEvent("Win", "Games Won", winCount);
    winCount++;
    ruby.disableBody(true, true);
    robotSpeedX += 100;
    isRubyPicked = true;
    this.uiscene.unlockText.setText("Door: Unlocked");
    
}
//Button Functions
function button() {

    //INTERACT WITH BUTTONS TO OPEN DOORS AND ELEVATORS
    var button1 = this.add.image(990, 406, "button");
    button1.setDisplaySize(32, 32).setInteractive();
    button1.once("pointerdown", function (event) { buttonDoor = true; button1.setTint(0x00ff00); });
    button1.on("pointerup", function (event) { buttonDoor = false; });

    var button2 = this.add.image(1170, 407, "button");
    button2.setDisplaySize(32, 32).setInteractive();
    button2.once("pointerdown", function (event) { buttonElev = true; button2.setTint(0x00ff00); });
    button2.on("pointerup", function (event) { buttonElev = false; });

    var button3 = this.add.image(784, 1273, "button");
    button3.setDisplaySize(32, 32).setInteractive();
    button3.once("pointerdown", function (event) { buttonDoor2 = true; button3.setTint(0x00ff00); });
    button3.on("pointerup", function (event) { buttonDoor2 = false; });
    
}
//AI Spawn on 27/03/2019
function angryRobot(enemySpawn) {
    robot = this.physics.add.sprite(enemySpawn.x, enemySpawn.y, "enemy", 4);
    robot.jumpCount = 0;
    robot.maxJump = 1;
    robot.setScale(1.3, 1.3);
    robot.anims.play("robotmove", true);
    robot.body.immovable = true;
    this.physics.add.collider(robot, platforms);
    this.physics.add.overlap(player, robot, playerKill, null, this);
}

//AI kill player function - 04/04/2019
function playerKill() {
    trackEvent("Player Die", "Number of Deaths", deathCount);
    deathCount++;
    playerdie = true;
    this.gameover = true;
    this.scene.stop("uiscene");
    this.scene.launch("die");
    player.disableBody(true);
    player.setVisible(false);
    
}