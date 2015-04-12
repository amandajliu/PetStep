$(document).ready(function() {
	$(".main-tabs").click(function() {
		var tabid = $(this).attr('id');
		tabid = tabid.substring(4);
		$(".main-tabs").removeClass('active');
		$(".main-panes").removeClass('active');
		$("#tab-" + tabid).addClass('active');
		$("#pane-" + tabid).addClass('active');
	});
});

// Timeline js
$(document).ready(function($){
	var $timeline_block = $('.cd-timeline-block');

	//hide timeline blocks which are outside the viewport
	$timeline_block.each(function(){
		if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
			$(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
			console.log($(this).find('.cd-timeline-img, .cd-timeline-content'))
		}
	});

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		$timeline_block.each(function(){
			console.log($(this).offset().top);
			console.log($(window).scrollTop()+$(window).height()*0.80);
			if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.80 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
				$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
			}
		});
	});
});
