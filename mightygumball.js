var lastReportTime = 0;

window.onload = execRequest;


//this function send request to the web server
function execRequest() {
    setInterval(handleRefresh, 3000);
}

function handleRefresh() {
	var url = "http://gumball.wickedlysmart.com/?callback=updateSales"+
	"&lastreporttime="+lastReportTime + //exclude duplicates
	"&random="+(new Date()).getTime(); //anti cache

	var newScriptElement = document.createElement("script");
	newScriptElement.setAttribute("src", url);
	newScriptElement.setAttribute("id", "jsonp");

	var oldScriptElement = document.getElementById("jsonp");
	var head = document.getElementsByTagName("head")[0];
	if (oldScriptElement === null) {
		head.appendChild(newScriptElement);
	}
	else {
		head.replaceChild(newScriptElement, oldScriptElement);
	}
}

//call JSONP server's callback
function updateSales(sales) {
	var salesDiv = document.getElementById("sales");

	for (var i = 0; i < sales.length; i++) {
		var sale = sales[i];
		var div = document.createElement("div");
		div.setAttribute("class", "saleItem");
		div.innerHTML = sale.name + " sold " + sale.sales + " gumbaslls";
		salesDiv.appendChild(div);
	}
	
	if (sales.length > 0) {
		lastReportTime = sales[sales.length-1].time;
	}
}