function drawPolemicTree(){	
	
	var totalData = 
	{
		messages:
		[
			{
				id: "1",
				sender: "Pimentel Mariano",
				data: "28/06/2011-00:17",
				content: "BSI, tô curioso... o que vocês mudariam nas disciplinas do 1o período? E se as disciplinas do 1o período apoiassem a turma a desenvolver um jogo (aprendizagem baseada em projeto)?",
				topic:[],
				position: "",
				addressee: ""
			},
			{
				id: "2",
				sender: "Leonardo Marinho",
				data: "28/06/2011-00:17",
				content: "Like",
				topic:[],
				position: "agree",
				addressee: "1"
			},
			{
				id: "3",
				sender: "Arlindo Pereira",
				data: "28/06/2011-00:17",
				content: "Like",
				topic:[],
				position: "disagree",
				addressee: "1"
			},
			{ 
				id: "4",
				sender: "Victor Azevedo",
				data: "28/06/2011-00:17",
				content: "Like",
				topic:[],
				position: "agree",
				addressee: "1"
			},
			{ 
				id: "5",
				sender: "Luiz Cunha",
				data: "28/06/2011-00:17",
				content: "Like",
				topic:[],
				position: "agree",
				addressee: "1"
			},
			{ 
				id: "6",
				sender: "Caroline Delavalli",
				data: "28/06/2011-00:17",
				content: "Like",
				topic:[],
				position: "agree",
				addressee: "1"
			},
			{ 
				id: "7",
				sender: "Roberta Santos",
				data: "28/06/2011-00:17",
				content: "Like",
				topic:[],
				position: "agree",
				addressee: "1"
			},
			{ 
				id: "8",
				sender: "Felipe Tavares",
				data: "28/06/2011-00:17",
				content: "Like",
				topic:[],
				position: "agree",
				addressee: "1"
			},
			{ 
				id: "9",
				sender: "Marcos Barroso",
				data: "28/06/2011-00:17",
				content: "Like",
				topic:[],
				position: "agree",
				addressee: "1"
			},
			{ 
				id: "10",
				sender: "Alessandro Iglesias",
				data: "28/06/2011-00:22",
				content: "Gostei da idéia.",
				topic:[],
				position: "agree",
				addressee: "1"
			},
			{ 
				id: "11",
				sender: "Rafael Melo",
				data: "28/06/2011-00:26",
				content: "Jogo será sempre um titulo que envolveria os alunos. Nao sei como estah o numero de desistentes do bsi nos primeiros periodos, mas as materias nao ajudam. Na PUC a minha amiga meteu a mao na massa em organizacao de computadores no 1 periodo. Nós nao saimos de um livro super xato. Sou do 7 periodo. Apoio mto ideias assim. Eu curtiria ter meu 1 periodo com experiencia em trabalho em equipe.. O mercado de trabalho esta ai...",
				topic:[],
				position: "agree",
				addressee: "1"
			},
			{ 
				id: "12",
				sender: "Alessandro Iglesias",
				data: "28/06/2011-00:28",
				content: "Acredito que haverá desistências significativas no primeiro período; sou dele. Muito por dificuldades pessoais, e também por não terem noção de como é o curso. Uma proposta desse tipo é interessante não somente aos alunos, mas também a todos, em relação a evasão e desperdício de vagas.",
				topic:[],
				position: "agree",
				addressee: "11"
			},
			{ 
				id: "13",
				sender: "Alessandro Iglesias",
				data: "28/06/2011-00:29",
				content: "Pimentel Mariano, tem noção de quais tipos de jogos seriam viáveis?",
				topic:[],
				position: "neutral",					
				addressee: "1"
			},
			{ 
				id: "14",
				sender: "Arlindo Pereira",
				data: "28/06/2011-01:38",
				content: "Eu mudaria Técnicas de Programação 1 para um aprendizado baseado em dojo e testes unitários.",
				topic:[],
				position: "neutral",					
				addressee: "1"					
			},					
			{ 
				id: "15",
				sender: "Mariano Pimentel",
				data: "28/06/2011-01:54",
				content: "Alessandro Iglesias, acho que um jogo simples como \"pac man\" seria um projeto viável para o 1o período. Neste caso, em vez de disciplinas teríamos \"tópicos\" de estudo para apoiar a realização do projeto. Alguns tópicos seriam: animação, jogabilidade,programação, interatividade e usabilidade em jogos, periféricos etc... Na perspectiva dos professores, seria uma mudança enorme: deixar de ensinar conteúdos disciplinares e passar a apoiar o desenvolvimento de um projeto; a matriz curricular teria que ser modificada, e não sei se os conselhos superiores aprovariam. Mas a minha consulta à comunidade é para levantar a opinião dos alunos, o que vcs acham dessa abordagem? Seria viável? Os alunos gostariam? Seria perda de tempo (estamos falando de 1 semestre inteiro!)? Você teria gostado de desenvolver um jogo no 1o período?",
				topic:[],
				position: "neutral",
				addressee: "13"
			},
			{ 
				id: "16",
				sender: "Luiz Carlos",
				data: "28/06/2011-01:54",
				content: "Like",
				topic:[],
				position: "agree",
				addressee: "15"
			}
		]
	};
	

	
	function createTree(data){		
		$('svg').remove();
		$('.container-message-details').remove();
		$('.container-messages').hide();
		var w = 960;
		var h = 500;	
		var layoutRoot = d3.select(".visualization")
	    .append("svg:svg").attr("width", w*5).attr("height", h+200)
	    .append("svg:g")
		.attr("class", "container");
		var tree = d3.layout.tree()
	    .sort(function comparator(a, b) {
	    	var aPosition = 0;
	    	var bPosition = 0;
	    	var comparator = 0;
	    	if(a.position == "agree"){
	    		aPosition = 2;
	    	}
	    	if(b.position == "agree"){
	    		bPosition = 2;
	    	}	    	
	    	if(a.position == "neutral"){
	    		aPosition = 1;
	    	}
	    	if(b.position == "neutral"){
	    		bPosition = 1;
	    	}
	    	if((aPosition - bPosition) == 0){
	    		comparator = b.id - a.id;
	    	} else {
	    		comparator = aPosition - bPosition;
	    	}
	    	return comparator;
		})
	    .size([w*2,h])
	    .children(function(d)
	    {
	        return (!d.children || d.children.length === 0) ? null : d.children;
	    });
		
		var nodes = tree.nodes(data);
		
		for(var i = 0 ; i < nodes.length ; i++){
			nodes[i].y += 100;
		}
		
		prepareMessageDetails(nodes);
		
		var links = tree.links(nodes);		
		
		 // Edges between nodes as a <path class="link" />
		 var link = d3.svg.diagonal()
		     .projection(function(d)
		     {
		         return [d.x, d.y];
		     });
		
		 layoutRoot.selectAll("path.link")
		     .data(links)
		     .enter()
		     .append("svg:path")
		     .attr("class", "link")
		     .style("stroke", function(d){
		     	if(d.target.position == "agree"){
		     		return "green";
		     	}
		     	if(d.target.position == "disagree"){
		     		return "red";
		     	}
		     	return "gray";
		     })
		     .style("stroke-width", function(d){
		     	if(d.target.position == "agree"){
		     		return "2";
		     	}
		     	if(d.target.position == "disagree"){
		     		return "2";
		     	}
		     	return "1";
		     })
		     .attr("id", function(d)
		     {
		     	console.log(d);
		     	var idLink = "link-"+d.target.id;
		     	return idLink;
		     })
		     .attr("d", link);
		
		
		 /*
		     Nodes as
		     <g class="node">
		         <circle class="node-dot" />
		         <text />
		     </g>
		  */
		 var nodeGroup = layoutRoot.selectAll("g.node")
		     .data(nodes)
		     .enter()
		     .append("svg:g")
		     .attr("class", "node")
		     .attr("transform", function(d)
		     {
		         return "translate(" + d.x + "," + d.y + ")";
		     });
		
		nodeGroup.append("svg:circle")
		     .attr("class", "node-dot")
		     .attr("id", function(d)
		     {
		     	var idNode = "node-"+d.id;
		     	return idNode;
		     })
		     .attr("r", function(d)
		     {	     	
		     	return 5;
		     });
		     
	    nodeGroup.append("svg:text")
		     .attr("text-anchor", function(d)
		     {
		         return d.children ? "end" : "start";
		     })
		     .attr("dx", function(d)
		     {
		         var gap = 2 * 5;
		         return d.children ? -gap : gap;
		     })
		     .attr("dy", 3);
	     
	     $('text').hide();	     
	     setUpInteractions(layoutRoot);
	     return nodes;
	}
     
	function setUpInteractions(layoutRoot){
	     $("circle").mouseover(function() {
	     	var message = $(this);
			message.siblings("text").append((message.attr('r')-5)+"%").show();
			var allCircle = layoutRoot.selectAll("circle");	 		
		 		allCircle.classed('not-selected',true);
		 		
		 	var circle = d3.select(this);
		 		circle.classed('not-selected', false);
		 		circle.classed('mouse-over', true);
			
		}).mouseout(function() {
			var message = $(this);
			message.siblings("text").empty();
			$(this).siblings("text").hide();
			var circle = d3.select(this);
		 		circle.classed('not-selected', true);
		 		circle.classed('mouse-over', false);
		});
		
		 $("circle").click(function() {
		 	var allCircle = layoutRoot.selectAll("circle");
		 		allCircle.classed('selected',false);
		 		allCircle.classed('not-selected',true);
		 		
		 		
		 	
		 	var circle = d3.select(this);
		 		circle.classed('not-selected', false);
		 		circle.classed('mouse-over', false);
		 		circle.classed('selected', true);
		 	
		 	var messageId = $(this).attr('id');
		 	$(".container-messages").show();
	     	$(".container-message-details").hide();     	
	     	$("#message-"+messageId).show();
		});
		
		$(".pie").live("click", function() {
			
			// resetting pies at each click first
			var allPies = d3.selectAll('.pie');
			allPies.each(function(d,i){
				$(this).children().attr('stroke','');
				if($(this).children().hasClass("selected")){
					$(this).children().removeClass("selected");				
				}
			});
			
			$('.pie').each(function(){
        		$(this).children('.agree').attr('fill',"#BFFEBF");
				$(this).children('.disagree').attr('fill',"#FE8080");
      		});
			
			// now set the selected pie with style
			var pie = d3.select(this).node();
			for(var k = 0 ; k < pie.childNodes.length ; k++){					
					if(pie.childNodes[k].__data__.startAngle == pie.childNodes[k].__data__.endAngle){
						$(pie.childNodes[k]).attr('stroke', '');
					}
				}
				
			$(this).children('.agree').attr('fill',"green");
			$(this).children('.disagree').attr('fill',"red");
			$(this).children().addClass("selected");
			
		 	var pieId = $(this).attr('id');		 	
		 	var messageId = "node-" + pieId.slice(4);
		 	$(".container-messages").show();
	     	$(".container-message-details").hide();     	
	     	$("#message-"+messageId).show();
		});
		
		$(".pie").live("mouseover", function() {
			
			// now set the selected pie with style
			var pie = d3.select(this).node();
				
			$(this).children('.agree').attr('fill',"green");
			$(this).children('.disagree').attr('fill',"red");
		});
		
		$(".pie").live("mouseout", function() {
			
			// now set the selected pie with style
			var pie = d3.select(this).node();
			console.log($(this).children().hasClass("selected"));
			if($(this).children().hasClass("selected")){
				$(this).children('.agree').attr('fill',"green");
				$(this).children('.disagree').attr('fill',"red");				
			} else {
				$(this).children('.agree').attr('fill',"#BFFEBF");
				$(this).children('.disagree').attr('fill',"#FE8080");
			}
		});
	}
	
	function prepareMessageDetails(nodes){
		for(var i = 0 ; i < nodes.length ; i++){
			var messageId = nodes[i].id;
			messageId = "node-"+messageId;
			var messageSender = nodes[i].sender;
			var messageData = nodes[i].data;
			var messageContent = nodes[i].content;
			var messagePosition = nodes[i].position;
			
			var teste = '<div id="message-'+messageId+'" class="container-message-details"></div>';
			$(".container-messages").append(teste);
			$("#message-"+messageId).append("<div id=\"sender-"+messageId+" class=message-details\">"+messageSender+"</div>");
			$("#message-"+messageId).append("<div id=\"data-"+messageId+" class=message-details\">"+messageData+"</div>");
			$("#message-"+messageId).append("<div id=\"content-"+messageId+" class=message-details\">"+messageContent+"</div>");
			$("#message-"+messageId).append("<div id=\"position-"+messageId+" class=message-details\">"+messagePosition+"</div>");
		}
	}
	
var nowData = [];
var dataCollection = [];
	
	$(".next-message").click(function() {			
		var nextNode = findNextNode(totalData, nowData);
		if (nextNode != false){
			insertNode(nextNode, nowData);
			var newState = {};
			$.extend(newState, nowData[0]);
			dataCollection.push(newState);
			var nodes = createTree(dataCollection[dataCollection.length-1]);		
			calculateNodePolemic(nodes);
		}
	});
	
	var activeNodes = [];
	
	function insertNode(node, nowData){
		if(node.addressee != ""){
			node.children = [];
			for(var i = 0 ; i < nowData.length ; i++){
				if (node.addressee == nowData[i].id){
					nowData[i].children.push(node);
					return nowData;
				} else if (nowData[i].children.length != 0){
					insertNode(node, nowData[i].children)
				}
			}
		} else {
			node.children = [];
			nowData.push(node);
			return nowData;
		}
	}
	
	function findNextNode(totalData, nowData){				
		if (activeNodes.length == 0){
			activeNodes.push(totalData.messages[0]);
			return activeNodes[0];
		}
		var nowNode = activeNodes[activeNodes.length-1];
		for(var i = 0 ; i < totalData.messages.length ; i++){
			if(nowNode == totalData.messages[i]){
				if(i < totalData.messages.length-1){
					activeNodes.push(totalData.messages[i+1]);
					return totalData.messages[i+1];
				} else {
					return false;
				}
			}
		}
	}
	
	$(".previous-message").click(function() {
		if(dataCollection.length != 0) {
			dataCollection.pop();
			activeNodes.pop();
			$.extend(nowData[0], dataCollection[dataCollection.length-1]);
			var nodes = createTree(dataCollection[dataCollection.length-1]);
			calculateNodePolemic(nodes);
		}		
	});
	
	function calculateNodePolemic(nodes){
		for (var j = 0 ; j < nodes.length ; j++){//percorre nós ativos pegando cada um
			var idPie = "pie-"+nodes[j].id;
			var relatedNodes = 0;
			var relatedNodesAgree = 0;
			var relatedNodesDisagree = 0;
			var relatedNodesNeutral = 0;
			for (var i = 0 ; i < nodes.length ; i++){//percorre novamente os nós ativos para contar a quantidade de nós filhos ativos
				if(nodes[i].addressee != ""){
					if(nodes[i].addressee == nodes[j].id){
						relatedNodes++;
						if(nodes[i].position == "agree"){
						relatedNodesAgree++;
						}
						if(nodes[i].position == "disagree"){
						relatedNodesDisagree++;
						}
						if(nodes[i].position == "neutral"){
						relatedNodesNeutral++;
						}
					}
				}
			}
			
     		var partialR = (relatedNodes / (nodes.length-1));
     		var radius = ((partialR)*100) + 25;
			var agreePercentual = (relatedNodesAgree / (relatedNodes-relatedNodesNeutral));
			var disagreePercentual = 1 - agreePercentual;
			var data = [agreePercentual,disagreePercentual];
			if ((relatedNodes-relatedNodesNeutral) > 0){
				updatePie(idPie, data, nodes[j].x, nodes[j].y, radius);
			}
		}
	
}
	
	function bakepie(idPie, data, donut, arc, x, y, radius)
    {
		var color = ["#BFFEBF", "#FE8080"];
		var classes = ["agree", "disagree"];		
		
		var pie = d3.select(".container").append("svg:g")
		    .attr("transform", "translate(" + x + "," +y + ")")
		    .attr("id", idPie)
		    .attr("class", "pie");
		    //console.log(pie);
		
		var arcs = pie.selectAll("path")
		    .data(donut(data))
		  .enter().append("svg:path")
		    .attr("fill", function(d, i) {
		    	$(this).addClass(classes[i],true);
		    	return color[i]; })
		    .attr("d", arc);		    
		    //console.log(arcs);
    }
    
    function updatePie(idPie,data, x, y, radius){
    	var donut = d3.layout.pie().sort(null);
		var arc = d3.svg.arc().outerRadius(radius);
    	var pie = d3.select("."+idPie);
    	if (pie[0][0] != null){
	    	arcs = pie.selectAll("path");
			arcs = arcs.data(donut(data)); // update the data
			arcs.attr("d", arc); // redraw the arcs
		} else {
			bakepie(idPie, data, donut, arc, x, y, radius);
		}
    }
}