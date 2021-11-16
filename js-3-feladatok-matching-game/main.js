
const cardArray = ['&', '&', '@', '@', '#', '#', '%', '%', '§', '§'];
// const cardArray = ['()', '()', '[]', '[]', '{}', '{}', '>', '>', '<', '<'];
let solvedPairs = 0;
let clicks = 0;
let cardsId = [];
let cardsSelected = [];
let cards = [];
let cards2 = [];
let counter = 0;
let seconds = 0;
let minutes = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function flipCard() {
  if (clicks == 1) { startClock() };
  document.querySelector('.info').textContent = 'Clicks: ' + clicks + ' | Matching pairs: ' + solvedPairs;
  let selected = this.dataset.id;
  //console.log(selected);
  cardsSelected.push(cardArray[selected]);
  //console.log(cardsSelected);
  cardsId.push(selected);
  //console.log(cardsId);
  clicks++;
  this.classList.add('flip');
  if (cardsId.length === 2) {
    setTimeout(checkPairs, 500);
  }
}

function checkPairs() {
  cards = document.querySelectorAll('.flip-card-inner');
  let firstCard = cardsId[0];
  let secondCard = cardsId[1];
  if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) {
    solvedPairs++;
    document.querySelector('.info').textContent = 'Clicks: ' + (clicks - 1) + ' | Matching pairs: ' + solvedPairs;
    cards[firstCard].removeEventListener('click', flipCard);
    cards[secondCard].removeEventListener('click', flipCard);
    cards[firstCard].classList.add('match');
    cards[secondCard].classList.add('match');
    setTimeout(checkWin, 500)
  } else {
    cards[firstCard].classList.remove('flip');
    cards[secondCard].classList.remove('flip');
  }
  cardsSelected = [];
  cardsId = [];
}

function checkWin() {
  if (solvedPairs == 5) {
    stopClock();
    setTimeout(() => {
      let cards = document.querySelectorAll('.flip-card-inner');
      Array.from(cards).forEach(c => c.classList.remove('flip'));
      startGame();
    }, 5000);
  }
}

const addClickListener = () => {
  let cards = document.querySelectorAll('.flip-card-inner');
  Array.from(cards).forEach(c => c.addEventListener('click', flipCard));
}

const initCards = () => {
  shuffle(cardArray);
  // console.log(cardArray);
  cards2 = document.querySelectorAll('.flip-card-inner');
  cards2.forEach(card => card.classList.remove('match'));
  cards = document.querySelectorAll('.flip-card-back');
  //cards.forEach(card => card.textContent = '');
  for (i = 0; i < cardArray.length; i++) {
    cards[i].textContent = `${cardArray[i]}`
  }
  clicks = 1;
  solvedPairs = 0;
  document.querySelector('.info').textContent = 'Clicks: 0 | Matching pairs: ' + solvedPairs;
}

const startClock = () => {
  seconds = 0;
  minutes = 0;
  myTimer = setInterval(myCounter, 1000);
}

const stopClock = () => {
  clearInterval(myTimer);
  seconds = 0;
  minutes = 0;
  counter = 0;
}

function myCounter() {
  counter++;
  seconds = counter % 60;
  minutes = Math.floor(counter / 60);
  seconds = pad(seconds, 2);
  minutes = pad(minutes, 2);
  document.getElementById('clock').innerHTML = minutes + ':' + seconds;
}

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

const startGame = () => {
  setTimeout(() => {
    initCards();
  }, 1000);
  //console.log(cardArray);
  addClickListener();
  document.getElementById('clock').innerHTML = '00:00';
  //startClock();
}

startGame();
