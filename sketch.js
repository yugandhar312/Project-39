var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage,food;
var FoodGroup, obstacleGroup;
var st;

var score = 0;
var index = 0;


function preload(){
  
  backdropi = loadImage("backdrop.jfif");
  monkey_running = loadAnimation("monkey_0.png",
  "monkey_1.png","monkey_2.png","monkey_3.png",
  "monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  obstacle1Image = loadImage("my obstacle1.png");
}



function setup() {
  
  createCanvas(600, 300);
  backdrop = createSprite(0,200,300,300);
  backdrop.addImage(backdropi);
  backdrop.scale = 1.3;
  backdrop.x=backdrop.width/2;
  var survivalTime=0;
  monkey = createSprite(50,200,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,200,600,20);
  ground.x = ground.width /2;

   invisibleGround = createSprite(200,200,400,10);
  invisibleGround.visible = false;
  
  
  
  
   FoodGroup = createGroup();
   obstacleGroup = createGroup();
   obstacle1Group = new Group();
   score = 0;
  monkey.collide(invisibleGround);
  
}


function draw() {

  background(rgb(230, 250, 255) );
  
      ground.x = monkey.x;
      invisibleGround.x = ground.x;
 //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
        
    }

 //to move right
    if(keyDown(RIGHT_ARROW)){
     monkey.x = monkey.x+1;
      camera.position.x = monkey.x;
      camera.position.y = monkey.y+1;
    }   

    
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(invisibleGround);
   
  
  
  
  food();
  stone();
 
  drawSprites();
  
  

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);     
  if(obstacleGroup.isTouching(monkey)){
    obstacleGroup.destroyEach();
    monkey.scale = 0.1
  
  }

  if(obstacle1Group.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacle1Group.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    obstacle1Group.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
 
   
   }
   if(FoodGroup.isTouching(monkey)){
    
    FoodGroup.destroyEach();
    monkey.scale = monkey.scale + 0.02;
    
  }
  
  stroke(rgb(26, 255, 255));
  textSize(20);
  fill(rgb(26, 255, 255));
  strokeWeight(1.5);
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 50,50);

  stroke(rgb(140, 255, 26));
  textSize(20);
  fill(rgb(140, 255, 26));
  strokeWeight(1.5);
  text("score : "+score,250,50)
}

function food(){
if (frameCount % 400 === 0) {
    var banana = createSprite(frameCount,180,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1  ;
    //banana.velocityX = -3;
    
     //assign lifetime to the variable
    //banana.lifetime = 200;
  
    FoodGroup.add(banana);

}
}

function stone(){
if (frameCount % 300 === 0) {
    var obstacle = createSprite(frameCount,160,40,10);
    obstacle.y = Math.round(random(170,170));
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1  ;
    //obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    //obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
    
    obstacle1 = createSprite(400,180,10,40);
    obstacle1.velocityX = -6;
    
     obstacle1.debug = false;
  obstacle1.setCollider("rectangle",1,1,420,300);
    
    //add image to the obstacle 
    obstacle1.addImage(obstacle1Image);
    obstacle1.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle1.lifetime = 300;
    
    //add each obstacle to the group
    obstacle1Group.add(obstacle1);
    FoodGroup.add(obstacle);

}
}