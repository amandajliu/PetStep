$(document).ready(function(){
  $('#sortByDistance').attr('checked','checked');
  $('input').change(function(){
    $('#searchParams').html("");
    var newSearchParams = [];
    var checked = $('input:checked').each(function(){
      if($(this).attr('id') != "sortByDistance" && $(this).attr('id') != "sortBySitterName"){
        var label = $("label[for='" + $(this).attr('id')+"']").html();
        console.log(label);
        newSearchParams.push(label);
      }
    });
    for(var i=0; i < newSearchParams.length;  i++){
      var newParam = '<div class="param"> '+newSearchParams[i]+" </div>"
      $('#searchParams').html($('#searchParams').html() + newParam);
    }

  })


})
$(function(){
  $('#slider').slider({
    value:-1,
    min:-1,
    max:2,
    step:1,
    slide: function(event, ui){
      var dist = ui.value;
      if(ui.value == -1 || ui.value == 0){
        $('#dist').val("< "+Math.pow(10,ui.value)+ " mile");
      }else{
        $('#dist').val("< "+Math.pow(10,ui.value) + " miles");
      }

    }
  });
  $('#dist').val("< "+Math.pow(10,$('#slider').slider("value")) + " mile");
});
