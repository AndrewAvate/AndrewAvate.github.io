window.onload = executor;

//init script
function executor() {
	var button = document.getElementById("previewButton");
	button.onclick = previewHandler;
	makeImage();
}

//submit handler
function previewHandler() {
	var canvas = document.getElementById("tshirtCanvas");
	var context = canvas.getContext("2d");

    //clear canvas
    fillBackgroundColor(canvas, context);

	var selectObj = document.getElementById("shape");
	var index = selectObj.selectedIndex;
	var shape = selectObj[index].value;

	if (shape == "squares") {
		for (var squares = 0; squares < 20; squares++) {
			drawSquare(canvas, context);
		}
	} else if (shape == "circles") {
		for (var circles = 0; circles < 20; circles++) {
			drawCircle(canvas, context);
		}
	}
	drawBird(canvas, context);
	drawText(canvas, context);
}

function drawCircle(canvas, context) {
	var radius = Math.floor(Math.random() * 40);
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	context.beginPath();
	context.fillStyle = "lightblue";
	//context.fillStyle = "red";
	context.arc(x, y, radius, 0, 2 * Math.PI, true);
	context.fill();
}

//draw square on the canvas
function drawSquare (canvas, context) {
	var width = Math.floor(Math.random() * 40);
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	context.fillStyle = "lightblue";
	//context.fillStyle = "red";
	context.fillRect(x, y, width, width);
}

//clear canvas, it fills background by background color :)
function fillBackgroundColor(canvas, context) {
	var selectObj = document.getElementById("backgroundColor");
	var index = selectObj.selectedIndex;
	var bgColor = selectObj.options[index].value;
	context.fillStyle = bgColor;
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawText(canvas, context) {
	var selectObj = document.getElementById("foregroundColor");
	var index = selectObj.selectedIndex;
	var fgColor = selectObj[index].value;
	context.fillStyle = fgColor;
	context.font = "bold 1em sans-serif";
	context.textAlign = "left";
	context.fillText("Я повелся на этот твит...", 20, 40);

	var tweetObj = document.getElementById("tweets");
	var tweetIdx = tweetObj.selectedIndex;
	var tweetText = tweetObj.options[tweetIdx].value;

	context.fillText(tweetText, canvas.width-420, canvas.height-100);

    context.font = "bold 1em sans-serif";
	context.textAlign = "right";
	context.fillText("...а в результате получил эту паршивую майку!", canvas.width-20, canvas.height-40);
}

function drawBird(canvas, context) {
	var twitterBird = new Image();
	twitterBird.src = "twitterBird.png";
	twitterBird.onload = function() {
		context.drawImage(twitterBird, 20, 120, 70, 70);
	};
}

function makeImage() {
	var canvas = document.getElementById("tshirtCanvas");
	canvas.onclick = function() {
		window.location = canvas.toDataURL("image/png");
	};
}