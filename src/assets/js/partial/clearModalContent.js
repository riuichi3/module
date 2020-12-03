//modal内のコンテンツを消す
export function clearModalContent() {
  const toggle = document.querySelector("#toggleModal");
  const content = document.querySelector(".c-modalBase>.c-modalBase__inner");
  toggle.addEventListener("change", (e) => {
    if (!toggle.checked) {
      setTimeout(() => {
        content.innerHTML = "";
      }, 500);
    }
  });
}
