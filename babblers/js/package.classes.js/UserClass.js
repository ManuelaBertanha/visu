
function UserClass(aName) {
	this.name = aName;
	this.mensagens = new Array();

	this.addMensagem = function(mensagem) {
		this.mensagens.push(mensagem);
	}
}