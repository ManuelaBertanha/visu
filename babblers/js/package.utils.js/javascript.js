/**
 * @author Rafael
 * @descrição: Este arquivo contém as principais funções javascript do projeto.
 */


function progressBarDraw(percentage, contextoCanvas) {
	//representar bolha ativada	
	contextoCanvas.lineWidth   = 1;
	contextoCanvas.fillStyle = '#EEEEEE';
	contextoCanvas.fillRect(5, 5, 5+100, 10);
	contextoCanvas.fillStyle = '#4040AA';
	contextoCanvas.fillRect(5, 5, 5+Math.round(100*percentage), 10);
	if (percentage>=1) {
		contextoCanvas.fillStyle = '#FFFFFF';
		contextoCanvas.fillRect(5, 5, 5+Math.round(100*percentage), 10);
	}
}

function inicializaPulseColor(){
	var pulseColor = new Array();
	var kColors=10; //quantidade de cores para a pulsa��o
	for (var i=0; i<kColors; i++) {
		var colorRed = 40*i/kColors;
		var colorGreen = 40*i/kColors;
		var colorBlue = 20*i/kColors;
		pulseColor.push( "#" + Math.floor(255-colorRed).toString(16) + Math.floor(255-colorGreen).toString(16) + Math.floor(255-colorBlue).toString(16) );
	}
	for (var i=kColors; i>0; i--) {
		var colorRed = 100*i/kColors;
		var colorGreen = 100*i/kColors;
		var colorBlue = 50*i/kColors;
		pulseColor.push( "#" + Math.floor(255-colorRed).toString(16) + Math.floor(255-colorGreen).toString(16) + Math.floor(255-colorBlue).toString(16) );
	}
	return pulseColor;
}

// Colora��o 
var maxColorDeep = 100;
function returnHex(num) {
  if (num == null) return "00";
  num = num.toString(16);
  num = num.length < 2 ? "0" + num : num;
  return num;
}       
function getColorRandom(deep) {
	var dGray = 100; //Para deixar as cores todas meio acinzentadas, defino o limite m�ximo de varia��o entre R,G,B

	var red = 85+Math.floor(Math.random()*dGray);
	var green = 85+Math.floor(Math.random()*dGray);
	var blue = 85+Math.floor(Math.random()*dGray);

	// deixar a figura mais clara quanto menor o deep
	red = 245-Math.floor(Math.pow((deep/maxColorDeep),0.2)*(255-red));
	green = 245-Math.floor(Math.pow((deep/maxColorDeep),0.2)*(255-green));
	blue = 245-Math.floor(Math.pow((deep/maxColorDeep),0.2)*(255-blue));

	//deixar as cores mais claras quanto menor for a profundidade da cor.

	return("#"+	returnHex(red)  + returnHex(green) + returnHex(blue) )
}
function getColorActived(aColor) {
	var colorRed = aColor.substr(1,2);
	var colorGreen = aColor.substr(3,2);
	var colorBlue = aColor.substr(5,2);
	return ("#" + returnHex(""+(Math.floor(parseInt(colorRed,16)*0.5)).toString(16)) + returnHex(""+(Math.floor(parseInt(colorGreen,16)*0.5)).toString(16)) + returnHex(""+(Math.floor(parseInt(colorBlue,16)*0.5)).toString(16)));
}

function comparaUserQtdMensagens(a, b){
	return (b.mensagens.length - a.mensagens.length);
}

var mensagemSelected;

function mensagensToHTML (mensagem) {
	mensagemSelected.getHTML();
}


function drawBubbles(i,r) {
	bChart.drawI(i,r);
}

function clockBarPulse() {
	 clockBar.pulse();
}