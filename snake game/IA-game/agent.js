import Direction, {SnakeGame} from "./game.js";

const MAX_MEMORY = 100000;
const BATCH_SIZE = 1000;
const LR = 0.001; //Learning Rate

class Agent{
  constructor(){
    this.nGames = 0;
    this.epsilon = 0.05; // Control randomness
    this.gamma = 0.9; //discount rate
    this.learningRate = 0.85;
    this.memory = []; // push(e) adiciona e no começo, shift() remove elemento do começo
    this.qTable= {};
    // TODO: model, trainer
    this.model = null;
    this.trainer = null;
  }

  getState(game){
    let head = game.snake[0];
    let point_l = {x:head.x - 20,y:head.y};
    let point_r = {x:head.x + 20,y:head.y};
    let point_u = {x:head.x,y:head.y - 20};
    let point_d = {x:head.x,y:head.y + 20};

    let dir_l = game.direction == Direction.LEFT;
    let dir_r = game.direction == Direction.RIGHT;
    let dir_u = game.direction == Direction.UP;
    let dir_d = game.direction == Direction.DOWN;
    let state = [
      //Danger straight
      (dir_r && game.isCollision(point_r)) ||
      (dir_l && game.isCollision(point_l)) ||
      (dir_u && game.isCollision(point_u)) ||
      (dir_d && game.isCollision(point_d)),

      // Danger right
      (dir_u && game.isCollision(point_r)) ||
      (dir_d && game.isCollision(point_l)) ||
      (dir_l && game.isCollision(point_u)) ||
      (dir_r && game.isCollision(point_d)),

      // Danger left
      (dir_d && game.isCollision(point_r)) ||
      (dir_u && game.isCollision(point_l)) ||
      (dir_r && game.isCollision(point_u)) ||
      (dir_l && game.isCollision(point_d)),

      // Move direction
      dir_l,
      dir_r,
      dir_u,
      dir_d,

      // Food location
      game.food.x < game.head.x, // Food left
      game.food.x > game.head.x, // Food right
      game.food.y < game.head.y, // Food up
      game.food.y > game.head.y // Food down

    ]
    return ''+state.map(v => v?1:0);
  }

  remember(state, action, reward, nextState, done){
    this.memory.push([state, action, reward, nextState, done])
  }

  trainLongeMemory(){
    let miniSample = [];
    if(this.memory.length > BATCH_SIZE){
      let idx;
      for(let i=0;i < BATCH_SIZE;i++){
        idx = Math.floor(Math.random()*this.memory.length + 0);
        miniSample[i] =this.memory[idx];
      } 
       
    }else{
      miniSample = this.memory;
    }
    let [states, actions, rewards, nextStates, done] = miniSample.reduce((tuples,current)=>{

      tuples[0].push(current[0]);
      tuples[1].push(current[1]);
      tuples[2].push(current[2]);
      tuples[3].push(current[3]);
      tuples[4].push(current[4]);
      return [tuples[0],tuples[1],tuples[2],tuples[3],tuples[4]];}
      
      ,[[],[],[],[],[]]);

    // this.trainer.trainStep(states, actions, rewards, nextStates, done);
  }
  trainShortMemory(state, action, reward, nextState, done){
    // this.trainer.trainStep(state, action, reward, nextState, done);
  }

  getAction(state){
    const availableActions =['up','down','left','right'];

    const currentDirection = [state[3]==1,state[4]==1,state[5]==1,state[6]==1]; //left, right, up, down

    let q = this.getTable(state);
    // console.log(this.qTable);
    let move =[0,0,0];
    if(Math.random() < this.epsilon){
      let pos = Math.floor(Math.random()*3 + 0);
      move[pos] = 1;
      let act;
      if(move == [1,0,0]){
        act=currentDirection[2]?availableActions[0]:availableActions[1];
        
      }else if(move ==  [0,1,0]){
        act = availableActions[2];
      }else{
        act = availableActions[1];
      }
      // console.log('Move: '+move,'Act: '+act);
      return [move,act];
    }

    let maxValue = q[availableActions[0]];
    let choseAction = availableActions[0];
    let actionsZero = [];
    for(let i = 0; i < availableActions.length; i++) {
      if(q[availableActions[i]] == 0) actionsZero.push(availableActions[i]);
      if(q[availableActions[i]] > maxValue){
        maxValue = q[availableActions[i]];
        choseAction = availableActions[i];
      }
    }
    
    if(maxValue == 0){
      let random = Math.floor(Math.random() * actionsZero.length);
      
      choseAction = actionsZero[random];
    }
    
    
    let vet = [(choseAction=='left' && currentDirection[0]),(choseAction =='right' && currentDirection[1]),(choseAction =='up' && currentDirection[2]),(choseAction =='down' && currentDirection[3])];
    
    let streight = vet.some(e => e == true);
    // console.log(streight);
    if(streight){
      move[0] = 1;
      // console.log('Reto');
    }else if(choseAction == 'left'){
      move[2] = 1;
      // console.log('Esquerda');
    }else{
      move[1] = 1;
      // console.log('Direita');
    }

    
    return [move,choseAction];
  }

  getTable(state){
    if(!this.qTable[state]){
      this.qTable[state] = {'up':0,'down':0,'left':0,'right':0};
    }
    return this.qTable[state];
  }
  updateQTable(state0,state1,reward,act){
    var q0 = this.getTable(state0);
    var q1 = this.getTable(state1);
    var newValue = reward + this.gamma * Math.max(q1.up, q1.down, q1.left, q1.right) - q0[act];
    // console.log(state0,act);
    this.qTable[state0][act] = q0[act] + this.learningRate * newValue;
  }
}

const train = ()=>{
  let plotScore = [];
  let plotMeanScore = [];
  let total_score = 0;
  let record = 0;
  const agent = new Agent();
  const game = new SnakeGame(640,480);

  setInterval(()=>{
    // get old state
    let stateOld = agent.getState(game);
   
    // get move
    
    let retorno = agent.getAction(stateOld);
    
    // console.log(retorno);
    let [finalMove,act] = retorno;
    
    
    // perform move and get new state
    let [done,score,reward] = game.playStep(finalMove);



    let stateNew = agent.getState(game);

    //train short memory
    agent.trainShortMemory(stateOld,finalMove,reward,stateNew,done);

    // remember
    agent.remember(stateOld,finalMove,reward,stateNew,done);

    agent.updateQTable(stateOld,stateNew,reward,act);
    
    if(done){
      // train long memory, plot result
      game.reset();
      agent.nGames += 1;
      agent.trainLongeMemory();

      if(score > record){
        record = score;
        // agent.model.save();
      }
      console.log('Game: '+agent.nGames+'Score: '+score+'Record: '+record);
      console.log(agent.qTable);
      // TODO: plot
    }

  },20)
}

window.onload = ()=>{
  train();
  // let deque = []
  // let removido;
  // deque.push(1);
  // deque.push(2);
  // deque.push(3);
  // console.log(deque);
  // removido = deque.shift();
  // console.log('Removeu: \n'+removido+'\nrestou:\n'+deque);
  // removido = deque.push(4);
  // console.log('Adicionou: \n'+removido+'\nrestou:\n'+deque);
  // removido = deque.shift();
  // console.log('Removeu: \n'+removido+'\nrestou:\n'+deque);
}