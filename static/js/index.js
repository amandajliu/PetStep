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
    var newParam = '<article class="param"> '+newSearchParams[i]+" </article>"
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

$(document).ready(function(){
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
})

$(function(){
  $('#slider').slider({
    value:-1,
    min:-1,
    max:2,
    step:1,
    slide: function(event, ui){
      if(ui.value == -1 || ui.value == 0){
        $('#dist').val("< "+Math.pow(10,ui.value)+ " mile");

      }else{
        $('#dist').val("< "+Math.pow(10,ui.value) + " miles");
      }
    },
    change: function(event, ui){}
  });
  var initDist = "< "+Math.pow(10,$('#slider').slider("value")) + " mile";
  var initDistDiv = "<div class='param'>"+initDist+"</div>";
  $('#dist').val("< "+Math.pow(10,$('#slider').slider("value")) + " mile");
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
