
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

$('.table').click(function() {
  $('.table-view').addClass('hidden')
  $('.game-view').removeClass('hidden')
  currentGame = $(this).attr('id');
  newGame();
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
  // console.log("snap", snap)
  const data = snap.val()
  const turns = data.turns
  // console.log('turns', turns)
  if(winCheck(turns)) {
    setTimeout(function(){
      alert(`${winner} Won!`)
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

let i = 0
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
