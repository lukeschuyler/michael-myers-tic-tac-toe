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
function checkDiags() {
  //look at both diags and check if each square in diag are xs or os
}

function checkCols() {
  //loop through cols and check to see if all squares in col are xs or os
  const cols = []
  for(var i = 0, length1 = cols.length; i < length1; i++){
    cols[i]
  }
}

function checkRows() {
  //loop through rows and check to see if all squares in row are xs or os
  const rows = []
  for(var i = 0, length1 = rows.length; i < length1; i++){
    rows[i]
  }
}

function winCheck() {
  checkRows()
  checkCols()
  checkDiags()
}



/*********************************
event listeners
*********************************/
$('.square').click(function() {
	console.log(this.dataset)
})
