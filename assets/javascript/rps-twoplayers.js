var config = {
    apiKey: "AIzaSyBnWONzUW3cDKzVGQvR7DTUt9M1ugcOUzM",
    authDomain: "rockpaperscissors-38bf3.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-38bf3.firebaseio.com",
    storageBucket: "rockpaperscissors-38bf3.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();

var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
var playerName = "";
var youPlayer = "";
var firstPlayerName = "";
var firstPlayerHand = "";
var firstDealtHand = "";
var firstHandStatement = "";
var secondPlayerName = "";
var secondPlayerHand = "";
var secondDealtHand = "";
var secondHandStatement = "";

var options = "<br><div class=\"gameOption\" data-name=\"Rock\">Rock</div><br><div class=\"gameOption\" data-name=\"Paper\">Paper</div><br><div class=\"gameOption\" data-name=\"Scissors\">Scissors</div>";

connectedRef.on("value", function(snap) {
	if( snap.val() ) {
		var con = connectionsRef.push(true);
		con.onDisconnect().remove();
	};
});

//Going to move the onClick event to the numConnections condition
$("#addPlayer").on("click", function() {

	playerName = $("#playerName").val();

database.ref('/connections').on("value", function(snapshot) {
var numConnections = snapshot.numChildren();
console.log(numConnections);

var ref = new Firebase('/playerOne');
ref.once("value", function(snapshot) {
  var hasOne = snapshot.child("playerOne").exists(); // b === true
  console.log(hasOne);
});

	if (numConnections == 1) {
		database.ref('/playerOne').set({
			playerOne: playerName
			});
		theFirstPlayer();
		} else if (numConnections == 2) {
		//and if the first name has already been set! --> if playerOne "exists()"
		database.ref('/playerTwo').set({
			playerTwo: playerName
			});
		theSecondPlayer();
		}
  });
	return false;
});

function theFirstPlayer() {
	database.ref('/playerOne').on("value", function(snapshot) {
		youPlayer = snapshot.val().playerOne;
		if (youPlayer != "") {
		$("#playerOneSpace").html(youPlayer + options);
		$(".gameOption").addClass("clickOptions");
		$(".clickOptions").removeClass("gameOption");
		//$("#submitName").hide();
		}
	});
}

function theSecondPlayer() {
	database.ref('/playerTwo').on("value", function(snapshot) {
		youPlayer = snapshot.val().playerTwo;
		if (youPlayer != "") {
		$("#playerTwoSpace").html(youPlayer + options);
		$(".gameOption").addClass("clickOptions");
		$(".clickOptions").removeClass("gameOption");
		//Load the playerOne data into #playerOneSpace, isn't prompted
		//$("#submitName").hide();
		}
	});
}

//Refuse any further clicks if a hand has already been cast
/*
$(document).on("click", ".clickOptions", function(){
	var yourOption = $(this).data("name");
	//set to property depending whether player is One or Two
	firstDealtHand = youPlayer + " dealt " + yourOption + "!";
	database.ref('/playerOne').set({
		playerOne: youPlayer,
		playerOneHand: yourOption,
		playerDeal: firstDealtHand
	});

database.ref('/arena').set({
	firstHand: firstDealtHand
	});

database.ref('/arena').on("value", function(snapshot) {
firstHandStatement = snapshot.val().firstHand;
});

$("#arena").html(firstHandStatement + "<br>");

});
*/

//Get the hands and compare them
//Count number of wins and losses
//Chat box in full row ("colspan=3") beneath players's row