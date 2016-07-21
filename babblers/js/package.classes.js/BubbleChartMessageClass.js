function BubbleChartMessageClass(messagesList, messagesDiv, contextoCanvas) {

	this.bubblesList = new Array();
	
	this.axisDivisionList = new Array();

	this.axisDivisionOver = null;

	this.bubbleOver=null; //bolha ativada

	for (var i = 0; i < messagesList.messages.length; i++) {

		var message = messagesList.messages[i];

		var bubble = new BubbleMessageClass(message, messagesList, messagesDiv);

		this.bubblesList.push(bubble);
	}
	
	this.drawAxis = function(canvas){
		this.context = canvas.getContext('2d');
		this.context.strokeStyle = "black";
		this.context.beginPath();  
		/* x axis along the bottom edge of the canvas*/  
		this.context.moveTo(9,350);  
		this.context.lineTo(593,350);
		this.context.stroke();
	}

	this.drawAxisDivisions = function(canvas, bChart){		
		this.context = canvas.getContext('2d');
		this.context.strokeStyle = "black";
		this.context.beginPath();
		
		var initialTime = messagesList.messages[0].calculatedTimeMessage;
		var finalTime = messagesList.messages[messagesList.messages.length-1].calculatedTimeMessage;
		var dxRate = (600-20)/(finalTime - initialTime);
		for(var i = 10 ; i <= 593 ; i++){
				
				var msDate = Math.round(((i-10)/dxRate)+initialTime);
				var date = new Date(msDate);
			if(i==10){				
				var axisDivision = new AxisDivisionClass(date,i,i,343,358);
				axisDivision.drawAxisDivisions(canvas, 1);
				this.axisDivisionList.push(axisDivision);
			} else if ((i%100)==0){
				var axisDivision = new AxisDivisionClass(date,i,i,343,358);
				axisDivision.drawAxisDivisions(canvas, 1);
				this.axisDivisionList.push(axisDivision);
			} else if ((i%25)==0){
				var axisDivision = new AxisDivisionClass(date,i,i,347,353);
				axisDivision.drawAxisDivisions(canvas, 1);
				this.axisDivisionList.push(axisDivision);
			} else if (i==593){
				var axisDivision = new AxisDivisionClass(date,i,i,343,358);
				axisDivision.drawAxisDivisions(canvas, 1);
				this.axisDivisionList.push(axisDivision);
			}
		}
	}

	this.drawMessagesOverTime = function(canvas) {
		
		this.context = canvas.getContext('2d');
		this.context.lineWidth  = 1;				
		this.context.clearRect (0, 0 , 600, 400 );
		this.drawAxis(canvas);	  
						
		var aBubble;
		var initialTime;
		var finalTime;		
		initialTime = messagesList.messages[0].calculatedTimeMessage;
		finalTime = messagesList.messages[messagesList.messages.length-1].calculatedTimeMessage;
		var dxRate = (600-20)/(finalTime - initialTime);
		
		//reposicionar o x das bolhas
		for (var i=0; i<this.bubblesList.length; i++)	{			
			aBubble = this.bubblesList[i];
			var timeDif = aBubble.x - initialTime;
			aBubble.x = 10 + Math.round(dxRate * (timeDif));
		}
		//reposicionar o y das bolhas
		var b1, b2;
		for (var i=1;  i<this.bubblesList.length; i++)	{

			b1 = this.bubblesList[i];

			var yStep=-2;

			var reposicionou=true;

			while(reposicionou) {

				reposicionou=false;

				for (var j=0; j<i ; j++) {

					b2 = this.bubblesList[j];

					var dx=b1.x-b2.x;

					var dy=b1.y-b2.y;

					var distancia = Math.sqrt((dx*dx) + (dy*dy));

					if (  (b1.r + b2.r) >= distancia ) { //os circulos se interseccionam, corrigir o y!

						//alert( 'dx=' + dx + ' dy=' + dy + 'distancia =' + distancia + " raio1=" +  b1.r + " raio2=" +  b2.r  + "valor=" + ( (b1.r + b2.r) >= Math.sqrt((dx*dx) + (dy*dy))  ) );

						b1.y=b1.y+yStep;

						j--;

						reposicionou=true;
					}
				}
			}
		}
		//drawing the bubbles

		for (var i=0; i<this.bubblesList.length; i++)	{

			aBubble = this.bubblesList[i];

			this.context.beginPath();
			
			this.context.strokeStyle = aBubble.colorNormal;
			this.context.fillStyle = aBubble.colorNormal;

			this.context.arc(aBubble.x,aBubble.y,aBubble.r,0,Math.PI*2,true);

			this.context.closePath();

			this.context.stroke();

			this.context.fill();
			}			
		}
		
	this.mouseOver = function (x,y) {
				//procurar bolha. Se encontrar, destacar

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
						this.context.arc(this.bubbleOver.x,this.bubbleOver.y,this.bubbleOver.r,0,Math.PI*2,true);
						this.context.closePath();
						this.context.stroke();
						this.context.fill();
					}
					//representar bolha ativada
					this.context.lineWidth   = 1;
					this.context.strokeStyle = '#000000';				
					this.context.fillStyle = aBubble.colorActived;
					this.context.beginPath();
					this.context.arc(aBubble.x,aBubble.y,aBubble.r,0,Math.PI*2,true);
					this.context.closePath();
					this.context.stroke();
					this.context.fill();
					this.bubbleOver=aBubble;
					aBubble.reportMessages();
				}
			}
			i++;
		}
		
		var foundAxisDivision = false;

		var j = 0;
		while (j<this.axisDivisionList.length && !foundAxisDivision) {
			axisDivision = this.axisDivisionList[j];
			if (axisDivision.isInside(x,y)) { //encontrou uma bolha
				foundAxisDivision=true;
				
				if (axisDivision != this.axisDivisionOver) { //s� atuar se a bolha encontrada � diferente da que j� est� ativada.
					//desativar bolha ativada na vez anterior
					if (this.axisDivisionOver != null)	{
						this.context.clearRect (0, 335 , 600, 100 );
						this.drawAxis(canvas);
						this.drawAxisDivisions(canvas, this);
					}
					//representar bolha ativada
					this.context.lineWidth   = 1;
					this.context.strokeStyle = '#000000';				
					this.context.fillStyle = axisDivision.colorActived;
					this.context.beginPath();
					//fazer tooltip
					this.context.closePath();
					this.context.stroke();
					this.context.fill();
					this.axisDivisionOver=axisDivision;
					axisDivision.reportTime(canvas,x,y);
				}
			}
			j++;
		}
	}
}