function getDiscussionFromTextBox(){
	var selectableTopics = [];			
	var discussionText = localStorage.getItem('storedDiscussion');
	console.log(discussionText);
	$("#divDiscussion").hide();
	$(".container-page").show();
	var messages = [];
	var structuredDiscussion = discussionText.split(/\n/);

	for(var i = 1 ; i < structuredDiscussion.length ; i++){
		var dividedMessage = structuredDiscussion[i].split(/\t/);
		var message = new Message(dividedMessage[0],dividedMessage[1],dividedMessage[2],dividedMessage[3].trim(),dividedMessage[4],dividedMessage[6],dividedMessage[7]);
		message.addTopics(dividedMessage[5]);
		selectableTopics = populateTopicsVector(message.topics,selectableTopics);		
		messages.push(message);
		console.log(selectableTopics);
	}
	populateSelectTopics(selectableTopics);
	return messages;
}



function Message(id,sender,date,time,content,position,addressee){
	this.id = id;
	this.sender = sender;
	this.date = date;
	this.time = time;
	this.content = content;
	this.topics = [];
	this.addTopics = addTopics;
	this.position = position;
	this.addressee = addressee;

	function addTopics(topics){			
		var dividedTopics = topics.split(";");
		for(var i = 0 ; i < dividedTopics.length ; i++){
			this.topics.push(dividedTopics[i]);
		}		
	}
}

function populateTopicsVector(messageTopics,selectableTopics){
	for(var i = 0 ; i < messageTopics.length ; i++){
		var nowTopic = messageTopics[i];
		var topicExists = false;
		for(var j = 0 ; j < selectableTopics.length ; j++){			
			if(nowTopic == selectableTopics[j]){
				topicExists = true;
			}
		}
		if(topicExists==false){
			selectableTopics.push(nowTopic);
		}
	}
	return selectableTopics;
}

function populateSelectTopics(selectableTopics){
	for(var i = 0 ; i < selectableTopics.length ; i++){
		$(".select-topic").append("<option>"+selectableTopics[i]+"</option>")
	}
}