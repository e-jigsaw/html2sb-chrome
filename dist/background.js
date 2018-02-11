chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.insertCSS({
    file: 'index.css'
  })
  chrome.tabs.executeScript({
    file: 'main.js'
  })
})
