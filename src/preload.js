const { Color, Titlebar, RGBA } = require('custom-electron-titlebar');

window.addEventListener('DOMContentLoaded', () => {
  const titlebar = new Titlebar({
    backgroundColor: new Color(new RGBA(0, 0, 0, 0)),
    titleHorizontalAlignment: 'center',
    menu: null,
  });

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});