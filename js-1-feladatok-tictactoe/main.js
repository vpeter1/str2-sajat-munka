/* 
Hozd létre a szükséges változókat, és definiáld is őket:
- matrix: ez egy tömb (alapértelmezetten üres), amely az egész játékteret tartalmazza,
- stepCount: ez egy szám (alapértelmezetten 0), a megtett lépések száma,
- cols: ez az oszlopok száma (alapértelmezetten 3),
- rows: ez a sorok száma (alapértelmezetten 3),
- mark: ez a jel, amellyel játszanak a játékosok (0 vagy X, alapértelmezetten 'X').
*/
'use strict'

const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log(matrix)
let stepCount = 0;
let cols = 3;
let rows = 3;
let mark = 'X';

/**
Fejtsd ki az initState elnevezésű függvényt, 
amely feltölti üres mezőkkel a játékteret, 
tehát az összes sort és oszlopot a mátrixban.

Alkalmazz egymásba ágyazott for ciklusokat
vagy a fill metódust null értékkel.
Először a sorokat, majd az oszlopokat töltsd fel,
de fordítva is csinálhatod.

A fillt alkalmazó megoldásnál a matrix tartalma:
az oszlopok száma tömbbé alakítva, 
ezt töltöd fel null-lal,
majd végigmész a tömbön,
és meghívsz egy arrow function-t.
Ez utóbbi visszatérési értéke:
a sorok száma tömbbé alakítva,
és feltöltve null-lal.
@returns void (nem ad vissza semmit)
*/
const initState = () => {
    for (let i = 0; i < 3; i++) {

        for (let j = 0; j < 3; j++) {
            matrix[i][j] = null;
        }
    }
    //console.log(matrix)
    
}

/**
A changeMatrixValue függvény már készen van, 
ennek a segítségével tudjuk azonosítani az egyes cellákat.
FONTOS:
Ahhoz, hogy megfelelően működjön a kódod, 
a HTML-ben a játéktérben a sorokat és oszlopokat a következőképpen vedd fel:

    <div data-cell="0" data-row="0" class="cell"></div>
    <div data-cell="1" data-row="0" class="cell"></div>
    <div data-cell="2" data-row="0" class="cell"></div>
    <div data-cell="0" data-row="1" class="cell"></div>
    <div data-cell="1" data-row="1" class="cell"></div>
    <div data-cell="2" data-row="1" class="cell"></div>
    <div data-cell="0" data-row="2" class="cell"></div>
    <div data-cell="1" data-row="2" class="cell"></div>
    <div data-cell="2" data-row="2" class="cell"></div>

A datasetről itt olvashatsz bővebben:
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
*/
const changeMatrixValue = (element) => {
    const row = parseInt(element.dataset.row, 10);
    const cell = parseInt(element.dataset.cell, 10);
    matrix[row][cell] = element.innerHTML;
    //console.log(matrix)
}

/**
Fejtsd ki a deleteSigns elnevezésű függvényt, 
amely kiválasztja az összes cellát, 
és mindegyik elemben elhelyez egy üres string-et.
*/
const deleteSigns = () => {
    
    const cells = document.querySelectorAll('.cell');
    //console.log(allCell)
    cells.forEach(cell => cell.innerHTML = '');
    
}


/**
Fejtsd ki az increaseCounter elnevezésű függvényt, 
amely a megtett lépések számát növeli eggyel.
*/
const increaseCounter = () => {
    stepCount ++;
    //console.log(stepCount)
}

/**
Fejtsd ki a modifyCell elnevezésű függvényt, 
amely beállítja az elem tartalmának a használt jelet,
majd kattintásra (esemény) eltávolítja a handleClick függvényt. 
*/
const modifyCell = (element) => {
    element.innerHTML = mark;
    element.removeEventListener('click', handleClick);


}

/**
Fejtsd ki a setMark elnevezésű függvényt, 
amely a jelre beállítja a következő lépésnél használt jelet úgy, 
hogy ha az X-et használtuk éppen, azaz a jel === X, 
akkor beállítja a 0-t, hiszen a másik játékos azzal fog tenni egy jelet,
ha pedig a 0-t használtuk, beállítja az X-et.
*/
const setMark = () => {

    if (mark === 'X') { mark = 'O'} else  {mark ='X'};
   //plus feature
    document.querySelector('.nextmove').innerHTML = 'Next Move >> Player: ' + mark ;
}

/**
Fejtsd ki a handleClick elnevezésű függvényt, 
amely meghívja a következő függvényeket:
- increaseCounter()
- modifyCell(event.target)
- setMark()
- changeMatrixValue(event.target)
- checkWinner()
*/
const handleClick = (event) => {
    increaseCounter();
    modifyCell(event.target);
    setMark();
    changeMatrixValue(event.target);
    checkWinner();
}

