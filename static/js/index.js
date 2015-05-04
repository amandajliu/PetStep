var loadListings = function() {
  var listingTemplate = $('#listingTemplate').html();
  Mustache.parse(listingTemplate);
  var rendered = Mustache.render(listingTemplate, listingsData);
  $('#feedContainer').prepend(rendered);
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

var toggleUser = function() {
  // TODO: Remove pet pics and place sitters <-> Remove sitters and place pet pics
}

var filterListings = function(filterOptClass, filterClass, filterClassNoDot,attrName, jqueryObj){
  if(jqueryObj.is(':checked')){ //checking
    console.log("checked");
    if($.inArray(filterClass, nonBlankFilters) == -1){
      nonBlankFilters.push(filterClass);
    }
    var filterString = listToString(nonBlankFilters);
    console.log(filterString);
    if($('#sitterButton').hasClass('active')){

      $('.petListing['+attrName+'="'+ jqueryObj.attr('id')+'"]').addClass(filterClassNoDot);
      $('.petListing'+filterClass).removeClass('hide');
      $('.petListing:not('+filterString+')').addClass('hide');
      $container.masonry('destroy');
      $container = $('#feedContainer');
      $container.imagesLoaded(function(){
        $container.masonry({
          itemSelector:filterString,
          'isFitWidth':true
        });

      })
    }else{
      $('.personListing['+attrName+'="'+ jqueryObj.attr('id')+'"]').addClass(filterClassNoDot);
      $('.personListing'+filterClass).removeClass('hide');
      $('.personListing:not('+filterString+')').addClass('hide');
      $container.masonry('destroy');
      $container = $('#feedContainer');
      $container.imagesLoaded(function(){
        $container.masonry({
          itemSelector:filterString,
          'isFitWidth':true
        });

      })
    }

  }else{ //unchecking
    console.log("not checked");
    if($(filterOptClass+':checked').length == 0){
      console.log("last filter");
      nonBlankFilters.splice($.inArray(filterClass,nonBlankFilters),1);
      var filterString = listToString(nonBlankFilters);
      $(filterClass).removeClass(filterClassNoDot);
      if($('#sitterButton').hasClass('active')){

        $('.petListing'+filterString).not(filterClass).removeClass('hide'); //anything that had been previously filtered by petType and that should still be filtered in by other filters is now visible
      }else{
        $('.personListing'+filterString).not(filterClass).removeClass('hide'); //anything that had been previously filtered by petType and that should still be filtered in by other filters is now visible
      }
      $container.masonry('destroy');
      $container = $('#feedContainer');
      $container.imagesLoaded(function(){
        $container.masonry({
          itemSelector:filterString,
          'isFitWidth':true
        });
      });

    }else{
      var filterString = listToString(nonBlankFilters);
        $('.petListing['+attrName+'="'+ jqueryObj.attr('id')+'"]').removeClass(filterClassNoDot);
        $('.petListing['+attrName+'="'+ jqueryObj.attr('id')+'"]').addClass('hide');
        $container.masonry('destroy');
        $container = $('#feedContainer');
        $container.imagesLoaded(function(){
          $container.masonry({
            itemSelector:filterString,
            'isFitWidth':true
          });

        });

    }

  }
}

var changeTags = function(){
  var newSearchParams = [];
  var checked = $('.filterOpt:checked').each(function(){
    if($(this).attr('id') == "userToggle") {
      toggleUser();
      return;
    }

    if($(this).attr('class') != "sortBy"){
      var label = $("label[for='" + $(this).attr('id')+"']").html();
      newSearchParams.push(label);
    }
  });
  for(var i=0; i < newSearchParams.length;  i++){
    var newParam = '<article class="param"> '+newSearchParams[i]+"</article>";
    $('#searchParams').html(newParam + $('#searchParams').html());
  }
}


var changeDist = function(){
  if($('#slider').slider("value") == -1 || $('#slider').slider("value") == 0){
    var unit = "mile";
  }else{
    var unit = "miles";
  }
  var initDist = "< "  + $('#slider').slider("value") + " "+unit;
  var initDistDiv = "<div class='param'>"+initDist+"</div>";

  $('#searchParams').html(initDistDiv + $('#searchParams').html());

}

var listToString = function(list){
  ans="";
  for(var i=0; i < list.length; i ++){
    ans = ans.concat(list[i]);
  }
  return ans;
}

$(document).ready(function(){
  loadListings();
  loadPresets();
  nonBlankFilters = [];
  $('#sortByDistance').attr('checked','checked');
  $('.filterOpt').change(function(){
    $('#searchParams').html("");
    changeDist();
    changeTags();

  });
  $('.sortPerson').css('display','none');
  $('.filter').hover(function(){
    $(this).css('background-color','#e7e7e7');
  },
  function(){
    $(this).css('background-color','#f8f8f8');
  });



  $("#slider").on('slidechange', function(event, ui){
    $('#searchParams').html("");
    changeTags();
    changeDist();
  });


  /*slideup layer on listings*/
  $('.listing').hover(
    function(){
      if (!this.wasClicked) {
        $(this).find('div.listingInfo').slideDown(300);
      }
    },
    function(){
      if (!this.wasClicked) {
        $(this).find('div.listingInfo').slideUp(300);
      }
    }
  );

  $('.listing').click(
    function() {
      if(!this.wasClicked) {
        $(this).find('div.listingInfo').slideDown(300);
        this.wasClicked = true;
      } else {
        $(this).find('div.listingInfo').slideUp(300);
        this.wasClicked = false;
      }
    }
  );

  $(".listingContent").click(function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  })

  $(".add-to-favs-button").click(function(event) {
    $(this).parent().slideDown(300);
    // Yeah I know this is ridiculous
    // Used for grabing containing listing div from button click
    $(this).parent().parent().parent().parent()[0].wasClicked = true;

  })

  $('.filterOpt').change(
    function(){
      console.log("clicked filterOpt");
      if($(this).hasClass("petTypeFilterOpt")){
        console.log('about to call filterlistings pettype');
        console.log($(this));
        filterListings('.petTypeFilterOpt','.petTypeFilter','petTypeFilter','petType', $(this));
      }else if($(this).hasClass("sitterTypeFilterOpt")){
        filterListings('.sitterTypeFilterOpt','.sitterTypeFilter','sitterTypeFilter','sitterType', $(this));
      }else if($(this).hasClass("payFilterOpt")){
        filterListings('.payFilterOpt','.paymentFilter','paymentFilter','payment', $(this));
      }else if($(this).hasClass("durationLengthFilterOpt")){
        filterListings('.durationLengthFilterOpt','.durationLengthFilter','durationLengthFilter','durationLength', $(this));
      }else if($(this).hasClass("durationTypeFilterOpt")){
        filterListings('.durationTypeFilterOpt','.durationTypeFilter','durationTypeFilter','durataionType',$(this));
      }
    }
  )
});

