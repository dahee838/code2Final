


//DAHEE CODE 2 FINAL
//RIP DAHEE
//AS LONG AS YOU REALLY TRY YOUR BEST, IT'S YOUR BEST. LIFE IS LEARNING. 
//WINNING ISN'T EVERYTHING BUT WANTING TO IS 
// <3 <3 <3 

var sceneData;
var scenes = [];
var currentScene = 0;
var sun,potatoes,clouds,hairDryer,bullets,fan;
var sunImage, bulletImage,fanImage;
var MARGIN = 40;
var mousePress = false;


//state Machine
var sceneState = {
  INTRO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3
};

var thisScene = sceneState.INTRO;

//preload all the data inclding images, sprites, and JSON file
function preload()
{
sceneData = loadJSON('stuff.json');

//switch these to the asteroid format
bulletImage = loadImage("sun/bullet.png");
sunImage = loadImage("sun/sun1.png");
fanImage = loadImage("hairDryer/hairDryer1.png");

sun = createSprite(width/2, height/2);
sun.maxSpeed = 6;
sun.friction = .98;
sun.setCollider("circle", 0,0, 20);
sun.addImage("normal", sunImage);
sun.addAnimation("thrust", "sun/sun2.png", "sun/sun3.png");

hairDryer = createSprite(width/2, height/2);
hairDryer.maxSpeed = 6;
hairDryer.friction = .98;
hairDryer.setCollider("circle", 0,0, 20);
hairDryer.addImage("normal", fanImage);
hairDryer.addAnimation("thrust", "hairDryer/haridryer2.png", "hairDryer/hariDryer3.png");


clouds = loadImage("cloud.png");

potatoes = new Group();
bullets = new Group();
}


function setup()
{
	createCanvas(1250,690);
  CreateScenesFromData(sceneData.scenes);
}



//replace imadry with sprites

function draw()
{
  background(178, 221, 255);
  drawScene(thisScene);
  checkTransition(thisScene);

  noStroke();
  fill(78, 119, 1);
  rect(0,650,1250,400);

  mousePress = false; 
}

function CreateScenesFromData(data) {
  for (var i = 0; i < data.length; i++) {
    scenes.push(new Scene(data[i].sceneText, data[i].thatOneBit, data[i].options, data[i].nextScenes, data[i].x,  data[i].y))
  }
}


//the displayed stuff
function drawScene(whichScene)
{

switch (thisScene) {
    case sceneState.INTRO:
    background(178, 221, 255);
    noStroke();
    // animation(potatoSad, 600,500)
    scenes[currentScene].display();
      break;

    case sceneState.ONE:
    background(178, 221, 255);
    scenes[currentScene].display();
      break;

    case sceneState.TWO:
    background(178, 221, 255);
    //replace with asteroids game
    sunGame.display();
    scenes[currentScene].display();
      break;

    case sceneState.THREE:
    background(178, 221, 255);
    //replace with fan blowing away 
    // hairDryerGame.display();
    scenes[currentScene].display();
      break;
    default:
      break;
  }
}

  //transitions

function checkTransition(whichScene)
{
switch (thisScene) {
    case sceneState.INTRO:
          if (mousePress) {
        thisScene++;
        setUpScene(thisScene);
      }
    
      break;
    case sceneState.ONE:
           if (mousePress) {
        thisScene++;
        setUpScene(thisScene);
      }

      break;
    case sceneState.TWO:
           if (mousePress) {
        thisScene++;
        setUpScene(thisScene);
      }

      break;
    case sceneState.THREE:
           if (mousePress) {
        thisScene++;
        setUpScene(thisScene);
      }

      break;
    default:
      break;
  }
}

function setUpScene(whichScene) {
  switch (whichScene) {
    case sceneState.INTRO:
      break;
    case sceneState.ONE:
      break;
    case sceneState.TWO:
      break;
    case sceneState.THREE:
      break;
    default:
      break;
  }
}

//the stuff classses
function Scene(sceneText, thatOneBit, options, nextScenes, x,y) {
  this.sceneText = sceneText;
  this.thatOneBit = thatOneBit;
  this.options = options;
  this.nextScenes = nextScenes;
  this.x = x; 
  this.y = y;

  this.display = function() 
  {

    fill(0);
    textSize(32);
    text(this.sceneText, 100, 100);
    textSize(14);
    text(this.thatOneBit, 100, 120);
    textSize(24);
    for (var i = 0; i < options.length; i++) {
      text('Go to: ' + this.options[i], 150, 200 + i * 50);
    }
animation(potatoHappy, 400,500)
    
  }
}

function sunGame()
{

  this.display = function()
  {

  background(250);
  
  for(var i=0; i<allSprites.length; i++) {
  var s = allSprites[i];
  if(s.position.x< -MARGIN) s.position.x = width+MARGIN;
  if(s.position.x> width+MARGIN) s.position.x = -MARGIN;
  if(s.position.y< -MARGIN) s.position.y = height+MARGIN;
  if(s.position.y> height+MARGIN) s.position.y = -MARGIN;
  }
  
  potatoes.overlap(bullets, potatoHit);
  
  sun.bounce(potatoes);
  
  if(keyDown(LEFT_ARROW))
    sun.rotation -= 4;
  if(keyDown(RIGHT_ARROW))
    sun.rotation += 4;
  if(keyDown(UP_ARROW))
    {
    sun.addSpeed(5, sun.rotation);
    sun.changeAnimation("thrust");
    }
  else
    sun.changeAnimation("normal");
    
  if(keyWentDown("d"))
    {
    var bullet = createSprite(sun.position.x, sun.position.y);
    bullet.addImage(bulletImage);
    bullet.setSpeed(10+sun.getSpeed(), sun.rotation);
    bullet.life = 30;
    bullets.add(bullet);
    }
  
  drawSprites();
  
}

function createPotato(type, x, y) {
  var a = createSprite(x, y);
  var img  = loadImage("potatoThings/potato.png");
  a.addImage(img);
  a.setSpeed(2.5-(type/2), random(360));
  a.rotationSpeed = .5;
  //a.debug = true;
  a.type = type;
  
  if(type == 2)
    a.scale = .6;
  if(type == 1)
    a.scale = .3;
  
  a.mass = 2+a.scale;
  a.setCollider("circle", 0, 0, 50);
  potatoes.add(a);
  return a;
}

function potatoHit(potato, bullet) {
var newType = potato.type-1;

if(newType>0) {
  createPotato(newType, potato.position.x, potato.position.y);
  createPotato(newType, potato.position.x, potato.position.y);
  }

for(var i=0; i<10; i++) {
  var p = createSprite(bullet.position.x, bullet.position.y);
  p.addImage(particleImage,bullet.position.x, bullet.position.y);
  p.setSpeed(random(3,5), random(360));
  p.friction = 0.95;
  p.life = 30;
  }

bullet.remove();
potato.remove();
}

  }
  //put the potato game into this function and call it in the proper scene


  //put the hair dryer game into this function and call it into the proper scene



// function cloudGame()
// {

//     this.display = function()
//   {
    
//   }

//   //put the opject point game into this function and call it into the proper scene 
// }
function mousePressed()
{

mousePress = true;

}


//keyPressed stuff for calling different parts of the data
function keyPressed() {
  var numberPressed = parseInt(key);
  var newScene = scenes[currentScene].nextScenes[numberPressed - 1];
  if (newScene !== undefined) {
    currentScene = newScene;
  }
}








