var loadListings = function() {
  var listingTemplate = $('#listingTemplate').html();
  Mustache.parse(listingTemplate);
  var rendered = Mustache.render(listingTemplate, listingsData);
  $('#feedContainer').html(rendered);
}

var loadPetInfo = function() {
  var petInfoTemplate = $('#petInfoTemplate').html();
  Mustache.parse(petInfoTemplate);
  var rendered = Mustache.render(petInfoTemplate, petInfo);
  $("#petPreset").prepend(rendered);
}
var createMasonry = function(){
  //recreates the masonry with the pet listings
  $('.personListing').addClass('hide');
  $container.masonry('destroy'); //destroys the previous masonry object (if this errors, just delete it)
  $container = $('#feedContainer');
  $container.imagesLoaded(function(){
    $container.masonry({
      itemSelector:'.petListing',
      'isFitWidth': true
    });

  })
}
var createMasonryPerson = function(){
  //recreates the masonry with the pet listings
  $('.petListing').addClass('hide');
  $container.masonry('destroy'); //destroys the previous masonry object (if this errors, just delete it)
  $container = $('#feedContainer');
  $container.imagesLoaded(function(){
    $container.masonry({
      itemSelector:'.personListing',
      'isFitWidth': true
    });

  })
}

var sortByStartDate = function(a,b){
  var aStart = a.startDate;
  var bStart = b.startDate;
  var aStartArray = aStart.split('/');
  var bStartArray = bStart.split('/');
  var a = [];
  var b = [];
  for(var i=0; i<aStartArray.length;i++){
    a.push(parseInt(aStartArray[i]));
    b.push(parseInt(bStartArray[i]));
  }
  return((a[2]<b[2]) ? -1 : ((a[2] > b[2]) ? 1 : ((a[0] < b[0]) ? -1 : ((a[0] > b[0]) ? 1 : ((a[1] < b[1]) ? -1 : ((a[1] > b[1]) ? 1 : 0))))));
}
var sortByEndDate = function(a,b){
  var aStart = a.endDate;
  var bStart = b.endDate;
  var aStartArray = aStart.split('/');
  var bStartArray = bStart.split('/');
  var a = [];
  var b = [];
  for(var i=0; i<aStartArray.length;i++){
    a.push(parseInt(aStartArray[i]));
    b.push(parseInt(bStartArray[i]));
  }
  return((a[2]<b[2]) ? -1 : ((a[2] > b[2]) ? 1 : ((a[0] < b[0]) ? -1 : ((a[0] > b[0]) ? 1 : ((a[1] < b[1]) ? -1 : ((a[1] > b[1]) ? 1 : 0))))));
}
var sortByOwnerLastName = function(a,b){
  var aName = a.ownerLastName.toLowerCase();
  var bName = b.ownerLastName.toLowerCase();
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}
var sortBySitterLastName = function(a,b){
  var aName = a.sitterLastName.toLowerCase();
  var bName = b.sitterLastName.toLowerCase();
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}
var sortByPetType = function(a,b){
  var aName = a.petType.toLowerCase();
  var bName = b.petType.toLowerCase();
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}
var durationToNum = function(p){
  if(p == "1day"){
    return 0;
  }else if(p == "1wk"){
    return 1;
  }else if(p == "1wkmonth"){
    return 2;
  }else{
    return 3;
  }
}
var sortByDuration = function(a,b){
  var aDuration = durationToNum(a.durationLengthAttr);
  var bDuration = durationToNum(b.durationLengthAttr);
  return ((aDuration < bDuration) ? -1 : ((aDuration > bDuration) ? 1 : 0))

}

