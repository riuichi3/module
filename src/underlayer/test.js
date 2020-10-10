document.addEventListener("DOMContentLoaded", function () {
  const area = document.querySelector(".js-mousescroll");
  area.onmousewheel = function (event) {
    console.log(event.wheelDeltaX, event.wheelDeltaY);
    this.scrollLeft += event.wheelDeltaY;
  };
  setTimeout(() => {
    document.querySelector(".js-movie").click();
  }, 500);
});
