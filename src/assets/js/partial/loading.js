
export function loading(callback) {
  $(function(){
    if(document.querySelector('body.is-loading')){
      imgLoading()
    }else{
      return
    }
  });
  
  function imgLoading(){
    let imagesUrl = document.querySelectorAll('img')
    let images = new Array(imagesUrl.length)
    let loadingCount = 0
    for (let i = 0; i < imagesUrl.length; i++) {
      images[i] = new Image()
      images[i].src = imagesUrl[i].src
      images[i].crossOrigin = "Anonymous";
      images[i].addEventListener('load', () => {
        loadingCount++
        if (loadingCount === images.length - 1) {
          document.querySelector('body').classList.remove('is-loading');
          for (let i = 0; i < callback.length; i++) {
            callback[i]();
          }
        }
      })
    }
  }
}