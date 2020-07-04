//modal内のコンテンツを消す
export function clearModalContent() {
  const toggle = document.querySelector("#toggleModal");
  const content = document.querySelector(".c-modalBase>.sub-inner");
  toggle.addEventListener("change", (e) => {
    if (!toggle.checked) {
      setTimeout(() => {
        content.innerHTML = "";
      }, 500);
    }
  });
}
