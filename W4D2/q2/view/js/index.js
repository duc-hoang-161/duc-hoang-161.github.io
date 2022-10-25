$(function () {
  function showAnswer({ answer }) {
    $("#question").val(answer).select();
  }
  $("#ask-form").submit(() => {
    $.get({
      url: "/8ball",
    })
      .done(showAnswer)
      .fail(() => console.log("Failed to receive the answer"));
    return false;
  });
});
