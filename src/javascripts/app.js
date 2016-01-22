import 'babel-polyfill'
import { Component } from 'react'
import { connect } from 'react-redux'

import { loginUserAction, logoutUserAction } from './actions'
import { el, div, form, input, h1, button, label } from './helpers'

class LoginForm extends Component {
  handleSubmission(e) {
    e.preventDefault()
    var email = this.refs.email.value
    var password = this.refs.password.value

    this.props.loginUser(email, password)
  }

  render() {
    return (
        form({ className: 'ui login form inverted segment', onSubmit: (e) => this.handleSubmission(e) },
          div({ className: 'fields' },
            div({ className: 'field' },
              input({ type: 'email', ref: 'email', placeholder: 'Email' })),
            div({ className: 'field' },
              input({ type: 'password', ref: 'password', placeholder: 'Password' })),
            div({ className: 'field' },
              button({ className: 'ui primary button', type: 'submit' }, 'Login'))))
    )
  }
}

class Welcome extends Component {
  render() {
    return (
        div({ className: 'welcome container' },
            div({ className: 'ui inverted first segment' },
                h1({ className: 'ui header' }, 'Making Healthy Choices is Hard.')),
            div({ className: 'ui inverted second segment' },
                h1({ className: 'ui header' }, 'We Make Healthy Rewards Easy.'))))
  }
}

class LoggedOutView extends Component {
  render() {
    const { loginUser } = this.props

    return (
        div({ className: 'splash page' },
            el(LoginForm, { loginUser }),
            el(Welcome)))
  }
}

class LoggedInView extends Component {
  handleSubmission(e) {
    e.preventDefault()

    this.props.logoutUser()
  }

  render() {
    const { currentUser } = this.props

    return (
        div({ className: 'splash page' },
            form({ className: 'ui login form inverted segment', onSubmit: (e) => this.handleSubmission(e) },
                div({ className: 'inline fields' },
                    div({ className: 'field' },
                        label({ className: 'email inverted' }, currentUser.email),
                        button({ className: 'ui primary button', type: 'submit' }, 'Logout'))))))
  }
}

class App extends Component {
  render() {
    const { dispatch, currentUser } = this.props
    const logoutUser = () => dispatch(logoutUserAction())
    const loginUser = (email, password) => dispatch(loginUserAction(email, password))

    function isLoggedIn() {
      return !!currentUser
    }

    return isLoggedIn()
        ? el(LoggedInView, { currentUser, logoutUser })
        : el(LoggedOutView, { loginUser })
  }
}

let select = (state) => ({ currentUser: state.currentUser })

export default connect(select)(App)
