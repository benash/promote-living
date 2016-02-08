import { SUCCEED_LOGIN_USER, SUCCEED_LOGOUT_USER, SET_MAIN_VIEW_ACTION } from './actions'
import { LoggedInView, SplashView } from 'views'

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

function mainView(state, action) {
  switch (action.type) {
    case SET_MAIN_VIEW_ACTION:
      return action.payload
    default:
      return state
  }
}

function isLoggedIn(user) {
  return !!user
}

const initialState = {
  currentUser: window.currentUser,
  mainView: isLoggedIn(window.currentUser) ? LoggedInView : SplashView,
}

export default function(state = initialState, action) {
  return {
    currentUser: currentUser(state.currentUser, action),
    mainView: mainView(state.mainView, action),
  }
}