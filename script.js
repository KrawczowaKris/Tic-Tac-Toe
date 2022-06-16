var area = document.getElementById('area');
var square = document.getElementsByClassName('square');
var chod = document.getElementById('chod');
var winnerX = document.getElementById('winX');
var winnerO = document.getElementById('winO');
var so = document.getElementById('so');
var note = document.getElementById('note');
var buttonGame = document.getElementById('NG');

buttonGame.addEventListener('click', newGameClick, false);

var winIndex = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

var player = "X";
var winX = 0;
var winO = 0;
var s = 0;

for (var i = 1; i <= 9; i++) area.innerHTML += "<div class='square' pos=" + i + "></div>";

squareAddListener();

function squareClick() {
    var listIndex = [];

    if(!this.innerHTML) {
        note.classList.remove("notification");
        note.innerHTML = "";
        this.innerHTML = player;
    } else {
        note.classList.add("notification");
        note.innerHTML = "<div class='sq_check'>Ячейка занята</div>";
        return;
    }

    for(var e in square)
        if(square[e].innerHTML == player) listIndex.push(parseInt(square[e].getAttribute('pos')));

    if(checkWinner(listIndex, player)) {
        squareRemoveListener();
        restartGame(player);
    } else {
        var draw = true;
        for(var i in square) if(square[i].innerHTML == '') draw = false;
        if(draw) restartGame("Ничья");
    }

    player = player == 'O' ? 'X' : 'O';
    chod.innerHTML = "Сейчас ходит: " + player;
}

function checkWinner(data, pl) {
    for (var i in winIndex) {
        var win = true;
        for (var j in winIndex[i]) {
            var id = winIndex[i][j];
            var ind = data.indexOf(id);
            if (ind == -1) win = false;
        }
        if (win) {
            if (pl === 'X') {
                winX += 1;
                winnerX.innerHTML = winX;
            }
            else  {
                winO += 1;
                winnerO.innerHTML = winO;
            }
            return true;
        }
    }
    return false;
}

function restartGame(pl) {
    if (pl !== "Ничья") {
        note.classList.add("notification");
        note.innerHTML = "<div class='sq_check'>Выиграл " + pl + "</div>";
        squareRemoveListener();
    } 
    else {
        note.classList.add("notification");
        note.innerHTML = "<div class='sq_check'>Ничья</div>";
        s += 1;
        so.innerHTML = s;
    }
}

function newGameClick() {
    for(var i = 0; i < square.length; i++) square[i].innerHTML = '';
    note.classList.remove("notification");
    note.innerHTML = ''; 
    squareAddListener();
}

function squareAddListener() {
    for (var i = 0; i < square.length; i++) square[i].addEventListener('click', squareClick, false);
}

function squareRemoveListener() {
    for (var i = 0; i < square.length; i++) square[i].removeEventListener('click', squareClick, false);
}
