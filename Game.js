class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    textSize(30);
    text("Game Start", 120, 100);
    player1 = createSprite(600,400,50,50);
    player2 = createSprite(400,600, 50,50);
    player3 = createSprite(700,300, 50, 50);
    player4 = createSprite(200, 800, 50,50);
    player5 = createSprite(500,400, 50,50);
    player6 = createSprite(567, 863, 50,50);
    players=[player1,player2,player3,player4,player5,player6];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      //var display_position = 130;
      background(rgb(198,135,103));
      //index of the array
      var index = 0;

      //x and y position of the players
      var x = 175 ;
      var y;
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the players a little away from each other in x direction
        //x = x + 200;
        x = displayWidth - allPlayers[plr].distanceX
        //use data form the database to display the players in y direction
        y = displayHeight - allPlayers[plr].distanceY;
        players[index-1].x = x;

        players[index-1].y = y;
       // console.log(index, player.index)

       rand = Math.round(random(1,2));

       
        if (index === player.index){                                     
          
          if((index-1)===rand)
          {
            players[index-1].visible=false;
            console.log(players[index-1]+" is the invisible player");
          }
          else
          {
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            players[index - 1].shapeColor = "red";
          }
          camera.position.x = players[index-1].x;
          camera.position.y = players[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distanceY +=50;
      console.log(player.distanceY);
      player.update();
    }

    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distanceY -=50;
      console.log(player.distanceY);
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distanceX +=50;
      console.log(player.distanceX);
      player.update();
    }
    
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distanceX -=50;
      console.log(player.distanceX);
      player.update();
    }
    drawSprites();
  }
}
