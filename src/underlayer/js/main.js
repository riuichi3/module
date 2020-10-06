
document.addEventListener("DOMContentLoaded", function () {
  let mx=0;
  let my=0;
  const elm = document.querySelector(".js-mouseCursor > span");
    
  window.addEventListener("mousemove", event => {
    mx = event.clientX;
    my = event.clientY;
  });
  const intervalId = setInterval(() => {
    const elmX = parseInt(elm.style.left);
    const elmY = parseInt(elm.style.top);
    const diffX = (mx - elmX) / 20;
    const diffY = (my - elmY) / 20;
    const newElmX = elmX + diffX;
    const newElmY = elmY + diffY;
    elm.style.left = newElmX+"px";
    elm.style.top = newElmY+"px";
  }, 10);
});