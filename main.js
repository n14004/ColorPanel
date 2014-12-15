enchant();

var game,stage;
var gs = {fps:30};
gs.canvas = {height:520,width:520};

var Panel = Class.create(Label,{
  initialize:function(text){
    Label.call(this);
    this.id = text;
    this.text = text + 1;
    this.size = 95;
    this.height = this.size;
    this.width = this.size;
    this.font = (this.size - 10) + "px bold serif";
    this.textAlign = "center";
    this.color = "blue";
    this.backgroundColor = "blue";
  },
    ontouchstart:function(){
      if (this.id === game.number){
      this.backgroundColor = "white";
      game.number++;
      }
    }
});
var Panels = Class.create({
  initialize:function(){
    this.panels = this.create(); 
    this.shuffle();
    this.display();
  },
    create:function(){
      var panels = [];
      for (var i = 0; i < 25; i++){
        panels.push(new Panel(i)); 
      }
      return panels;
    },
    display:function(){
      var offset = {x:10,y:10};
      var size = 100;
      this.panels.forEach(function(v,i){
        v.x = ( i % 5 )* size + offset.x;
        v.y = ~~( i / 5 ) * size + offset.y;
        stage.addChild(v);
      });
    },
      shuffle:function(){
        this.panels.forEach(function(v,i,array){
          var random = ~~(Math.random() * array.length);
          var temp = array[i]
          array[i] = array[random];
          array[random] = temp;
        });
      }
    });

var EndingScene = Class.create(Scene,{
  initialize:function(){
    Scene.call(this);
    this.createLabel();
    this.addChild(this.createLabel());
  },
    createLabel:function(){
      var label = new Label;
      var time = ~~(game.frame / game.fps);
      label.font = "50px bold serif";
      label.text = "Game Over <br>" + time + "秒";
      return label;
    }
});

window.onload = function(){
  game = new Core(gs.canvas.width,gs.canvas.height);
  stage = game.rootScene;
  game.onload = function(){
    game.number = 0;
    new Panels();
    stage.on("touchend",function(){
      if(game.number > 8){
        game.pushScene(new EndingScene());
      }
    });
  };


  game.start();
};


