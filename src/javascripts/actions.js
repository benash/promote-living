import fetch from 'isomorphic-fetch'

export const INIT_LOGIN_USER = 'INIT_LOGIN_USER'
export const SUCCEED_LOGIN_USER = 'SUCCEED_LOGIN_USER'
export const FAIL_LOGIN_USER = 'FAIL_LOGIN_USER'

export const LOGOUT_USER = 'LOGOUT_USER'

function simpleAction(type, payload) {
  return {
    type,
    payload,
  }
}

var authenticityToken = document.querySelector("meta[name='csrf-token']").getAttribute('content')

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  var error = new Error(response.statusText)
  error.response = response
  throw error
}
function parseJson(response) {
  return response.json().catch(ex => null)
}

function postJson(url, body) {
  return fetch(url, {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': authenticityToken,
    },
    body: JSON.stringify(body),
  })
      .then(checkStatus)
      .then(parseJson)
}

export function loginUserAction(email, password) {
  return dispatch => {

    dispatch(simpleAction(INIT_LOGIN_USER))

    return postJson('/login', { session: { email, password, } })
        .then(json => dispatch(simpleAction(SUCCEED_LOGIN_USER, { email })))
        .catch(error => dispatch(simpleAction(FAIL_LOGIN_USER, { error })))
  }
}

export function logoutUserAction() {
  return {
    type: LOGOUT_USER,
  }
}
