var scrollApi;
var scrollSettings;
var maxwidth = $(window).width();
var maxheight = $(window).height();
_386 = {
  fastLoad: true,
  onePass: true,
  speedFactor: 1.25
};
var modem = new Audio("./audio/modem.mp3");
var options = {
  "step": 1,
  "className": "dither",
  "algorithm": "atkinson",
  "palette": [
    [0, 0, 0],
    [255, 255, 255]
  ]
};

$('#start-icon img').ditherJS(options);

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

$("#splash").click(function() {
  modem.play();
  $("#start-icon").html("Yhdistetään...");
  $(".images").load("./content/images.html", function(response) {
    $(response).each(function(k, v) {
      var leftIcon = randomIntFromInterval(70, maxwidth - 70);
      var topIcon = randomIntFromInterval(70, maxheight - 70);
      if (v.id) {
        var articleIcon =
          '<div style="left:' + leftIcon +
          'px;top:' + topIcon +
          'px" class="application-icon draggable" data-open-modal="' +
          v
          .id +
          '"><img class="icon-img" src="css/images/textfile.png"><div class="icon-text">' +
          $(".content-modal-heading", v).html() + '</div></div>';
        $(".icons").append(articleIcon);
      }
    });
  });
  $(".info").load("./content/info.html", function(response) {
    $(response).each(function(k, v) {
      if (v.id) {
        $("#info").append(
          '<li class="menu-link" data-open-modal="' +
          v.id +
          '"><a href="#">' +
          $(".content-modal-heading", v).html() + '</a></li>');
      }
      if ($(v).hasClass("sep")) {
        $("#info").append(
          '<li class="divider" role="separator"></li>');
      };
    });
  });
  $(".articles").load("./content/articles.html", function(response) {


    $(response).each(function(k, v) {
      if (v.id) {
        var leftIcon = randomIntFromInterval(70, maxwidth - 70);
        var topIcon = randomIntFromInterval(70, maxheight - 70);
        var articleIcon =
          '<div style="left:' + leftIcon +
          'px;top:' + topIcon +
          'px" class="application-icon draggable" data-open-modal="' +
          v
          .id +
          '"><img class="icon-img" src="css/images/textfile.png"><div class="icon-text">' +
          $(".content-modal-heading", v).html() + '</div></div>';
        $(".icons").append(articleIcon);
        $("#index").append(
          '<li class="menu-link" data-open-modal="' +
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

    $(function() {
      $(".draggable").draggable({
        containment: "parent"
      });
    });

    $(function() {
      $(".resizable").resizable({
        grid: 50,
        helper: "ui-resizable-helper",
        minWidth: 300,
        stop: function(e, ui) {
          console.log(ui);
          var scroll = $('.jsscroll').jScrollPane(
            scrollSettings);
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
      var left = randomIntFromInterval(100, 300);
      var top = randomIntFromInterval(100, 300);
      $('#' + modalToOpen).css('left', left);
      $('#' + modalToOpen).css('top', top);
      $('.active', 'body').removeClass('active');
      $('#' + modalToOpen).addClass("active");
    });

    $('.dither').ditherJS(options);

    $(".content-modal").click(function() {
      $('.active', 'body').removeClass('active');
      $(this).addClass("active");
    });
  });
  setTimeout(function() {
    $(".content-modal").hide();
    $("#info-1").css("top", "60px").css("left", "120px");
    $("#info-1").show();
    $("#splash").fadeOut('slow');
  }, 5000);
});
