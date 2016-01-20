export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export function loginUserAction(email, password) {
  return {
    type: LOGIN_USER,
    payload: {
      email,
      password,
    },
  }
}

export function logoutUserAction() {
  return {
    type: LOGOUT_USER,
  }
}
