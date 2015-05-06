var currentUser = null;
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
}

var loadActiveListings = function() {
	var activeTemplate = $("#activeListingTemplate").html();
	Mustache.parse(activeTemplate);
	rendered = Mustache.render(activeTemplate, activeListing);
	$("#activeListingsContent").html(rendered);
}

var loadFavorites = function() {
	var favorites = $('#favoritesTemplate').html();
	Mustache.parse(favorites);
	var petListings = $.grep(listingsData.petListings, function(elt) {
		return elt.favorite === true;
	});
	var personListings = $.grep(listingsData.personListings, function(elt) {
		return elt.favorite === true;
	});
	var favRendered = Mustache.render(favorites, {'petListings': petListings, 'personListings': personListings});
	$("#favsContainer").append(favRendered);
}

var hideFavorites = function() {
	$('#favsContainer').hide();
}

var showFavorites = function() {
	$('#favsContainer').show();
}

var loadReviews = function() {
	var reviewsTemplate = $("#review-outer-template").html();
	Mustache.parse(reviewsTemplate);
	var ownerReviewCounts = [0,0,0,0,0];
	var petReviewCounts = [0,0,0,0,0];
	var totalReviews = currentUser.reviews.length;
	var totalOwnerRating = 0;
	var totalPetRating = 0;
	if (totalReviews > 0) {
		for (i = 0; i < totalReviews; i++) {
			ownerReviewCounts[currentUser.reviews[i].ownerRating-1]++;
			petReviewCounts[currentUser.reviews[i].petRating-1]++;
			totalOwnerRating += currentUser.reviews[i].ownerRating;
			totalPetRating += currentUser.reviews[i].petRating;
		}
		currentUser.ownerRating = totalOwnerRating / totalReviews;
		currentUser.petRating = totalPetRating / totalReviews;
		var rendered = Mustache.render(reviewsTemplate, currentUser);
		$('#reviews-row').empty();
		$("#reviews-row").prepend(rendered);
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
		var rendered = Mustache.render(reviewsTemplate, currentUser);
		$('#reviews-row').empty();
		$("#reviews-row").prepend(rendered);
		$("#owner-reviews").append("<h2><small>No reviews yet!<small><h2>");
		$("#pet-reviews").append("<h2><small>No reviews yet!<small><h2>");
	}
	var reviewsTemplate = $('#review-template').html();
	Mustache.parse(reviewsTemplate);
	var rendered = Mustache.render(reviewsTemplate, {'reviews': currentUser.reviews});
	$('#reviews-area').empty();
	$('#reviews-area').append(rendered);
	console.log(currentUser.reviews);
}

var loadPets = function() {
	var pets = currentUser.pets;
	var petTemplate = $('#petProfileTemplate').html();
	Mustache.parse(petTemplate);
	var rendered = Mustache.render(petTemplate, {"pets": pets, "currentUser": currentUser.currentUser});
	$('#pane-pets').append(rendered);
}

var loadStars = function() {
	console.log('loading stars');
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
}


var loadPetInfo = function() {
  var petInfoTemplate = $('#petInfoTemplate').html();
  Mustache.parse(petInfoTemplate);
  var rendered = Mustache.render(petInfoTemplate, petInfo);
  $("#petPreset").prepend(rendered);
}

var loadPersonalInfo = function() {
  var personalInfoTemplate = $('#personalInfoTemplate').html();
  Mustache.parse(personalInfoTemplate);
  var rendered = Mustache.render(personalInfoTemplate, personalInfo);
  $("#userPreset").prepend(rendered);
}

var loadPresets = function() {
  loadPetInfo();
  loadPersonalInfo();
}

var loadFavorites = function() {
	var favorites = $('#favoritesTemplate').html();
	Mustache.parse(favorites);
	var petListings = $.grep(listingsData.petListings, function(elt) {
		return elt.favorite === true;
	});
	var personListings = $.grep(listingsData.personListings, function(elt) {
		return elt.favorite === true;
	});
	console.log(petListings);
	var favRendered = Mustache.render(favorites, {'petListings': petListings, 'personListings': personListings});
	$("#favsContainer").append(favRendered);
}

