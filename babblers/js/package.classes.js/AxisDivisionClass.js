function AxisDivisionClass(date, initialX, finalX, initialY, finalY) {
	
	this.date = date;
	this.initialX = initialX;
	this.finalX = finalX;
	this.initialY = initialY;	
	this.finalY = finalY;
	
	this.colorNormal = //getColorRandom(messagesList.messages.length);
	this.colorActived = //getColorActived(this.colorNormal);

	this.isInside = function(pX,pY) {
		
		if(pX == this.initialX){
			for(var i = this.initialY ; i <= this.finalY ; i++){
				if(pY == i){
					return true;
				}
			}
		} else {
			return false;
		}
	}

	this.drawAxisDivisions = function(canvas,lineWidth) {
		this.context = canvas.getContext('2d');
		this.context.strokeStyle = "black";
		this.context.lineWidth = lineWidth;
		this.context.moveTo(initialX,initialY);
		this.context.lineTo(finalX,finalY);
		this.context.stroke();
		
	}


	this.reportTime = function(canvas,x,y) {
		this.context = canvas.getContext('2d');
		this.context.strokeStyle = "black";
		this.context.lineWidth = 1;
		var d = this.date;
		var string = "";
		//transforming month 0 to month 12
		if (d.getMonth() == 0) {
			string = d.getDate()+ "/" + "12" + "/" + d.getFullYear();
		} else {
			string = d.getDate()+ "/" + d.getMonth() + "/" + d.getFullYear();
			}
		
		string += " " + d.getHours()+ ":" + d.getMinutes() + ":" + d.getSeconds();
		this.context.font = 'bold 8px verdana';
        this.context.fillText(string, x, y + 25);
	}
}