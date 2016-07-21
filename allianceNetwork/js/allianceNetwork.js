
function drawAllianceNetwork(){

	var discussionFromTextBox = getDiscussionFromTextBox();	

	var objMessages = new ObjMessages(discussionFromTextBox);

	function ObjMessages(discussionsMessages){
		this.messages = discussionsMessages;
	}

	console.log(objMessages);
	var lastNodes = [];	
	
	var allMessages = objMessages.messages;	
	for(var l = 0 ; l < allMessages.length ; l++){
		allMessages[l].value = 0;
		if (allMessages[l].addressee != ''){
			for(var m = 0 ; m < allMessages.length ; m++){
				if (allMessages[l].addressee == allMessages[m].id){
					allMessages[l].addressee = allMessages[m].sender;
				}
			}
		}
	}
	var svg = d3.select(".visualisation").append("svg:svg");
	var w = $('.visualisation').width();
	var h = $('.visualisation').height();
	draw(allMessages);	

	function draw(messages){
		console.log(messages.length);
		$('.message-count').html(messages.length + " de " + allMessages.length);
		var participants = [];
		var nodes = {};
		var groups = [];
		var links = [];
		$('svg').remove();
		
		function link(message){
			this.id
			this.source = message.sender;
			this.target = message.addressee;
			this.messages = [message];
			this.absoluteValue = 0;
			this.value = 0;
			this.addMessage = addMessage;
			this.calculateValue = calculateValue;
			this.autoLink = false;
			
			function addMessage(message){			
				this.messages.push(message);
			}
			function calculateValue(linkMessages){
				var valueAgree = 0;
				var valueDisagree = 0;
				for(var i = 0 ; i < linkMessages.length ; i++){
					if(linkMessages[i].position == "agree"){
						valueAgree = valueAgree + 1;
					}
					if(linkMessages[i].position == "disagree"){
						valueDisagree = valueDisagree + 1;
					}
				}
				var valuesSum = valueAgree + valueDisagree;
				var value = ((valueAgree * 100) / (valuesSum));
				
				if (isNaN(value)){
					value = 50;
				}

				this.absoluteValue = valueAgree - valueDisagree;
				return value;
			}
		}
		
		for(var i = 0 ; i < messages.length; i++){
			if(findMessage(messages[i]) == null){
				updateLink(messages[i]);
			}
		}
		
		function findMessage(message){
			for(var i = 0 ; i < links.length ; i++){
				if(links[i].messages.length != 0){
					for(var j = 0 ; j < links[i].messages.length; j++){
						if(message == links[i].messages[j]){
							return message;
						}
					}
				}
			}
			return null;
		}
		
		function updateLink(message){
			var newLink = new link(message);
			var linkFound = findLink(newLink,message);
			if(linkFound != null){
				linkFound.addMessage(message);
				//linkFound.value = linkFound.calculateValue(linkFound.messages);
			} else {
				if(newLink.target == newLink.addresse){
					newLink.autoLink = true;
					links.push(newLink);
				} else if(newLink.target == ""){
					newLink.autoLink = false;
					newLink.target = newLink.source;
					links.push(newLink);
				} else {
					links.push(newLink);
				}
			}
		}
		
		function findLink(link,message){
			for(var i = 0 ; i < links.length ; i++){
				if(((link.target == links[i].target) && (link.source == links[i].source)) || ((link.target == links[i].source) && (link.source == links[i].target))){
					return links[i];
				}
			}
			return null;
		}
		
		// Compute the distinct nodes from the links.
		links.forEach(function(link) {
				link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
				link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
				calculateAllLinkValues(link);

		});
		
		function calculateAllLinkValues(link){
			link.value = link.calculateValue(link.messages);
		}
		var nodeCount = 0;
		// Store each link on node.
		$.each(nodes, function(key, value) {				
				value.index = nodeCount;
				value.links = [];
			links.forEach(function(link) {
				if((link.source.name == value.name) || (link.target.name == value.name)){
					value.links.push(link);
				}
			});
			nodeCount++;
		});
		computePositionalWeight();
				
		function computePositionalWeight(){
			var count = 0;
			$.each(nodes, function(key, value) {
				if(count > 0){
					var lastNodeSnap = nodeExists(key);
				}
				if((count > 0) && (lastNodeSnap != null)){
					value.x = lastNodeSnap.x;
					value.y = lastNodeSnap.y;
					count++;
				} else {
					var xModifier = count;
					var yModifier = count;
													
					if(Math.random() < 0.5){
						xModifier = xModifier * (-1);
					}
					if(Math.random() < 0.5){
						yModifier = yModifier * (-1);
					}				
					
					value.x = (w/2)+xModifier;
					value.y = (h/2)+yModifier;								
					
					count++;
				}
			var positionalWeight = 0;		
				for (var j = 0 ; j < links.length ; j++){
					if(key == links[j].target.name){				
						positionalWeight = positionalWeight + links[j].value;
						value.positionalWeight = positionalWeight;						
					}
				}
			});
		}
		
		function nodeExists(name){
			/*for (var i = 0 ; i < lastNodes.length ; i++){
				if(index == lastNodes[i].index){
					return lastNodes[i];
				} else {
					return null;
				}
			}*/
			var object = null;
			$.each(lastNodes, function(lastKey, lastValue) {
				if(name == lastKey){
					object = lastValue;
				}
			});
			return object;
		}
			
		function Group(id){
			this.id = id;
			this.nodes = [];
			this.links = [];
			this.color = "#ccc";			
			
			this.addNode = function(node) {
			this.nodes.push(node);
			}
			this.addLink = function(link) {
			this.links.push(node);
			}
			this.removeNode = function(node) {
				for(var i = 0 ; i < nodes ; i++){
					if(node.id == nodes[i].id){
						nodes.splice(i,1);
					}
				}
			}
			this.removeLink = function(link) {
				for(var i = 0 ; i < links ; i++){
					if(link == links[i]){
						links.splice(i,1);
					}
				}
			}
		}		
		
		//createGroups();
		/*function createGroups(){
			//var contador = 0;
			$.each(nodes, function(key, value) {
				var group = new Group("nogroup");
				group.addNode(value);
				groups.push(group);
				value.group = group;
				//contador++;
			});
		}

		function NodexGroup(group, value){
			this.group = group;
			this.value = value;
		}*/
		
	//	updateGroups();
		/*function updateGroups(){
			$.each(nodes, function(key, value) {				
				var nodeGroups = [];
				var nodeLinks = value.links;
				var groupCoefficient = 0;				
				value.groups = [];	
				value.groups.push(new NodexGroup(value.group, 0));
				
				for (var j = 1 ; j < nodeLinks.length ; j++){
					if(nodeLinks[j].target.name == value.name){
						var nowGroup = nodeLinks[j].source.group;
					} else {
						var nowGroup = nodeLinks[j].target.group;
					}
					
					if(value.groups.length == 0){
						value.groups.push(new NodexGroup(nowGroup, nodeLinks[j].absoluteValue));
					} else {
						value.groups.push(findGroup(nowGroup, value.groups, nodeLinks[j].absoluteValue));
					}
					//nodeLinks[i].target.group.actualValue += nodeLinks[i].absoluteValue;
				}
				value.group = defineGroup(value);
				console.log(nodes);
			});
		}

		function findGroup (nowGroup, groups, absoluteValue) {
			for(var i = 0 ; i < groups.length ; i++){
				if(nowGroup.id == groups[i].id){
					groups[i].value += nowGroup.absoluteValue;
					return nowGroup;
				} else {
					var newGroup = new NodexGroup(nowGroup, absoluteValue);
					return newGroup;
				}
			}
		}

		function defineGroup (node) {
			var actualGroup = node.groups[0];
			for(var i = 0 ; i < node.groups.length ; i++){
				if(actualGroup.value < node.groups[i].value){
					actualGroup = node.groups[i];
				}
			}
			return actualGroup.group;
		}*/

		/*function updateGroups(){
			$.each(nodes, function(key, value) {
				var nodeGroups = [];
				var nodeLinks = value.links;
				var groupCoefficient = 0;
				for (var j = 0 ; j < nodeLinks.length ; j++){
					if(j==0){
						var powerfulLink = nodeLinks[j];
					}
					if((nodeLinks[j].absoluteValue > groupCoefficient)){
						powerfulLink = nodeLinks[j];						
						if(nodeLinks[j].target.group == undefined){
							if(nodeLinks[j].source.group == undefined){
								var group = new Group(nodeLinks[j].target.name);
								group.addNode(value);
								groups.push(group);
								value.group = group;
							} else {
								value.group = nodeLinks[j].source.group;
							}							
						} else {
							value.group = nodeLinks[j].target.group;
						}		
					}				
				}				
			});		
		}*/
		
		//updateGroups();		
		/*sortGroupsColors();

		function sortGroupsColors(){
			populateParticipants();
			for(var i = 0 ; i < groups.length ; i++){

				/*if(groups[i].id == "bridge"){
					groups[i].colorUnselected = ("#FECC80");
					groups[i].colorSelected = ("#FF9900");				
				} else {
					//var resultUnselected = randomColors(groups.length, false);
					//var hexUnselected = rgbToHex(resultUnselected[i].r, resultUnselected[i].g, resultUnselected[i].b);				
					//groups[i].colorUnselected = ("#"+"83FE87");
					groups[i].colorUnselected = ("#00C800");
					
					//var resultSelected = randomColors(groups.length, true);
					//var hexSelected = rgbToHex(resultSelected[i].r, resultSelected[i].g, resultSelected[i].b);				
					groups[i].colorSelected = ("#"+"024304");				
				//}
			}
		}*/
		
		function populateParticipants(){
			for(var i = 0 ; i < allMessages.length ; i++){
				var found = findParticipants(allMessages[i]);
				if(!found){
					participants.push(allMessages[i].sender);
				}
			}
		}		
		function findParticipants(message){			
			for(var j = 0 ; j < participants.length ; j++){
				if(message.sender == participants[j]){
					return true;
				}
			}
			return false;
		}
		
		function rgbToHex(R,G,B) {
			return toHex(R)+toHex(G)+toHex(B);
		}
		
		function toHex(n) {
			 n = parseInt(n,10);
			 if (isNaN(n)) return "00";
			 n = Math.max(0,Math.min(n,255));
			 return "0123456789ABCDEF".charAt((n-n%16)/16)
			      + "0123456789ABCDEF".charAt(n%16);
		}
		function randomColors(total, isSelected)
		{
			if(isSelected){
				var i = 360 / (total - 1); // distribute the colors evenly on the hue range
			    var r = []; // hold the generated colors
			    for (var x=0; x<total; x++)
			    {
			        r.push(ColorConverter.toRGB(new HSV(i * x, 100, 60))); // you can also alternate the saturation and value for even more contrast between the colors
			    }
			    return r;
			} else {
				var i = 360 / (total - 1); // distribute the colors evenly on the hue range
			    var r = []; // hold the generated colors
			    for (var x=0; x<total; x++)
			    {
			        r.push(ColorConverter.toRGB(new HSV(i * x, 60, 100))); // you can also alternate the saturation and value for even more contrast between the colors
			    }
			    return r;
			}
		    
		}
		
		var svg = d3.select(".visualisation").append("svg:svg")
	    .attr("width", w)
	    .attr("height", h);	


	
		var force = d3.layout.force()
		    .nodes(d3.values(nodes))
		    .links(links)
		    .size([w, h])
		    .gravity(0)
		    .linkDistance(function(d) {
		    	var distance = 400;
		    			    		
	    		distance = distance - (4*d.value);
		    		if(distance < 50){
		    			return 50;
		    		}
	    		return distance;
		    })
		    .charge(-200) 
			.on("tick", tick)
		    .start();

var path = svg.append("svg:g").selectAll("line")
		    .data(force.links())
		  .enter().append("svg:line")
		    .attr("class", function(d) {
		    	var position = generalPosition(d);
		    	return "link " + position; })
		    .style("stroke-width","1" /*function(d) {
		    	if(d.value == 50){
		    		return 1;
		    	}
		    	if(d.value < 50){
		    		return Math.sqrt((100-(d.value))/20);
		    	}
		    	return Math.sqrt(d.value/20); 
		    	}*/)
		    .style("stroke", function(d) {
		    	
		    	var totalNeutral = 0;
		    	var totalAgree = 0;
		    	var totalDisagree = 0;
		    	var total = d.messages.length;

		    	for(var i = 0 ; i < d.messages.length ; i++){
		    		if(d.messages[i].position == "neutral"){
		    			totalNeutral++;
		    		}
		    		if(d.messages[i].position == "agree"){
		    			totalAgree++;
		    		}
		    		if(d.messages[i].position == "disagree"){
		    			totalDisagree++;
		    		}
		    	}

		    	var r = calculateLinkRedValue(total, totalDisagree, totalNeutral, d);
		    	var g = calculateLinkGreenValue(total, totalAgree, totalNeutral, d);
		    	var b = calculateLinkBlueValue(total, totalNeutral, d);

		    	return rgbToHex(r,g,b); 
		    	});

      		var circle = svg.append("svg:g").selectAll("circle")
		    .data(force.nodes())
		  .enter().append("svg:circle")
		    .attr("r", "5")	
		    .attr("id", function(d){return "node-"+d.index})
		    .attr("class", "normal")		    
		    .attr("source", function(d){
		    	return d.name;
		    	})
		    .attr("fill", function(d){	    	
		    	return "gray";
		    	})
		    .call(force.drag);
      	
		var text = svg.append("svg:g").selectAll("g")
		    .data(force.nodes())
		  .enter().append("svg:g");	

	
		
		// A copy of the text with a thick white stroke for legibility.
		text.append("svg:text")
		    .attr("x", 8)
		    .attr("y", ".31em")
		    .attr("class", "shadow")
		    .attr("class",function(d) { return d.name; })
		    .text(function(d) { return d.name; });
		
		text.append("svg:text")
		    .attr("x", 8)
		    .attr("y", ".31em")
		    .attr("class",function(d) { return d.name; })
		    .attr("id",function(d) { return d.index; })
		    .text(function(d) { return d.name; });



		    circle.attr("cx", function(d) { return d.x = Math.max(6, Math.min(w - 6, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(6, Math.min(h - 6, d.y)); });
		
		  text.attr("transform", function(d) {
		    return "translate(" + d.x + "," + d.y + ")";
		  });
		
		  path
		    .attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });
			    
		    function getRadius(positionalWeight){
		    	
		    		var r = 6;
			    	if(positionalWeight != null){
			    		r = r + (2*positionalWeight);
			    	}
			    	if(r < 2){
			    		r = 2;
			    	}
			    	return r;
		    }
		    
		// Per-type markers, as they don't inherit styles.
		/*svg.append("svg:defs").selectAll("marker")
		    .data(["neutral", "agree", "disagree"])
		  .enter().append("svg:marker")
		    .attr("id", String)
		    .attr("viewBox", "0 -5 10 10")
		    .attr("refX", 10)
		    .attr("refY", -1.5)
		    .attr("markerWidth", 6)
		    .attr("markerHeight", 6)
		    .attr("orient", "auto")
		  .append("svg:path")
		    .attr("d", "M0,-5L10,0L0,5");*/
		
		
	    	/*.attr("marker-end", function(d) {
	    		var position = "neutral";
	    		
		    	if(d.value < 0){
		    		position = "disagree";
		    	}
		    	
		    	if(d.value > 0){
		    		position = "agree";
		    	}
		    	
	    		return "url(#" + position + ")"; 
	    	})*/;

		//

		function calculateLinkRedValue(total, totalDisagree, totalNeutral, d){
			var r = ((totalDisagree+totalNeutral/3) / total) * 200;
			rT = calculateTransparency(r, d);
			return rT;
		}

    	function calculateLinkGreenValue(total, totalAgree, totalNeutral, d){
    		var g = ((totalAgree+totalNeutral/3) / total) *200;
    		gT = calculateTransparency(g, d);
    		return gT;
    	}

    	function calculateLinkBlueValue(total, totalNeutral, d){
    		var b = ((totalNeutral/3) / total) * 200;
    		bT = calculateTransparency(b, d);
    		return bT;
    	}

    	function calculateTransparency(color, d){
    		var strongerRelation = findStrongerRelation();
    		var percentR = 0.2 + (((d.messages.length) / (strongerRelation)) * (0.8));
    		return 255 - (percentR * (255 - color));
    	}

    	function findStrongerRelation(){
    		var strongerRelation = 0;
    		var linkStrong;
    		for(var i = 0 ; i < links.length ; i++){
    			 if(links[i].messages.length > strongerRelation){
    			 	strongerRelation = links[i].messages.length;
    			 	linkStrong = links[i];
    			 }
    		}
    		return strongerRelation;
    	}
		
		function generalPosition(d){
			var position = "neutral";
	    	if(d.value > 50){
	    		position = "agree";
	    	}
	    	if(d.value < 50){
	    		position = "disagree";
	    	}
	    	return position;
	    }
	    
	    $('circle').mouseover(function() {    	
	    	var circle = $(this);
	    	var circleData = this.__data__;
	    	
	    	$('circle').each(function(){
	    		if(this.__data__.group != circleData.group){
	    			$(this).attr("opacity", 0.2);
	    		}
	    	});

	    	$('line').each(function(){
	    		var link = this.__data__;
	    		if((link.source.group != circleData.group) || (link.target.group != circleData.group)){
	    			$(this).attr("opacity", 0.2);
	    		} else {
	    			$(this).attr("opacity", 1);
	    		}
	    	});

	    	$('text').each(function(){	
				if("node-"+this.__data__.index == circle.attr("id")){
					$(this).show();				
				}
			});			
	    });
	    
	    $('circle').mouseout(function() {    	
			var circle = $(this);
			var circleData = this.__data__;
			
			$('circle').each(function(){
		    	$(this).attr("opacity", 1);
		    });

		    $('line').each(function(){
	    		$(this).attr("opacity", 1);
	    	});

			$('text').each(function(){		
				if("node-"+this.__data__.index == circle.attr("id")){
					$(this).hide();				
				}
			});	
	    });

	    var visitedElementsIds = [];
	    var visitMode = "all";
	    var numberPass = 0;

	    $('.select-visit-mode').change(function(){
	    	var modeSelected = $(".select-visit-mode option:selected").text();
	    	visitMode = modeSelected;
	    });
	    
		    $('circle').unbind('click').bind('click',function() {
		    numberPass = 0;
		    visitedElementsIds = [];
			var circleId = $(this).attr('id');
			var participant = this.__data__;
			$('.messages-control').hide();
			$('.title').remove();
			$('.container-messages-details').hide();
			$('.container-messages-details').children().remove();
			showDetailedInformation(participant);
			$(".ui-state-active").attr('aria-pressed','false');
			$(".ui-state-active").removeClass('ui-state-active');
			$(".radio-perspective").buttonset("enable") ;
			$('circle').each(function() {
				$(this).removeClass('selected');
				$(this).addClass('normal');	
				$(this).attr('r','5');
			});
			$(this).removeClass('normal');
			$(this).addClass('selected');
			$(this).attr('r','7');
			$('text').each(function(){		
				if("node-"+this.__data__.index == circleId){
					$(this).hide();				
				}
			});
			$('#radio-messages-sent').attr('checked', true);
			console.log($('label'));
			$($('label')[1]).trigger('click');
			$('.radio-perspective').trigger('click');

	    });

	    function getElements(circleLinks, circleNow){
	    	var markedElements = [];
	    	var idCircleNow = circleNow.__data__.index;
	    	visitedElementsIds.push(idCircleNow);
	    	var targetId = 0;
	    	var sourceId = 0;
	    	for (var i = 0 ; i < circleLinks.length ; i++){	 	    		
	    		targetId = circleLinks[i].target.index;
	    		sourceId = circleLinks[i].source.index;  		
	    		if(circleLinks[i].absoluteValue > 0){	    			
    				var stringTargetIdSelector = '#node-'+targetId;
    				var stringSourceIdSelector = '#node-'+sourceId;
	    			if((stringTargetIdSelector != '#node-'+idCircleNow) && (!isElementVisited(targetId))){
	    				var element = ($('svg').find(stringTargetIdSelector)[0]);
	    				markedElements.push(element);
	    			}
	    			if((stringSourceIdSelector != '#node-'+idCircleNow) && (!isElementVisited(sourceId))){
	    				var element = ($('svg').find(stringSourceIdSelector)[0]);
	    				markedElements.push(element);
	    			}
	    		}
	    	}
	    	return markedElements;
	    }

	    function isElementVisited(domEleIndex){
	    	for(var i = 0 ; i < visitedElementsIds.length ; i++){
	    		if(domEleIndex == visitedElementsIds[i]){
	    			return true;
	    		}
	    	}
	    	return false;
	    }
	    	    
	    function visitElements(toVisitElements, visitMode){
	    	if(visitMode == "all"){
		    	for(var i = 0 ; i < toVisitElements.length ; i++){
		    		findCircles(toVisitElements[i]);		    		
		    	}
		    }

		    if(visitMode == "one-pass"){
		    	for(var i = 0 ; i < toVisitElements.length ; i++){
		    		$(toVisitElements[i]).addClass('visited');
		    	}
		    }

		    if(visitMode == "two-pass"){
		    	
		    	if(numberPass < 2){
		    		numberPass++;
			    	for(var i = 0 ; i < toVisitElements.length ; i++){				    			    		
			    		findCircles(toVisitElements[i]);		    		
			    	}
		    	}
		    }
	    }

	    function showDetailedInformation(participant){
	    	showMessagesReceived(findAllMessagesReceived(participant), participant);
	    	showMessagesSent(findAllMessagesSent(participant), participant);
	    	showSupportersCritics(participant);
	    	/*showAllies(participant);*/
	    }
	    
	    /*function showAllies(participant){
	    	$('.up').before('<div id="title-participants-group" class="title title-participants-group">'+
		    	'<span id=title-span-participants-group class="title-span detail">Allies of '+participant.name+'</span>'+
		    	'</div>');
	    	var group = participant.group;

	    	console.log(group);

	    	$('.participants-group').append('<div class="message-details">'+	    		
		    		'<div class="container-participant-group container-detail"><span class="name-participant-group detail">Name: '+group.id+'</span></div>'+
		    '</div>');

	    	for(var i = 0 ; i < group.nodes.length ; i++){	 
	    		var nowName = group.nodes[i].name;
	    		if(participant.name != nowName){	    			
	    			$('.participants-group').append('<div id=participant-group-'+i+' class="message-details">'+	    		
		    		'<div id="container-participant-group" class="container-participant-group container-detail"><span id=name-participant-group-'+i+' class="name-participant-group detail">Name: '+nowName+'</span></div>'+
		    		'</div>');
		    	}
	    	}
	    }*/
	    
	    function showSupportersCritics(participant){
	    	for(var i = 0 ; i < participant.links.length ; i++){
	    		if(participant.links[i].absoluteValue > 0){
	    			var name = participant.links[i].source.name;
	    			if(name == participant.name){
	    				name = participant.links[i].target.name;
	    			}
	    			$('.participants-agree').append('<div id=participant-agree-'+i+' class=message-details>'+	    		
		    		'<div id="container-participant-agree" class="container-participant-agree container-detail">'+
		    			'<span id=name-participant-agree-'+i+' class="name-participant-agree detail">Nome: '+name+'</span> - '+
		    			'<span id=value-participant-agree-'+i+' class="value-participant-agree detail"> For&ccedil;a: '+participant.links[i].absoluteValue+'</span>'+
		    		'</div>'+
		    		'</div>');
	    		}
	    		
	    		if(participant.links[i].absoluteValue < 0){
	    			var name = participant.links[i].source.name;
	    			if(name == participant.name){
	    				name = participant.links[i].target.name;
	    			}
	    			$('.participants-disagree').append('<div id=participant-disagree-'+i+' class=message-details>'+	    		
		    		'<div id="container-participant-disagree" class="container-participant-disagree container-detail">'+
		    			'<span id=name-participant-disagree-'+i+' class="name-participant-disagree detail">Nome: '+name+'</span> - '+
		    			'<span id=value-participant-disagree-'+i+' class="value-participant-disagree detail"> For&ccedil;a: '+participant.links[i].absoluteValue+'</span>'+
		    		'</div>'+
		    		'</div>');
	    		}
	    	}
	    }
	    
	    function showMessagesSent(messagesSent, participant){
	    	
	    	var sender = participant.name;
	    	$('.up').before('<div id="title-messages-sent" class="title title-messages-sent">'+
	    		'<span id=title-span-messages-sent class="title-span detail">Messages sent by '+sender+'</span>'+
	    		'</div>');
		    				
	    	if(messagesSent.length > 0){	    		
	    		var height = $('.container-messages').height();
		    		
		    	for(var i = 0 ; i < messagesSent.length ; i++){
		    		
		    		var addressee = messagesSent[i].addressee;
					if(addressee == undefined){
						addressee = "N&atilde;o h&aacute;";
					}
		    		var content = messagesSent[i].content;
		    		var date = messagesSent[i].date;
					var time = messagesSent[i].time;
		    		var position = messagesSent[i].position;
					var positionText = "neutro";
					if(position == "agree"){
						positionText = "apoio";
					}
					if(position == "disagree"){
						positionText = "oposição";
					}
		    		
		    		$('.messages-sent').append('<div id=message-'+i+' class=message-details>'+	    		
		    		'<div id="container-addressee" class="container-sender container-detail"><span id=addressee-'+i+' class="addressee detail">Destinat&aacute;rio: '+addressee+'</span></div>'+
		    		'<div id="container-date" class="container-date container-detail"><span id=date-'+i+' class="date detail">Data: '+date+' - '+time+'</span></div>'+
		    		'<div id="container-content" class="container-content container-detail"><span id=content-'+i+' class="content detail">Conte&uacute;do: '+content+'</span></div>'+
		    		'<div id="container-position" class="container-position container-detail"><span id=position-'+i+' class="position-'+position+' detail">Posi&ccedil;&atilde;o: '+positionText+'</span></div>'+
		    		'</div>');
		    	}		    	
		    }
	    }
	    
	    function showMessagesReceived(messagesReceived, participant){
	    	var addressee = participant.name;
	    	
	    	$('.up').before('<div id="title-messages-received" class="title title-messages-received">'+
		    	'<span id=title-span-messages-received class="title-span detail">Messages received by '+addressee+'</span>'+
		    	'</div>');
		    	
	    	if(messagesReceived.length > 0){	    		
	    		var height = $('.container-messages').height();
		    	
		    	for(var i = 0 ; i < messagesReceived.length ; i++){
		    		
		    		var sender = messagesReceived[i].sender;
		    		var content = messagesReceived[i].content;
		    		var date = messagesReceived[i].date;
					var time = messagesReceived[i].time;
		    		var position = messagesReceived[i].position;
					var positionText = "neutro";
					if(position == "agree"){
						positionText = "apoio";
					}
					if(position == "disagree"){
						positionText = "oposição";
					}
		    		
		    		$('.messages-received').append('<div id=message-'+i+' class=message-details>'+	    		
		    		'<div id="container-sender" class="container-sender container-detail"><span id=sender-'+i+' class="sender detail">Remetente: '+sender+'</span></div>'+
		    		'<div id="container-date" class="container-date container-detail"><span id=date-'+i+' class="date detail">Data: '+date+' - '+time+'</span></div>'+
		    		'<div id="container-content" class="container-content container-detail"><span id=content-'+i+' class="content detail">Conte&uacute;do: '+content+'</span></div>'+
		    		'<div id="container-position" class="container-position container-detail"><span id=position-'+i+' class="position-'+position+' detail">Posi&ccedil;&atilde;o: '+positionText+'</span></div>'+
		    		'</div>');
		    	}		    	
		    }
	    }
	    
	    function findAllMessagesSent(participant){
	    	var name = participant.name;
	    	var participantMessages = [];
	    	for(var i = 0 ; i < messages.length ; i++){
	    		if(name == messages[i].sender){
	    			participantMessages.push(messages[i]);
	    		}
	    	}
	    	return participantMessages;
	    }
	    
	    function findAllMessagesReceived(participant){
	    	var name = participant.name;
	    	var participantMessages = [];
	    	for(var i = 0 ; i < messages.length ; i++){
	    		if((name == messages[i].addressee) && (name != messages[i].sender)){
	    			participantMessages.push(messages[i]);
	    		}
	    	}
	    	return participantMessages;
	    }
	    
	    function smartPathEnd(d,r){  
	    	if((d.source.x > d.target.x) && (d.source.y > d.target.y)){
	    		d.target.newX = d.target.x;
	    		d.target.newY = d.target.y + r;
	    	}
	    	
	    	if((d.source.x > d.target.x) && (d.source.y < d.target.y)){
	    		d.target.newX = d.target.x + r;
	    		d.target.newY = d.target.y;
	    	}
	    	
	    	if((d.source.x < d.target.x) && (d.source.y < d.target.y)){
	    		d.target.newX = d.target.x;
	    		d.target.newY = d.target.y - r;
	    	}
	    	
	    	if((d.source.x < d.target.x) && (d.source.y > d.target.y)){
	    		d.target.newX = d.target.x - r;
	    		d.target.newY = d.target.y;
	    	}
	    }
	    
	    	
		// Use elliptical arc path segments to doubly-encode directionality.
		function tick() {	
			
		path.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });
		  
		  circle.attr("cx", function(d) { return d.x = Math.max(6, Math.min(w - 6, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(6, Math.min(h - 6, d.y)); });
		
		  text.attr("transform", function(d) {
		    return "translate(" + d.x + "," + d.y + ")";
		  });
		  lastNodes = nodes;
		}
		$('svg').show();
	}
	
	 $(".radio-perspective").click(function () {
	 	$(this).children('input').each(function () { 
	 		if($(this).attr('checked')){
	 			var selectedRadioId = $(this).attr('id');
	 			var detailsArea = selectedRadioId.slice(6);
	 			$('.container-messages-details').hide();
	 			$('.title').hide();
	 			$('.messages-control').show();
	 			$('.title-'+detailsArea).show();
	 			$('.'+detailsArea).show();
	 		}
	 	});
	 });

	var nowMessages = [];
	var filteredMessages = [];
    var messagesCount = 0;
	var topicSelected = $(".select-topic option:selected").text();
	populateFilteredMessages();
	console.log(topicSelected);
	$(".select-topic").change(function() {
		filteredMessages = [];
		topicSelected = $(".select-topic option:selected").text();
		messagesCount = 0;
		nowMessages = [];
		$("svg").remove();
		populateFilteredMessages();
		$(".latest-message").trigger('click');
	});
	    
    function populateFilteredMessages(){
    	var nextMessage;
    	for(var i = 0 ; i < allMessages.length ; i++){
    		nextMessage = allMessages[i];
    		if(topicSelected == "all"){
				filteredMessages.push(nextMessage);
			} else {
				for(var j = 0 ; j < nextMessage.topics.length ; j++){
					if(nextMessage.topics[j] == topicSelected){
					filteredMessages.push(nextMessage);
					}
				}			
			}
    		
    	}

    }

    $(".next-message").click(function() {   
    	var nextMessage = filteredMessages[messagesCount];	
		nowMessages.push(nextMessage);
		console.log(filteredMessages);
		console.log(nowMessages);
		updateMessageBeforeNow(nowMessages);
		messagesCount++;

		if(nowMessages[nowMessages.length-1] != undefined){
			draw(nowMessages);
		}
		$(".radio-perspective").buttonset("disable") ;
		$(".previous-message").button("enable") ;
		$(".first-message").button("enable") ;
		if(filteredMessages.length <= messagesCount){
			$(".play").button("disable") ;
			$(".next-message").button("disable") ;
		}
	});
	
	$(".previous-message").click(function() {		
		nowMessages.pop();
		updateMessageBeforeNow(nowMessages);
		messagesCount--;
		draw(nowMessages);
		$(".radio-perspective").button("disable");
		$(".play").button("enable") ;
		$(".next-message").button("enable") ;
		$(".latest-message").button("enable") ;
		if(messagesCount == 0){
			$(".previous-message").button("disable") ;
		}
	});

	$(".latest-message").click(function() {	
		messagesCount = 0;
		nowMessages = [];
    	var nextMessage;
    	for(var i = 0 ; i < allMessages.length ; i++){
    		nextMessage = allMessages[i];
    		if(topicSelected == "all"){
    				nowMessages.push(nextMessage);
					messagesCount++;
    			} else {
    				for(var j = 0 ; j < nextMessage.topics.length ; j++){
	    			 	if(nextMessage.topics[j] == topicSelected){
	    				nowMessages.push(nextMessage);
						messagesCount++;
					}
				}
    		}
    	}
    	updateMessageBeforeNow(nowMessages);
		draw(nowMessages);
		$(".radio-perspective").buttonset("disable") ;
		$(".play").button("disable") ;
		$(".next-message").button("disable") ;
		$(".latest-message").button("disable") ;
		$(".first-message").button("enable") ;
		$(".previous-message").button("enable") ;
	});

	$(".first-message").click(function() {
		messagesCount = 0;
		nowMessages = [];
		nowMessages.push(allMessages[messagesCount]);
		updateMessageBeforeNow(nowMessages);
		draw(nowMessages);
		messagesCount++;
		$(".radio-perspective").buttonset("disable") ;
		$(".play").button("enable") ;
		$(".next-message").button("enable") ;
		$(".latest-message").button("enable") ;
		$(".first-message").button("disable") ;
		$(".previous-message").button("disable") ;
	});

	function updateMessageBeforeNow(messagesNow){

		$('.message-now-sender').html('Sender: '+ messagesNow[messagesNow.length-1].sender);
		$('.message-now-content').html('Content: '+ messagesNow[messagesNow.length-1].content);
		$('.message-now-addressee').html('Addressee: '+ messagesNow[messagesNow.length-1].addressee);
		$('.message-now-position').html('Position: '+ messagesNow[messagesNow.length-1].position);

	}

var countdown;
var countdown_number;

function countdown_trigger() {
    if(countdown_number > 0) {
        countdown_number--;
        $(".next-message").trigger('click');
        if(countdown_number > 0) {
            countdown = setTimeout(  
			    function() {  
			        countdown_trigger();  
			    },  
			    1000  
			);
        }
    }
}

function countdown_init() {
    countdown_number = filteredMessages.length;
    countdown_trigger();
}

	$(".play").click(function() {		
		if($($(this).children()[0]).hasClass('ui-icon-play')){
			countdown_init();
		} else {
			countdown_number = 0;
		}
	});
$(".latest-message").trigger('click');

$('.refresh-icon').click(function(){
	numberPass = 0;
	draw(nowMessages);
	$('.select-visit-mode').trigger('change');
});
}
