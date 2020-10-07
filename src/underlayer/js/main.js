
document.addEventListener("DOMContentLoaded", function () {
  const mouseElm = document.createElement('div');
  let hoverFlg = false;
  mouseElm.id = 'js-mouseCursor';
  mouseElm.style.top = 0;
  mouseElm.style.left = 0;
  document.body.appendChild(mouseElm);

  const elm = document.getElementById('js-mouseCursor');
  let  x, y, oldX, oldY, diffX, diffY;
  window.addEventListener("mousemove", event => {
    if(!hoverFlg){
      x = event.clientX;
      y = event.clientY;
    }
  });
  const intervalId = setInterval(() => {
    oldX = parseInt(elm.style.left);
    oldY = parseInt(elm.style.top);
    diffX = (x - oldX) / 3;
    diffY = (y - oldY) / 3;
    elm.style.left = oldX+diffX+"px";
    elm.style.top = oldY+diffY+"px";
  }, 50);
  const links = document.querySelectorAll('a');
  for (let i=0; i<links.length; i++) {
    links[i].addEventListener('mouseover',()=>{
      elm.classList.add("-hover");
      hoverFlg = true;
      const rect = links[i].getBoundingClientRect();
      x = rect.left;
      y = rect.top;
      const w = rect.width;
      const h = rect.height;
      elm.style.left = x;
      elm.style.top = y;
      elm.style.width = w + "px";
      elm.style.height = h + "px";
    })
    links[i].addEventListener('mouseout',()=>{
      hoverFlg = false;
      elm.classList.remove("-hover");
      elm.style.width = 1 + "px";
      elm.style.height = 1 + "px";
    })
  }
});