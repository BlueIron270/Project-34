//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock;


function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  dog = createSprite(250, 250, 100, 100);
  dog.addImage(dogImg);
  dog.scale = 0.3;
}


function draw() {  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill(255);
  stroke(10);

  text("Note: Press UP_ARROW Key To Feed Dog Milk!", 40, 400);
  text("Available Milk Cartons: " + foodS, 150, 450)
}

//Function to read values from DB
function readStock(data) {
  foodS = data.val();
}

//Function to write values in DB
function writeStock(x) {

  if(x<=0) {
    x-0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food: x
  })
}

