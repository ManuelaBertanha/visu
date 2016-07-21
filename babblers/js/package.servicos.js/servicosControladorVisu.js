/**
 * @author Rafael
 */

function servicoInit(tweetsDiv, canvas, contextoCanvas) {	
	var x=0;
	var y=0;
    canvas.onmousemove = function(e) {
        x = e.clientX;
        y = e.clientY;
        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;
		if (bChart!==null) {
			bChart.mouseOver(x,y);
		}
     }
	 clockBar = new clockBarClass(15, contextoCanvas);
	 clockBar.init();
	 return clockBar;
}
function serviceFillUsersList(usersList, discussaoTexto, contextoCanvas){
	var discussaoEstruturada = discussaoTexto.split(/\n/);
	
	var ids = new Array();
	var remetentes = new Array();
	var dateMessage = new Array();
	var timeMessage = new Array();
	var conteudoMensagem = new Array();
	var topics = new Array();
	var positions = new Array();
	var addressees = new Array();

	var mensagens = new Array();
	var mensagensDivididas = new Array();		
	var iClock = 1;
	var jClock = 0;
	var messagesList = new MessagesListClass();
	clockBar.start();
	
	for(var i = 1 ; i < discussaoEstruturada.length ; i++){
		
			mensagens.push(discussaoEstruturada[i]);			
			mensagensDivididas = mensagens[i-1].split(/\t/);
			console.log(mensagensDivididas);
			for(var k = 0 ; k < mensagensDivididas.length ; k++){
				if(k == 0){
					ids.push(mensagensDivididas[k]);
				} else if (k == 1){
					remetentes.push(mensagensDivididas[k]);
				} else if (k == 2){
					dateMessage.push(mensagensDivididas[k]);
				} else if (k == 3) {
					timeMessage.push(mensagensDivididas[k]);
				} else if (k == 4) {
					conteudoMensagem.push(mensagensDivididas[k]);
				} else if (k == 5) {
					topics.push(mensagensDivididas[k]);
				} else if (k == 6) {
					positions.push(mensagensDivididas[k]);
				} else if (k == 7) {
					addressees.push(mensagensDivididas[k]);
				}
			}
			
			jClock++;		
		
		if (jClock >= discussaoEstruturada.length/15){
			clockBar.setSliceCompleted(iClock);
			jClock = 0;
			iClock++;
		}		
	}	
	
	for (var l = 0 ; l < remetentes.length ; l++){
		var novaMensagem = new MensagemClass(remetentes[l], conteudoMensagem[l], dateMessage[l], timeMessage[l]);
		//alert(novaMensagem.content);
		usersList.addUserMensagem(novaMensagem);
		messagesList.addMessage(novaMensagem);
	}
	var returnMessagesUsers = new ReturnMessagesUsers(messagesList, usersList);
	clockBar.finished();	
	return returnMessagesUsers;
}

function serviceDrawBabblers(usersList, mensagensDiv, contextoCanvas){
	usersList.sort(); //ordena a lista de usu�rios em fun��o da quantidade de mensagens.
	bChart = new BubbleChartClass(usersList, mensagensDiv, contextoCanvas);

	var elem = document.getElementById('canvas');
	bChart.drawBabblers(elem);
}

function serviceDrawMessagesOverTime(messagesList, mensagensDiv, contextoCanvas){
	serviceCalculateMessageTime(messagesList, mensagensDiv, contextoCanvas);	
	//ver como passar messagesList ou passar mesmo uma usersList.
	bChart = new BubbleChartMessageClass(messagesList, mensagensDiv, contextoCanvas);
	var elem = document.getElementById('canvas');
	bChart.drawMessagesOverTime(elem);
	bChart.drawAxisDivisions(elem, bChart);
}

function serviceCalculateMessageTime(messagesList, mensagensDiv, contextoCanvas){
	
	//setting calculatedTime for the first message, which is 0, because there was o message before it.
	messagesList.messages[0].setCalculatedTimeMessage(0);
	
	var calculatedDateTimeArray = new Array();
	var calculatedTime = 0;
		
	for (var i = 0 ; i < messagesList.messages.length ; i++){
		
		var dateSplit = messagesList.messages[i].date.split("/");
		var timeSplit = messagesList.messages[i].time.split(":");
		var d=new Date(dateSplit[2], dateSplit[1], dateSplit[0], timeSplit[0], timeSplit[1], timeSplit[2]);
		messagesList.messages[i].setCalculatedTimeMessage(d.getTime());
	}
	//to-do: código para gerar tempo calculado para gráfico de mensagens no tempo
}