import { Component } from 'react'
import { connect } from 'react-redux'

import { loginUserAction, logoutUserAction, signupUserAction, setMainViewAction } from './actions'
import { SignupView } from 'views'
import { el } from './views/helpers'

class App extends Component {
  render() {
    const { dispatch, currentUser, mainView, mainProps } = this.props

    const logoutUser = () => dispatch(logoutUserAction())
    const loginUser = (email, password) => dispatch(loginUserAction(email, password))
    const signupUser = (attrs) => dispatch(signupUserAction(attrs))
    const showSignupForm = () => dispatch(setMainViewAction(SignupView))

    return el(mainView, Object.assign({ currentUser, logoutUser, loginUser, signupUser, showSignupForm }, mainProps))
  }
}

let select = ({ currentUser, mainView }) => ({
  currentUser,
  mainView,
})

export default connect(select)(App)
