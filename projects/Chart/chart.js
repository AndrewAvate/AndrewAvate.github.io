window.onload = init;

// Values for the Data Plot, they can also be obtained from a external file (x, y)
var canvas;
var ctx;
var width;
var height;
var scale_X = 20;
var scale_Y = 100;

function init()
{
	//setInterval(draw, 1000);
	draw();
}

function draw() {
	canvas = document.getElementById("chart");
	width = canvas.width;
	height = canvas.height;
	ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, width, height);
	ctx.lineWidth=3;
	ctx.strokeStyle="#000000";
	drawCoords(canvas, ctx);

	ctx.strokeStyle="#9933FF";
	var sin = getSin();
	var chart = normolizeData(sin);
	chart = bendGraphics(chart);
	drawGraphics2(chart);
}

function bendGraphics(chart) {
	var step = 35;
	var accurancy = 5;
	var result = [];	
	var prevX = chart[0][0];
	var prevY = chart[0][1];

	result[0] = [prevX, prevY];

	for(var i = 1; i < chart.length; i++) {
		var dx = chart[i][0] - prevX;
        var dy = chart[i][1] - prevY;
		var d = Math.sqrt(dx*dx+dy*dy);

		if (d>step) {			
			prevX = chart[i][0];
			prevY = chart[i][1];
			var randX = Math.floor(Math.random()*10)%2;
			var randY = Math.floor(Math.random()*10)%2;
			var x;
			var y;
			if(randX == 0) {
				x = chart[i][0] + Math.random()*accurancy;
			}	else {
				x = chart[i][0] - Math.random()*accurancy;
			}
			
			if(randY == 0) {
				y = chart[i][1] + Math.random()*accurancy;
			}	else {
				y = chart[i][1] - Math.random()*accurancy;
			}

			result.push([x, y]); //put X and Y
		}
	}
	return result;
}

function getSin() {
	var sin =[];
	for(var i = -20; i < 20; i=i+0.1) {
		sin[sin.length] = [i, Math.sin(i)]; //put X and Y
	}
	return sin;
}

//рисуем оси X и Y
function drawCoords() {  
    
	//Y-coord	
    ctx.beginPath();
    ctx.moveTo(width/2, 0+10);
    ctx.lineTo(width/2, height-10);
    ctx.stroke();

    //X-Coord
    ctx.beginPath();
    ctx.moveTo(0+10, height/2);
    ctx.lineTo(width-10, height/2);
    ctx.stroke();
}

//приводит координты по которым сторится график в соответсвие с 
//абсолютными коодрдина осей.
function normolizeData(dataSet) {
	var normalizedPlot = [];
	for (i=0;i<dataSet.length;i++) {
		normalizedPlot[i] = [width/2+scale_X*dataSet[i][0], height/2-scale_Y*dataSet[i][1]];//(X, Y)
	}
	return normalizedPlot;
}



//отрисовка ломанного графика
function drawGraphics(dataSet) {
	ctx.beginPath();
	ctx.moveTo(dataSet[0][0], dataSet[0][1]);
	for (i=1;i<dataSet.length;i++) {
		ctx.lineTo(dataSet[i][0], dataSet[i][1]);
	}
	ctx.stroke();
}


//отрисовка плавного графика
function drawGraphics2(dataSet) {
	ctx.beginPath();
    ctx.moveTo(dataSet[0][0], dataSet[0][1]);

    for(var i = 1; i < dataSet.length - 2; i++){
        var xc = (dataSet[i][0] + dataSet[i+1][0]) / 2;
        var yc = (dataSet[i][1] + dataSet[i+1][1]) / 2;
        ctx.quadraticCurveTo(dataSet[i][0], dataSet[i][1], xc, yc);
    }
	
    ctx.quadraticCurveTo(dataSet[i][0], dataSet[i][1], dataSet[i+1][0], dataSet[i+1][1]);
    ctx.stroke();
}
