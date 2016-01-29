import { json } from '../../asyncModules/ajax'

const testServer = 'http://localhost:3333'
const hangarHeaders = { 'Factory': 'hangar' }

function testJson(method, url, body) {
  return json(method, url, body, hangarHeaders)
      .then((response) => response.data)
      .catch(function(error) {
        console.log('request failed', error)
      })
}

export function create(type, properties = {}) {
  return testJson('post', `${testServer}/${type}s`, { [type]: properties })
}

export function deleteAll() {
  return testJson('delete', '/')
}
