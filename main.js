import { app, BrowserWindow } from 'electron'
import path from 'path'

const IS_DEV = process.env.IS_IN_DEVELOPMENT || false

function createWindow () {
  // Create the main Electron window
  const win = new BrowserWindow({
    autoHideMenuBar:true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  if (IS_DEV) {
    // If we are in development mode we load content from localhost server - vite
    // and open the developer tools
    win.loadURL('http://localhost:5173/')
    win.webContents.openDevTools({mode:'detach'})
  } else {
    // In all other cases, load the index.html file from the dist folder
    win.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`)

  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  // On macOS, it's common for an app and its menu bar to remain
  // active until the user shuts down the application via the Cmd + Q shortcut
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS, if an application is in the dock, it is common for a window to be created after
  // clicking on the icon in the dock if there are no windows active
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})