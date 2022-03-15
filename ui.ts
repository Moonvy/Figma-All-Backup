export function ui() {
  if (document.querySelector(".moonvy-figma-backup")) {
    return;
  }

  let windowEl = document.createElement("div");
  windowEl.classList.add("moonvy-figma-backup");
  document.body.appendChild(windowEl);

  windowEl.style = `position: fixed;
  width: 500px;
  height: 300px;
  background: rgba(29, 25, 37, 0.93);
  backdrop-filter: blur(23px);
  inset: 0px;
  margin: auto;
  z-index: 111;
  overflow: hidden;
  box-shadow: rgb(20 15 35 / 17%) 0px 2px 4px, rgb(17 17 17 / 14%) 0px 10px 23px;
  border-top: 5px solid rgb(98, 49, 239);
  border-radius: 4px;
  color: rgb(238, 232, 255);
  font-family: sans-serif;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  font-size: 14px;
  white-space: break-spaces;
  word-break: break-all;`;


  return windowEl;
}
