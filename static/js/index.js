$(document).ready(function(){
  $('#sortByDistance').attr('checked','checked');



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
