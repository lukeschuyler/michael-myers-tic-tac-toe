
const config = {
  apiKey: "AIzaSyBw6ShnJKM2K59nC-x19TSBGsdd94KZGz0",
  authDomain: "tic-tac-toe-firebase.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-firebase.firebaseio.com",
  storageBucket: "tic-tac-toe-firebase.appspot.com",
  messagingSenderId: "315055648875"
};

firebase.initializeApp(config);

/*********************************
variable declarations
*********************************/

let currentGame;
let turnsRef
let currentGamesRef
let currentSeatOne;
let currentSeatTwo;
const gamesRef = firebase.database().ref('games')
let userRef = firebase.database().ref('games/' + currentGame + '/users')

let i = 0
let winner = ""


/*********************************
functions
*********************************/

function checkSeats() {
	if (document.querySelector('.seatOne').innerHTML && document.querySelector('.seatTwo').innerHTML === 'Seat Taken') {
		userRef.update({ twoplayers : true, [currentSeatOne] : 'X', [currentSeatTwo] : 'O' })
	}
}


function resetSeats() {
	$('.seatOne').html('Join Seat 1 (X)')
	$('.seatTwo').html('Join Seat 2 (O)')
	$('.seatOne').removeClass('btn-primary')
	$('.seatTwo').removeClass('btn-primary')
	$('.seatOne').addClass('btn-default')
	$('.seatTwo').addClass('btn-default')
}

function makeMove() {
  if (this.innerHTML === '') {
    let square = $(this).attr('id')
    let turn;
    if ((i % 2) === 0 || i === 0) {
      turn = '<span class="letter">X</span>'
      $(this).html(turn)
      i++
      return turnsRef.update({ [square] : 'X' })
    } else {
      turn = '<span class="letter">O</span>'
      $(this).html(turn)
      i++
      return turnsRef.update({ [square] : 'O' })
    }
  }
}


function newGame() {
	let removeGame = { [currentGame] : null }
	console.log(currentGame)
	gamesRef.update(removeGame)
	const newBoard = { turns : ["", "", "", "", "", "", "", "", ""] }
	document.querySelectorAll('.square').forEach(function(square) {
		square.innerText = null
	})
	gamesRef.push(newBoard)
	  .then(data => currentGame = data.path.o[1])
	  .then(() => {
	  	turnsRef = firebase.database().ref('games/' + currentGame + '/turns')
	  	userRef = firebase.database().ref('games/' + currentGame + '/users')
	  	currentGamesRef = firebase.database().ref('games/' + currentGame)
      currentGamesRef.on('value', onUpdate)
	})
	i = 0;
}

$('.seat').click(function(e) {
  $(this).html('Seat Taken')
  $(this).removeClass('btn-default')
  $(this).addClass('btn-primary')
  console.log($(this).html('Seat Taken'))
  if ($(this).hasClass('seatOne') === true) {
    firebase.auth().signInAnonymously()
      .then(val => currentSeatOne = val.uid)
      .then(function() {
        checkSeats()
      })
  } else if ($(this).hasClass('seatTwo') === true){
    firebase.auth().signInAnonymously()
      .then(val => currentSeatTwo = val.uid)
      .then(function() {
        checkSeats()
      })
  }
})


function winCheck(boardstate) {
  // checks rows for O win
  if ((boardstate[0] === "O") && (boardstate[1] === "O") && (boardstate[2] === "O")) {
    winner = "O"
    return true
  } else if ((boardstate[3] === "O") && (boardstate[4] === "O") && (boardstate[5] === "O")) {
    winner = "O"
    return true
  } else if ((boardstate[6] === "O") && (boardstate[7] === "O") && (boardstate[8] === "O")) {
    winner = "O"
    return true
  // checks diags for O win
  } else if ((boardstate[0] === "O") && (boardstate[4] === "O") && (boardstate[8] === "O")) {
    winner = "O"
    return true
  } else if ((boardstate[2] === "O") && (boardstate[4] === "O") && (boardstate[6] === "O")) {
    winner = "O"
    return true
  // checks cols for O win
  } else if ((boardstate[0] === "O") && (boardstate[3] === "O") && (boardstate[6] === "O")) {
    winner = "O"
    return true
  } else if ((boardstate[1] === "O") && (boardstate[4] === "O") && (boardstate[7] === "O")) {
    winner = "O"
    return true
  } else if ((boardstate[2] === "O") && (boardstate[5] === "O") && (boardstate[8] === "O")) {
    winner = "O"
    return true
  // checks rows for X win
  } else if ((boardstate[0] === "X") && (boardstate[1] === "X") && (boardstate[2] === "X")) {
    winner = "X"
    return true
  } else if ((boardstate[3] === "X") && (boardstate[4] === "X") && (boardstate[5] === "X")) {
    winner = "X"
    return true
  } else if ((boardstate[6] === "X") && (boardstate[7] === "X") && (boardstate[8] === "X")) {
    winner = "X"
    return true
  // checks diags for X win
  } else if ((boardstate[0] === "X") && (boardstate[4] === "X") && (boardstate[8] === "X")) {
    winner = "X"
    return true
  } else if ((boardstate[2] === "X") && (boardstate[4] === "X") && (boardstate[6] === "X")) {
    winner = "X"
    return true
  // checks cols for X win
  } else if ((boardstate[0] === "X") && (boardstate[3] === "X") && (boardstate[6] === "X")) {
    winner = "X"
    return true
  } else if ((boardstate[1] === "X") && (boardstate[4] === "X") && (boardstate[7] === "X")) {
    winner = "X"
    return true
  } else if ((boardstate[2] === "X") && (boardstate[5] === "X") && (boardstate[8] === "X")) {
    winner = "X"
    return true
  }
}

function onUpdate(snap) {
  console.log("snap", snap)
  const data = snap.val()
  const turns = data.turns
  console.log('turns', turns)
  if(winCheck(turns)) {
    alert(`${winner} Won!`)
  }
}


function makeMove() {
  let square = $(this).attr('id')
  let turn;
  if ((i % 2) === 0 || i === 0) {
    turn = '<span class="letter">X</span>'
    $(this).html(turn)
    i++
    return turnsRef.update({ [square] : 'X' })
  } else {
    turn = '<span class="letter">O</span>'
    $(this).html(turn)
    i++
    return turnsRef.update({ [square] : 'O' })
  }
}


/*********************************
event listeners
*********************************/

// user clicks on square
$('.square').click(makeMove)

// user clicks new game button
$('.new-game').click(newGame)

/*********************************
starts a new game as soon as app starts
*********************************/

newGame();
