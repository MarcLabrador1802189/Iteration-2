// Main File for Game Prototype - Holds everything together
/*
 *  TThis game is now en-route for Beta Testing via Iteration 2.
 *  ensuring it's playable, fun and responsive to play for mobile/tablet.
 *  Started this project on 04/03/2019 at 11:50
 */
//configuration via PHASER 3
var config = {
    type: Phaser.WEBGL,
    width: 102.4 * 10,
    height: 76.8 * 10,
    pixelArt: true,
    backgroundColor: '#000000',
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 500 },
            debug: false
        }
    },
    scene: [GameScene, UIScene, WinScene, dieScene],
    callbacks: {
        postBoot: function () {
            reSize();
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    autoRound: false,
    parent: "phaser-example"


};

var game = new Phaser.Game(config);
window.addEventListener("resize", reSize, false);
//ASSIGN Global Variables
var platforms, player, jump, buttonRight, buttonLeft, collisionLayer;
var mapwidth = 68 * 12;
var mapHeight = 68 * 8;
var jumpOver = false;
var isRight = false;
var isLeft = false;
// Player's speed
var playerSpeedX = 134;
var playerSpeedY = 360;
//Button Variables week 3
var buttonDoor = false, buttonElev = false;
var buttonDoor2 = false;
//Enemy Variable
var robot
var robotSpeedX = 0;
var robotSpeedY = 200;
var isRubyPicked = false;
// Created score - 01/04/2019
var score = 0;
// restart game boolean - 03/04/2019
var restart = false;
// exit game boolean - 03/04/2019
var exit = false;
// kill the player boolean - 04/04/2019
var playerdie = false;
/*
 * Google Analytical data needed for quantity research on testing
 */
var attempts = 0;
var winCount = 0;
var deathCount = 0;
function reSize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;

    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    } else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

function trackEvent(action, label, value) {

    console.log(str);

    var str = "event trackEventing action " + "action: " + action + " " + "label: " + " " + label + "value: " + value;

    gtag("event", action, {
        "event_category": "Year 1 Project",
        "event_label": label,
        "value": value
    });

}