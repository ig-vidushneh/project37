
class Food {
    constructor() {
      this.foodStock = 0;
      this.lastFed;
      this.image = loadImage('Images/Milk.png');
    }
    updateFoodStock(foodStock) {
      this.foodStock = foodStock;
    }
    getFedTime(lastFed) {
      this.lastFed = lastFed;
    }
    deductFood() {
      if (this.foodStock > 0) {
        this.foodStock = this.foodStock - 1;
      }
    }
    getFoodStock() {
      return this.foodStock;
    }
    display() {
      var x = 80,
        y = 100;
      imageMode(CENTER);
      image(this.image, 720, 220, 70, 70);
      if (this.foodStock != 0) {
        for (var i = 0; i < this.foodStock; i++) {
          if (i % 10 == 0) {
            x = 80;
            y = y + 50;
          }
          image(this.image, x, y, 50, 50);
          x = x + 30;
        }
      }
    }
    bedroom(){ background(bedroom,550,500);
     } garden(){ background(garden,550,500); } washroom(){ background(washroom,550,500); } }
  
  
  
  
  
  
  function setup() {
    database = firebase.database();
    createCanvas(1000, 400);
    foodObj = new Food();
    foodStock = database.ref('Food');
    foodStock.on("value", readStock);
    dog = createSprite(800, 200, 150, 150);
    dog.addImage(sadDog);
    dog.scale = 0.15;
    feed = createButton("Feed the dog");
    feed.position(700, 95);
    feed.mousePressed(feedDog);
    addFood = createButton("Add Food");
    addFood.position(800, 95);
    addFood.mousePressed(addFoods);
  }
  
  function draw() {
    background(46, 139, 87);
    foodObj.display();
    fedTime = database.ref('FeedTime');
    fedTime.on("value", function(data) {
      lastFed = data.val();
    });
    fill(255, 255, 254);
    textSize(15);
    if (lastFed >= 12) {
      text("Last Feed : " + lastFed % 12 + " PM", 350, 30);
    } else if (lastFed == 0) {
      text("Last Feed : 12 AM", 350, 30);
    } else {
      text("Last Feed : " + lastFed + " AM", 350, 30);
    }
    drawSprites();
  }
  
  function readStock(data) {
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
  }
  
  function feedDog() {
    dog.addImage(happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
    database.ref('/').update({
      Food: foodObj.getFoodStock(),
      FeedTime: hour()
    })
  }
  
  function addFoods() {
    foodS++;
    database.ref('/').update({
      Food: foodS
    })
  }