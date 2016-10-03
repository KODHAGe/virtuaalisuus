var scrollApi;
var scrollSettings;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

$(".container").load("./content/articles.html", function(response) {

  console.log('Loaded', response);
  var maxwidth = $(window).width();
  var maxheight = $(window).height();
  $(response).each(function(k, v) {
    if (v.id) {
      var left = randomIntFromInterval(30, maxwidth - 30);
      var top = randomIntFromInterval(30, maxheight - 30);
      console.log($(v.id));
      $(v.id).css('left', left);
      console.log($(v.id));
      var leftIcon = randomIntFromInterval(30, maxwidth - 30);
      var topIcon = randomIntFromInterval(30, maxheight - 30);
      var articleIcon =
        '<div style="left:' + leftIcon +
        'px;top:' + topIcon +
        'px" class="application-icon draggable" data-open-modal="' +
        v
        .id +
        '"><img class="icon-img dither" src="css/images/text-file.png"><div class="icon-text">' +
        $(".content-modal-heading", v).html() + '</div></div>';
      $(".container").append(articleIcon);
      $("#index").append('<li class="menu-link" data-open-modal="' +
        v
        .id +
        '"><a href="#">' +
        $(".content-modal-heading", v).html() + '</a></li>');
    }
    scrollSettings = {
      alwaysShowScroll: true,
      showArrows: true,
      verticalGutter: 0
    };
    var scroll = $('.jsscroll').jScrollPane(scrollSettings);
    $('.jsscroll .jspContainer').append(
      '<div class="content-modal-footer"></div>');
    scrollApi = scroll.data('jsp');
  });
  _386 = {
    onePass: true,
    speedFactor: 1.25
  };
  $(function() {
    $(".draggable").draggable();
  });

  $(function() {
    $(".resizable").resizable({
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

  $(".content-modal-close").click(function() {
    $(this).closest('.content-modal').hide();
  });

  $(".menu-link").click(function() {
    var modalToOpen = $(this).data('openModal');
    $('#' + modalToOpen).show();
    $('.active', 'body').removeClass('active');
    $('#' + modalToOpen).addClass("active");
  });
  $(".application-icon").dblclick(function() {
    var modalToOpen = $(this).data('openModal');
    $('#' + modalToOpen).show();
    $('.active', 'body').removeClass('active');
    $('#' + modalToOpen).addClass("active");
  });
  var options = {
    "step": 1,
    "className": "dither",
    "algorithm": "atkinson",
    "palette": [
      [0, 0, 0],
      [255, 255, 255]
    ]
  };

  $('.dither').ditherJS(options);



  $(".content-modal").click(function() {
    $('.active', 'body').removeClass('active');
    $(this).addClass("active");
  });
});
