export function scrollAction(callback) {
  const scaElm = document.querySelectorAll("[data-sca]");
  const vh = window.parent.screen.height * 0.75;
  window.addEventListener("scroll", function (e) {
    const scTop = window.pageYOffset;
    for (let i = 0; i < scaElm.length; i++) {
      const offsettop = offsetTop(scaElm[i]);
      if (scTop + vh > offsettop) {
        scaElm[i].classList.add("_sca-active");
      }
    }
  });
  function offsetTop(elm) {
    const rect = elm.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
  }
}
