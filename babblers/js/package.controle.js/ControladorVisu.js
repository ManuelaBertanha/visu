/**
 * @author Rafael
 * @descrição: Este arquivo .js é o controlador das visualizações do Visu.
 */

var bChart = null;

function acaoIniciar(){
	var messagesDiv = document.getElementById("messagesList");
	var canvas = document.getElementById('canvas');	
	var canvasContext = canvas.getContext("2d");
	var clockBar = facadeAcaoIniciar(messagesDiv, canvas, canvasContext);

	acaoVisualizeBabblers();
}

function acaoVisualizeBabblers(){	
	var canvas = document.getElementById('canvas');	
	var messagesDiv = document.getElementById("messagesList");
	var canvasContext = canvas.getContext('2d');		
	var textDiscussion = localStorage.getItem('storedDiscussion');

	var usersList;
	canvasContext.clearRect (0, 0 , 400, 200 );
	facadeAcaoVisualizar(usersList, textDiscussion, canvas, canvasContext, messagesDiv);
}

function acaoVisualizeMessagesOverTime(){	
	var canvas = document.getElementById('canvas');	
	var messagesDiv = document.getElementById("messagesList");
	var canvasContext = canvas.getContext('2d');		
	var textDiscussion = document.getElementById("textDiscussion").value;
	var usersList;

	canvasContext.clearRect (0, 0 , 600, 400 );
	facadeActionVisualizeMessagesOverTime(usersList, textDiscussion, canvas, canvasContext, messagesDiv);
}