export function loading(callback) {
  // limit ms 待っても読み込みが終わらない時はローディングを終了する
  const limit = 10000;
  let timeout;
  timeout = setTimeout(function () {
    console.log("time out!!");
    loaded();
  }, limit);

  if (document.querySelector(".js-loadingArea")) {
    document.querySelector("body").classList.add("is-loading");
    imgLoading();
  } else {
    return;
  }

  function imgLoading() {
    let item = document.querySelectorAll(".js-loadingArea [src]");
    let images = new Array(item.length);
    let loadingCount = 0;
    for (let i = 0; i < item.length; i++) {
      console.log(item[i].src);
      images[i] = new Image();
      images[i].src = item[i].src;
      images[i].crossOrigin = "Anonymous";
      images[i].addEventListener("load", () => {
        loadingCount++;
        if (loadingCount === images.length - 1) {
          clearTimeout(timeout);
          loaded();
        }
      });
    }
  }
  function loaded() {
    if (document.querySelector(".js-loadingArea")) {
      document
        .querySelector(".js-loadingArea")
        .classList.remove("js-loadingArea");
      document.querySelector(".is-loading").classList.remove("is-loading");
      for (let i = 0; i < callback.length; i++) {
        callback[i]();
      }
    }
  }
}
