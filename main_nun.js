enchant();

var game,stage;
var gs = {fps:30};
gs.canvas = {height:320,width:320};

var Panel = Class.create(Label,{
  initialize:function(panel){
    Label.call(this);
    this.id = panel;
    this.size = 95;
    this.width = this.size;
    this.height = this.size;
    this.color ="black"; 
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
      for (var i = 0; i < 9; i++){
        panels.push(new Panel(i));
      }
      return panels;
    },
    display:function(){
      var offset = {x:10,y:10};
      var size = 100;
      this.panels.forEach(function(v,i){
        v.x = ( i % 3 )* size + offset.x;
        v.y = ~~( i / 3 ) * size + offset.y;
        stage.addChild(v);
      });
    },
    shuffle:function(){
      this.panels.forEach(function(v,i,array){
        var random = ~~(Math.random() * array.length);
        var temp = array[i];
        array[i] = array[random];
        array[random] = temp;
      });
    }
});

window.onload = function(){
  game = new Core(gs.canvas.width,gs.canvas.height); 
  stage = game.rootScene;

  game.onload = function(){
    game.number = 0;
    new Panels();
    
  };
  game.start();
};
