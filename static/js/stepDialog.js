/* -------------------------------
Listings stuff
Original Designs for the dialogue box inspired and built from
http://thecodeplayer.com/walkthrough/jquery-multi-step-form-with-progress-bar
-------------------------------*/

var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
$(window).load(function() {

  $(".previous").click(function(){
  	if(animating) return false;
  	animating = true;

  	current_fs = $(this).parent();
  	previous_fs = $(this).parent().prev();

  	//de-activate current step on progressbar
  	$("#steps li").eq($("fieldset").index(current_fs)).removeClass("_active");


  	//hide the current fieldset with style
  	current_fs.animate({opacity: 0}, {
  		step: function(now, mx) {
  			//as the opacity of current_fs reduces to 0 - stored in "now"
  			//1. scale previous_fs from 80% to 100%
  			scale = 0.8 + (1 - now) * 0.2;
  			//2. take current_fs to the right(50%) - from 0%
  			left = ((1-now) * 50)+"%";
  			//3. increase opacity of previous_fs to 1 as it moves in
  			opacity = 1 - now;
  			current_fs.css({'left': left});
  			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
  		},
  		duration: 400,
  		complete: function(){
  			current_fs.hide();
        //show the previous fieldset
        previous_fs.fadeIn();
  			animating = false;
  		},
  		//this comes from the custom easing plugin
  		easing: 'easeInOutBack'
  	});
  });

  $('#pet-next').click(function(e) {
    var $inputs = $('#pet-fieldset :input');
    petValues = $inputs.serializeArray();
    if (petValues.length < 1) {
      alert("You need to select one option");
      return false;
    }
    petValues = JSON.parse(petValues[0].value);
    petValueList = {"petInfo": [petValues]}
    var petReviewTemplate = $('#petReviewTemplate').html();
    Mustache.parse(petReviewTemplate);
    var rendered = Mustache.render(petReviewTemplate, petValueList);
    $("#petInfoReview").html(rendered);
    nextStep(this);
  });

  $('#personal-next').click(function(e) {
    var $inputs = $('#personal-fieldset :input');
    personalValues = $inputs.serializeArray();
    if (personalValues.length < 1) {
      alert("You need to select one option");
      return false;
    }
    personalValues = JSON.parse(personalValues[0].value);
    personalValueList = {"personalInfo": [personalValues]}
    var personalReviewTemplate = $('#personalReviewTemplate').html();
    Mustache.parse(personalReviewTemplate);
    var rendered = Mustache.render(personalReviewTemplate, personalValueList);
    $("#personalInfoReview").html(rendered);
    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
    // personalValues = {};
    // $inputs.each(function() {
    //     personalValues[this.name] = $(this).val();
    // });
    nextStep(this);
  });

  $('#additional-next').click(function(e) {
    var $inputs = $('#additional-fieldset');
    additionalValues = $inputs.serializeArray();
    var tmpObject = {};
    for (var i = 0; i < additionalValues.length; i++) {
      var label = additionalValues[i].name;
      var value = additionalValues[i].value;
      if (label === "sitterType" || label ==="payment") {
        if (tmpObject.hasOwnProperty(label)){
          tmpObject[label].push({"type": value});
        } else {
          tmpObject[label] = [{"type": value}]
        }
      } else {
        tmpObject[label] = value;
      }
    }
    additionalValues = tmpObject;
    if (!additionalValues['startDate'] || !additionalValues['endDate']) {
      alert("Missing start/end date");
      return false;
    } else if (!additionalValues['jobType']) {
      alert("Missing Job Type");
      return false;
    } else if (!additionalValues['sitterType']) {
      alert("You need at least one sitter type");
      return false;
    } else if (!additionalValues['payment']) {
      alert("You need at least one payment option selected");
      return false;
    }
    additionalValueList = {"additionalInfo": [additionalValues]}
    var additionalReviewTemplate = $('#additionalReviewTemplate').html();
    Mustache.parse(additionalReviewTemplate);
    var rendered = Mustache.render(additionalReviewTemplate, additionalValueList);
    $("#additionalInfoReview").html(rendered);
    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
    // additionalValues = {};
    // $inputs.each(function() {
    //    if (this.name === "sitterType" || this.name === "payment") {
    //      if (!additionalValues.hasOwnProperty(this.name)) {
    //        additionalValues[this.name] = [];
    //      }
    //      additionalValues[this.name].push($(this).val());
    //    } else {
    //      additionalValues[this.name] = $(this).val();
    //    }
    // });
    // console.log(additionalValues);
    nextStep(this);
  });


  $(".submit").click(function(){
    // currentPageProfile is defined in profile.html/index.html
    // if (!currentPageProfile) {
    console.log("adding stuff");
    // Do stuff to landing page
    var newListingData = {};
    newListingData['ownerFirstName'] = personalValues['ownerFirstName'];
    newListingData['ownerLastName'] = personalValues['ownerLastName'];
    newListingData['ownerUsername'] = "cornelio";
    newListingData['petName'] = petValues['petName'];
    newListingData['petType'] = petValues['petType'];
    newListingData['petTypeAttr'] = petValues['petType'].toLowerCase().replace(/\s/g, '_');
    newListingData['petImg'] = petValues['petImage'];
    newListingData['zipcode'] = personalValues['zip'];
    newListingData['startDate'] = additionalValues['startDate'];
    newListingData['endDate'] = additionalValues['endDate'];
    var joinedPayments = additionalValues['payment'];
    var tmpPayments = [];
    for (var i = 0; i < joinedPayments.length; i++) {
      tmpPayments.push(joinedPayments[i].type)
    }
    joinedPayments = tmpPayments;
    // console.log(joinedPayments);
    joinedPaymentsFixed = joinedPayments.join(', ');
    newListingData['payment'] = joinedPaymentsFixed;
    var paymentString = joinedPayments.join('_ _');
    paymentString = '_' + paymentString + '_';
    newListingData['paymentAttr'] = paymentString;

    var joinedSitterType = additionalValues['sitterType'];
    var tmpSitterType = [];
    for (var i = 0; i < joinedSitterType.length; i++) {
      tmpSitterType.push(joinedSitterType[i].type)
    }
    joinedSitterType = tmpSitterType;
    newListingData['sitterType'] = joinedSitterType.join(', ');
    newListingData['sitterAttr'] = joinedSitterType.join(' ').toLowerCase();
    newListingData['durationType'] = additionalValues['jobType']
    newListingData['durationTypeAttr'] = additionalValues['jobType'].toLowerCase().replace('-', '');
    newListingData['durationLengthAttr'] = '1wkmonth';
    listingsData['petListings'].unshift(newListingData);
    loadListings();
    createMasonry();
    reloadListeners();
    $(".form-containers").addClass("hide");
  	return false;
  })

  $(".submitProfile").click(function(){
    $(".form-containers").addClass("hide");
    return false;
  })

  $(".cancel").click(function() {
    $(".form-containers").addClass("hide");
    return false;

  })
});

