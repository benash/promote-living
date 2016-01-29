var Browser = require('zombie')

Browser.localhost('localhost', 3333)

Browser.extend(function(browser) {
  browser.on('opened', (window) => window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = true)
})

export { Browser }
