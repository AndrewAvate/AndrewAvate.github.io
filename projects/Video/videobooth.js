var videos = {video1: "http://r3---sn-q4fl6n76.googlevideo.com/videoplayback?key=yt6&mime=video%2Fmp4&expire=1449357219&itag=18&sver=3&lmt=1428946616276169&ipbits=0&source=youtube&ratebypass=yes&pl=40&initcwndbps=1173750&dur=7105.259&nh=IgpwcjA1LmRmdzA2KgkxMjcuMC4wLjE&id=o-AEloCvm3w6csEUmsTjS7QFKh_uB0VReJeWxVhzDWcU09&fexp=9407610%2C9408710%2C9416126%2C9417683%2C9419451%2C9420452%2C9420716%2C9421932%2C9422428%2C9422596%2C9422618%2C9422918%2C9423639%2C9423662%2C9423714%2C9424082%2C9424372%2C9424630&sparams=dur%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cnh%2Cpl%2Cratebypass%2Csource%2Cupn%2Cexpire&ip=2a03%3A8180%3A1001%3A16a%3A%3A8ee1&signature=5B720312AD918025A143C84BFCFF97513BC79D49.1B222FF49331E64656233A5E960844D766AA7C20&ms=au&mv=m&mt=1449335531&upn=3gO8PgwYL8Y&mn=sn-q4fl6n76&mm=31&title=Home+Дом+Свидание+с+планетой.mp4"
			  ,video2: "http://r3---sn-q4fl6n76.googlevideo.com/videoplayback?key=yt6&mime=video%2Fmp4&expire=1449357219&itag=18&sver=3&lmt=1428946616276169&ipbits=0&source=youtube&ratebypass=yes&pl=40&initcwndbps=1173750&dur=7105.259&nh=IgpwcjA1LmRmdzA2KgkxMjcuMC4wLjE&id=o-AEloCvm3w6csEUmsTjS7QFKh_uB0VReJeWxVhzDWcU09&fexp=9407610%2C9408710%2C9416126%2C9417683%2C9419451%2C9420452%2C9420716%2C9421932%2C9422428%2C9422596%2C9422618%2C9422918%2C9423639%2C9423662%2C9423714%2C9424082%2C9424372%2C9424630&sparams=dur%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cnh%2Cpl%2Cratebypass%2Csource%2Cupn%2Cexpire&ip=2a03%3A8180%3A1001%3A16a%3A%3A8ee1&signature=5B720312AD918025A143C84BFCFF97513BC79D49.1B222FF49331E64656233A5E960844D766AA7C20&ms=au&mv=m&mt=1449335531&upn=3gO8PgwYL8Y&mn=sn-q4fl6n76&mm=31&title=Home+Дом+Свидание+с+планетой.mp4"};
var effectFunction = null;

window.onload = function() {
	var video = document.getElementById("video");
	video.src = videos.video1 + getFormatExtension();
	video.load();

	var controlLinks = document.querySelectorAll("a.control");
	for (var i = 0; i < controlLinks.length; i++) {
		controlLinks[i].onclick = handleControl;
	}
	var effectLinks = document.querySelectorAll("a.effect");
		for (var k = 0; k < effectLinks.length; k++) {
			effectLinks[k].onclick = setEffect;
		}

	var videoLinks = document.querySelectorAll("a.videoSelection");
	for (var j = 0; j < videoLinks.length; j++) {
		videoLinks[j].onclick = setVideo;
	}

	pushUnpushButtons("video1", []);
	pushUnpushButtons("normal", []);
	video.addEventListener("ended", endedHandler, false);
	video.addEventListener("play", processFrame, false);
};


function handleControl(e) {
	var id = e.target.getAttribute("id");
	var video = document.getElementById("video");

	if (id == "play") {
		pushUnpushButtons("play", ["pause"]);
		if (video.ended) {
			video.load(); 
		}
		video.play() ;
	} else if (id == "pause") {
		pushUnpushButtons("pause", ["play"]);
		video.pause();
	} else if (id == "loop") {
		
		if(isButtonPushed("loop")) {
			pushUnpushButtons("", ["loop"]);
		} else {
			pushUnpushButtons("loop", []);
		}
		video.loop = !video.loop;

	} else if(id == "mute") {
		if(isButtonPushed("mute")) {
			pushUnpushButtons("", ["mute"]);
		} else {
			pushUnpushButtons("mute", []);
		}
		video.muted = !video.muted;
	}
}


