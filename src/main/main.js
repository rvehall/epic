import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({});
  mainWindow.autoHideMenuBar = true;

   if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.on('closed', () => mainWindow = null);
  } else {
    // mainWindow.removeMenu(); // Optional
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
  }
  
}

app.whenReady().then(() => {
  createWindow();
});