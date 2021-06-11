/* Dynamic Window Ajax Content */
"use strict";

var $actual= null;
var obert=false;
$(".open-disc").click(function() {
		obre($(this).attr('id'));
		$actual=$(this);
});
		
function obre(quin){
$.ajax({
	url: quin,
	success: function(data) {					
		$('.project-content').html(data);
		$(".project-content").hide(0)
		$('.project-window').hide(0)	
		tanca();
		$("html, body").animate({ scrollTop: $('#project-show').offset().top - (200) }, 300, function(){
			$('.project-window').show(0);
			$('.project-window').css('height','0');
			$('.project-window').animate({height:550}, 500,function(){
				$('.project-window').css('height',550); /*$('.project-window').css('height','auto');*/
				$(".project-content").fadeIn("slow");
			});				
		});
	}
});
}

function tanca(){
	$(".close-btn").click(function() {
		$(".project-window").slideUp("slow");
		$(".project-content").fadeOut("slow");
		$("html, body").animate({ scrollTop: $('#anchor03').offset().top -(50) }, 1000);
		obert=false;
	});
}