function setEffect(e) {
	var id = e.target.getAttribute("id");

	if (id == "normal") {
		pushUnpushButtons("normal", ["western", "noir", "scifi"]);
		effectFunction = null;
	} else if (id == "western") {
		pushUnpushButtons("western", ["normal", "noir", "scifi"]);
		effectFunction = western;
	} else if (id == "noir") {
		pushUnpushButtons("noir", ["western", "normal", "scifi"]);
		effectFunction = noir;
	} else if (id == "scifi") {
		pushUnpushButtons("scifi", ["normal", "noir", "western"]);
		effectFunction = scifi;
	}
}

function setVideo(e) {
	var id = e.target.getAttribute("id");
	var video = document.getElementById("video");

	if (id == "video1") {
		pushUnpushButtons("video1", ["video2"]);
	} else if (id == "video2") {
		pushUnpushButtons("video2", ["video1"]);
	}

	video.src = videos[id] + getFormatExtension();
	video.load();
	video.play();

	pushUnpushButtons("play", ["pause"]);
}

function pushUnpushButtons(idToPush, idArrayToUnpush) {
	if(idToPush != "") {
		var anchor = document.getElementById(idToPush);
		var theClass = anchor.getAttribute("class");
		if(!theClass.indexOf("selected") >= 0) {
			theClass = theClass + " selected";
			anchor.setAttribute("class", theClass);
			var newImage = "url(images/"+idToPush+"pressed.png)"
			anchor.style.backgroundImage = newImage;
		}
	}
	for (var i = 0; i < idArrayToUnpush.length; i++) {
		anchor = document.getElementById(idArrayToUnpush[i])
		theClass = anchor.getAttribute("class");idArrayToUnpush;
		if(theClass.indexOf("selected") >= 0) {
			theClass = theClass.replace("selected", "");
			anchor.setAttribute("class", theClass);
			anchor.style.backgroundImage = "";
		}
	};
}

function isButtonPushed(id) {
	var anchor = document.getElementById(id);
	var theClass = anchor.getAttribute("class");
	return (theClass.indexOf("selected") >= 0);
}

function getFormatExtension() {
	var video = document.getElementById("video");

	if(video.canPlayType("video/ogg") !== "") {
		return ".ogv";
	} else if(video.canPlayType("video/mp4") !== "") {
		return ".mp4";
	} else if(video.canPlayType("video/webm") !== "") {
		return ".webm";
	}
}

function endedHandler() {
	pushUnpushButtons("", ["play"]);
}

function processFrame() {
	var video = document.getElementById("video");
	if(video.paused || video.ended) {
		return;
	}
	var bufferCanvas = document.getElementById("buffer");
	var displayCanvas = document.getElementById("display");
	var buffer = bufferCanvas.getContext("2d");
	var display = displayCanvas.getContext("2d");

	buffer.drawImage(video, 0, 0, bufferCanvas.width, bufferCanvas.height);
	var frame = buffer.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);

	var length = frame.data.length/4;

	for(var i = 0; i < length; i++) {
		var r = frame.data[i * 4 + 0];
		var g = frame.data[i * 4 + 1];
		var b = frame.data[i * 4 + 2];
		if(effectFunction) {
			effectFunction(i, r, g, b, frame.data);
		}
	}

	display.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
	display.putImageData(frame, 0, 0);
	setTimeout(processFrame, 0);
}

function noir(pos, r, g, b, data) {
	var brightness = (3*r + 4*g + b) >>> 3;
	if(brightness < 0) brightness = 0;
	data[pos * 4 + 0] = brightness;
	data[pos * 4 + 1] = brightness;
	data[pos * 4 + 2] = brightness; 
}

function western(pos, r, g, b, data) {
	var brightness = (3*r + 4*g + b) >>> 3;
	data[pos * 4 + 0] = brightness+40;
	data[pos * 4 + 1] = brightness+20;
	data[pos * 4 + 2] = brightness-20; 	
}

function scifi(pos, r, g, b, data) {
	data[pos * 4 + 0] = 255-r;
	data[pos * 4 + 1] = 255-g;
	data[pos * 4 + 2] = 255-b; 	
}

function bwcartoon(pos, r, g, b, data) {
	if(data[pos * 4] < 120) {
		data[pos * 4 + 0] = 80;
		data[pos * 4 + 1] = 80;
		data[pos * 4 + 2] = 80; 
	} else {
		data[pos * 4 + 0] = 255;
		data[pos * 4 + 1] = 255;
		data[pos * 4 + 2] = 255; 
	}
	data[pos * 4 + 3] = 0; 
}