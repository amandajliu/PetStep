var loadListings = function() {
  var listingTemplate = $('#listingTemplate').html();
  Mustache.parse(listingTemplate);
  var rendered = Mustache.render(listingTemplate, listingsData);
  $('#feedContainer').prepend(rendered);
}

var toggleUser = function() {
  // TODO: Remove pet pics and place sitters <-> Remove sitters and place pet pics
}

var changeTags = function(){
  var newSearchParams = [];
  var checked = $('input:checked').each(function(){
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
  var initDist = "< "+Math.pow(10,$('#slider').slider("value")) + " "+unit;
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
  nonBlankFilters = [];
  $('#sortByDistance').attr('checked','checked');
  $('input').change(function(){
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
        $(this).find('div.listingInfo').slideDown();
      }
    },
    function(){
      if (!this.wasClicked) {
        $(this).find('div.listingInfo').slideUp();
      }
    }
  );

  $('.listing').click(
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

  $('.petTypeFilter').change(
    function(){
      if($(this).is(':checked')){ //checking
        if($.inArray('.petTypeFilter', nonBlankFilters) == -1){
          nonBlankFilters.push(".petTypeFilter");
        }
        var filterString = listToString(nonBlankFilters);
        if($('#sitterButton').hasClass('active')){
          $('.petListing[petType="'+ $(this).attr('id')+'"]').addClass('petTypeFilter');
          $('.petListing.petTypeFilter').removeClass('hide');
          $('.petListing:not(.petTypeFilter)').addClass('hide');
          $container.masonry('destroy');
          $container = $('#feedContainer');
          $container.imagesLoaded(function(){
            $container.masonry({
              itemSelector:filterString,
              'isFitWidth':true
            });

          })
        }else{
          $('.personListing[petType="'+ $(this).attr('id')+'"]').addClass('petTypeFilter');
          $('.personListing.petTypeFilter').removeClass('hide');
          $('.personListing:not(.petTypeFilter)').addClass('hide');
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
        if($('.petTypeFilter:checked').length == 0){
          nonBlankFilters.splice($.inArray('.petTypeFilter',nonBlankFilters),1);
          var filterString = listToString(nonBlankFilters);
          if($('#sitterButton').hasClass('active')){
            $('.petListing'+filterString).not('.petTypeFilter').removeClass('hide'); //anything that had been previously filtered by petType and that should still be filtered in by other filters is now visible
          }else{
            $('.personListing'+filterString).not('.petTypeFilter').removeClass('hide'); //anything that had been previously filtered by petType and that should still be filtered in by other filters is now visible
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
            $('.petListing[petType="'+ $(this).attr('id')+'"]')
            .removeClass('petTypeFilter')
            .addClass('hide');
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
