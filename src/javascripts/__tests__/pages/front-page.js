export class FrontPage {
  constructor(browser) {
    this.browser = browser
    browser.evaluate('__REACT_DEVTOOLS_GLOBAL_HOOK__ = true')
  }

  visit() {
    return this.browser.visit('/')
  }

  loginUser(user) {
    this.user = user
    this.browser.fill('input[type=email]', user.email)
    this.browser.fill('input[type=password]', 'abcd1234')
    return this.browser.pressButton('button')
  }

  logoutUser() {
    return this.browser.pressButton('button')
  }

  isLoggedIn() {
    return this.browser.text('label.email') === this.user.email
  }

  isLoggedOut() {
    return this.browser.text('body').includes('Healthy Rewards')
  }
}
