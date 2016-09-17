$(document).ready(function() {
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
var chat = database.ref("/chat");
var newConn = "";
var key = "";
var playerName = "";
var youPlayer = "";
var theirPlayer = "";
var sndPlayer = "";
var yourName = "";
var yourDeal = "";
var yourOption = "";
var firstDeal = "";
var firstOption = "";
var theirDeal = "";
var theirOption = "";
var thisSpeaker = "";

var options = "<br><div class=\"gameOption\" data-name=\"Rock\">Rock</div><br><div class=\"gameOption\" data-name=\"Paper\">Paper</div><br><div class=\"gameOption\" data-name=\"Scissors\">Scissors</div><br><div class=\"gameOption\" data-name=\"Lizard\">Lizard</div><br><div class=\"gameOption\" data-name=\"Spock\">Spock</div>";

$("#restart").hide();

connectedRef.on("value", function(snap) {
	if( snap.val() ) {
		var con = connectionsRef.push({
			playerName: ""
		});
		newConn = con.key;
		con.onDisconnect().remove();
	};
});

database.ref('/connections').orderByChild('playerName').on("value", function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
		key = childSnapshot.key;
		if (key != newConn) {
			sndPlayer = key;
		}
	});

});

$("#addPlayer").on("click", function() {
	playerName = $("#playerName").val().trim();
	database.ref('connections/'+newConn).set({
	playerName: playerName
	});
	readyToPlay();
	return false;
});

function readyToPlay() {

	database.ref('connections/'+newConn).on("value", function(snapshot) {
		youPlayer = snapshot.val().playerName;
		if (youPlayer != "") {
		$("#playerOneName").html(youPlayer);
		$("#playerOneSpace").html(options);
		$(".gameOption").addClass("clickOptions");
		$(".clickOptions").removeClass("gameOption");
		$("#submitName").hide();
		}
	});

	database.ref('connections/'+sndPlayer).on("value", function(snapshot) {
		theirPlayer = snapshot.val().playerName;
		if (theirPlayer != "") {
		$("#playerTwoName").html(theirPlayer);
		}
	});

}

