const config = {
  apiKey: "AIzaSyBw6ShnJKM2K59nC-x19TSBGsdd94KZGz0",
  authDomain: "tic-tac-toe-firebase.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-firebase.firebaseio.com",
  storageBucket: "tic-tac-toe-firebase.appspot.com",
  messagingSenderId: "315055648875"
};

firebase.initializeApp(config);


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
