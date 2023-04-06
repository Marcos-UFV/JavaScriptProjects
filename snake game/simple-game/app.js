window.onload = ()=>{

  const game = new SnakeGame(640,480);

  setInterval(()=>{
    let [gameOver,score] = game.playStep();
    console.log(gameOver,score);
  },120);

}

const Direction = {
  RIGHT:1,
  LEFT:2,
  UP:3,
  DOWN:4
}
const Colors ={
  WHITE:"'#000000'",
  RED:"'#FF0000'",
  BLUE1:"'#0000FF'",
  BLUE2:"'#0064FF'",
  BLACK:"'#000000'"
}
const BLOCK_SIZE = 20;
class SnakeGame{
  
  constructor(width,height){
    this.stage = document.querySelector("#stage");
    this.ctx = this.stage.getContext("2d");  
    this.w = width;
    this.h = height;

    // Init display
    document.onkeydown = this.keyPush.bind(this);
    // Init game state

    this.direction = Direction.RIGHT;

    this.head = {x:this.w/2,y:this.h/2}
    this.snake = [this.head,{x:this.head.x-BLOCK_SIZE,y:this.head.y},{x:this.head.x-(2*BLOCK_SIZE),y:this.head.y}];
    this.score = 0;
    this.gameOver = false;
    this.food = null;
    this._placeFood();
  }
  _updateUI(){
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0,0,this.w,this.h);
    
    for(const pt of this.snake){
      this.ctx.fillStyle = "#0000FF";
      this.ctx.fillRect(pt.x,pt.y,BLOCK_SIZE,BLOCK_SIZE);
      this.ctx.fillStyle = "#0064FF";
      this.ctx.fillRect(pt.x+4,pt.y+4,12,12);
    }
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillRect(this.food.x,this.food.y,BLOCK_SIZE,BLOCK_SIZE);
  }
  _placeFood(){
    let x = Math.floor((Math.random()*((this.w - BLOCK_SIZE)/BLOCK_SIZE)))*BLOCK_SIZE;
    let y = Math.floor((Math.random()*((this.h - BLOCK_SIZE)/BLOCK_SIZE)))*BLOCK_SIZE;
    this.food = {x:x,y:y};
    if(this.food in this.snake){
      this._placeFood();
    }
  }
  playStep() {
    // console.log(this.snake.splice(1));
    // 1.collect user input
    
    // 2. move
    this._move(this.direction); // update the head
    this.snake.unshift(this.head);
   
    // 3. check if game over
    
    if(this._isColision()){
      this.gameOver = true;
      return [this.gameOver,this.score];
    }
    // 4. place new food or just move
    if(this.head.x == this.food.x && this.head.y == this.food.y){
      this.score += 1;
      this._placeFood();
    }else{
      this.snake.pop();
    }
    // 5. update ui
    this._updateUI();
    // 6. return game over and score
    
    return [this.gameOver,this.score];
  }
  _isColision(){
    // hits boundary
    if(this.head.x > this.w - BLOCK_SIZE || this.head.x < 0 || this.head.y > this.h - BLOCK_SIZE || this.head.y < 0) 
      return true;
    // hits itself
    // if(this.head in this.snake.splice(1)){
    //   return true;
    // }
    let colision = false;
    for(let i=1; i < this.snake.length; i++){
      colision = (this.head.x == this.snake[i].x && this.head.y == this.snake[i].y);
      if(colision) break; 
    }

    return false || colision;
  }
  _move(direction){
    let x = this.head.x;
    let y = this.head.y;

    switch (direction) {
      case Direction.LEFT:
        x -= BLOCK_SIZE;
        break;
      case Direction.UP:
        y -= BLOCK_SIZE;
        break;
      case Direction.RIGHT:
        x += BLOCK_SIZE;
        break;
      case Direction.DOWN:
        y += BLOCK_SIZE;
        break;
    }
    this.head = {x:x,y:y};
  }
  keyPush(e){
    switch (e.keyCode) {
      case 37:
        this.direction = Direction.LEFT;
        break;
      case 38:
        this.direction = Direction.UP;
        break;
      case 39:
        this.direction = Direction.RIGHT;
        break;
      case 40:
        this.direction = Direction.DOWN;
        break;
    }
  }
  
}