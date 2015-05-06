var currentUser;

var setUser = function(user) {
	currentUser = $.grep(profileData.users, function(elt) {
		return elt.username === user;
	})[0];

}

var loadProfile = function() {
	var profileTemplate = $("#profile-template").html();
	Mustache.parse(profileTemplate);
	var rendered = Mustache.render(profileTemplate, currentUser);
	$("#profileBar").prepend(rendered);
	if (currentUser.username != 'cornelio') {
		$('.tab-private').hide();
	}

	var reviewsTemplate = $("#review-outer-template").html();
	Mustache.parse(reviewsTemplate);
	var rendered = Mustache.render(reviewsTemplate, currentUser);
	$("#reviews-row").prepend(rendered);
	var ownerReviewCounts = [0,0,0,0,0];
	var petReviewCounts = [0,0,0,0,0];
	var totalReviews = currentUser.reviews.length;
	if (totalReviews > 0) {
		for (i = 0; i < totalReviews; i++) {
			ownerReviewCounts[currentUser.reviews[i].ownerRating-1]++;
			petReviewCounts[currentUser.reviews[i].petRating-1]++;
		}
		var reviewInnerTemplate = $("#review-inner-template").html();
		Mustache.parse(reviewInnerTemplate);
		for (i = 1; i < 6; i++) {
			var reviewSummary = {};
			reviewSummary.index = i;
			reviewSummary.totalReviews = totalReviews;
			var owner = Mustache.render(reviewInnerTemplate, {'index': i, 'totalReviews': totalReviews, 'width': (ownerReviewCounts[i-1]/totalReviews*100)+'%'});
			$('#owner-reviews').prepend(owner);
			var pet = Mustache.render(reviewInnerTemplate, {'index': i, 'totalReviews': totalReviews, 'width': (petReviewCounts[i-1]/totalReviews*100)+'%'});
			$("#pet-reviews").prepend(pet);
		}
	} else {
		$("#owner-reviews").append("<h2><small>No reviews yet!<small><h2>");
		$("#pet-reviews").append("<h2><small>No reviews yet!<small><h2>");
	}
}

$(document).ready(function() {
	var user = $.getUrlVar('user');
      if (user) {
        setUser(user);
      }
      else {
        setUser("cornelio");
      }
	console.log(currentUser);
	loadProfile();
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
      if (!stars) {
      	return;
      }
      for (var i = 0; i < 5; i++) {
          if (i < stars) {
              $(this).append(starFilled);
          }
          else {
              $(this).append(starEmpty);
          }
      }

  });
  	$('.Switch').click(function() {
		$(this).toggleClass('On').toggleClass('Off');
	});
	var favorites = $('#favoritesTemplate').html();
	Mustache.parse(favorites);
	var petListings = $.grep(listingsData.petListings, function(elt) {
		elt.favorite === true;
	});
	var personListings = $.grep(listingsData.personListings, function(elt) {
		elt.favorite === true;
	});
	var favRendered = Mustache.render(favorites, {'petListings': petListings, 'personListings': personListings});
	$("#favsContainer").append(favRendered);

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

