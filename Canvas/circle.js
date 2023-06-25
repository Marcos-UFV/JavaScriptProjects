class Circle{
  constructor(x,y,r,startAngle,endAngle){
    this.x=x;
    this.y=y;
    this.r=r;
    this.start=startAngle;
    this.end=endAngle;
  }
  update(r){
    this.r =r;
  }
  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.x,
    this.y,
    this.r,
    this.start,
    this.end);
    ctx.stroke();
  }
}