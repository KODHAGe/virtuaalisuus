$(".container").load("../content/articles.html");

_386 = {
  onePass: true,
  speedFactor: 1.25
};
$(function() {
  $(".draggable").draggable();
});

$(function() {
  $("#juttu1").resizable({
    grid: 50,
    helper: "ui-resizable-helper",
    stop: function(e, ui) {
      console.log(ui);
      var scroll = $('.jsscroll').jScrollPane(scrollSettings);
      var contentPane = scrollApi.getContentPane();
      $(this).width(ui.size.width);
      $(".content-modal", this).width(ui.size.width);
      $(".jspContainer", this).width(ui.size.width);
      $(".jspPane", this).width(ui.size.width);
      $(".jspTrack", this).width(ui.size.width);
      $(".jspContainer", this).height(ui.size.height - 5);
    }
  });
});

$(function() {
  $("#juttu2").resizable({
    grid: 50,
    helper: "ui-resizable-helper",
    stop: function(e, ui) {
      var scroll = $('.jsscroll').jScrollPane(scrollSettings);
      var contentPane = scrollApi.getContentPane();
      $(this).width(ui.size.width);
      $(".content-modal", this).width(ui.size.width);
      $(".jspContainer", this).width(ui.size.width);
      $(".jspPane", this).width(ui.size.width);
      $(".jspTrack", this).width(ui.size.width);
      $(".jspContainer", this).height(ui.size.height - 5);
      /*
            $(".content-modal").width(ui.size.width);
            $(".jspContainer").width(ui.size.width);
            $(".jspPane").width(ui.size.width);
            $(".jspTrack").width(ui.size.width);
            $(".jspContainer").height(ui.size.height - 5);*/
    }
  });
});

$(".content-modal-close").click(function() {
  $(this).closest('.content-modal').hide();
});

$(".application-icon").dblclick(function() {
  var modalToOpen = $(this).data('openModal');
  $('#' + modalToOpen).show();
  $('.active', 'body').removeClass('active');
  $('#' + modalToOpen).addClass("active");
});

$("#scrollbars").click(function() {
  scrollApi.reinitialise();
});

$('.dither').ditherJS(options);

var options = {
  "step": 1,
  "className": "dither",
  "algorithm": "atkinson"
};
var scrollSettings = {
  alwaysShowScroll: true,
  showArrows: true,
  verticalGutter: 0

};
var scroll = $('.jsscroll').jScrollPane(scrollSettings);
$('.jsscroll .jspContainer').append('<div class="content-modal-footer"></div>');
var scrollApi = scroll.data('jsp');

$(".content-modal").click(function() {
  $('.active', 'body').removeClass('active');
  $(this).addClass("active");
});
