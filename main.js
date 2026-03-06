const { app, BrowserWindow, session } = require('electron')

// Chrome-like user agent so sites like WhatsApp Web accept the app (they require "Chrome 85+")
const CHROME_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      userAgent: CHROME_USER_AGENT
    }
  })

  // Load the URL input page
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  // Set Chrome user agent for the whole app session (affects all windows and navigator.userAgent)
  session.defaultSession.setUserAgent(CHROME_USER_AGENT)

  // Force User-Agent header on every request so WhatsApp and similar sites always see Chrome
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = CHROME_USER_AGENT
    // User-Agent Client Hints (Chrome sends these; some sites like WhatsApp check them)
    details.requestHeaders['Sec-CH-UA'] = '"Not A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"'
    details.requestHeaders['Sec-CH-UA-Mobile'] = '?0'
    details.requestHeaders['Sec-CH-UA-Platform'] = '"Windows"'
    callback({ requestHeaders: details.requestHeaders })
  })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})