function BubbleMessageClass(message, messagesList, messagesDiv) {

	this.message = message;

	this.x = message.calculatedTimeMessage;

	this.y = 325;

	this.r = 3;	
	
	this.colorNormal = getColorRandom(messagesList.messages.length);
	this.colorActived = getColorActived(this.colorNormal);

	//calcula tempo médio = x

	var countMessagesTime = 0;

	for (var i = 0; i < messagesList.messages.length; i++) {

		countMessagesTime += messagesList.messages[i].calculatedTimeMessage ; //adiciona tempo ao acumulador de tempo

	}



	this.isInside = function(pX,pY) {

		var dx=pX-this.x;

		var dy=pY-this.y;

		distancia=Math.sqrt(dx*dx + dy*dy);

		return (distancia<=this.r)

	}



	this.reportMessages = function() {

		messagesDiv.innerHTML = "<p>Data da mensagem = " + this.message.date + " " + this.message.time +"</p><ul>";
	    messagesDiv.innerHTML += "<p>Calculated Time = " + this.message.calculatedTimeMessage + "</p><ul>";
	    messagesDiv.innerHTML += "<p>Participante = " + this.message.userName + "</p><ul>";
	    messagesDiv.innerHTML += "<p>Message = " + this.message.content + "</p><ul>";
	    messagesDiv.innerHTML += "</ul>";
	}
}