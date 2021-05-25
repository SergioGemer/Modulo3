var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
    scene: [Scene1, Scene2, Scene3]
};

var player;
var goldenstar;
var silvers;
var stars;
var contadorstars = 0;
var contadorsilvers = 0;
var bombs;
var platforms;
var cursors;
var score;
var gameOver;
var scoreText;

var timedEvent;
var initialTime;
var timeText;
var level = 0;

var game = new Phaser.Game(config);