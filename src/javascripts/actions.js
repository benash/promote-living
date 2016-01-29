import { json } from 'asyncModules/ajax'

export const INIT_LOGIN_USER = 'INIT_LOGIN_USER'
export const SUCCEED_LOGIN_USER = 'SUCCEED_LOGIN_USER'
export const FAIL_LOGIN_USER = 'FAIL_LOGIN_USER'

export const INIT_LOGOUT_USER = 'INIT_LOGOUT_USER'
export const SUCCEED_LOGOUT_USER = 'SUCCEED_LOGOUT_USER'
export const FAIL_LOGOUT_USER = 'FAIL_LOGOUT_USER'

export const SET_MAIN_VIEW_ACTION = 'SET_MAIN_VIEW_ACTION'

function simpleAction(type, payload) {
  return {
    type,
    payload,
  }
}

const authenticityElement = document.querySelector("meta[name='csrf-token']")
var authenticityToken = authenticityElement && authenticityElement.getAttribute('content')

function authJson(method, url, body) {
  return json(method, url, body, {
      'X-CSRF-Token': authenticityToken,
  })
}

export function loginUserAction(email, password) {
  return dispatch => {

    dispatch(simpleAction(INIT_LOGIN_USER))

    return authJson('post', '/login', { session: { email, password, } })
        .then(json => dispatch(simpleAction(SUCCEED_LOGIN_USER, { email })))
        .catch(error => dispatch(simpleAction(FAIL_LOGIN_USER, { error })))
  }
}

export function logoutUserAction() {
  return dispatch => {

    dispatch(simpleAction(INIT_LOGOUT_USER))

    return authJson('delete', '/logout')
        .then(json => dispatch(simpleAction(SUCCEED_LOGOUT_USER)))
        .catch(error => dispatch(simpleAction(FAIL_LOGOUT_USER, { error })))
  }
}

export function setMainViewAction(View) {
  return simpleAction(SET_MAIN_VIEW_ACTION, View)
}
