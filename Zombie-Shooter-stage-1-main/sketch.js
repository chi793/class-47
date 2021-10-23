var shooter,shooterImmg1
var shooterimg2
var shooterImg3
var background_img
var bg
var zombie;
var zombieimg;
var heart1,heart2,heart3;
var heart1img,heart2img,heart3img;
var zombieGroup;
var bullets=60;
var bulletGroup;
var gameState="fight"

function preload(){
shooterImg1=loadImage("assets/shooter_1.png");
shooterImg2=loadImage("assets/shooter_2.png");
shooterImg3=loadImage("assets/shooter_3.png");
background_img=loadImage("assets/bg.jpeg");
zombieimg=loadImage("assets/zombie.png");
heart1img=loadImage("assets/heart_1.png");
heart2img=loadImage("assets/heart_2.png");
heart3img=loadImage("assets/heart_3.png");
}
function setup(){
createCanvas (windowWidth,windowHeight);
bg=createSprite(displayWidth/2,displayHeight/2,20,20);
bg.addImage(background_img);
bg.scale=1.1;

shooter=createSprite(displayWidth-1000,displayHeight-350,50,50)
shooter.addImage(shooterImg3);
shooter.scale=.3
shooter.debug=true
shooter.setCollider("rectangle",0,0,300,300)

heart1=createSprite(displayWidth-150,40,20,20)
heart1.visibile=false;
heart1.addImage(heart1img);
heart1.scale=.4



heart2=createSprite(displayWidth-110,40,20,20)
heart2.visibile=false;
heart2.addImage(heart2img);
heart2.scale=.4


heart3=createSprite(displayWidth-150,40,20,20)
heart3.addImage(heart3img);
heart3.scale=.4
heart3.visibile=false;

bulletGroup=new Group()
zombieGroup=new Group()

}
function draw(){
background(255);

if(gameState==="fight"){



if(keyDown("UP_ARROW")) {
shooter.y=shooter.y-10
}
if(keyDown("DOWN_ARROW")) {
  shooter.y=shooter.y+10
  }
 
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0;i<zombieGroup.length;i++)
    { if(zombieGroup[i].isTouching(bulletGroup))
      { zombieGroup[i].destroy() 
      bulletGroup.destroyEach();
      gameState="won"
      } 
    }
  }
  
    if(zombieGroup.isTouching(shooter)){
      for(var i=0;i<zombieGroup.length;i++)
      { if(zombieGroup[i].isTouching(shooter))
        { zombieGroup[i].destroy() } }
       shooter.destroy();
       gameState="lost"
    }

   if(keyWentDown("LEFT_ARROW")){
bullet=createSprite(displayWidth-1150,shooter.y-30,20,20)
bullet.velocityX=20;
bulletGroup.add(bullet);
shooter.depth=bullet.depth;
shooter.depth=shooter.depth+2;
shooter.addImage(shooterImg3);
bullets=bullets-1;
    } 

 if(keyWentUp("LEFT_ARROW")){
  shooter.addImage(shooterImg2);
    } 

if(bullets===0){
  gameState="bullet";
}

    spawnZombie();}
    drawSprites();
  
    if(gameState==="lost"){
      textSize(100);
      fill("red")
      text("**You Lost**",400,400)
      zombieGroup.destroyEach();
      shooter.destroy();
    }

   else if(gameState==="won"){
      textSize(100);
      fill("green")
      text("You WON!!",400,400)
      zombieGroup.destroyEach();
      shooter.destroy();
    }

    else if(gameState==="bullet"){
      textSize(75);
      fill("blue")
      text("**You Ran Out Of Bullets** ",300,400)
      zombieGroup.destroyEach();
      shooter.destroy();
      bulletGroup.destroyEach();
    }

}
function spawnZombie(){
  if (frameCount%50===0){
   zombie=createSprite(random(500,1100),random(300,500),40,40);
   zombie.addImage(zombieimg);
   zombie.scale=.15;
   zombie.velocityX=-3;
   zombie.debug=true
zombie.setCollider("rectangle",0,0,400,400)
zombie.lifeTime=400;
zombieGroup.add(zombie);
  }
}