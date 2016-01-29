import { Component } from 'react'
import { connect } from 'react-redux'

import { loginUserAction, logoutUserAction, setMainViewAction } from './actions'
import { LoggedInView, LoggedOutView, SignupView } from 'views'
import { el } from './views/helpers'

class App extends Component {
  render() {
    const { dispatch, currentUser, isLoggedIn, mainView } = this.props
    const logoutUser = () => dispatch(logoutUserAction())
    const loginUser = (email, password) => dispatch(loginUserAction(email, password))
    const showSignupForm = () => dispatch(setMainViewAction(SignupView))

    return isLoggedIn()
        ? el(LoggedInView, { currentUser, logoutUser })
        : el(LoggedOutView, { loginUser, showSignupForm, mainView })
  }
}

let select = ({ currentUser, mainView }) => ({
  currentUser,
  mainView,
  isLoggedIn: function() {
    return !!currentUser
  }
})

export default connect(select)(App)
