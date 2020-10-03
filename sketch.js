//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground;
var trex;
var invisibleGround;
var ObstaclesGroup;
var CloudsGroup;
var gameOver;
var restart;
var count;

function setup(){
  canvas - createCanvas(displayWidth-20,displayHeight-30);

//create a trex sprite
trex = createSprite(200,380,20,50);
//trex.setAnimation("trex");

//set collision radius for the trex
trex.setCollider("rectangle",0,0,trex.width,trex.height);

//scale and position the trex
trex.scale = 0.5;
trex.x = 50;

//create a ground sprite
ground = createSprite(200,380,400,20);
//ground.setAnimation("ground2");
ground.x = ground.width /2;

//invisible Ground to support Trex
invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;

//create Obstacle and Cloud Groups
ObstaclesGroup = createGroup();
CloudsGroup = createGroup();


//set text
textSize(18);
textFont("Georgia");
textStyle(BOLD);

gameOver = createSprite(200,275);
restart = createSprite(200,340);
gameOver.visible = false;
restart.visible = false;
//gameOver.setAnimation("gameOver");
gameOver.scale = 0.5;
//restart.setAnimation("restart");
restart.scale = 0.5;

//score
count = 0;
}

function draw() {
  //set background to white
  background("black");
  

  //display score
  text("Score: "+ count, 250, 100);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3 * count/100);
    //scoring
    count = Math.round(World.frameCount/4);
    
    if (ground.x < -1){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 359){
      trex.velocityY = -12 ;
      //playSound("jump.mp3");
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
      //playSound("die.mp3");
      //trex.velocityY = -12 ;
      //playSound("jump.mp3");
      
    }
    
    /*if(count > 0 && count % 100 === 0){
      //playSound("checkPoint.mp3");
      
    }*/

    camera.position.x = displayWidth/2;
    camera.position.y = trex.y;
  
  }else if(gameState === END) {
    
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    //trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    //trex.setAnimation("trex_collided");
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);

    gameOver.visible = true;
    restart.visible = true;

    count.visible = false;

  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  //trex.setAnimation("trex")
  count = 0;
}
  
  

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -(6 + 3 * count/100);
    
    //generate random obstacles
    //var rand = randomNumber(1,6);
    //obstacle.setAnimation("obstacle" + rand);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    //cloud.y = randomNumber(280,320);
    //cloud.setAnimation("cloud");
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}
