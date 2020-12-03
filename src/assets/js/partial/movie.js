//iframeでyoutubeを挿入
export function movie() {
  const elm = document.querySelectorAll(".js-movie");
  const elmContentWrapper = document.querySelector(".c-modalBase>.c-modalBase__inner");
  for (let i = 0; i < elm.length; i++) {
    elm[i].addEventListener("click", (e) => {
      console.log("click!!!");
      const src = elm[i].dataset.href;
      let code = `<div class="movwrap"><div class="inner"><iframe src="${src}?autoplay=1" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe></div><label for="toggleModal" class="c-closeModal">とじる</label></div>`;
      elmContentWrapper.innerHTML = code;
    });
  }
}
