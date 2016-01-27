import { SUCCEED_LOGIN_USER, SUCCEED_LOGOUT_USER } from './actions'

function currentUser(state, action) {
  switch (action.type) {
    case SUCCEED_LOGIN_USER:
      const { email } = action.payload
      return {
        email,
      }
    case SUCCEED_LOGOUT_USER:
      return null
    default:
      return state
  }
}

export default function(state = { currentUser: window.currentUser }, action) {
  return {
    currentUser: currentUser(state.currentUser, action),
  }
}