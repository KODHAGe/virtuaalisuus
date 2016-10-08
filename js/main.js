// Glabals, defaults & options

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

// Helpers & handlers

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function handleIconClick(e) {
  var modalToOpen = $(this).data('openModal');
  $('#' + modalToOpen).show();
  if (maxwidth > 800) {
    var left = randomIntFromInterval(100, 300);
    var top = randomIntFromInterval(100, 300);
    $('#' + modalToOpen).css('left', left);
    $('#' + modalToOpen).css('top', top);
  } else {
    $('#' + modalToOpen).css('top', "40px");
  }
  $('.active', 'body').removeClass('active');
  $('#' + modalToOpen).addClass("active");
}

// Main

$("#splash").click(function() {
  modem.play();
  $("#start-icon").html("Yhdistetään...");

  //Load image articles
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
          '"><img class="icon-img" src="css/images/imagefile.png"><div class="icon-text">' +
          $(".content-modal-heading", v).html() + '</div></div>';
        $(".icons").append(articleIcon);
      }
    });
  });

  //Load info articles
  $(".info").load("./content/info.html", function(response) {
    $(response).each(function(k, v) {
      if (v.id && v.id != "trash" && v.id != "spam") {
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

  // Load main articles
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

      // Init scrolling on all articles

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

    // Make stuff draggable (jQueryUI)
    $(function() {
      $(".draggable").draggable({
        containment: "parent"
      });
    });

    //...and resizable (jQueryUI)
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

    // Click handlers

    $(".content-modal-close").click(function() {
      $(this).closest('.content-modal').hide();
    });

    $(".menu-link").click(function() {
      var modalToOpen = $(this).data('openModal');
      $('#' + modalToOpen).show();
      $('#' + modalToOpen).css('top', "40px");
      $('.active', 'body').removeClass('active');
      $('#' + modalToOpen).addClass("active");
    });

    $(".application-icon").dblclick(function() {
      handleIconClick();
    });

    $(".application-icon").hammer().bind("tap", handleIconClick);

    $(".content-modal").click(function() {
      $('.active', 'body').removeClass('active');
      $(this).addClass("active");
    });
  });

  var trash =
    '<div style="left:100px;top:100px" class="application-icon draggable" data-open-modal="trash"><img class="icon-img" src="css/images/trashcan.png"><div class="icon-text">Roskakori</div></div>';
  $(".icons").append(trash);

  // Loadscreen timout & hide
  setTimeout(function() {
    $(".content-modal").hide();
    if (maxwidth > 800) {
      $("#info-1").css("top", "60px").css("left", "120px");
    } else {
      $("#info-1").css("top", "40px");
    }
    $("#info-1").show();
    $("#splash").fadeOut('slow');
  }, 5000);
});
