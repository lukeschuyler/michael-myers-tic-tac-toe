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
let oPlayer = false;
let xPlayer = false;
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

function clearSquares() {
  const newTurns = { turns : ["", "", "", "", "", "", "", "", ""] }
  currentGamesRef.update(newTurns)
  document.querySelectorAll('.square').forEach(function(square) {
    square.innerText = null
  })
}


//checks to see if game is a draw
function drawCheck(turns) {
  let drawGame = true
  //checks to make sure a winner hasn't already been declared
  if (winner !== "") {
    drawGame = false
  }
  //loops to see if there are any squares not filled in
  for(var i = 0, length1 = turns.length; i < length1; i++){
    if (turns[i] === "") {
      drawGame = false
    }
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
  if ((turnCounter % 2) === 0 || turnCounter === 0) {
    // x turn
    $('.currentTurnX').html("X's Turn")
    $('.currentTurnO').html("")
    if (xPlayer) {
      enableBoard()
    } else {
      disableBoard()
    }
  } else {
    //o turn
    $('.currentTurnX').html("")
    $('.currentTurnO').html("O's Turn")
     if (oPlayer) {
      enableBoard()
    } else {
      disableBoard()
    }
  }
}

function endCheck(turns) {
  if(winCheck(turns)) { //checks to see if someone won
    // setTimeout(function(){ //timeout to let character display before alert pops
    //   // alert(`${winner} WON!`)
    disableBoard()
    if (winner === 'X') {
      $('.currentTurnX').html(`${winner} WINS`)
      $('.currentTurnO').html(``)
    } else {
      $('.currentTurnO').html(`${winner} WINS`)
      $('.currentTurnX').html(``)
    }
  }
  if(drawCheck(turns)) { //checks for draw
    // setTimeout(function(){ //timeout to let character display before alert pops
      disableBoard()
     $('.currentTurnX').html(`DRAW`)
     $('.currentTurnO').html(`DRAW`)

  }
}

function tableButtonState(playerCount, tables) {
  if (playerCount === 1) {
    $(`#${tables}`).removeClass("btn-danger").addClass("btn-warning").addClass("flash-button")
  } else if (playerCount === 2) {
    $(`#${tables}`).removeClass("flash-button").prop("disabled", true)
  }
}

function updateLobbyButtons(snap) {
  const data = snap.val()
  for (tables in data) {
    $(`#${tables}`).removeClass("flash-button btn-warning").addClass("btn-danger").prop("disabled", false)
    // console.log('users', data[tables].users)
    let users = data[tables].users
    if (users) {
      let playerCount = 0
      if (users.X) {
        playerCount++
      }
      if (users.O) {
        playerCount++
      }
      console.log('playerCount', playerCount)
      tableButtonState(playerCount, tables)
    }
    // statement
  }
  // const tables = data.tables
  // const users = data.users
    // console.log('data', data)
  // users.forEach(callbackfn: Function, thisArg?: any)
  // if (users) {
  // }
}

//function that runs after a move is made. gets database snapshot and checks for a winner
function onUpdate(snap) {
  const data = snap.val()
  const turns = data.turns
  turnUpdate(turns) //update turn notification
  endCheck(turns)
}

// CHANGES X's AND O'S ACCORDING TO WHATS ON DATABASE
function moveDom(snap) {
  const turns = snap.val()
  console.log(turns)
  const squares = document.querySelectorAll('.square')
  for (let i = 0; i < turns.length; i++) {
    if (turns[i] !== squares[i] && turns[i] !== undefined) {
      squares[i].innerHTML = turns[i]
    }
  }
}

// 
function checkSeatUsers(data, currentUser) {
  if (data.X === currentUser) {
        xPlayer = true
      } else if (data.O === currentUser) {
        oPlayer = true
      }
}

// CHANGE SEATS ON DOM ACCORDING TO PLAYERS AT TABLE ON DATABASE
function updateSeats(snap) {
  let data = snap.val()
  const currentUser = firebase.auth().currentUser.uid
  // console.log(snap.val())
  if (data) {
    if (data.X) {
      $('.seatOne').html('X Seat Taken')
      $('.seatOne').removeClass('btn-default')
      $('.seatOne').addClass('btn-danger')
      checkSeatUsers(data, currentUser)
    }
    if (data.O) {
      $('.seatTwo').html('O Seat Taken')
      $('.seatTwo').removeClass('btn-default')
      $('.seatTwo').addClass('btn-danger')
      checkSeatUsers(data, currentUser)
    }
  }
}

function switchViews() {
  $('.table-view').addClass('hidden')
  $('.game-view').removeClass('hidden')
}

function tableSetUp() {
  $('#currentTable').text(currentGame.slice(0,5) + ' ' +  currentGame.slice(5))
  switchViews()
}


// WORKING NEW GAME FUNCTION WITH TABLES
function newGame() {
  currentGamesRef.on('value', onUpdate)
  turnsRef.on('value', moveDom)
  userRef.on('value', updateSeats)
  clearSquares()
  $('.currentTurnX').html("X's Turn")
  $('.currentTurnO').html(``)
  // enableBoard()
  // disableBoard()
}

function tableClick(e) {
  currentGame = $(this).attr('id');
  turnsRef = firebase.database().ref('games/' + currentGame + '/turns')
  userRef = firebase.database().ref('games/' + currentGame + '/users')
  currentGamesRef = firebase.database().ref('games/' + currentGame)
  // gamesRef.once('value')
  // .then(

  //   )
  if(!currentGamesRef.once('value')) {
    console.log('!currentGamesRef')
    gamesRef.update([currentGame])
  }
  tableSetUp()
  newGame();
}


function disableBoard() {
  $('.square').off('click')
}

function enableBoard(){
  // user clicks on square
  $('.square').on('click', makeMove)
}




function refreshPage() {
  const newUsers = { users : {} }
  currentGamesRef.update(newUsers)
  location.reload()
}

/*********************************
event listeners
*********************************/
gamesRef.on('value', updateLobbyButtons)

// refresh page
$('.back-lobby').click(refreshPage)

// // user clicks on square
// $('.square').click(makeMove)

// user clicks new game button
$('.new-game').click(newGame)

// TABLE CLICK EVENT
 $('.table').click(tableClick)
