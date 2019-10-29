/*
[IMPORTANT]
You are free to create any number of helper function you want.
We know the problem could be seached online, and we are aware of those solutions. 
So please sight sources if you took help from any online resource.
*/



//IDs for all the table elements. You get the cell element just by using document.getElementById("A1")
var table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]

/*
An integer array of length 9. 
Usaged: This is to store the state to the tictactoe board.
When a move is made 
(Example player 1 (who is X) move at Cell 'A1' --- The board_state[0] will be made 1 )
Similarly, A move by player 2(who is O) at Cell 'A3' --- The board_state[2] will be made 0 )
We store the move of player 1 as '1' and player 2 as '0'. So after the above two moves the state should look like
[1, -1, 0, -1, -1, -1, -1, -1, -1]
*/
var board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1]


// A flag to keep track of the status of the game, false means the game is not started. The default value is set to false
var started = false

/* 
A variable to keep track of each players turn. Since the game always starts with player 1 - The default value is set to '1'
1 means player_1     
0 means player_0
*/
var turn = 1 

/*
 @Return boolean
 @Param _str - A string variable - Note the type is not checked in the implementation
 The methods @Returns true is the _str is null or it has a length of 0, otherwise, the methods returns false
*/
function isEmpty(_str) {
	
	return (!_str || 0 === _str.length)
}

/*
@Return int This return the turn variable. Please note that 
turn = 1 is for player_1 and 
turn = 0 is for player_2
@Param - No param
*/
function whose_move(){
	return this.turn
}

/*
@Return void
@Param 
This methods toggles the 'turn' variable.
if the turn is set to 1 it will make it 0
if the turn is set to 0 it will make it 1
*/
function toggle_move() {
	this.turn = !this.turn
}

/*
@Return boolean
@Param 
The method returns the value of the 'started' flag.
true means the game has started
false means the game has not started
When the game has not started the flag is set to false. As soon as the game starts the flag must be set to true.
Once the game has finished or user has clicked on reset_play the flag must be set to false.
*/
function game_started(){
	return this.started
}

var available = new Set(["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2","C3"]);
var p1Set = new Set();
var p2Set = new Set();

/*
TODO - Rule 1
This is the first method you'll implement. This method is called when the Begin Play button is clicked.
The method should do all the validations as stated in rule 1.
1. DONE--------------Verify if the player names are empty or not. Raise an alert if they are empty.
2. DONE--------------If the field are empty don't start the game. This just means the function will return and do nothing. The 'started' flag will not be modified.
3. DONE--------------If all verification is successful, disable the name fields and update the player moves as shown in the image.
4. DONE--------------If all verification is successful, update the turn information on the page. (See the source code and image). And set the started flag to true.(this will help you track at any instant if the game is in start state or not.)
5. DONE--------------Once game has started, Handle multiple clicks on begin play.
*/

function begin_play(){
	//verify if player names are empty
	var f1 = document.getElementById("player1_id");
	var f2 = document.getElementById("player2_id");

	
	if ((f1.value != "") && (f2.value != "")){
		var text = document.getElementById('player1_id');
		var text2 = document.getElementById('player2_id');
		text.disabled = true;
		text2.disabled = true;
		started= true;
		//console.log(f1.value)
		document.getElementById("turn_info").innerHTML = (f1.value + "'s turn");
		game_started();
	} 
	else{
		started = false;
		alert('Please enter names for both players');
		
	}
	//console.log(started);
	
	return
	
}
/*
TODO - Rule 2
This is the second method you'll implement. This method is called when the Reset Play button is clicked.
The method should do all the things as stated in rule 2.
1. DONE---------------The reset play button should reset the whole game.(At any time when reset is clicked - All the three text boxes should be cleared and Turn should be set to the default message.)
2. DONE---------------The text boxes for entering name should be enablled back.
3. DONE---------------The Tic Tac Toe Grid should be set to its default entries.
4. DONE---------------Clicking reset play again and again shall have the same effect.(or no effect when clicked multiple times)
Remember to set the strated flag as false

*/
function reset_play(){
	//RESETTING PLAYER NAMES + ENABLE FORM
	document.getElementById("player1_id").value = "";
	document.getElementById("player1_id").disabled = false;
	document.getElementById("player2_id").value = "";
	document.getElementById("player2_id").disabled = false;

	//RESETTING THE TIC TAC TOE GRID

	document.getElementById("A1").innerHTML= "A1";
	document.getElementById("A2").innerHTML= "A2";
	document.getElementById("A3").innerHTML= "A3";
	document.getElementById("B1").innerHTML= "B1";
	document.getElementById("B2").innerHTML= "B2";
	document.getElementById("B3").innerHTML= "B3";
	document.getElementById("C1").innerHTML= "C1";
	document.getElementById("C2").innerHTML= "C2";
	document.getElementById("C3").innerHTML= "C3";

	//RESETTING MOVE FORM

	started = false;
	turn = 1;
	document.getElementById("move_text_id").value = "";
	document.getElementById('turn_info').innerHTML = "Game has not begin.";
	//console.log(started); 

	//reset the sets 
	p1Set.clear();
	p2Set.clear();
	available.clear();
	available.add("A1");
	available.add("A2");
	available.add("A3");
	available.add("B1");
	available.add("B2");
	available.add("B3");
	available.add("C1");
	available.add("C2");
	available.add("C3");


}