var sortByZipcode = function(a,b){
  var aName = parseInt(a.zipcode);
  var bName = parseInt(b.zipcode);
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
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
  console.log(attrName);
  console.log(jqueryObj.attr('id'));
  if(jqueryObj.is(':checked')){ //checking
    console.log("checked");
    if($.inArray(filterClass, nonBlankFilters) == -1){
      nonBlankFilters.push(filterClass);
    }
    var filterString = listToString(nonBlankFilters);
    console.log(filterString);
    if($('#sitterButton').hasClass('active')){

      $('.petListing['+attrName+'~="'+ jqueryObj.attr('id')+'"]').addClass(filterClassNoDot);
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
      $('.personListing['+attrName+'~="'+ jqueryObj.attr('id')+'"]').addClass(filterClassNoDot);
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
    if($(filterOptClass+':checked').length == 0){
      nonBlankFilters.splice($.inArray(filterClass,nonBlankFilters),1);
      var filterString = listToString(nonBlankFilters);
      $(filterClass).removeClass(filterClassNoDot);
      if($('#sitterButton').hasClass('active')){
        filterString = filterString.concat('.petListing');
        $('.petListing'+filterString).not(filterClass).removeClass('hide'); //anything that had been previously filtered by petType and that should still be filtered in by other filters is now visible
      }else{
        filterString = filterString.concat('.personListing');
        $('.personListing'+filterString).not(filterClass).removeClass('hide'); //anything that had been previously filtered by petType and that should still be filtered in by other filters is now visible
      }
      console.log(filterString);
      $container.masonry('destroy');
      $container = $('#feedContainer');
      $container.imagesLoaded(function(){
        $container.masonry({
          itemSelector:filterString,
          'isFitWidth':true
        });
      });

    }else{
      if($('#sitterButton').hasClass('active')){
        var filterString = listToString(nonBlankFilters);
          $('.petListing['+attrName+'~="'+ jqueryObj.attr('id')+'"]').removeClass(filterClassNoDot);
          $('.petListing['+attrName+'~="'+ jqueryObj.attr('id')+'"]').addClass('hide');
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
          $('.personListing['+attrName+'~="'+ jqueryObj.attr('id')+'"]').removeClass(filterClassNoDot);
          $('.personListing['+attrName+'~="'+ jqueryObj.attr('id')+'"]').addClass('hide');
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



var listToString = function(list){
  ans="";
  for(var i=0; i < list.length; i ++){
    ans = ans.concat(list[i]);
  }
  return ans;
}

$(document).ready(function(){
  listingsData['petListings'].sort(sortByZipcode);
  listingsData['personListings'].sort(sortByZipcode);
  loadListings();
  /*createMasonry();*/
  loadPresets();
  nonBlankFilters = [];
  $('.Switch').click(function() {
		$(this).toggleClass('On').toggleClass('Off');
	});
  $('#sortByDistance_pet').trigger('click');

  $('.filterOpt').change(function(){
    $('#searchParams').html("");
    changeTags();

  });
  $('.sortPerson').css('display','none');
  $('.filter').hover(function(){
    $(this).css('background-color','#e7e7e7');
  },
  function(){
    $(this).css('background-color','#f8f8f8');
  });
  $('.sortBy').change(function(){
    if($(this).hasClass('sortPetBy')){
      if($(this).attr('id') == "sortByOwnerName"){
        listingsData['petListings'].sort(sortByOwnerLastName);
      }else if($(this).attr('id') == 'sortByDistance_pet'){
        listingsData['petListings'].sort(sortByZipcode);
      }else if($(this).attr('id') == 'sortByStart'){
        listingsData['petListings'].sort(sortByStartDate);
      }else if($(this).attr('id') == 'sortByEnd'){
        listingsData['petListings'].sort(sortByEndDate);
      }else if($(this).attr('id') == 'sortByDuration'){
        listingsData['petListings'].sort(sortByDuration);
      }else if($(this).attr('id') == "sortByPetType"){
        listingsData['petListings'].sort(sortByPetType);
      }
      loadListings();
      createMasonry();
      reloadListeners();
    }else{
      if($(this).attr('id') == 'sortBySitterName'){
        listingsData['personListings'].sort(sortBySitterLastName);
      }else if($(this).attr('id') == 'sortByDistance_person'){
        listingsData['personListings'].sort(sortByZipcode);
      }
      loadListings();
      createMasonryPerson();
      reloadListeners();
    }
  })


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
  /*  event.preventDefault();*/
    event.stopPropagation();
  /*  return false;*/
  })

  $(".fav-btn").click(function() {
    if ($(this).hasClass('clicked')) {
      $(".btn-text", this).text("Add to Favorites");
      $(this).removeClass('clicked');
    } else {
      $(".btn-text", this).text("Remove from Favorites");
      $(this).addClass('clicked');
    }
  });

  $(".add-to-favs-button").click(function(event) {
    $(this).parent().slideDown(300);
    // Yeah I know this is ridiculous
    // Used for grabing containing listing div from button click
    $(this).parent().parent().parent().parent()[0].wasClicked = true;

  })

  $('.filterOpt').change(
    function(){
      if($(this).hasClass("petTypeFilterOpt")){
        filterListings('.petTypeFilterOpt','.petTypeFilter','petTypeFilter','petType', $(this));
      }else if($(this).hasClass("sitterTypeFilterOpt")){
        filterListings('.sitterTypeFilterOpt','.sitterTypeFilter','sitterTypeFilter','sitterType', $(this));
      }else if($(this).hasClass("payFilterOpt")){
        filterListings('.payFilterOpt','.paymentFilter','paymentFilter','payment', $(this));
      }else if($(this).hasClass("durationLengthFilterOpt")){
        filterListings('.durationLengthFilterOpt','.durationLengthFilter','durationLengthFilter','durationLength', $(this));
      }else if($(this).hasClass("durationTypeFilterOpt")){
        filterListings('.durationTypeFilterOpt','.durationTypeFilter','durationTypeFilter','durationType',$(this));
      }else if($(this).hasClass("distanceFilterOpt")){
        filterListings('.distanceFilterOpt','.distanceFilter','distanceFilter','distance', $(this));
      }
    }
  )

// Toggles tooltips for the price ranges on the cost dropdown search filter
  $('[data-toggle="tooltip"]').tooltip();

});

$(window).load(function() {
  var marg = $('#_header').css('height');
  $('#feedContainer').css('margin-top', marg);

  $('.personListing').addClass('hide');
  $('.Switch').click(function(){
    if($('#sitterButton').hasClass('active')){ //switch to owner

      nonBlankFilters = ['.personListing'];
      $('#ownerButton').addClass('active');
      $('#sitterButton').removeClass('active');
      $('.sortPerson').css('display','block');
      $('.sortPet').css('display','none');
      //delete duration and payment dropdowns
      $('.durationDrop').css('display','none');
      $('.paymentDrop').css('display','none');
      $('.personListing').removeClass('hide');
      $('.petListing').addClass('hide');
      $container.masonry('destroy');
      $container = $('#feedContainer');
      $container.imagesLoaded(function(){
        $container.masonry({
          itemSelector:'.personListing',
          'isFitWidth':true
        });
      });
    }else{
      $('#sitterButton').addClass('active');
      $('#ownerButton').removeClass('active');
      nonBlankFilters = ['.petListing'];
      $('.sortPet').css('display','block');
      $('.sortPerson').css('display','none');
      $('.durationDrop').css('display','block');
      $('.paymentDrop').css('display','block');
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
    }
  })
  /*$('#sitterButton').click(function(){
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


  })*/

  $(".addListing").click(function() {
    $('.form-containers').removeClass("hide");
    return false;
  })
})

$(function(){
  $container = $('#feedContainer');
  $container.imagesLoaded(function(){
    $container.masonry({
      itemSelector:'.petListing',
      'isFitWidth':true
    });

  })
})

reloadListeners = function() {
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
  /*  event.preventDefault();*/
    event.stopPropagation();
  /*  return false;*/
  })

  $(".add-to-favs-button").click(function(event) {
    $(this).parent().slideDown(300);
    // Yeah I know this is ridiculous
    // Used for grabing containing listing div from button click
    $(this).parent().parent().parent().parent()[0].wasClicked = true;

  })
}
