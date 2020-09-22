export function barrage(elm) {
  const originStr = elm.innerText;
  let delay = 0;
  // console.log(originStr);
  let output = "";
  for (let i = 0; i < originStr.length; i++) {
    let str = originStr.substring(i, i + 1);
    output = output + `<span>${str}</span>`;
    delay = delay + 100;
    setTimeout(() => {
      elm.querySelectorAll("span")[i].classList.add("barrageStart");
    }, delay);
  }
  elm.innerHTML = output;
}
