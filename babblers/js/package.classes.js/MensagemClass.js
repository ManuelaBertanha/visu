function MensagemClass(aUserName, aContent, dateMessage, timeMessage){	
	this.userName = aUserName;
	this.content = aContent;
	this.date = dateMessage;
	this.time = timeMessage;
	this.calculatedTimeMessage = 0;	

	this.toHTML = function() {
		return "<li style='background-color:#ffffff; '><strong>"+this.userName+"</strong>: "+this.content+" <span class='time'>("+this.date.toLocaleString() +" GMT)</span> </li>";
	}
	this.setCalculatedTimeMessage = function(calculatedTime) {
		this.calculatedTimeMessage = calculatedTime;
	}
}