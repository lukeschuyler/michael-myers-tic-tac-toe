const config = {
    apiKey: "AIzaSyBw6ShnJKM2K59nC-x19TSBGsdd94KZGz0",
    authDomain: "tic-tac-toe-firebase.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-firebase.firebaseio.com",
    storageBucket: "tic-tac-toe-firebase.appspot.com",
    messagingSenderId: "315055648875"
  };
  firebase.initializeApp(config);

$('.square').click(makeMove)

	let i = 0
	function makeMove() {
		let square = $(this).attr('data-square')
		let turn;
		if ((i % 2) === 0 || i === 0) {
			turn = '<span class="letter">X</span>'
			$(this).html(turn)
			// return turnsRef.update({ [square] : 'X' })
		} else {
			turn = '<span class="letter">O</span>'
			$(this).html(turn)
			// return turnsRef.update({ [square] : 'O' })
		}
		i++
	}
