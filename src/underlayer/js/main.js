
document.addEventListener("DOMContentLoaded", function () {
  const mouseElm = document.createElement('div');
  let hoverFlg = false;
  mouseElm.id = 'js-mouseCursor';
  document.body.appendChild(mouseElm);


    //マウスストーカー用のdivを取得
    const mouseCursor = document.getElementById('js-mouseCursor');

    //aタグにホバー中かどうかの判別フラグ
    let hovFlag = false;
    
    //マウスに追従させる処理 （リンクに吸い付いてる時は除外する）
    document.addEventListener('mousemove', function (e) {
        if (!hovFlag) {
        mouseCursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
        }
    });
    
    //リンクへ吸い付く処理
    const linkElem = document.querySelectorAll('a:not(.no_stick_)');
    for (let i = 0; i < linkElem.length; i++) {
        //マウスホバー時
        linkElem[i].addEventListener('mouseover', function (e) {
            hovFlag = true;
    
            //マウスストーカーにクラスをつける
            mouseCursor.classList.add('-hover');
    
            //マウスストーカーの位置をリンクの中心に固定
            let rect = e.target.getBoundingClientRect();
            let posX = rect.left;
            let posY = rect.top;
            let width = rect.width;
            let height = rect.height;
    
            mouseCursor.style.transform = 'translate(' + posX + 'px, ' + posY + 'px)';
            mouseCursor.style.width = width + 'px';
            mouseCursor.style.height = height + 'px';
    
        });
        //マウスホバー解除時
        linkElem[i].addEventListener('mouseout', function (e) {
            hovFlag = false;
            mouseCursor.classList.remove('-hover');
            mouseCursor.style.width = '1px';
            mouseCursor.style.height = '1px';
        });
    }
});