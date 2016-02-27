
var clearStage = 0;
var level;

initMap();

// Debut
var debut = [
  new Piece(3250, 330),
  new Piece(5940, 200),
  new Piece(8300, 50),
  new Piece(10450, 450),

  new Weed(1400,300),
  new Mouse(400 + Math.random()*600,300,10+Math.random()*10),
  new Weed(2300,300),
  new Beetle(4400 + Math.random()*50, 400),
  new Weed(7200,100),
  new Bat(7300 + Math.random()*600,650+Math.random()*50),
  new Weed(9300,50),
  new Mouse(9300 + Math.random()*400,300,5+Math.random()*10)
];

// Regular
var regular = [
  new Mouse(700 + Math.random()*600,300,10+Math.random()*10),
  new Mouse(4100 + Math.random()*100,400,10+Math.random()*10),
  new Beetle(5200 + Math.random()*500,200),
  new Mouse(7100 + Math.random()*400,100,10+Math.random()*10),
  new Weed(7700,600),
  new Beetle(9000 + Math.random()*600,50),
  new Weed(9500,300)
];

// Pro
var pro = [
  new Weed(600,300),
  new Mouse(1000 + Math.random()*600,300,10+Math.random()*10),
  new Beetle(1500 + Math.random()*500,200),
  new Bat(3300 + Math.random()*200,450+Math.random()*50),
  new Weed(5400,200),
  new Weed(7500,600),
  new Weed(8400,400),
  new Mouse(9100 + Math.random()*400,100,10+Math.random()*10),
  new Mouse(9500 + Math.random()*200,300,5+Math.random()*10)
];

// Master
var master = [
  new Mouse(1000,300,10+Math.random()*10),
  new Weed(2700,300),
  new Mouse(2100 + Math.random()*600,300,10+Math.random()*10),
  new Mouse(2400 + Math.random()*600,300,10+Math.random()*10),
  new Beetle(2800 + Math.random()*700,300),
  new Weed(4700,300),
  new Bat(4400,400+Math.random()*10),
  new Weed(5200,200,1.5),
  new Mouse(5100 + Math.random()*400,100,10+Math.random()*10),
  new Weed(6400,200),
  new Weed(7700,100,1.5),
  new Beetle(7400 + Math.random()*500,600),
  new Weed(8400,550,2),
  new Mouse(9100 + Math.random()*400,100,10+Math.random()*10),
  new Beetle(9400 + Math.random()*300,200),
  new Weed(9700,300)
];

// Master +
var master2 = [
  new Weed(300,300,1.5),
  new Mouse(300 + Math.random()*600,300,15+Math.random()*10),
  new Weed(2600,300,1.5),
  new Beetle(1500 + Math.random()*500,600),
  new Bat(2200 + Math.random()*800,400+Math.random()*50),
  new Beetle(2500 + Math.random()*800,600),
  new Mouse(3200 + Math.random()*600,300,10+Math.random()*10),
  new Weed(3650,300,1.5),
  new Beetle(4400 + Math.random()*200,600),
  new Weed(5000+Math.random()*200,200),
  new Weed(5700,200,1.5),
  new Mouse(5400 + Math.random()*400,200,10+Math.random()*10),
  new Beetle(5500 + Math.random()*300,300),
  new Beetle(6200 + Math.random()*500,600),
  new Mouse(7400 + Math.random()*300,100,10+Math.random()*10),
  new Beetle(7400 + Math.random()*400,100),
  new Beetle(7700 + Math.random()*600,600),
  new Bat(7300 + Math.random()*100,650+Math.random()*30),
  new Weed(8400,650,2.5),
  new Bat(8500 + Math.random()*100,60+Math.random()*30),
  new Mouse(9100 + Math.random()*600,100,10+Math.random()*10),
  new Weed(8900,100,1.5),
  new Beetle(9200 + Math.random()*300,100),
  new Weed(9600,200,1.5),
  new Beetle(9600 + Math.random()*300,400),
  new Weed(10300,200,1.5)
];

var player = new Sprite(function(my){

  my.width = 20;
  my.height = 60;

  my.gravity = true;
  my.tag = 'player';
  my.moveSpeed = 20;

  my.death = 0;
  my.time = 0;

  my.start(function(){
    my.havepiece = 0;
  });

  my.animate(resource.player, 133, 191, {
    left: 2,
    leftRun: 3,
    leftJump: 5,
    right: 0,
    rightRun: 1,
    rightJump: 4
  }, 8, [10,15,0,15]);

  my.update(function(){
    my.time+=10;
    if(my.ay>20) my.dead();
  });
  my.onDead(function(){
    my.death++;
    my.ay = 0;
    setTimeout(function(){
      my.draw(0,-30);
      //gameStart(level);
    }, 100);
  });

  my.remove('crashes');
  my.onCrash(function(direction, target){
    if(target.tag == 'water'){
      my.x -= 0.45;
      if(my.ay>1){
        my.ay -= 0.2;
      }
      else if(my.ay<-1){
        my.ay += 0.2;
      }
      my.jump = false;
      return;
    }
    if(target.tag == 'ball'){
      my.dead();
      return;
    }
    if(target.tag == 'branch'){
      if(direction=='bottom' && my.ay>0 && (my.y+my.height)<target.y+10){
        my.y = target.y - my.height;
        my.ay = 0;
        my.jump = false;
        setTimeout(function(){
          target.dead();
        },1000)
        setTimeout(function(){
          target.draw();
        },3000)
      }
    }
    else{
      switch(direction){
        case 'bottom':
          my.y = target.y - my.height;
          my.ay = 0;
          if(target.tag == 'star'){
            my.jump = true;
          }else if(target.tag == 'monster'){
            my.jump = true;
            my.ay = -3;
          }else{
            my.jump = false;
          }
        break;
        case 'top':
          my.y = target.y + target.height;
          my.ay = 0;
        break;
        case 'right': my.x = target.x - my.width; break;
        case 'left': my.x = target.x + target.width; break;
      }
    }

  });

});

var gameStart = function(lv){
  Camera.set(-Camera.x, -Camera.y);

  level = lv || 1;

  for(var i in sprites){
    sprites[i].dead();
  }
  renderMap();

  player.draw(100,200);
  Camera.target = player;



  for(var i in debut){
    debut[i].draw();
  }
  if(level != 1){
    for(var i in regular){
      regular[i].draw();
    }
  }
  if(level != 1 && level != 2){
    for(var i in pro){
      pro[i].draw();
    }
  }
  if(level != 1 && level != 2 && level != 3){
    for(var i in master){
      master[i].draw();
    }
  }
  if(level != 1 && level != 2 && level != 3 && level != 4){
    for(var i in master2){
      master2[i].draw();
    }
  }

};
