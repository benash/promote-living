import { SUCCEED_LOGIN_USER, LOGOUT_USER } from './actions'

function currentUser(state, action) {
  switch (action.type) {
    case SUCCEED_LOGIN_USER:
      const { email } = action.payload
      return {
        email,
      }
    case LOGOUT_USER:
      return null
    default:
      return state
  }
}

export default function(state = {}, action) {
  return {
    currentUser: currentUser(state.currentUser, action),
  }
}