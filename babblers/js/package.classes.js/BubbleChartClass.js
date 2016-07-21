function BubbleChartClass(aUsersList, mensagensDiv, contextoCanvas) {
	this.bubblesList = new Array();
	this.bubbleOver=null; //bolha ativada

	maxColorDeep = aUsersList.users[0].mensagens.length; //valor da colora��o com m�xima intensidade
	for (var iUser = 0; iUser<aUsersList.users.length; iUser++) {
		var user = aUsersList.users[iUser];
		var bubble = new Bubble(user, iUser, mensagensDiv);
		this.bubblesList.push(bubble);
	}	
    mensagensDiv.innerHTML = "<p>" + aUsersList.users.length + " participantes</br>";    

	this.drawI = function(i, rMaximo) {
		//distribui as bolhas ao redor do ponto central
		// coloco a nova bolha o mais distante poss�vel, e vou aproximando at� esbarrar com alguma. Ao esbarrar, pare, chegou no limite.
		var iBubble = this.bubblesList[i];
		if (i>0){
			var angle = 10*Math.random();	 //sorteia angulo inicial para come�ar o posicionamento da dire��o da bolha. 
			// tenta posicionar a bolha em cada 1 das fatias do espa�o circular. A bolha deve permanecer na posi��o que for mais perto do centro.
			for (var degree=0; degree<360; degree = degree + 10) {
				var alfa=(degree + angle)*(Math.PI/180); // convert degrees to radians
				var dist = (rMaximo + 2*iBubble.r + 2); // 2 pixel  � uma margem para a bolha n�o ficar grudada com a central
				var iX = dist*Math.cos(alfa); // posi��o x m�xima da bolha
				var iY = dist*Math.sin(alfa); // posi��o y m�xima da bolha
				var dx = 2*Math.cos(alfa); //passo dx para a aproxima��o do centro
				var dy = 2*Math.sin(alfa); //passo dy para o aproxima��o do centro

				var intersecao = false; // a bolha i tem que se aproximar do centro at� tocar na primeira bolha mais superficial
				while (!intersecao) {
					// diminui um passo da bolha e veja se colide com alguma
					iX = iX - dx;
					iY = iY - dy;
					var j = i-1;
					while ((j>=0) &&  (!intersecao)) { 
						var jBubble = this.bubblesList[j];
						var distBubbles = Math.sqrt(  ((jBubble.x - iX)*(jBubble.x - iX)) + ((jBubble.y - iY)*(jBubble.y - iY)) );	
						intersecao = ( (distBubbles - 2) <= (jBubble.r + iBubble.r) ); //2 pixels de margem para afastar um pouco
						if (intersecao) { //retorna para a posi��o anterior em que ainda n�o havia esbarrado com a bolha j
							iX = iX + dx;
							iY = iY + dy;
						}
						j--;
					}
				}
				// verificar se a dist�ncia ao centro � menor do que a dist�ncia da bolha atual
				if (degree==0) { //a bolha ainda n�o foi posicionada
					iBubble.x = iX;
					iBubble.y = iY;
				} else {
					var bubbleDistanceAtual = Math.sqrt( (iBubble.x*iBubble.x) + (iBubble.y*iBubble.y) );
					var distanceAuxiliar = Math.sqrt( (iX*iX) + (iY*iY) );
					if (distanceAuxiliar < bubbleDistanceAtual) { // se a dist�ncia da bolha for menor do que a dist�ncia nessa fatia angular, reposiciono a bolha nessa fatia
						this.bubblesList[i].x = iX;
						this.bubblesList[i].y = iY;
					}
				} 
				//verificar se com a nova bolha o raio m�ximo aumentou
				rMaximoAuxiliar = iBubble.r + Math.sqrt( (iBubble.x*iBubble.x) + (iBubble.y*iBubble.y) );
				if (rMaximoAuxiliar>rMaximo) {
					rMaximo = rMaximoAuxiliar;
				}
			} // fim do la�o degre
			progressBarDraw((i+1)/this.bubblesList.length, contextoCanvas);
		}

		this.context.beginPath();
		this.context.strokeStyle = iBubble.colorNormal;
		this.context.fillStyle = iBubble.colorNormal;
		this.context.arc(Math.round(iBubble.x) + 150, Math.round(iBubble.y) + 200,iBubble.r,0,Math.PI*2,true); //reposicionar o x e y das bolhas para coloc�-las no centro do canvas
		this.context.closePath();
		this.context.stroke();
		this.context.fill();

		i++;
		if(i<this.bubblesList.length) {
			setTimeout( "bChart.drawI("+i+"," + rMaximo + ")", 10);
		}
	}

	this.drawBabblers = function(canvas) {
		this.context = canvas.getContext('2d');
		this.context.clearRect (0, 0 , 600, 400 );
		this.context.lineWidth  = 1;
		
		this.drawI(0, this.bubblesList[0].r);		// a primeira bolha ocupa a posi��o central

	}

	this.mouseOver = function (x,y) {
		//procurar bolha. Se encontrar, destacar
		//posicionar o x e y com rela��o �s bolhas
		x = x-150;
		y=y-200;
		var i=0;
		var found=false;
		while (i<this.bubblesList.length && !found) {
			aBubble = this.bubblesList[i];
			if (aBubble.isInside(x,y)) { //encontrou uma bolha
				found=true;
				if (aBubble!=this.bubbleOver) { //s� atuar se a bolha encontrada � diferente da que j� est� ativada.
					//desativar bolha ativada na vez anterior
					if (this.bubbleOver!=null)	{
						this.context.strokeStyle = this.bubbleOver.colorNormal;
						this.context.fillStyle = this.bubbleOver.colorNormal;
						this.context.lineWidth   = 1;
						this.context.beginPath();
						this.context.arc(Math.round(this.bubbleOver.x) + 150, Math.round(this.bubbleOver.y) + 200,this.bubbleOver.r,0,Math.PI*2,true); //reposicionar o x e y das bolhas para coloc�-las no centro do canvas
						this.context.closePath();
						this.context.stroke();
						this.context.fill();
					}
					//representar bolha ativada
					this.context.lineWidth   = 1;
					this.context.strokeStyle = '#000000';
					this.context.fillStyle = aBubble.colorActived;
					this.context.beginPath();
					this.context.arc(Math.round(aBubble.x) + 150, Math.round(aBubble.y) + 200,aBubble.r,0,Math.PI*2,true); //reposicionar o x e y das bolhas para coloc�-las no centro do canvas
					this.context.closePath();
					this.context.stroke();
					this.context.fill();
					this.bubbleOver=aBubble;
					aBubble.reportMensagens();
				}
			}
			i++;
		}
	}
}