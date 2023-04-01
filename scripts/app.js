// Resize webPage based on the scale of the brwoser
let pageWidth, pageHeight;

let basePage = {
  width: 830,
  height: 600,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
};

$(function () {
  let $page = $(".page_content");

  getPageSize();
  scalePages($page, pageWidth, pageHeight);

  $(window).resize(
    _.debounce(function () {
      getPageSize();
      scalePages($page, pageWidth, pageHeight);
    }, 50)
  );

  function getPageSize() {
    pageHeight = $("#container").height();
    pageWidth = $("#container").width();
  }

  function scalePages(page, maxWidth, maxHeight) {
    let scaleX = 1,
      scaleY = 1;
    scaleX = maxWidth / basePage.width;
    scaleY = maxHeight / basePage.height;
    basePage.scaleX = scaleX;
    basePage.scaleY = scaleY;
    basePage.scale = scaleX > scaleY ? scaleY : scaleX;

    let newLeftPos = Math.abs(
      Math.floor((basePage.width * basePage.scale - maxWidth) / 2)
    );
    let newTopPos = Math.abs(
      Math.floor((basePage.height * basePage.scale - maxHeight) / 2)
    );

    page.attr(
      "style",
      "-webkit-transform:scale(" +
        basePage.scale +
        ");left:" +
        newLeftPos +
        "px;top:" +
        newTopPos +
        "px;"
    );
  }
});


// Resize webPage based on the scale of the brwoser

// /click on the button
$(".all").click(function () {
  //check on the target button is not more than one
  let oldactive = $("#main .active");

  if (oldactive.length > 0) {
    $("#main .active").removeClass("active");
  }
  //add new active button
  $(this).addClass("active");
});





let answerflag = 0;
function activebtns() {
  $(".btn1").prop("disabled", false);
  $(".btn2").prop("disabled", false);
  $("#check-ans-btn").prop("disabled", false);
  $(".reset-btn").prop("disabled", false);
  $(".btn1").removeClass("removepointer");
  $(".btn2").removeClass("removepointer");
  $("#check-ans-btn").removeClass("removepointer");
  $(".reset-btn").removeClass("removepointer");
  $(".answer-box").show();
}

function disablebtns() {
  $(".btn1").prop("disabled", true);
  $(".btn2").prop("disabled", true);
  $("#check-ans-btn").prop("disabled", true);
  $(".reset-btn").prop("disabled", true);
  $(".btn1").addClass("removepointer");
  $(".btn2").addClass("removepointer");
  $("#check-ans-btn").addClass("removepointer");
  $(".reset-btn").addClass("removepointer");
  $(".answer-box").hide();
}
//the two hidden popup

$(".btn1").click(function () {
  $(".msg2").css({ display: "none" });
  $(".while_bg").fadeTo(1, 0.5);
  $("#main").css({ display: "none" });
  $(".msg1").css({ display: "block" });
  disablebtns();
});

$(".btn3").click(function () {
  $(".msg1").css({ display: "none" });
  $(".while_bg").fadeTo(0.5, 1);
  $("#main").css({ display: "block" });
  activebtns();
});

$(".btn2").click(function () {
  $(".msg1").css({ display: "none" });
  $(".while_bg").fadeTo(1, 0.5);
  $(".msg2").css({ display: "block" });
  $("#main").css({ display: "none" });

  disablebtns();
});

$(".btn4").click(function () {
  $(".msg2").css({ display: "none" });
  $(".while_bg").fadeTo(0.5, 1);
  $("#main").css({ display: "block" });
  activebtns();
});


