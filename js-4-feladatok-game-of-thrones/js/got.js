'use strict';

let list = [];
let previous = 0;

let remaincells = 0;
let selected = 0;

const sortingList = (list) => list.sort(function (a, b) {
  let nameA = a.name.toUpperCase(); // ignore upper and lowercase
  let nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
})

const gotCharacters = async () => {
  const response = await fetch("./json/got.json");
  list = await response.json();
  list = list.filter(c => !c.dead);
  let getout = list.splice(Math.floor((Math.random() * 48) + 1), 1);
  //console.log(getout);
  list = sortingList(list);
  createTable(list);
}

gotCharacters();

function createTable(array) {
  for (let i = 0; i < 48; i++) {
    let newDiv = document.createElement("div");
    newDiv.className = "cell";
    newDiv.dataset.id = i;
    newDiv.innerHTML = `<img src=${array[i].portrait} alt=\"portrait\"width=80></img>${array[i].name.toUpperCase()}`;
    document.getElementById("container").appendChild(newDiv);
  }
  addClickListener();
}

const addClickListener = () => {
  let cells = document.querySelectorAll('.cell');
  Array.from(cells).forEach(c => c.addEventListener('click', setInfo));
}

function setInfo() {
  let cells = document.querySelectorAll('.cell');
  cells.forEach(c =>c.classList.remove('selected'));
  //cells[previous].classList.remove('selected');
  //console.log(previous);
  selected = this.dataset.id;
  previous = selected;
  //console.log(selected);
  //console.log(this);
  this.classList.add('selected');
  let logo1 = 'placeholder';
  let logo2 = 'placeholder';

  if (typeof list[selected].house === 'string') { logo1 = list[selected].house }
  if (typeof list[selected].organization === 'string') { logo2 = list[selected].organization }
  document.querySelector('.name').textContent = list[selected].name;
  document.querySelector('.bio').textContent = list[selected].bio;
  document.querySelector('.img').innerHTML =
    `<img src=${list[selected].picture} alt=\"${list[selected].name}\" width=\"270\" object-fit: contain >`;
  document.querySelector('.house').innerHTML =
    `<img src=\"./assets/houses/${logo2}.png\" alt='house'> <img src=\"./assets/houses/${logo1}.png\" alt='house'>`;
}


function charSearch() {
  // Declare variables
  let input, filter, name, a, i, txtValue;
  input = document.getElementById('myInput');
  //console.log(input);
  filter = input.value.toUpperCase();
  //console.log(filter);

  // Reset side
  document.querySelector('.name').innerHTML = "";
  document.querySelector('.house').innerHTML = "";
  document.querySelector('.bio').textContent = "";
  document.querySelector('.img').innerHTML = "<img src=\"./assets/pictures/got_logo_main_placeholder_small.jpg\" width=\"270\" object-fit: contain>";
  let cells = document.querySelectorAll('.cell');
  cells.forEach(c =>c.classList.remove('selected'));

  // Loop through all list items, and hide those who don't match the search query
  remaincells = 0;
  for (i = 0; i < 48; i++) {
    a = document.getElementsByClassName("cell")[i];
    name = a.textContent;
    //console.log(a);
    //console.log(name);
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      remaincells++;
  //    console.log(remaincells);
      if (remaincells = 1) { console.log(a);}
      a.style.display = "";
    } else {
      a.style.display = "none";
    }
  }
}
