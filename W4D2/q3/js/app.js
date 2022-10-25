$(function () {
  function addedSuccess({ itemCount }) {
    $("#item-count").text(itemCount);
    const msg = $("<div>", {
      class: "alert alert-success m-4",
      text: "Added to cart",
    });
    $("#add-cart-form").append(msg);
    setTimeout(() => {
      msg.remove();
    }, 2000);
  }
  $("#add-cart-form").submit(() => {
    const data = {
      name: $("#add-cart-form input[name=name]").val(),
      price: $("#add-cart-form input[name=price]").val(),
    };
    $.post({
      url: "/addToCart",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
    })
      .done(addedSuccess)
      .fail(() => console.log("Failed to add to cart"));
    return false;
  });
});