var hideFavorites = function() {
	$('.fav').hide();
}

var showFavorites = function() {
	$('.fav').show();
}
$(document).ready(function() {
	var user = $.getUrlVar('user');
  if (user) {
    setUser(user);
  }
  else {
    setUser("cornelio");
  }
	var tab = $.getUrlVar('tab');
	console.log(tab);
	if (tab) {
		if (tab === 'review') {
			setTimeout(function() {
				$('#tab-reviews').trigger('click');
			}, 50)
		} else if (tab === 'pet') {
			setTimeout(function() {
				$('#tab-pets').trigger('click');
			}, 50)
		}
	}

	loadProfile();

	loadFavorites();
	loadActiveListings();
	hideFavorites();
	$('#lilyCornelioRev').click(function(){
		$('#tab-reviews').trigger('click');
	})

	var tab = $.getUrlVar('tab');
	if (tab === 2) {
		showFavorites();
	}
	$(".main-tabs").click(function() {
		var tabid = $(this).attr('id');
		tabid = tabid.substring(4);
		$(".main-tabs").removeClass('active');
		$(".main-panes").removeClass('active');
		$("#tab-" + tabid).addClass('active');
		$("#pane-" + tabid).addClass('active');
		if (tabid === 'favorites') {
			showFavorites();
			/*$container.masonry('destroy');
			$container = $('#feedContainer');
	    $container.imagesLoaded(function(){
	      $container.masonry({
	        itemSelector:'.fav',
	        'isFitWidth':true
	      });
	    });*/
		} else {
			hideFavorites();
		}
	});

	$('.publicProfile').hide();
	if (currentUser.username === 'cornelio') {
		$('#publicProfileCornelio').show();
	}
	else if (currentUser.username === 'lily') {
		$('#publicProfileLily').show();
	}
	else if (currentUser.username === 'flynn') {
		$('#publicProfileFlynn').show();
	}
	$(".fav-btn").click(function() {
		console.log($(this).closest('.listing'));
    $(this).closest('.listing').addClass('hide');
    /*$container.masonry('destroy');
    $container = $('#feedContainer');
    $container.imagesLoaded(function(){
      $container.masonry({
        itemSelector:'.fav',
        'isFitWidth':true
      });
    });*/
  });


	// load reviews
	loadReviews();
	loadStars();

  $('#submit-review-form').click(function() {
  	var ownerRating = $('input[name=rating-input-owner]:checked').val();
  	var petRating = $('input[name=rating-input-pet]:checked').val();
  	var message = $('#review-text').val();
  	var review = {
  		'reviewer': "Cornelio",
  		'reviewerImg': "Cornelio.png",
  		'reviewTime': "just now",
  		'owner': currentUser.firstName,
  		'pet': currentUser.pets[0].petName,
  		'ownerRating': parseInt(ownerRating),
  		'petRating': parseInt(petRating),
  		'message': message
  	};
  	currentUser.reviews.push(review);
  	loadReviews();
  	console.log(currentUser.reviews);
  	loadStars();
  	$('#add-review-form').modal('hide');
  });

  	$('.Switch').click(function() {
		$(this).toggleClass('On').toggleClass('Off');
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

	$(".listingContent").click(function(event) {
	/*  event.preventDefault();*/
		event.stopPropagation();
	/*  return false;*/
	})
});

var loadConversation = function(username) {
	$('.messages-right').empty();
	var conversation = $.grep(messageData.conversations, function(elt) {
		return elt.user === username;
	})[0];
	var sentMessageTemp = $('#messages-template-sent').html();
	Mustache.parse(sentMessageTemp);
	var receivedMessageTemp = $('#messages-template-received').html();
	Mustache.parse(receivedMessageTemp);
	for (var i = 0; i < conversation.messages.length; i++) {
		if (conversation.messages[i].messageType === 'sent') {
			var newMessage = Mustache.render(sentMessageTemp, {"content": conversation.messages[i].messageText});
		} else {
			var newMessage = Mustache.render(receivedMessageTemp, {"content": conversation.messages[i].messageText, "userImg": conversation.userImg});
		}
		$('.messages-right').append(newMessage);
	}
}
// Messages
$(document).ready(function() {

	// if (currentUser.username ==='cornelio') {
	// 	var messageContent = $.grep(messageData.conversations, function(elt) {
	// 		elt.
	// 	})
	// Used for add listing dialogue
	loadPresets();

	var messaging = $.getUrlVar('messaging');
	if (!messaging) {
		messaging = 'lily';
	}
	var name = $('.message-name[data-user='+messaging+']')[0];
	if (!$(name).hasClass('current')) {
		$('.message-name').removeClass('current');
		$(name).addClass('current');
	}
	var user = $.grep(profileData.users, function(elt) {
		return elt.username === messaging
	})[0];

	loadConversation(messaging);

	    // send button click
	    $('#message-send').click(function() {
	        // var message = $('#message-text').val();
	        // var newMessageHTML = "<div class='row'>\
	        // <div class='col-xs-1'>\
	        // <img class='img img-circle' width='40px' height='40px' src='static/images/Cornelio.png' margin='4px' />\
	        // </div>\
	        // <div class='well well-sm m-person-1 col-xs-10'>" + message + "</div></div>";
	        // $('.messages-right').append(newMessageHTML);
	        var conversation = $.grep(messageData.conversations, function(elt) {
	        	return elt.user === messaging;
	        })[0];
	        conversation.messages.push({'messageType': 'sent', 'messageText': $('#message-text').val()});
	        loadConversation(messaging);
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
	    		var name = $(this).data('user');
	    		var user = $.grep(profileData.users, function(elt) {
					return elt.username === name;
				})[0];
				loadConversation(name);
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
	// $( "#dialog" ).dialog({ autoOpen: false });
	// $( ".hiringButton" ).click(function() {
	// 	console.log("this is happening");
  // 		$( "#dialog" ).dialog( "open" );
	// });
	// $('.ui-dialog-titlebar-close').html('<span class="glyphicon glyphicon-remove"></span>')

	//
	// $( "#dialog" ).submit(function( event ) {
	// 	event.preventDefault();
	// 	var ownerName = $("input[type='text'][name='SitterName']").val();
  // 		var accountStatus = $("input[type='radio'][name='accountStatus']:checked");
  // 		if (accountStatus == 'yesAcct') {
	// 		$( ".hiringButton" ).remove();
	// 		$(".petExpandRight").append("<p>You've hired" + " <a href='profile.html?user=" + ownerName + "'>" + ownerName + "</a> as your sitter!</p>");
	// 		$( "#dialog" ).dialog( "close" );
	// 		$(this).dialog('destroy').remove()
  // 		} else {
	// 		$( ".hiringButton" ).remove();
	// 		$(".petExpandRight").append("<p>You've hired" + " <a href='profile.html?user=" + ownerName + "'>" + ownerName + "</a> as your sitter!</p>");
	// 		$( "#dialog" ).dialog( "close" );
  // 			$(this).dialog('destroy').remove()
  // 		};
	// });
	// $( "#dialog" ).dialog({ autoOpen: false });
	// $( "#hiringButton" ).click(function() {
  // 		$( "#dialog" ).dialog( "open" );
	// });
	// $('.ui-dialog-titlebar-close').html('<span class="glyphicon glyphicon-remove"></span>')
	// $('#hireSitter').autocomplete({
	// 	source:[
	// 		'Flynn Rider',
	// 		'Lily Paxton',
	// 		'Penny Marshall',
	// 		'Missy Clinton',
	// 		'Lin Mei',
	// 		'Stephanie Castle',
	// 		'Doug Schumaker',
	// 		'Janet Mason',
	// 		'Craig Newton'
	// 	],
	// 	minLength:2,
	//
	// });
	//
	// $( "#dialog" ).submit(function( event ) {
	// 	event.preventDefault();
	// 	var ownerName = $("input[type='text'][name='SitterName']").val();
  // 		var accountStatus = $("input[type='radio'][name='accountStatus']:checked");
  // 		if (accountStatus == 'yesAcct') {
	// 		$( "#hiringButton" ).remove();
	// 		$(".petExpandRight").append("<p>You've hired" + " <a href='profile.html?user=" + ownerName + "'>" + ownerName + "</a> as your sitter!</p>");
	// 		$( "#dialog" ).dialog( "close" );
	// 		$(this).dialog('destroy').remove()
  // 		} else {
	// 		$( "#hiringButton" ).remove();
	// 		$(".petExpandRight").append("<p>You've hired" + " <a href='profile.html?user=" + ownerName + "'>" + ownerName + "</a> as your sitter!</p>");
	// 		$( "#dialog" ).dialog( "close" );
  // 			$(this).dialog('destroy').remove()
  // 		};
	// });

});

// Accordion js
// Thanks to http://stackoverflow.com/questions/20347553/bootstrap-3-collapse-accordion-collapse-all-works-but-then-cannot-expand-all-wh

// Active Listings tab
$(document).ready(function(){

    var active = false;
    var alflag = true;
    loadPets();

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

    $('.accordion').on('show.bs.collapse', function () {
        if (active) $('.accordion .in').collapse('hide');
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

    $('.accordion').on('show.bs.collapse', function () {
        if (active) $('.accordion .in').collapse('hide');
    });

		$(".addListing").click(function() {
			// console.log("Trying to add a listing");
			// e.preventDefault();
			$('.form-containers').removeClass("hide");
			// console.log($('.form-containers')[0]);
			return false;
		})

	$('.hiringButton').click(function() {
		// hiringContainer = this.parent().parent();
		hiringButton = this;
		$('#hireDialogBackground').show();
		$('#hireDialogDiv').show();
	})

	$('#submitHire').click(function( event ) {
		event.preventDefault();
		var parent = $(hiringButton).parent().parent();

		var ownerName = $('#hireSitterName').val();
		var asYes = $('#accountStatusYes')[0];
		var asNo = $('#accountStatusNo')[0];
		if (!ownerName) {
			alert("You need to pick someone to sit for your pet");
			return false;
		} else if (!asYes.checked && !asNo.checked) {
			alert("You need to select one option for account status");
			return false;
		}

		if (asYes.checked) {
			if (ownerName === 'Flynn Rider') {
				ownerUserName = 'flynn';
			} else {
				ownerUserName = 'lily';
			}
			parent.find(".petExpandRight").html("<p>You've hired" + " <a href='profile.html?user=" + ownerUserName + "'>" + ownerName + "</a> as your sitter!</p>");
			$('#hireDialogBackground').hide();
			$('#hireDialogDiv').hide();
		} else {
			parent.find(".petExpandRight").html("<p>You've hired "  + ownerName + " as your sitter!</p>");
			$('#hireDialogBackground').hide();
			$('#hireDialogDiv').hide();

		}

		return false;
	})


  $('#cancelHire').click(function() {
		console.log("im clicking this");
		$('#hireDialogBackground').hide();
		$('#hireDialogDiv').hide();
	})

	$('#hireSitterName').autocomplete({
		source:[
			'Flynn Rider',
			'Lily Paxton',
			'Penny Marshall',
			'Missy Clinton',
			'Lin Mei',
			'Stephanie Castle',
			'Doug Schumaker',
			'Janet Mason',
			'Craig Newton'
		],
		minLength:1,

	});

	$('#hireDialogBackground').hide();
	$('#hireDialogDiv').hide();
});


/*$(function(){
  $container = $('#favsContainer');
  $container.imagesLoaded(function(){
    $container.masonry({
      itemSelector:'.fav',
      'isFitWidth':true
    });
  })
});*/