/**
Fejtsd ki az addClickListener elnevezésű függvényt, 
amely kiválasztja a cellákat, 
és kattintásra (esemény) mindegyikhez hozzáadja a handleClick függvényt.
*/
const addClickListener = () => {
    
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('click', handleClick))
}

/**
Fejtsd ki a removeAllClickListeners elnevezésű függvényt, 
amely kiválasztja a cellákat, 
és kattintásra (esemény) mindegyikről eltávolítja a handleClick függvényt.
*/
const removeAllClickListeners = () => {
    
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.removeEventListener('click', handleClick))
}

/**
Fejtsd ki a checkValues elnevezésű függvényt, 
amely végigmegy a kapott tömb sorain,
és a sor minden EGYES elemének értéke esetében megvizsgálja, 
hogy az 0 vagy X. 
Ha a sor minden egyes eleme 0 vagy X, 
akkor a 0 vagy az X győzött.
Ha valaki győzött, akkor pl. egy ilyen tömböt kapunk: [true, false, false]
*/
const checkValues = (array) => array.map(row => { /*Ide írd a kódot!*/

    if (row.every(item => item === 'X') || row.every(item => item === 'O'))
     { return true } else { return false }
})
    .indexOf(true) !== -1;
/*
Ha true-t kapunk visza adott sorra, akkor 
annak indexét vizsgálva nem kaphatunk -1-et.
Azaz az elem benne van a tömbben.
*/

const checkColumnValues = () =>
    checkValues(matrix.map((array, i) =>
        array.map((item, j) => matrix[j][i])));


const checkDiagonalValues = () =>
    checkValues([
        matrix.map((array, i) => matrix[i][i]),
        matrix.map((array, i) => matrix[i][matrix[i].length - i - 1])

        /*
        Miután az első függvénnyel leellenőriztük a sorok tartalmát,
        a fentiekkel megvizsgáljuk az oszlopok és az átlókban lévő mezők tartalmát.
        Ez azért fontos, mert így tudhatjuk meg, 
        hogy lesz-e három azonos jel egymás mellett/alatt/átlósan.
        */
    ]);

/*
Fejtsd ki a checkWinner elnevezésű függvényt, 
amely...
*/
const checkWinner = () => {
    // ...kiírja a konzolra a checkColumnValues()t és a checkDiagonalValues()-t,
    console.log(checkColumnValues());
    console.log(checkDiagonalValues());
    /*
    majd meghívja az endGame()-et, ha hogy HA
    a checkValues(matrix) vagy a checkColumnValues() vagy a checkDiagonalValues() igaz.
    */
    if (checkValues(matrix) || checkColumnValues() || checkDiagonalValues()) { endGame() };
}

/**
A HTML-ben a játékteret követően vegyél fel egy divet message osztállyal,
'Let's play.' tartalommal.

Fejtsd ki a setMessage elnevezésű függvényt, 
amely kiválasztja a message osztályú elemet, 
és az üzenetet állítja be a div tartalmának.
*/
const setMessage = (message) => {
    
    document.querySelector('.message').innerHTML = message;
    
}

/**
Fejtsd ki a startGame elnevezésű függvényt, 
amely meghívja a következő függvényeket:
- initState()
- addClickListener()
- newGame()
*/
const startGame = () => {
    initState();
    addClickListener();
    newGame();
}

/**
Fejtsd ki az endGame elnevezésű függvényt, 
amely a setMessage nevű függvény segítségével beállítja az üzenetet, 
amelynek tartalma:
'The winner is Player ' 
plusz: 
(mark === 'X' ? 'O' : 'X') + '.')

Ez az utóbbi kódrészlet kiválasztja azt a jelet, amellyel a nyertes játszott
(és egy pontot helyez el a mondat végén).

Ezután a függvény meghívja a removeAllClickListeners() nevű függvényt.
*/
const endGame = () => {
    setMessage('The Winner is Player ' + (mark === 'X' ? 'O' : 'X') + '!');
    removeAllClickListeners();
}

/*
Indíts el egy új játékot az alábbi függvény segítségével!

Hozz létre a HTML-ben a játéktéren kívül egy gombot!
*/
const newGame = () => {
    // Válaszd ki a gombot!
    document.getElementById('btn_newgame').addEventListener("click", new_game_functions);

    function new_game_functions() {
        initState();
        addClickListener();
        deleteSigns();
        setMessage('Playing...');
        setMark();
    }

    /*
    Tegyél rá/adj hozzá egy eseményfigyelőt, 
    amely kattintásra meghívja a következő függvényeket:
        - initState()
        - addClickListener()
        - deleteSigns()
        - setMessage('Playing...')
        - setMark()
        */

}

startGame();