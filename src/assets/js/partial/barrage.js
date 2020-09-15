export function barrage(callback) {
  const elm = document.querySelectorAll(".js-barrage");
  for (let i = 0; i < elm.length; i++) {
    const originStr = elm[i].innerText;
    console.log(originStr);
    let output = "";
    for (let j = 0; j < originStr.length; j++) {
      let str = originStr.substring(j, j + 1);
      console.log(str);
      output = output + `<span>${str}</span>`;
    }
    elm[i].innerHTML = output;
  }
}
