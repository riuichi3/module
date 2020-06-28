
//上に戻るボタンを表示／非表示
export function scrollTop(callback) {
  const elm = document.querySelector('.c-scrollTop');
  window.addEventListener('scroll', function(e) {
    const scTop = window.pageYOffset;
    if(scTop>500){
      elm.classList.remove('_cTinvisible');
      elm.classList.add('_cTvisible');
    } else {
      elm.classList.remove('_cTvisible');
      elm.classList.add('_cTinvisible');
    }
  })
}