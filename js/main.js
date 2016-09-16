_386 = { onePass: true, speedFactor: 1.25 };
  $( function() {
    $( ".draggable" ).draggable();
  } );

   $( function() {
    $( ".resizable" ).resizable({
      grid: 50
    });
  } );

   $('.dither').ditherJS(options);

var options = {
    "step": 1,
    "className": "dither",
    "algorithm": "atkinson"
};