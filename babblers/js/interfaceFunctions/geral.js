/**
 * @author Rafael
 * @descrição: Este arquivo .js é arquivo que contém alterações de interface
 */

$(document).ready(function() {
  $('.group-visualisations').show();

  $('.about').click(function(){    
    localStorage.setItem('menuItem',$(this).find('a').attr('href'));
    location.href = '../index.html';
  });

  $('.tutorial').click(function(){    
    localStorage.setItem('menuItem',$(this).find('a').attr('href'));
    location.href = '../index.html';
  });

  $('.import-discussion').click(function(){    
    localStorage.setItem('menuItem',$(this).find('a').attr('href'));
    location.href = '../index.html#import-discussion';
  });

  $('.group-visualisations').click(function(){
    if($(this).attr('id') == 'visualisations-babblers'){
      location.href = '../babblers/index.html';
    }
    if($(this).attr('id') == 'visualisations-popularity'){
      location.href = '../popularity/index.html';
    }
    if($(this).attr('id') == 'visualisations-alliance'){
      location.href = '../allianceNetwork/index.html';
    }
    if($(this).attr('id') == 'visualisations-polemic'){
      location.href = '../polemicTree/index.html';
    }
  });
    $(".btn_babblers").click(function() {
    	$("#divCanvas").css("display", "block");
    	$("#canvas").css("display", "block");
    	$("#divCanvasTitleBabblers").css("display", "block");
    	$("#divCanvasTitleMessagesOverTime").css("display", "none");
     	$("#messagesList").css("display", "block");
     	$("#paragrafoRelatorio").css("display", "block");
     	$("#divDiscussion").css("display", "none");
   });
   
   $(".btn_messagesOverTime").click(function() {
    	$("#divCanvas").css("display", "block");
    	$("#canvas").css("display", "block");
    	$("#divCanvasTitleBabblers").css("display", "none");
    	$("#divCanvasTitleMessagesOverTime").css("display", "block");
     	$("#messagesList").css("display", "block");
     	$("#paragrafoRelatorio").css("display", "block");
     	$("#divDiscussion").css("display", "none");
   });
   
   $(".babblers").click(function() {
   	    $("#divCanvas").css("display", "none");
    	$("#canvas").css("display", "none");
    	$("#divCanvasTitleBabblers").css("display", "none");
    	$("#divCanvasTitleMessagesOverTime").css("display", "none");
     	$("#messagesList").css("display", "none");
     	$("#paragrafoRelatorio").css("display", "none");
     	$(".btn_babblers").css("display", "block");
     	$(".btn_messagesOverTime").css("display", "none");
   		$("#divDiscussion").css("display", "block");
   		$(".titleBabblers").css("display","block");
   		$(".titleMessagesOverTime").css("display","none");
   		
   	}); 
   	
   	   $(".messagesOverTime").click(function() {
   	    $("#divCanvas").css("display", "none");
    	$("#canvas").css("display", "none");
    	$("#divCanvasTitleBabblers").css("display", "none");
    	$("#divCanvasTitleMessagesOverTime").css("display", "none");
     	$("#messagesList").css("display", "none");
     	$("#paragrafoRelatorio").css("display", "none");
     	$(".btn_babblers").css("display", "none");
     	$(".btn_messagesOverTime").css("display", "block");
   		$("#divDiscussion").css("display", "block");
   		$(".titleBabblers").css("display","none");
   		$(".titleMessagesOverTime").css("display","block");
   		
   	}); 	   
    acaoIniciar();
 });