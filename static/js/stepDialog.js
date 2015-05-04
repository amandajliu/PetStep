/* -------------------------------
Listings stuff
Original Designs for the dialogue box inspired and built from
http://thecodeplayer.com/walkthrough/jquery-multi-step-form-with-progress-bar
-------------------------------*/

var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
$(window).load(function() {
  $(".next").click(function(){
  	if(animating) return false;
  	animating = true;

  	current_fs = $(this).parent();
  	next_fs = $(this).parent().next();

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
  });

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

  $(".submit").click(function(){
  	return false;
  })

  $(".cancel").click(function() {
    $(".form-containers").addClass("hide");
    return false;

  })
});

var petclick = function() {
  var $inputs = $('#pet-fieldset :input');
  petValues = $inputs.serializeArray();
  petValues = JSON.parse(petValues[0].value);
  console.log(petValues);
  petValueList = {"petInfo": [petValues]}
  var petReviewTemplate = $('#petReviewTemplate').html();
  Mustache.parse(petReviewTemplate);
  var rendered = Mustache.render(petReviewTemplate, petValueList);
  console.log(rendered);
  $("#petInfoReview").html(rendered);
}

var personalclick = function() {
  var $inputs = $('#personal-fieldset :input');
  personalValues = $inputs.serializeArray();
  personalValues = JSON.parse(personalValues[0].value);
  personalValueList = {"personalInfo": [personalValues]}
  var personalReviewTemplate = $('#personalReviewTemplate').html();
  Mustache.parse(personalReviewTemplate);
  var rendered = Mustache.render(personalReviewTemplate, personalValueList);
  console.log(rendered);
  $("#personalInfoReview").html(rendered);
  // not sure if you wanted this, but I thought I'd add it.
  // get an associative array of just the values.
  // personalValues = {};
  // $inputs.each(function() {
  //     personalValues[this.name] = $(this).val();
  // });
  console.log(personalValues);
}

var additionalclick = function() {
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
  console.log(additionalValues)
  additionalValueList = {"additionalInfo": [additionalValues]}
  var additionalReviewTemplate = $('#additionalReviewTemplate').html();
  Mustache.parse(additionalReviewTemplate);
  var rendered = Mustache.render(additionalReviewTemplate, additionalValueList);
  console.log(rendered);
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
}
