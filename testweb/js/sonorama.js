"use strict";
	$(document).ready(function () {
		if ($(".player").length>0) { //If there are video backgrounds
            $(".player").mb_YTPlayer();
            jQuery('.player').on("YTPPause",function(){
			   jQuery('.play-video').removeClass('playing');
			});
            jQuery('.player').on("YTPStart",function(){
			   jQuery('.play-video').addClass('playing');
			});
			jQuery('.play-video').on('click', function(e) {
				if (jQuery('.play-video').hasClass('playing')) {
					jQuery(".player").pauseYTP();
				} else {
					jQuery('audio').each(function (i,e) {
			            this.pause(); 
			        });
					jQuery(".player").playYTP();
				}
				
				e.preventDefault();
			});
        }
	});

	/*Validation*/	
	$("#contact").validate({
		submitHandler: function(form) {
			$(form).ajaxSubmit();
			$('.formSent').show();
		}
	});
	
	/* Loading */
	$(window).load(function() {
		$(".loader").delay(500).fadeOut();
		$("#mask").delay(1000).fadeOut("slow");
	});
	
	/* Jump Menu */
	function loadJump(){
		$('.jump-menu').click(function() {
			if($('#nav2').hasClass('active')){
				$('#nav2').removeClass('active');
			}else{
				$('#nav2').addClass('active');
			}
		})
		
		$('#nav2 ul li a').click(function(){
			$('#nav2').removeClass('active');
		});
	}loadJump();

	/* News Carousel */
	function loadNewsSlider(){
		var amplecar = $(".last-news-container ul li").length;
		var ampleitem = 300;
		var amplelist = amplecar*ampleitem;
		$('.last-news-container ul').css('width', amplelist)
		//alert(amplelist);
		
		var index = 0;
		var pos = 1;
		$(".last-news-next").click(function(){
		  if( index != amplecar-4){
			index++;
			$(".news-box").stop().animate({scrollLeft:ampleitem*index},'slow');
		  }
		 });
		$(".last-news-prev").click(function(){
		  if( index!=0 ){
			  index--;
			  $(".news-box").stop().animate({scrollLeft:ampleitem*index},'slow');
		  }
		});
		//alert(amplecar-1)
	}loadNewsSlider() /* end News Carousel */
	
	/* Menu Anchors */
	$('a[href*=#]').click(function() {
	 if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
		 var $target = $(this.hash);
		 $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
		 if ($target.length) {
			 var targetOffset = $target.offset().top;
			 $('html,body').animate({scrollTop: targetOffset-50}, 1000);
			 return false;
			}
		}
	});
	
	/* Slider AutoChanging Title */
	function loadTitleAnimated(){
		var myInterval;
		var contador = 1;
		var myFunc = function() {
			var cur = $('.main-title ul li').length;
			//alert(contador);
			if(cur == contador) {;
					$('.main-title ul li.t-current').removeClass('t-current');
					$('.main-title ul li').first().addClass('t-current');
					contador = 1;
				} else {
					contador++;
					$('.main-title ul li.t-current').removeClass('t-current').next().addClass('t-current');
				}
		};
		myInterval = setInterval(myFunc, 5000); // Set Animation Interval in Miliseconds
	}loadTitleAnimated()
	
	/* Dates Carousel */
	/* Caroussel One Images & Two Queues */
	function loadCarousel(){
		
		var amplecar = $(".dates-wrapper ul li").length;
		var ampleitem = 400;
		var amplelist = amplecar*ampleitem;
		$(".dates-wrapper ul").css('width', amplelist)
	
		var itemscar= $(".dates-wrapper ul li").length;

		var fragment = document.createDocumentFragment(), 
		li = document.createElement('li');
		while (itemscar--) {
			fragment.appendChild(li.cloneNode(true));
		}
		$('.controller ul').append(fragment);
		
		var index = 0;
		var pos = 1;
		$('.controller ul li:first-child').addClass('selected');
		
		$(".controller ul li").click(function(){
			ampleitem= 400;
			index = $(this).index();
			$(".dates-wrapper").stop().animate({scrollLeft:ampleitem*index},'slow');
			 $('.controller ul li').removeClass('selected');
			$(this).addClass('selected');
			//alert(ampleitem);
		});
		$(".dates-nav .next").click(function(){
				if( index != $(".controller ul li").size()-1){
				  index++;
				  $(".dates-wrapper").stop().animate({scrollLeft:ampleitem*index},'slow');
				  pos++;
				  $('.controller ul li.selected').removeClass('selected').next().addClass('selected');
			}
		   });
		$(".dates-nav .prev").click(function(){
		  if( index!=0 ){
			  index--;
			  $(".dates-wrapper").stop().animate({scrollLeft:ampleitem*index},'slow');
			  pos--;
			  $('.controller ul li.selected').removeClass('selected').prev().addClass('selected');
		  }
		});
	}
	loadCarousel();

	/* Discography player btns */
      $(document).ajaxComplete(function() {
      	$("audio").on("play", function (me) {
      		if (jQuery(".player").length>0) jQuery(".player").pauseYTP();
	         jQuery('audio').each(function (i,e) {
	              if (e != me.currentTarget)
	              { 
	                  this.pause(); 
	              }
	         });
	 	});
		$(".btn-play").on('click', function() {
			$(".btn-play").show();
			$(".btn-pause").hide();
			$(this).hide();
			$(".btn-pause").show();
		});

		$(".btn-pause").on('click', function() {
		   $(this).hide();
		   $(".btn-play").show();
		});
	});
	
	/* Twitter */
	function loadTwitter(){
			var username='vesper_on'; // Insert your twitter Username
			var format='json';
			var url='http://api.twitter.com/1/statuses/user_timeline/'+username+'.'+format+'?callback=?'; // Creamos la URL completa para extraer el último tweet
 
			/*$.getJSON(url,function(tweet){ // Geting all tweets
			$("#last-tweet").html(tweet[0].text); // cogemos el primer tweet y lo introducimos dentro del div con id last-tweet
	});*/
	}
	loadTwitter();
	
	 /* end Document Ready Function */
