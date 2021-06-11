/* Dynamic Window Ajax Content */
"use strict";

var $actual2= null;
var obert2=false;
$(".last-news").click(function() {
		obre2($(this).attr('id'));
		$actual2=$(this);
});
		
function obre2(quin2){
	$.ajax({
		url: quin2,
		success: function(data) {					
			$('.news-content').html(data);
			$(".news-content").hide(0)
			$('.news-window').hide(0)	
			tanca2();
			canvia2();	
			$("html, body").animate({ scrollTop: $('#news-show').offset().top - (200) }, 500, function(){
				$('.news-window').show(0);
				$('.news-window').css('height','0');
				$('.news-window').animate({height:760}, 1000,function(){
					$('.news-window').css('height','760');
					$(".news-content").fadeIn("slow");
				});				
			});
		}
	});
}
/**/
function canvi2(quin2){
	var obert2=true;
	$.ajax({
		url: quin2,
		success: function(data) {					
			$('.news-content').html(data);
			tanca2();
			canvia2();
			$("html, body").animate({ scrollTop: $('#news-show').offset().top - (200) }, 500, function(){
				$('.news-window').show(0);
				$('.news-window').animate({height:760}, 1000,function(){
					$('.news-window').css('height','760');
					$(".news-content").fadeIn("slow");
				});				
			});
		}
	});
}
/**/
function tanca2(){
	$(".close2-btn").click(function() {
		$(".news-window").slideUp("slow");
		$(".news-content").fadeOut("slow");
		$("html, body").animate({ scrollTop: $('#anchor01').offset().top }, 1000);
		obert2=false;
	});
}
function seguent(){
	if($actual2.next().hasClass('end')){
		$(".news-content").fadeOut("slow");
		$actual2=$($('.start').next());
	}else{
		$(".news-content").fadeOut("slow");
		$actual2=$($actual2.next());
	}
	if($actual2.hasClass('isotope-hidden')){
		seguent();
	}else{
		$(".news-content").fadeOut("slow");
		canvi2($actual2.attr('id'));
	}
}
function enrera(){
	if($actual2.prev().hasClass('start')){
		$(".news-content").fadeOut("slow");
		$actual2=$($('.end').prev());
	}else{
		$(".news-content").fadeOut("slow");
		$actual2=$($actual2.prev());
	}

	if($actual2.hasClass('isotope-hidden')){
		enrera();
	}else{
		$(".news-content").fadeOut("slow");
		canvi2($actual2.attr('id'));
	}
}
function canvia2(){
	$('.news-next').click(function() {
		seguent();
	});
	$('.news-prev').click(function() {
		enrera();
	});
}