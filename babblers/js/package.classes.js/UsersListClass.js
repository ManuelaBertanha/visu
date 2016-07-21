function UsersListClass() {
	this.users = new Array();

	this.addUserMensagem = function(mensagem) {
		var userFound = false;
		var userName = mensagem.userName;		
		var i = 0;
		for (i; (!userFound) && (i<this.users.length); i++) {
			userFound = (this.users[i].name==userName);
		}
		if (userFound)	{
			i--;
			this.users[i].addMensagem(mensagem);
		} else {
			var aUser = new UserClass(mensagem.userName);
			aUser.addMensagem(mensagem);
			this.users.push(aUser);
		}		
	}

	this.sort = function() {
		this.users.sort(comparaUserQtdMensagens);
	}

}
