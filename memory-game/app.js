const cardsArray = [
    {
     img_front:'img/angular.svg',
     img_back:'img/js-badge.svg'
    },
    {
        img_front:'img/backbone.svg',
        img_back:'img/js-badge.svg'
    },
    {
        img_front:'img/ember.svg',
        img_back:'img/js-badge.svg'
    },
    {
        img_front:'img/aurelia.svg',
        img_back:'img/js-badge.svg'
    },
    {
        img_front:'img/react.svg',
        img_back:'img/js-badge.svg'
    },
    {
        img_front:'img/vue.svg',
        img_back:'img/js-badge.svg'
    },
    {
        img_front:'img/angular.svg',
        img_back:'img/js-badge.svg'
    },
    {
        img_front:'img/backbone.svg',
        img_back:'img/js-badge.svg'
    },
    {
        img_front:'img/ember.svg',
        img_back:'img/js-badge.svg'
    },
    {
        img_front:'img/aurelia.svg',
        img_back:'img/js-badge.svg'
    },
    {
        img_front:'img/react.svg',
        img_back:'img/js-badge.svg'
    },
    {
        img_front:'img/vue.svg',
        img_back:'img/js-badge.svg'
    }
]
const board = document.querySelector('.memory-game');
cardsArray.sort(() => 0.5 - Math.random());

let hasFlippedcard = false;
let lockBoard = false;
let firstCard,secondCard;

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;

   this.classList.add('flip');
   if(!hasFlippedcard){
       //first click
       hasFlippedcard = true;
       firstCard = this;
       return;
   }
   //second click
    hasFlippedcard = false;
    secondCard = this;
    checkForMatch();
    
}
function resetBoard(){
    [hasFlippedcard,lockBoard] =[false,false];
    [firstCard,secondCard] = [null,null];
}
function checkForMatch(){
    //do cards match?
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}
function disableCards(){
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);

    resetBoard();
}
function unflipCards(){
    lockBoard = true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
      },1000);
    
}
for(i =0;i < cardsArray.length;i++){
    const card = document.createElement('div');
    card.setAttribute('class','memory-card');
    card.addEventListener('click',flipCard);
     
    let path = cardsArray[i].img_front;
    let svgName = path.indexOf('.svg');
    let name = path.slice(4,svgName);
    
    
    card.setAttribute('data-name',name);
    card.innerHTML = `
        <img src="${cardsArray[i].img_front}" alt="" class="front-face">
        <img src="${cardsArray[i].img_back}" alt="" class="back-face">
    `;
    board.appendChild(card);
}