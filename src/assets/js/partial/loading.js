
export function loading(callback) {

  // limit ms 待っても読み込みが終わらない時はローディングを終了する
  const limit = 10000
  let timeout
  timeout = setTimeout(function(){
    loaded()
  },limit)
  $(function(){
    if(document.querySelector('.is-loading')){
      imgLoading()
    }else{
      return
    }
  });
  
  function imgLoading(){
    let imagesUrl = document.querySelectorAll('.is-loading img')
    let images = new Array(imagesUrl.length)
    let loadingCount = 0
    for (let i = 0; i < imagesUrl.length; i++) {
      images[i] = new Image()
      images[i].src = imagesUrl[i].src
      images[i].crossOrigin = "Anonymous";
      images[i].addEventListener('load', () => {
        loadingCount++
        if (loadingCount === images.length - 1) {
          clearTimeout(timeout)
          loaded()
        }
      })
    }
  }
  function loaded(){
    if(document.querySelector('.is-loading')){
      document.querySelector('.is-loading').classList.remove('is-loading');
      for (let i = 0; i < callback.length; i++) {
        callback[i]();
      }
    }
  }
}