const config = {
  apiKey: "AIzaSyBw6ShnJKM2K59nC-x19TSBGsdd94KZGz0",
  authDomain: "tic-tac-toe-firebase.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-firebase.firebaseio.com",
  storageBucket: "tic-tac-toe-firebase.appspot.com",
  messagingSenderId: "315055648875"
};

firebase.initializeApp(config);

let currentGame;
let turnsRef = firebase.database().ref('games/' + currentGame + '/turns')
const gamesRef = firebase.database().ref('games')
let userRef = firebase.database().ref('games/' + currentGame + '/users')

/*********************************
functions
*********************************/



function onUpdate(snap) {
  const data = snap.val()
  console.log(snap.val)
  // winCheck()
}

// function winCheck() {

// }



/*********************************
event listeners
*********************************/
$('.square').click(function() {
  console.log(this.dataset)
})

firebase.database().ref('turns').on('value', onUpdate)




$('.square').click(makeMove)

$('.new-game').click(newGame)

	let i = 0
	function makeMove() {
		console.log(i)
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

function newGame() {
	const newBoard = { turns : 'test' }
	document.querySelectorAll('.square').forEach(function(square) {
		square.innerText = null
	})
	gamesRef.push(newBoard)
	  .then(data => currentGame = data.path.o[1])
	  .then(() => turnsRef = firebase.database().ref('games/' + currentGame + '/turns'))
	i = 0;
}

newGame();
