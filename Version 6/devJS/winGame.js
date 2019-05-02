// JavaScript source code
class WinScene extends Phaser.Scene {
    constructor() {
        super("win");
    }
    preload() {

    }
    create() {
        this.winText = this.add.text(395, 254, "Game Complete!", { font: '48px Arial', fill: '#ffffff' });
        this.winScoreText = this.add.text(450, 350, "Score: " + score, { font: '24px Arial', fill: '#ffffff' });
        //restart button feature completed on 02/04/2019
        this.restartButton = this.add.text(300, 410, "Restart", { font: '24px Arial', fill: '#ffffff' }).setInteractive();
        this.restartButton.once("pointerdown", function (event) { restart = true; });
        this.exitButton = this.add.text(800, 410, "Exit", { font: '24px Arial', fill: '#ffffff' }).setInteractive();
        this.exitButton.once("pointerdown", function (event) { exit = true; });
        this.uiscene = this.scene.manager.getScene('win');
        this.gamescene = this.scene.manager.getScene("gameScene");

    }
    update() {

        if (restart) {
            player.setVelocityX(0);
            robotSpeedX = 0;
            restartButton.call(this);
        }
        if (exit) {
            window.close();
        }
    }
}
function restartButton() {
    score -= score;
    restart = false;
    this.scene.start("gameScene");
}