$(window).load(function() {
  var marg = $('#_header').css('height');
  $('#feedContainer').css('margin-top', marg);

  $('.personListing').addClass('hide');
  $('#sitterButton').click(function(){
    $(this).addClass('active');
    $('#ownerButton').removeClass('active');

    $('.sortPet').css('display','block');
    $('.sortPerson').css('display','none');
    $('.petListing').removeClass('hide');
    $('.personListing').addClass('hide');
    $container.masonry('destroy');
    $container = $('#feedContainer');
    $container.imagesLoaded(function(){
      $container.masonry({
        itemSelector:'.petListing',
        'isFitWidth':true
      });

    })
  })

  $('#ownerButton').click(function(){
    $(this).addClass('active');
    $('#sitterButton').removeClass('active');

    $('.sortPerson').css('display','block');
    $('.sortPet').css('display','none');
    $('.personListing').removeClass('hide');
    $('.petListing').addClass('hide');
    $container.masonry('destroy');
    $container = $('#feedContainer');
    $container.imagesLoaded(function(){
      $container.masonry({
        itemSelector:'.personListing',
        'isFitWidth':true
      });

    })


  })

  $("#addListing").click(function() {
    $('.form-containers').removeClass("hide");
    return false;
  })
})

$(function(){
  $('#slider').slider({
    value:10,
    min:1,
    max:100,
    step:1,
    slide: function(event, ui){
      if(ui.value == 1){
        $('#dist').val("< "+ ui.value + " mile");

      }else{
        $('#dist').val("< "+ ui.value + " miles");
      }
    },
    change: function(event, ui){}
  });
  var initDist = "< "+ $('#slider').slider("value") + " mile";
  var initDistDiv = "<div class='param'>"+initDist+"</div>";
  $('#dist').val("< "+ $('#slider').slider("value") + " mile");
  $('#searchParams').html(initDistDiv);
});
$(function(){
  $container = $('#feedContainer');
  $container.imagesLoaded(function(){
    $container.masonry({
      itemSelector:'.petListing',
      'isFitWidth':true
    });

  })
})
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
