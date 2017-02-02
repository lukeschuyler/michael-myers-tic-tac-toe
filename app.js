/*********************************
firebase initialization
*********************************/

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
let turnCounter = 0
let winner = ""



/*********************************
functions
*********************************/

function checkSeats() {
	if (document.querySelector('.seatOne').innerHTML && document.querySelector('.seatTwo').innerHTML === 'Seat Taken') {
		userRef.update({ twoplayers : true, [currentSeatOne] : 'X', [currentSeatTwo] : 'O' })
	}
}

// DOM SEAT RESET
function resetSeats() {
	$('.seatOne').html('Join Seat 1 (X)')
	$('.seatTwo').html('Join Seat 2 (O)')
	$('.seatOne').removeClass('btn-primary')
	$('.seatTwo').removeClass('btn-primary')
	$('.seatOne').addClass('btn-default')
	$('.seatTwo').addClass('btn-default')
}

// TURN FUNCTION
function makeMove() {
  if (this.innerHTML === '') {
    let square = $(this).attr('id')
    let turn;
    if ((turnCounter % 2) === 0 || turnCounter === 0) {
      turn = '<span class="letter">X</span>'
      $(this).html(turn)
      // turnCounter++
      return turnsRef.update({ [square] : 'X' })
    } else {
      turn = '<span class="letter">O</span>'
      $(this).html(turn)
      // turnCounter++
      return turnsRef.update({ [square] : 'O' })
    }
  }
}

// CLICK EVENTS FOR SEATS
$('.seat').click(function(e) {
  $(this).html('Seat Taken')
  $(this).removeClass('btn-default')
  $(this).addClass('btn-primary')
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

// WORKING NEW GAME FUNCTION WITH TABLES
function newGame() {
  // console.log(currentGame)
  $('.currentTurn').html("X's Turn")
  // let removeGame = { [currentGame] : null }
  // gamesRef.update(removeGame)
  const newBoard = { [currentGame] : { turns : ["", "", "", "", "", "", "", "", ""] } }
  document.querySelectorAll('.square').forEach(function(square) {
    square.innerText = null
  })
  gamesRef.update(newBoard)
    .then(() => {
      turnsRef = firebase.database().ref('games/' + currentGame + '/turns')
      userRef = firebase.database().ref('games/' + currentGame + '/users')
      currentGamesRef = firebase.database().ref('games/' + currentGame)
      currentGamesRef.on('value', onUpdate)
      turnsRef.on('value', moveDom)
      console.log(currentGamesRef)
  })
  i = 0;
}

//checks to see if game is a draw
function drawCheck(turns) {
  let drawGame = true
  //loops to see if there are any squares not filled in
  for(var i = 0, length1 = turns.length; i < length1; i++){
    if (turns[i] === "") {
      drawGame = false
    }
  }
  //checks to make sure a winner hasn't already been declared
  if (winner !== "") {
    drawGame = false
  }
  return drawGame
}

//gets turn count based on how many turns have been filled in in the database
function getTurnCount(turns) {
  let pastTurns = 0
  // loops over turns in database and counts array positions that are not blank
  for(var i = 0, length1 = turns.length; i < length1; i++){
    if (turns[i] !== "") {
      pastTurns++
    }
  }
  return pastTurns
}

//calls getTurnCount and sets the turn notification on board
function turnUpdate(turns) {
  turnCounter = getTurnCount(turns)
  console.log('turnCounter', turnCounter)
  if ((turnCounter % 2) === 0 || turnCounter === 0) {
    // x turn
    $('.currentTurn').html("X's Turn")
  } else {
    //o turn
    $('.currentTurn').html("O's Turn")
  }
}

//function that runs after a move is made. gets database snapshot and checks for a winner
function onUpdate(snap) {
  const data = snap.val()
  const turns = data.turns
  turnUpdate(turns) //update turn notification
  if(winCheck(turns)) { //checks to see if someone won
    setTimeout(function(){ //timeout to let character display before alert pops
      alert(`${winner} WON!`)
    }, 300)
  }
  if(drawCheck(turns)) { //checks for draw
    setTimeout(function(){ //timeout to let character display before alert pops
      alert(`DRAW`)
    }, 300)
  }
}

function moveDom(snap) {
  const turns = snap.val()
  const squares = document.querySelectorAll('.square')
  for (let i = 0; i < turns.length; i++) {
    if (turns[i] !== squares[i] && turns[i] !== undefined) {
      squares[i].innerHTML = turns[i]
    }
  }
}



/*********************************
event listeners
*********************************/

// user clicks on square
$('.square').click(makeMove)

// user clicks new game button
$('.new-game').click(newGame)

// TABLE CLICK EVENT
$('.table').click(function() {
  $('.table-view').addClass('hidden')
  $('.game-view').removeClass('hidden')
  currentGame = $(this).attr('id');
  newGame();
})








// OLD NEW GAME FUNCTION, KEEPING JUST IN CASE
// function newGame() {
//   $('.currentTurn').html("X's Turn")
// 	let removeGame = { [currentGame] : null }
// 	gamesRef.update(removeGame)
// 	const newBoard = { turns : ["", "", "", "", "", "", "", "", ""] }
// 	document.querySelectorAll('.square').forEach(function(square) {
// 		square.innerText = null
// 	})
// 	gamesRef.update(newBoard)
// 	  // .then(data => currentGame = data.path.o[1])
//     .then(data => console.log(data))
//     // .then(data => currentGame = boardPicked)
// 	  .then(() => {
// 	  	turnsRef = firebase.database().ref('games/' + currentGame + '/turns')
// 	  	userRef = firebase.database().ref('games/' + currentGame + '/users')
// 	  	currentGamesRef = firebase.database().ref('games/' + currentGame)
//       currentGamesRef.on('value', onUpdate)
//       turnsRef.on('value', moveDom)
// 	})
// 	i = 0;
// }