$(document).on("click", ".clickOptions", function(){
	yourOption = $(this).data("name");
	yourDeal = youPlayer + " dealt " + yourOption + "!";
	database.ref('connections/'+newConn).set({
		playerName: youPlayer,
		playerHand: yourOption,
		playerDeal: yourDeal
	});
	$(".clickOptions").removeClass("clickOptions");

	database.ref('connections/'+newConn).on("value", function(snapshot) {
		firstDeal = snapshot.val().playerDeal;
		firstOption = snapshot.val().playerHand;
	});
	database.ref('connections/'+sndPlayer).on("value", function(snapshot) {
		theirDeal = snapshot.val().playerDeal;
		theirOption = snapshot.val().playerHand;
	});

	database.ref('connections/').on("value", function(snapshot) {
		if (firstDeal != "" && theirDeal != "") {
			$("#yourDealSpace").html(firstDeal);
			$("#theirDealSpace").html(theirDeal);

		}
		if (firstOption == theirOption) {
			$("#outcome").html("It's a tie!");
			$("#restart").show();
		} else if (firstOption === "Rock" && theirOption === "Paper") {
			$("#outcome").html("Paper wraps rock<br>You lose!");
			$("#restart").show();
		} else if (firstOption === "Rock" && theirOption === "Scissors") {
			$("#outcome").html("Rock crushes scissors<br>You win!");
			$("#restart").show();
		} else if (firstOption === "Paper" && theirOption === "Rock") {
			$("#outcome").html("Paper wraps rock<br>You win!");
			$("#restart").show();
		} else if (firstOption === "Paper" && theirOption === "Scissors") {
			$("#outcome").html("Scissors cuts paper<br>You lose!");
			$("#restart").show();
		} else if (firstOption === "Scissors" && theirOption === "Rock") {
			$("#outcome").html("Rock crushes scissors<br>You lose!");
			$("#restart").show();
		} else if (firstOption === "Scissors" && theirOption === "Paper") {
			$("#outcome").html("Scissors cuts paper<br>You win!");
			$("#restart").show();
		} else if (firstOption === "Spock" && theirOption === "Paper") {
			$("#outcome").html("Paper disproves Spock<br>You lose!");
			$("#restart").show();
		} else if (firstOption === "Spock" && theirOption === "Rock") {
			$("#outcome").html("Spock vaporizes rock<br>You win!");
			$("#restart").show();
		} else if (firstOption === "Spock" && theirOption === "Lizard") {
			$("#outcome").html("Lizard poisons Spock<br>You lose!");
			$("#restart").show();
		} else if (firstOption === "Spock" && theirOption === "Scissors") {
			$("#outcome").html("Spock smashes scissors<br>You win!");
			$("#restart").show();
		} else if (firstOption === "Scissors" && theirOption === "Spock") {
			$("#outcome").html("Spock smashes scissors<br>You lose!");
			$("#restart").show();
		} else if (firstOption === "Scissors" && theirOption === "Lizard") {
			$("#outcome").html("Scissors decapitates lizard<br>You win!");
			$("#restart").show();
		} else if (firstOption === "Rock" && theirOption === "Spock") {
			$("#outcome").html("Spock vaporizes rock<br>You lose!");
			$("#restart").show();
		} else if (firstOption === "Rock" && theirOption === "Lizard") {
			$("#outcome").html("Rock smashes lizard<br>You win!");
			$("#restart").show();
		} else if (firstOption === "Lizard" && theirOption === "Paper") {
			$("#outcome").html("Lizard eats paper<br>You win!");
			$("#restart").show();
		} else if (firstOption === "Lizard" && theirOption === "Rock") {
			$("#outcome").html("Rock smashes lizard<br>You lose!");
			$("#restart").show();
		} else if (firstOption === "Lizard" && theirOption === "Spock") {
			$("#outcome").html("Lizard poisons Spock<br>You win!");
			$("#restart").show();
		} else if (firstOption === "Lizard" && theirOption === "Scissors") {
			$("#outcome").html("Scissors decapitates lizard<br>You lose!");
			$("#restart").show();
		} else if (firstOption === "Paper" && theirOption === "Spock") {
			$("#outcome").html("Paper disproves Spock<br>You win!");
			$("#restart").show();
		} else if (firstOption === "Paper" && theirOption === "Lizard") {
			$("#outcome").html("Lizard eats paper<br>You lose!");
			$("#restart").show();
		}
			
			$("#restart").on("click", function(){
				location.reload();
			});
	});

	return false;
});

$("#chatButton").on("click", function(){
	var chatText = $("#saySomething").val().trim();
	var speaker = "";

	if (youPlayer != "") {
		speaker = youPlayer;
	} else {
		speaker = "Player: ";
	}
	chat.push({
		connection: newConn,
		timeStamp: firebase.database.ServerValue.TIMESTAMP,
		speaker: speaker,
		lineText: chatText
	});
	return false;
});

chat.on("child_added", function(childSnapshot){
	var textSpeaker = childSnapshot.val().speaker;
	var currConn = childSnapshot.val().connection;
	if (textSpeaker == "Player: " && currConn === newConn) {
		thisSpeaker = "You: ";
	} else if (textSpeaker == "Player: " && currConn != newConn) {
		thisSpeaker = "Them: ";
	} else {
		thisSpeaker = textSpeaker + ": ";
	}
	var date = Date(parseInt(childSnapshot.val().timestamp));
	var dateToString = date.toString();
	var time = dateToString.slice(16,25);
	var textData = childSnapshot.val().lineText;
	var newLine = $("<p>");
	newLine.html(time + "<br>" + thisSpeaker + textData);
	$("#chatSpace").prepend(newLine);
});

$("#chatClear").on("click", function(){
	chat.remove();
	$("#chatSpace").html("");
	return false;
});

});