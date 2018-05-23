import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';

let mainWindow;

const createWindow = async () => {
  // This should write to the inspector :(
    console.log('\n(main proc) MAIN.JS\n', ['a', 'b', 'c', {arbitraryProperty: {innerArbitraryProperty: 'here\'s a string'}}])
    process.stdout.write('\n(main proc) MAIN.JS\n', ['a', 'b', 'c', {arbitraryProperty: {innerArbitraryProperty: 'here\'s a string'}}])
  //
  
  const indexHTML = path.join(__dirname, '../devserver/index.html')

  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1200,
    minHeight: 600,
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.loadURL(url.format({
    pathname: indexHTML,
    protocol: 'file:',
    slashes: true
  }));
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

export {}
