const config = {
    apiKey: "AIzaSyBw6ShnJKM2K59nC-x19TSBGsdd94KZGz0",
    authDomain: "tic-tac-toe-firebase.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-firebase.firebaseio.com",
    storageBucket: "tic-tac-toe-firebase.appspot.com",
    messagingSenderId: "315055648875"
  };
  firebase.initializeApp(config);

let currentGame;
let currentSeatOne;
let currentSeatTwo;
let turnsRef = firebase.database().ref('games/turns')
const gamesRef = firebase.database().ref('games')
let userRef = firebase.database().ref('games/' + currentGame + '/users')

function cheackSeats() {
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

$('.seat').click(function(e) {
	$(this).html('Seat Taken')
	$(this).removeClass('btn-default')
	$(this).addClass('btn-primary')
	console.log($(this).html('Seat Taken'))
	if ($(this).hasClass('seatOne') === true) {
		firebase.auth().signInAnonymously()
			.then(val => currentSeatOne = val.uid)
			.then(function() {
				cheackSeats()
			})
	} else if ($(this).hasClass('seatTwo') === true){
		firebase.auth().signInAnonymously()
			.then(val => currentSeatTwo = val.uid)
			.then(function() {
				cheackSeats()
			})
	}
})

function newGame() {
		let removeGame = { [currentGame] : null }
		gamesRef.update(removeGame)
		const newBoard = { turns : 'test' }
		document.querySelectorAll('.square').forEach(function(square) {
			square.innerText = null
		})
		gamesRef.push(newBoard)
		  .then(data => currentGame = data.path.o[1])
		  .then(() => {
		  	turnsRef = firebase.database().ref('games/' + currentGame + '/turns')
		  	userRef = firebase.database().ref('games/' + currentGame + '/users')
		})
		i = 0;
		resetSeats()
	}

	let i = 0

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

	newGame();

	$('.square').click(makeMove)

	$('.new-game').click(newGame)
