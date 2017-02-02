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
