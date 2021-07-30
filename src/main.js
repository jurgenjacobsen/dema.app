const { app, BrowserWindow, Notification } = require('electron');
const path = require('path');
const DiscordRPC = require('discord-rpc');

if (require('electron-squirrel-startup')) return app.quit();

require('update-electron-app')({
  repo: 'jurgenjacobsen/dema.app',
  updateInterval: '10 minutes',
  notifyUser: true,
});

function createWindow() {
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    frame: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    center: true,
    icon: path.join(__dirname, 'images/icon.png'),
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  });

  win.loadURL('http://localhost');
  win.setMenuBarVisibility(false);

  const clientId = '831653654426550293';
  const rpc = new DiscordRPC.Client({ transport: 'ipc' });

  rpc.on('ready', () => {
    activity();

    setTimeout(() => {
      notify('Title', 'body')
    }, 10 * 1000);
  });

  rpc.login({ clientId }).catch(console.error);

  function activity() {
    rpc.setActivity({
      details: 'dema.city',
      startTimestamp: new Date(),
      largeImageKey: 'demadark',
      largeImageText: 'Dema',
      instance: false,
      buttons: [
        {
          label: 'Visitar',
          url: 'https://dema.city',
        }
      ]
    });
  }
};


app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function notify(title, body) {
  new Notification({ title: title, body: body, icon: path.join(__dirname, 'images/icon.png'), subtitle: 'DemaApp' }).show()
}