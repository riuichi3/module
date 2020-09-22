import { barrage } from "./barrage";
export function scrollAction(callback) {
  const scaElm = document.querySelectorAll("[data-sca]");
  const vh = window.parent.screen.height * 0.75;
  check();
  window.addEventListener("scroll", function (e) {
    check();
  });
  function check() {
    const scTop = window.pageYOffset;
    for (let i = 0; i < scaElm.length; i++) {
      const offsettop = offsetTop(scaElm[i]);
      if (scTop + vh > offsettop) {
        if (!scaElm[i].classList.contains("_sca-active")) {
          scaElm[i].classList.add("_sca-active");
          if (scaElm[i].dataset.sca == "barrage") {
            barrage(scaElm[i]);
          }
        }
      }
    }
  }
  function offsetTop(elm) {
    const rect = elm.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
  }
}
