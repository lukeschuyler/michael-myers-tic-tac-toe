
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
      currentGamesRef.on('value', onUpdate) //listens for changes in database turns
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

function drawCheck(turns) {
  let drawGame = true
  for(var i = 0, length1 = turns.length; i < length1; i++){
    console.log('turns[i]', turns[i])
    if (turns[i] === "") {
      drawGame = false
    }
  }
  if (winner !== "") {
    drawGame = false
  }
  return drawGame
}

//function that runs after a move is made. gets database snapshot and checks for a winner
function onUpdate(snap) {
  const data = snap.val()
  const turns = data.turns
  if(winCheck(turns)) {
    alert(`${winner} WON!`)
  }
  if(drawCheck(turns)) {
    alert('DRAW')
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
