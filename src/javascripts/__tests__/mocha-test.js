import { create, deleteAll, Browser, FrontPage } from './test-helper'
var assert = require('assert')

describe('Basic', function() {
  var page

  before(deleteAll)
  before(function() {
    page = new FrontPage(new Browser())
  })

  it('shows the homepage', function() {
    return page.visit()
        .then(() => assert(page.isLoggedOut()))
  })

  describe('Auth', function() {
    var user

    before(function() {
      return create('user')
          .then((u) => user = u)
          .then(() => page.visit())
          .then(() => page.loginUser(user))
    })

    it('logs in a user', function() {
      assert(page.isLoggedIn())
      return page.visit()
          .then(() => assert(page.isLoggedIn()))
    })

    it('logs out a user', function() {
      return page.logoutUser()
          .then(() => assert(page.isLoggedOut()))
          .then(() => page.visit())
          .then(() => assert(page.isLoggedOut()))
    })
  })
})
