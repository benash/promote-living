import { json } from '../asyncModules/ajax'

var Browser = require('zombie')

Browser.localhost('localhost', 3333)

Browser.Assert.prototype.containsText = function(selector, text) {
  return this.text(selector, new RegExp(`.*${text}.*`))
}

export { Browser }

const testServer = 'http://localhost:3333'
const hangarHeaders = { 'Factory': 'hangar' }

export const create = (type, properties = {}) => {

  return json('post', `${testServer}/${type}s`, { [type]: properties }, hangarHeaders)
      .then((response) => response.data)
      .catch(function(error) {
        console.log('request failed', error)
      })
}
