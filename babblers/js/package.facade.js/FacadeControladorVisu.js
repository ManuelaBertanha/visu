/**
 * @author Rafael
 * @descrição: Este arquivo .js é o façade das visualizações do Visu.
 */

function facadeAcaoIniciar(mensagensDiv, canvas, contextoCanvas){
	
	var retornoInicializacao;
	retornoInicializacao = servicoInit(mensagensDiv, canvas, contextoCanvas);	
	return retornoInicializacao;
}

function facadeAcaoVisualizar(usersList, discussaoTexto, canvas, contextoCanvas, mensagensDiv){
	contextoCanvas.clearRect (0, 0 , 400, 200 );	
	var messagesList = new MessagesListClass();
	usersList = new UsersListClass();
	var returnMessagesUsers = new ReturnMessagesUsers(messagesList,usersList);		
	returnMessagesUsers = serviceFillUsersList(usersList, discussaoTexto, contextoCanvas);
	serviceDrawBabblers(returnMessagesUsers.usersList, mensagensDiv, contextoCanvas);
}

function facadeActionVisualizeMessagesOverTime(usersList, discussaoTexto, canvas, contextoCanvas, mensagensDiv){
	contextoCanvas.clearRect (0, 0 , 600, 400 );	
	var messagesList = new MessagesListClass();
	usersList = new UsersListClass();
	var returnMessagesUsers = new ReturnMessagesUsers(messagesList,usersList);
	returnMessagesUsers = serviceFillUsersList(usersList, discussaoTexto, contextoCanvas);
	serviceDrawMessagesOverTime(returnMessagesUsers.messagesList, mensagensDiv, contextoCanvas);
}