var nextStep = function(target){
  if(animating) return false;
  animating = true;
  current_fs = $(target).parent();
  next_fs = $(target).parent().next();

  //activate next step on progressbar using the index of next_fs
  $("#steps li").eq($("fieldset").index(next_fs)).addClass("_active");


  //hide the current fieldset with style
  current_fs.animate({opacity: 0}, {
    step: function(now, mx) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale current_fs down to 80%
      scale = 1 - (1 - now) * 0.2;
      //2. bring next_fs from the right(50%)
      left = (now * 50)+"%";
      //3. increase opacity of next_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({'transform': 'scale('+scale+')'});
      next_fs.css({'left': left, 'opacity': opacity});
    },
    duration: 400,
    complete: function(){
      current_fs.hide();
      //show the next fieldset
      next_fs.fadeIn();
      animating = false;
    },
    //this comes from the custom easing plugin
    easing: 'easeInOutBack'
  });
};

$(function() {
  $('#startDate').datepicker({
    defaultDate: "+1w",
    minDate: 0,
    onClose: function( selectedDate ) {
        $( "#endDate" ).datepicker( "option", "minDate", selectedDate );
      }
  });
  $('#endDate').datepicker({
    defaultDate: "+1w",
    minDate: 0,
    nClose: function( selectedDate ) {
        $( "#startDate" ).datepicker( "option", "maxDate", selectedDate );
      }
  });

})
