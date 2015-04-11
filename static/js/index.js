var changeTags = function(){

  var newSearchParams = [];
  var checked = $('input:checked').each(function(){
    if($(this).attr('id') != "sortByDistance" && $(this).attr('id') != "sortBySitterName"){
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

  $("#slider").on('slidechange', function(event, ui){
    $('#searchParams').html("");
    changeTags();
    changeDist();
  })




});
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
