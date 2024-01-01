import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow;

async function handleFileOpen() {
  const { cancelled, filePaths } = await dialog.showOpenDialog({});
  if (!cancelled) {
    return filePaths[0];
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      webSecurity: true
    }
  });

  mainWindow.setMenuBarVisibility(false);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.on('closed', () => mainWindow = null);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer', 'index.html'));
  }
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', handleFileOpen);
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow();
  }
});