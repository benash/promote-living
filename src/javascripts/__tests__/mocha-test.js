import { create, Browser } from './helpers'

function containsString(subStr, str) {
  return ~str.indexOf(subStr)
}

describe('Basic', function() {
  it('shows the homepage', function(done) {
    var browser = new Browser()
    browser.visit('/', () => {
      browser.assert.text('title', 'PromoteLiving')
      browser.assert.containsText('body', 'Healthy Rewards')
      done()
    })
  })

  describe('login', function(done) {
    const browser = new Browser()
    var user = null

    before(function(done) {

      create('user').then((u) => {
        user = u
        browser.visit('/', function() {
          browser.fill('input[type=email]', user.email)
          browser.fill('input[type=password]', 'abcd1234')
          browser.pressButton('button', done)
        })
      })
    })

    it('logs in a user', function() {
      browser.assert.text('label.email', user.email)
    })
  })
})
