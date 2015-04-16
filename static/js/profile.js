$(document).ready(function() {
	$(".main-tabs").click(function() {
		var tabid = $(this).attr('id');
		tabid = tabid.substring(4);
		$(".main-tabs").removeClass('active');
		$(".main-panes").removeClass('active');
		$("#tab-" + tabid).addClass('active');
		$("#pane-" + tabid).addClass('active');
	});


// Reviews show stars
  var starFilled = "<span class='glyphicon glyphicon-star'></span>";
  var starEmpty = "<span class='glyphicon glyphicon-star-empty'></span>";
  $(".starsHere").each(function() {
      var stars = parseInt($(this).data("stars"));
      for (var i = 0; i < 5; i++) {
          if (i < stars) {
              $(this).append(starFilled);
          }
          else {
              $(this).append(starEmpty);
          }
      }

  });
	$('.fav').addClass('hide');
	$('.main-tabs').click(function(){
		if($(this).attr('id')=='tab-favorites'){
			$('.fav').removeClass('hide');
			$container.masonry('destroy');
			$container = $('favsContainer');
			$container.imagesLoaded(function(){
				$container.masonry({
					itemSelector:'.petListing',
					'isFitWidth':true
				});

			})
		}else{
			$('.fav').addClass('hide');
		}

	});



	$('.fav').hover(
		function(){
			if (!this.wasClicked) {
				$(this).find('div.listingInfo').slideDown();
			}
		},
		function(){
			if (!this.wasClicked) {
				$(this).find('div.listingInfo').slideUp();
			}
		}
	);

	$('.fav').click(
		function() {
			if(!this.wasClicked) {
				$(this).find('div.listingInfo').slideDown();
				this.wasClicked = true;
			} else {
				$(this).find('div.listingInfo').slideUp();
				this.wasClicked = false;
			}
		}
	);
});

// Messages
$(document).ready(function() {
    // send button click
    $('#message-send').click(function() {
        var message = $('#message-text').val();
        var newMessageHTML = "<div class='row'>\
        <div class='col-xs-1'>\
        <img class='img img-circle' width='40px' height='40px' src='static/images/Cornelio.png' margin='4px' />\
        </div>\
        <div class='well well-sm m-person-1 col-xs-10'>" + message + "</div></div>";
        $('.messages-right').append(newMessageHTML);
        $('#message-text').val('');
    });

    $('#popup-messages').click(function() {
        $('#messages-popup').css('visibility', 'visible');
    });

    $('#messages-popup-close').click(function() {
        $('#messages-popup').css('visibility', 'hidden');
    });
});

// Timeline js
$(document).ready(function($){
	var $timeline_block = $('.cd-timeline-block');

	//hide timeline blocks which are outside the viewport
	$timeline_block.each(function(){
		if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.80) {
			$(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		}
	});

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		if ($('#tab-history')[0].className == "main-tabs active" ) {
			$timeline_block.each(function(){
				if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.80 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
					$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
				}
			});
		}
	});
});
// Active Listing - Hiring dialog

// $(document).ready(function(){
// 	$( "#dialog" ).dialog({ autoOpen: false });
// 	$( "#hiringButton" ).click(function() {
//   		$( "#dialog" ).dialog( "open" );
// 	});
// });

// Accordion js
// Thanks to http://stackoverflow.com/questions/20347553/bootstrap-3-collapse-accordion-collapse-all-works-but-then-cannot-expand-all-wh
// Collapse or expand all logic for Active Listing tab
$(document).ready(function(){

    var active = false;

    $('#collapse-init').click(function () {
        if (active) {
            active = false;
            $('.panel-collapse').collapse('show');
            $('.panel-title').attr('data-toggle', '');
            $(this).text('Collapse All');
        } else {
            active = true;
            $('.panel-collapse').collapse('hide');
            $('.panel-title').attr('data-toggle', 'collapse');
            $(this).text('Expand All');
        }
    });

    $('#accordion').on('show.bs.collapse', function () {
        if (active) $('#accordion .in').collapse('hide');
    });

});

// Collapse or expand all logic for Pets tab

$(document).ready(function(){

    var active = false;

    $('#collapse-init1').click(function () {
        if (active) {
            active = false;
            $('.panel-collapse').collapse('show');
            $('.panel-title').attr('data-toggle', '');
            $(this).text('Collapse All');
        } else {
            active = true;
            $('.panel-collapse').collapse('hide');
            $('.panel-title').attr('data-toggle', 'collapse');
            $(this).text('Expand All');
        }
    });

    $('#accordion').on('show.bs.collapse', function () {
        if (active) $('#accordion .in').collapse('hide');
    });

});
$(window).load(function(){


	$('#sitterButton').click(function(){
		$(this).addClass('activeSwitch');
		$('#petButton').removeClass('activeSwitch');
		$('.petListing').removeClass('hide');
		$('.personListing').addClass('hide');
		$container.masonry('destroy');
		$container = $('favsContainer');
		$container.imagesLoaded(function(){
			$container.masonry({
				itemSelector:'.petListing',
				'isFitWidth':true
			});

		})
	})

	$('#petButton').click(function(){
		$(this).addClass('activeSwitch');
		$('#sitterButton').removeClass('activeSwitch');
		$('.personListing').removeClass('hide');
		$('.petListing').addClass('hide');
		$container.masonry('destroy');
		$container = $('#favsContainer');
		$container.imagesLoaded(function(){
			$container.masonry({
				itemSelector:'.personListing',
				'isFitWidth':true
			});

		})


	})
})

$(function(){
  $container = $('#favsContainer');
  $container.imagesLoaded(function(){
    $container.masonry({
      itemSelector:'.petListing',
      'isFitWidth':true
    });
  })
});
