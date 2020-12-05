
var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var players;
var form, player, game;
var player1,player2,player3,player4,player5,player6;
var rand,playername;

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
 
 database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  background(rgb(198,135,103));
if(playerCount === 2){
  game.update(1);
}
if(gameState === 1){
  clear();
  game.play();
}
  //drawSprites();

  
  
  }
