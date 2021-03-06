const { app, BrowserWindow, Notification } = require('electron');
const path = require('path');
const DiscordRPC = require('discord-rpc');

if (require('electron-squirrel-startup')) return app.quit();

function createWindow() {
  const win = new BrowserWindow({
    minWidth: 1000,
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

  win.loadURL('https://dema.city');
  win.setMenuBarVisibility(false);

  const clientId = '845048506535378946';
  const rpc = new DiscordRPC.Client({ transport: 'ipc' });

  rpc.on('ready', () => {
    activity();
  });

  rpc.login({ clientId }).catch(console.error);

  function activity() {
    rpc.setActivity({
      details: 'dema.city',
      startTimestamp: new Date(),
      largeImageKey: 'demacity',
      largeImageText: 'Dema City',
      instance: false,
      buttons: [
        {
          label: 'Visitar',
          url: 'https://dema.city',
        }
      ],
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

require('update-electron-app')({
  updateInterval: '5 minutes',
  logger: require('electron-log')
});

function notify(title, body) {
  new Notification({ title: title, body: body, icon: path.join(__dirname, 'images/icon.png'), subtitle: 'DemaApp' }).show()
}