/*
TODO - Rule 3
This is the last method you'll implement. This method is called everytime a move has been player( Play button was clicked).
The method should do all the things as stated in rule 2.
1. DONE----------------The moves should be validated can only be these ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]
2. DONE----------------Invalid moves should be reported by an alert message.(You are encorraged to use Modal which you learned in HW1 - Usage is not mandatory.)
3. DONE----------------If the move is a valid move, the grid should be updated with the correct move (Player 1 is always - 'X', and Player 2 is always 'O' (This is not zero!)) - The turn information should also be updated
	Hint: Use the turn variable to figure out who is currently playing. Use to toggle method to change moves.
4. DONE----------------A move should always be a valid move. (Example: If say a move was made in already filled cell, it should be invalidated with an alert.)
5. DONE----------------If the game has not started, clicking on <b>Play</b> should give an alert "The game has not started."<br/>
6. DONE----------------After any move, the state of the table should be validated.(see the document attached in the homework) 
   If the there is winner - Show it in an alert message - (Ex - Winner is X or O) - Displaying name is not important. <br/>
7. DONE----------------The game should reset itself once a winner is determined.<br/>
8. DONE----------------After all the moves have exhausted, you're not required to display any message. (It should be obvious to Reset play.)<br/>

*/





function winningHelper(his){
	var win = -1

	if((his.has("A1")) &&(his.has("A2"))&&(his.has("A3"))){
		win = 1;
	}
	if((his.has("B1")) &&(his.has("B2"))&&(his.has("B3"))){
		win =1;
	};
	if((his.has("C1")) &&(his.has("C2"))&&(his.has("C3"))){
		win =1;
	}
	if((his.has("A1")) &&(his.has("B2"))&&(his.has("C3"))){
		win = 1;
	}
	if((his.has("A3")) &&(his.has("B2"))&&(his.has("C1"))){
		win = 1;
	}
	if((his.has("A1")) &&(his.has("B1"))&&(his.has("C1"))){
		win = 1;
	}
	if((his.has("A2")) &&(his.has("B2"))&&(his.has("C2"))){
		win = 1;
	}
	if((his.has("A3")) &&(his.has("B3"))&&(his.has("C3"))){
		win = 1;
	}
	return win
	
}
	

function play() {


	if (started == false){
		alert("The game has not started!");
		reset_play();
		return
	}

	var f1 = document.getElementById("player1_id");
	var f2 = document.getElementById("player2_id");

	
		var input = document.getElementById("move_text_id").value;
		if(available.has(input)== false){ //check available input
			alert("invalid input");
		}
		else{ //input is avaiable
			var change = turn;
			if (turn == false || change == false){
				turn = 0;
				change = "O";
				p2Set.add(input);
				//del = toString(input);
				available.delete(input);
				document.getElementById("move_text_id").value = "";
			}
			else{
				turn = 1;
				change = "X";
				p1Set.add(input);
				//del = toString(input);
				available.delete(input);
				document.getElementById("move_text_id").value = "";
			}
		
			document.getElementById(input).innerHTML= change;
			turn = !turn;

		}
		//check for winner
		var oneWin = -1;
		var twoWin = -1;
		twoWin = winningHelper(p2Set);
		oneWin = winningHelper(p1Set);

		if (oneWin == 1){
			
			alert(f1.value + " wins");
			reset_play();
		}
		else if (twoWin == 1){
			alert(f2.value + " wins");
			reset_play();
		}
		// console.log(available);
		// console.log(p1Set);
		// console.log(p2Set);
		// console.log(oneWin);
		// console.log(twoWin);
		///change turns
		

		if (turn == 1){
			document.getElementById("turn_info").innerHTML = (f1.value + "'s turn");
		}
		if (turn == 0){
			document.getElementById("turn_info").innerHTML = (f2.value + "'s turn");
		}

		if (available.size == 0){
			alert("Draw!");
			reset_play();

		}

		return	
}

/*
Do not change this method.
*/
function moveEnter(event) {		
	if(event.keyCode == 13) {
		event.preventDefault()
		play()
	}

}
