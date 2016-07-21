/**
 * @author Rafael
 * @descrição: Este arquivo representa a classe ClockBar.
 */

function clockBarClass(slices, contextoCanvas) {
	this.slices = slices; // forma de fatiamento
	this.context = contextoCanvas;
	this.dtSlice = (360/this.slices)*Math.PI/180; //largura da fatia de cada slice
	this.dxSlice = 0.75*(360/this.slices)*Math.PI/180; //representa��o do slice com 20% a menos que � para dar uma borda entre as fatias
	this.slicesCompleted = -1;
	this.pulseCount = 0;
	this.completed = false;


	this.init = function() {
		this.slicesCompleted = -1;
		this.completed = false;
		this.draw();
	}

	this.start = function() {
		this.slicesCompleted = 0;
		this.completed = false;
		this.draw();
		this.pulse();
	}

	this.pulse = function() {
		if (!this.completed) {
			var pulseColor = inicializaPulseColor();
			this.pulseCount++;
			this.drawSlice(this.slicesCompleted+1, pulseColor[this.pulseCount % pulseColor.length]);
			setTimeout("clockBar.pulse()",50);
		}
	}

	this.setSliceCompleted = function(i) {
		this.slicesCompleted = i;
		this.draw();
	}

	this.finished = function() {
		this.completed = true;
		this.slicesCompleted = this.slices;
		this.draw();
	}

	this.draw = function(){
		for (var i=1; i<=this.slicesCompleted; i++) {
			this.drawSlice(i, "#B0B0CC");
		}
		for (var i=this.slicesCompleted+1; i<=this.slices; i++) {
			this.drawSlice(i, "#FFFFFF");
		}
	}

	this.drawSlice = function(i,aColor) {
		//representar bolha ativada
		this.context.lineWidth   = 1;
		this.context.strokeStyle = '#B0B0CC';
		this.context.fillStyle = aColor;
		this.context.beginPath();
		var angleStart = -Math.PI/2 + (i-1)*this.dtSlice;
		var angleFinal = -Math.PI/2 + (i-1)*this.dtSlice + this.dxSlice;
		this.context.arc(300, 200, 30, angleStart, angleFinal,false);
		this.context.arc(300, 200, 45, angleFinal,angleStart,true);
		this.context.closePath();
		this.context.stroke();
		this.context.fill();
	}

}