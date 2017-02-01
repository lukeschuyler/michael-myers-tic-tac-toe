const config = {
  apiKey: "AIzaSyBw6ShnJKM2K59nC-x19TSBGsdd94KZGz0",
  authDomain: "tic-tac-toe-firebase.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-firebase.firebaseio.com",
  storageBucket: "tic-tac-toe-firebase.appspot.com",
  messagingSenderId: "315055648875"
};

firebase.initializeApp(config);

//varible declarations
const rows = []
const cols = []


//functions
function checkRows() {
  for(var i = 0, length1 = rows.length; i < length1; i++){
    rows[i]
  }
}

function winCheck() {
  checkRows()
  checkCols()
  checkDiags()
}

//event listeners
$('.square').click(function() {
	console.log(this.dataset)
})
