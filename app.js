
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
		userRef.update({ twoplayers : true })
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

// CLICK EVENTS FOR SEATS
$('.seat').click(function(e) {
  $(this).html('Seat Taken')
  $(this).removeClass('btn-default')
  $(this).addClass('btn-danger')
  if ($(this).hasClass('seatOne') === true) {
    firebase.auth().signInAnonymously()
      .then(val => currentSeatOne = val.uid)
      .then(function() {
        userRef.update({ X : currentSeatOne  })
        checkSeats()
      })
  } else if ($(this).hasClass('seatTwo') === true){
    firebase.auth().signInAnonymously()
      .then(val => currentSeatTwo = val.uid)
      .then(function() {
        userRef.update({ O : currentSeatTwo })
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
      userRef.on('value', updateSeats)
  })
  i = 0;
}

// TABLE CLICK EVENT 
$('.table').click(function() {
  currentGame = $(this).attr('id');
  $('.table-view').addClass('hidden')
  $('.game-view').removeClass('hidden')
  $('#currentTable').text(currentGame.slice(0,5) + ' ' +  currentGame.slice(5))
  newGame();
})

function drawCheck(turns) {
  let drawGame = true
  for(var i = 0, length1 = turns.length; i < length1; i++){
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
    setTimeout(function(){
      alert(`${winner} WON!`)
    }, 300)
  }
  if(drawCheck(turns)) {
    setTimeout(function(){
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

function updateSeats(snap) {
  let data = snap.val()
  if (data.X) {
    $('.seatOne').html('Seat Taken')
    $('.seatOne').removeClass('btn-default')
    $('.seatOne').addClass('btn-danger')
  }
  if (data.O) {
    $('.seatTwo').html('Seat Taken')
    $('.seatTwo').removeClass('btn-default')
    $('.seatTwo').addClass('btn-danger')
  }
}

function makeMove() {
  let square = $(this).attr('id')
  let turn;
  if ((i % 2) === 0 || i === 0) {
    $('.currentTurn').html("O's Turn")
    turn = '<span class="letter">X</span>'
    $(this).html(turn)
    i++
    return turnsRef.update({ [square] : 'X' })
  } else {
    $('.currentTurn').html("X's Turn")
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
