$(function() {
  let start = false;
  let lose = false;
  const setMessage = msg => $("#status").html(msg);
  function onClickStart() {
    setMessage("&nbsp;");
    start = true;
    lose = false;
    $("#maze .boundary").removeClass("youlose");
  }
  function handleCrossWall(){
    if(!start) return;
    lose = true;
  }
  function handleEnd() {
    if (!start) return;
    start = false;
    setMessage(lose ? "Sorry, you lost!" : "You win!");
    if (lose && !$("#maze .boundary").hasClass("youlose"))
      $("#maze .boundary").addClass("youlose");
  }
  $("#start").click(onClickStart);
  $("#maze .boundary").mouseover(handleCrossWall);
  $("#end").mouseover(handleEnd);
  $("#maze").mouseleave(handleCrossWall);
});
