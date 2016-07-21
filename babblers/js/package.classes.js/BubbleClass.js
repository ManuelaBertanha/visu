/**
 * @author Rafael
 * @descrição: Este arquivo representa a classe Bubble.
 */

function Bubble(aUser, userIndex, mensagensDiv) {
	this.user=aUser;
	this.userIndex = userIndex; //ser� usado apenas para depura��o
	this.colorNormal = getColorRandom(aUser.mensagens.length);
	this.colorActived = getColorActived(this.colorNormal);
	this.x = 0;
	this.y = 0;
	this.r = 3*Math.sqrt(aUser.mensagens.length); // �rea do c�rculo (PI*R^2) deve ser proporcional � quantidade de mensagens

	this.isInside = function(pX,pY) {
		var dx=pX-this.x;
		var dy=pY-this.y;
		distancia=Math.sqrt(dx*dx + dy*dy);
		return (distancia<=this.r)
	}

	this.reportMensagens = function() {
		mensagemSelected = this;
	    mensagensDiv.innerHTML = "<p>Participante = " + this.user.name + ", Mensagens enviadas = " + this.user.mensagens.length + "<br>Aguarde... carregando mensagens</p>";
		window.setTimeout('mensagensToHTML()', 100); //� preciso terminar essa fun��o para avisar que o relat�rio ser� plotado para s� depois iniciar a listagem de mensagens, pois � demorada
	}

	this.getHTML = function() {
	    mensagensDiv.innerHTML = "<p>Participante = nº" + this.userIndex + ", " + this.user.name + ", Mensagens enviadas = " + this.user.mensagens.length + "</p><ul>";
		for (var i=0; i<this.user.mensagens.length; i++) {
		    mensagensDiv.innerHTML += aUser.mensagens[i].toHTML();
		}
	    mensagensDiv.innerHTML += "</ul>";
	}
}