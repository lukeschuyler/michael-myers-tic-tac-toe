const config = {
    apiKey: "AIzaSyBw6ShnJKM2K59nC-x19TSBGsdd94KZGz0",
    authDomain: "tic-tac-toe-firebase.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-firebase.firebaseio.com",
    storageBucket: "tic-tac-toe-firebase.appspot.com",
    messagingSenderId: "315055648875"
  };
  firebase.initializeApp(config);

$('.square').click(function() {
	console.log(this.dataset)
})