// the buttons functionality
$(".pointer").click(function () {
  let oldactive = $("#main .active");
  if (oldactive.length > 0) {
    //get active answer
    let activebtn = $("#main .active").text();

    let correctans1 = ["eraser", "ruler", "pen", "pencil", "book"];
    //let wrongans1 = ["bag","pencil case","scissors"] ;
    if ($.inArray(activebtn, correctans1) !== -1) {
      console.log(answerflag);
      answerflag++;

      $("#main .active").fadeTo(10, 0);

      $(this).html(
        "<span class='right'>" +
          activebtn +
          " <img src='assets/images/tikMark-small.png' width='20'/> </span>"
      );
      $(this).removeClass("pointer");
      $(this).addClass("removepointer");
      $("#main .active").removeClass("active");
      $(".audio_right").trigger("play");
      //fade
      if (answerflag == 5) {
        $("#btn6").fadeTo(5, 0);
        $("#btn7").fadeTo(5, 0);
        $("#btn10").fadeTo(5, 0);
        $("#btn11").fadeTo(5, 0);
        $("#btn12").fadeTo(5, 0);
        $("#btn5").fadeTo(1, 0.5);
        $("#btn8").fadeTo(1, 0.5);
        $("#btn9").fadeTo(1, 0.5);
        $("#btn5").addClass("removepointer");
        $("#btn8").addClass("removepointer");
        $("#btn9").addClass("removepointer");
        $("#check-ans-btn").addClass("disabled");
        $("#check-ans-btn").addClass("removepointer");
        $("#check-ans-btn").prop("disabled", true);
        setTimeout(() => $(".audio_done").trigger("play"), 700);

        let oldactive = $("#main .active");
        if (oldactive.length > 0) {
          $("#main .active").removeClass("active");
        }
      }
    } else {
      $(this).html(
        "<span class='wrong'>" +
          activebtn +
          "<span class='x'> &#x274C;</span>" +
          "</span> "
      );
      $(".x").fadeOut(120).fadeIn(120).fadeOut(120).fadeIn(120);

      setTimeout(function () {
        $(".wrong").remove();
      }, 400);
      $(".audio_wrong").trigger("play");
    }
  }
});

//reset

$(".reset-btn").click(function () {
  answerflag = 0;
  $(".rest-class").addClass("pointer");
  $(".rest-class").removeClass("removepointer");
  $(".all").fadeTo(0, 5);
  $(".pointer").empty();

  $("#btn5").removeClass("removepointer");
  $("#btn8").removeClass("removepointer");
  $("#btn9").removeClass("removepointer");
  
  $("#check-ans-btn").removeClass("removepointer");
  $("#check-ans-btn").removeClass("disabled");
  $("#check-ans-btn").prop("disabled", false);

  let oldactive = $("#main .active");
  if (oldactive.length > 0) {
    $("#main .active").removeClass("active");
  }

});
//see answers

$("#check-ans-btn").click(function () {
  $("#btn6").fadeTo(5, 0);
  $("#btn7").fadeTo(5, 0);
  $("#btn10").fadeTo(5, 0);
  $("#btn11").fadeTo(5, 0);
  $("#btn12").fadeTo(5, 0);
  $("#btn5").fadeTo(1, 0.5);
  $("#btn8").fadeTo(1, 0.5);
  $("#btn9").fadeTo(1, 0.5);
  $("#btn5").addClass("removepointer");
  $("#btn8").addClass("removepointer");
  $("#btn9").addClass("removepointer");
  $("#check-ans-btn").addClass("disabled");

  $(".empty1").html(
    "<span class='right'>" +
      "eraser" +
      "<img src='assets/images/tikMark-small.png' width='20'/> </span>"
  );
  $(".empty2").html(
    "<span class='right'>" +
      "ruler   " +
      "<img src='assets/images/tikMark-small.png' width='20'/> </span>"
  );
  $(".empty3").html(
    "<span class='right'>" +
      "pencil" +
      "<img src='assets/images/tikMark-small.png' width='20'/> </span>"
  );
  $(".empty4").html(
    "<span class='right'>" +
      "pen" +
      "<img src='assets/images/tikMark-small.png' width='20'/> </span>"
  );
  $(".empty5").html(
    "<span class='right'>" +
      "book" +
      "<img src='assets/images/tikMark-small.png' width='20'/> </span>"
  );
  let oldactive = $("#main .active");
  if (oldactive.length > 0) {
    $("#main .active").removeClass("active");
  }
});
