const canvas = document.querySelector("#myCanvas");

canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

const ctx = canvas.getContext("2d");


const c1 = new Circle(window.innerWidth/2 -100,window.innerHeight/2,0,0,Math.PI*2);
const c2 = new Circle(window.innerWidth/2 +100,window.innerHeight/2,0,100,1.83*Math.PI,Math.PI);
let r = 99;
let x = -1;
ctx.beginPath();
animate();

function animate(){
  if(r % 100 == 0){
    x *= -1;
  }
  let r2 =100 - r;

  r += x;
  console.log(r,r2);
  c1.update(r2);
  c2.update(r);
  
  ctx.clearRect(0,0,canvas.width,canvas.height);
  c1.draw(ctx);
  c2.draw(ctx);


  requestAnimationFrame(animate);
}


