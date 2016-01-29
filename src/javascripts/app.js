import { Component } from 'react'
import { connect } from 'react-redux'

import { loginUserAction, logoutUserAction } from './actions'
import { LoggedInView, LoggedOutView } from 'views'
import { el } from './views/helpers'

class App extends Component {
  render() {
    const { dispatch, currentUser, isLoggedIn } = this.props
    const logoutUser = () => dispatch(logoutUserAction())
    const loginUser = (email, password) => dispatch(loginUserAction(email, password))

    return isLoggedIn()
        ? el(LoggedInView, { currentUser, logoutUser })
        : el(LoggedOutView, { loginUser })
  }
}

let select = (state) => ({
  currentUser: state.currentUser,
  isLoggedIn: function() {
    return !!state.currentUser
  }
})

export default connect(select)(App)
