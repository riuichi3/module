export function mouseCursol() {
  const mouseElm = document.createElement("div");
  let hoverFlg = false;
  mouseElm.id = "js-mouseCursor";
  document.body.appendChild(mouseElm);

  //マウスカーソル用のdivを取得
  const mouseCursor = document.getElementById("js-mouseCursor");

  //aタグにホバー中かどうかの判別フラグ
  let hovFlag = false;

  //マウスに追従させる処理 （リンクに吸い付いてる時は除外する）
  document.addEventListener("mousemove", function (e) {
    if (!hovFlag) {
      cursorOff();
      mouseCursor.style.transform =
        "translate(" + e.clientX + "px, " + e.clientY + "px)";
    }
  });
  const focusElm = document.querySelectorAll("input,select,a");
  for (let i = 0; i < focusElm.length; i++) {
    focusElm[i].onfocus = function (e) {
      cursorOff();
      cursor(e);
    };
  }

  //リンクへ吸い付く処理
  const linkElem = document.querySelectorAll(
    "a:not(.no_stick_),iframe,.wrapper,input"
  );
  for (let i = 0; i < linkElem.length; i++) {
    //マウスホバー時
    linkElem[i].addEventListener("mouseover", function (e) {
      hovFlag = true;
      //submitボタンは形が違うので対応したclassを付与
      if (linkElem[i].classList.contains("submit")) {
        mouseCursor.classList.add("-submit");
      }
      //マウスカーソルを要素の位置に移動
      cursor(e);
    });
    //マウスホバー解除時
    linkElem[i].addEventListener("mouseout", function (e) {
      cursorOff();
    });
  }

  //マウスカーソルの位置を要素の位置に移動
  function cursor(e) {
    //マウスカーソルにクラスをつける
    if (e.target.classList.contains("submit")) {
      mouseCursor.classList.add("-submit");
    }
    mouseCursor.classList.add("-hover");
    let rect = e.target.getBoundingClientRect();
    let posX = rect.left;
    let posY = rect.top;
    let width = rect.width;
    let height = rect.height;

    mouseCursor.style.transform = "translate(" + posX + "px, " + posY + "px)";
    mouseCursor.style.width = width + "px";
    mouseCursor.style.height = height + "px";
  }
  //フォーカスを外す
  function cursorOff() {
    hovFlag = false;
    mouseCursor.classList.remove("-hover");
    mouseCursor.classList.remove("-submit");
    mouseCursor.style.width = "1px";
    mouseCursor.style.height = "1px";
  }

  //submitをクリックしたらフォーカスを外す
  const submit = document.querySelector("input.submit");
  if (submit) {
    submit.addEventListener("click", () => {
      cursorOff();
    });
  }
}
