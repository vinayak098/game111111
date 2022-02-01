const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var enemyplane1
var welcomeScreen ;
var skydive;
var startIcon;
var takeoff;
var gameState = "welcome"
var plane;
var mainScreen;
var enemyplaneGroup;


function preload() {
  

  welcomeScreen = loadImage("welcomescreen.jpeg")
  skydive = loadImage("skydive1.jpg")
  startIconImage = loadImage("start.jpg")
  takeoff = loadImage("takeoffGIF.gif")
  planeImage = loadImage("plane.png")
  enemyplaneImage = loadImage("enemyplane.png")
  gameover = loadImage("game-over.gif")
}

function setup() {
  
  createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;
  
  plane = createSprite(200,400,50,50);
  plane.addImage(planeImage)
  plane.scale=0.5;
  plane.visible = false;
  
 
  
  startIcon = createSprite(700,500,80,80);


 startIcon.addImage("startIcon",startIconImage);

 startIcon.scale = 0.2;

 mainScreen = createSprite(400,300,1200,800);
 mainScreen.addImage("welcomeScreen",welcomeScreen);
 mainScreen.visible = false;
 mainScreen.scale = 1.5;

enemyplaneGroup = new Group();



}

function draw() {
  background(189);

  Engine.update(engine);
  if(gameState === "welcome"){

    console.log("WElcome Screen loaded")


    background(welcomeScreen);
  
      imageMode(CENTER);
      image(skydive, 700,100 ,400,200);
  
  
      if(mousePressedOver(startIcon)){
  
        gameState="play"
      }
      drawSprites();
      
    } 
  
    else if (gameState === "play"){
      

      console.log("Reset is clicked");
      image(takeoff,0,0,width,height);
      startIcon.visible=false 
      if(frameCount >= 100  ){
        
       
          mainScreen.visible = true;

          mainScreen.velocityX = -1;
          console.log("Velocity ::"+mainScreen.velocityX );
          plane.depth = mainScreen.depth+1;

          plane.visible = true;
          
          createnemyplane();

        if(keyIsDown(UP_ARROW)){
          plane.y=plane.y-15;  
        }
    
        if(keyIsDown(DOWN_ARROW)){
          plane.y=plane.y+15; 
        }
    
        if(mainScreen.x<0){
          mainScreen.x=200
        }    
      }//frameCound if condition closed

      if(plane.isTouching(enemyplaneGroup)){
        console.log("colide")
        gameState = "end"
        
      }
      drawSprites();
    }//game state play ends here
      
   else if(gameState === "end"){
      console.log("endsate");     
      image(gameover,0,0,width,height);
     
  
    }
   
  }

  
  
function createnemyplane(){
  if(frameCount % 250 === 0){
    enemyplane1 = createSprite(windowWidth-100,Math.round(random(200,600)),50,50);
    enemyplane1.addImage(enemyplaneImage)
    enemyplane1.scale=0.4;
    enemyplane1.velocityX = -4;
    enemyplaneGroup.add(enemyplane1);

  }

 
}


function keyPressed(){
  if(keyCode === 32){
    gameState = "welcome";
    startIcon.visible = true;
    enemyplaneGroup.destroyEach();
    mainScreen.visible = false;
    plane.visible = false;
  }
  
}



