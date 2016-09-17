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
var newConn = "";
var hasOne = false;
var hasTwo = false;
var numConnections = 0;
var playerName = "";
var youPlayer = "";
var theirPlayer = "";
var sndPlayer = "";
var youFirst = false;
var youSecond = false;
var yourName = "";
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
		newConn = con.key;
		console.log(newConn);
		con.onDisconnect().remove();
	};
});

database.ref('/connections').on("value", function(snapshot) {
numConnections = snapshot.numChildren();
});

/*
database.ref('/connections').on("child_added", function(snapshot) {

});
*/

database.ref().on("value", function(snapshot) {
hasOne = snapshot.hasChild("playerOne");
hasTwo = snapshot.hasChild("playerTwo");

if (hasOne == true) {
firstPlayerName = snapshot.val().playerOne.playerOne;
}


if (hasOne == true && $('#playerOneSpace').children().length == 0) {
firstPlayerName = snapshot.val().playerOne.playerOne;
//may have to comment this out if it interferes with the class changes
$("#playerOneSpace").html(firstPlayerName + options);
}
if (hasTwo == true && $('#playerTwoSpace').children().length == 0) {
	sndPlayer = snapshot.val().playerTwo.playerTwo;
	$("#playerTwoSpace").html(sndPlayer + options);
}


	if (hasOne === false && firstPlayerName === "") {
		$("#addPlayer").on("click", function() {
			playerOneName = $("#playerName").val().trim();
			database.ref('/playerOne').set({
				playerOne: playerOneName
			});
			theFirstPlayer();
			return false;
		});
		//removed the numConnections and firstPlayerName conditions
	}
	if (hasOne === true && hasTwo === false) {
		$("#addPlayer").on("click", function() {
			playerTwoName = $("#playerName").val().trim();
		//and if the first name has already been set! --> if playerOne "exists()"
			database.ref('/playerTwo').set({
				playerTwo: playerTwoName
			});
			theSecondPlayer();
			return false;
		});

	}

	});

function theFirstPlayer() {
	youFirst = true;

	database.ref('/playerOne').on("value", function(snapshot) {
		youPlayer = snapshot.val().playerOne;
		if (youPlayer != "") {
		$("#playerOneSpace").html(youPlayer + options);
		$(".gameOption").addClass("clickOptions");
		$(".clickOptions").removeClass("gameOption");
		//$("#submitName").hide();
		}
	});

//adding the opponent, needs to refresh to add the second player
	var sndRef = database.ref('/playerTwo');
	sndRef.once("value", function(snapshot) {
	  var hasTwo = snapshot.child("playerTwo").exists();
	  if (hasTwo == true) {
	  	theirPlayer = snapshot.val().playerTwo;
	  	$("#playerTwoSpace").html(theirPlayer + options);
	  }

	});

}

function theSecondPlayer() {
	youSecond = true;

	database.ref('/playerTwo').on("value", function(snapshot) {
		youPlayer = snapshot.val().playerTwo;
		if (youPlayer != "") {
		$("#playerTwoSpace").html(youPlayer + options);
		$(".gameOption").addClass("clickOptions");
		$(".clickOptions").removeClass("gameOption");
		//$("#submitName").hide();
		}
	});
	database.ref('/playerOne').on("value", function(snapshot) {
		theirPlayer = snapshot.val().playerOne;
		if (theirPlayer != "") {
		$("#playerOneSpace").html(theirPlayer + options);
		}
	});
}

//Refuse any further clicks if a hand has already been cast
/*
$(document).on("click", ".clickOptions", function(){
	var yourOption = $(this).data("name");
	database.ref().on("value", function(snapshot) {
	//set to property depending whether player is youFirst or youSecond
	if (youFirst === true) {
	yourName
	}
	if (youSecond === true) {
	yourName
	}
	});
	deal = youPlayer + " dealt " + yourOption + "!";
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