var loadConversation = function(username) {
	var conversation = $.grep(messageData.conversations, function(elt) {
		return elt.user === username;
	})[0];
	var sentMessageTemp = $('#messages-template-sent').html();
	Mustache.render(sentMessageTemp);
	var receivedMessageTemp = $('#messages-template-received').html();
	Mustache.render(receivedMessageTemp);
	for (var i = 0; i < conversation.messages.length; i++) {

	}
}
// Messages
$(document).ready(function() {

	// if (currentUser.username ==='cornelio') {
	// 	var messageContent = $.grep(messageData.conversations, function(elt) {
	// 		elt.
	// 	})

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

	    $('#message-text').keyup(function(event) {
	    	if (event.keyCode === 13) {
	    		$('#message-send').click();
	    	}
	    });

	    $('.message-name').click(function() {
	    	if (!$(this).hasClass('current')) {
	    		$('.message-name').removeClass('current');
	    		$(this).addClass('current');
	    	}
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

//Active Listing - Hiring dialog

$(document).ready(function(){
	$( "#dialog" ).dialog({ autoOpen: false });
	$( "#hiringButton" ).click(function() {
  		$( "#dialog" ).dialog( "open" );
	});

	$( "#dialog" ).submit(function( event ) {
		event.preventDefault();
		var ownerName = $("input[type='text'][name='SitterName']").val();
  		var accountStatus = $("input[type='radio'][name='accountStatus']:checked");
  		if (accountStatus == 'yesAcct') {
			$( "#hiringButton" ).remove();
			$(".petExpandRight").append("<p>You've hired" + " <a href='profile.html?user=" + ownerName + "'>" + ownerName + "</a> as your sitter!</p>");
			$( "#dialog" ).dialog( "close" );
			$(this).dialog('destroy').remove()
  		} else {
			$( "#hiringButton" ).remove();
			$(".petExpandRight").append("<p>You've hired" + " <a href='profile.html?user=" + ownerName + "'>" + ownerName + "</a> as your sitter!</p>");  			
			$( "#dialog" ).dialog( "close" );
  			$(this).dialog('destroy').remove()
  		};
	});

});

// Accordion js
// Thanks to http://stackoverflow.com/questions/20347553/bootstrap-3-collapse-accordion-collapse-all-works-but-then-cannot-expand-all-wh

// Active Listings tab
$(document).ready(function(){

    var active = false;
    var alflag = true;


    // collapse or expand all
    $('#collapse-init').click(function () {
        if (active) {
            active = false;
            $('.panel-collapse').collapse('show');
            $('.panel-title').attr('data-toggle', '');
            $(this).text('Collapse All');
        } else {
            active = true;
            $('.panel-collapse').collapse('hide');
            $('.panel-title').attr('data-toggle', 'collapsed');
            $(this).text('Expand All');
        }
        if (alflag) {
			$('#menuArrow').addClass('glyphicon-triangle-right');
			$('#menuArrow').removeClass('glyphicon-triangle-bottom');
			alflag = false;
		} else {
			$('#menuArrow').addClass('glyphicon-triangle-bottom');
			$('#menuArrow').removeClass('glyphicon-triangle-right');
			alflag = true;
		}
    });

    // toggle individual header things

	$('#alExpandTitle').click(function () {
		if (alflag) {
			$('#menuArrow').addClass('glyphicon-triangle-right');
			$('#menuArrow').removeClass('glyphicon-triangle-bottom');
			alflag = false;
		} else {
			$('#menuArrow').addClass('glyphicon-triangle-bottom');
			$('#menuArrow').removeClass('glyphicon-triangle-right');
			alflag = true;
		}
	})

    $('#accordion').on('show.bs.collapse', function () {
        if (active) $('#accordion .in').collapse('hide');
    });

});

// Collapse or expand all logic for Pets tab

$(document).ready(function(){

    var active = false;
	var petArrowFlag = true;

    $('#collapse-init1').click(function () {
        if (active) {
            active = false;
            $('.panel-collapse').collapse('show');
            $('.panel-title').attr('data-toggle', '');
            $(this).text('Collapse All');
        } else {
            active = true;
            $('.panel-collapse').collapse('hide');
            $('.panel-title').attr('data-toggle', 'collapsed');
            $(this).text('Expand All');
        }
        if (petArrowFlag) {
			$('#petArrow').addClass('glyphicon-triangle-right');
			$('#petArrow').removeClass('glyphicon-triangle-bottom');
			petArrowFlag = false;
		} else {
			$('#petArrow').addClass('glyphicon-triangle-bottom');
			$('#petArrow').removeClass('glyphicon-triangle-right');
			petArrowFlag = true;
		}
    });

	$('#petExpandTitle').click(function () {
		if (petArrowFlag) {
			$('#petArrow').addClass('glyphicon-triangle-right');
			$('#petArrow').removeClass('glyphicon-triangle-bottom');
			petArrowFlag = false;
		} else {
			$('#petArrow').addClass('glyphicon-triangle-bottom');
			$('#petArrow').removeClass('glyphicon-triangle-right');
			petArrowFlag = true;
		}
	})

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
