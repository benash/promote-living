import { Component } from 'react'
import { div, form, input, label, button, h1, h4, el, a } from './helpers'

class LoginFormView extends Component {
  login(e) {
    e.preventDefault()
    var email = this.refs.email.value
    var password = this.refs.password.value

    this.props.loginUser(email, password)
  }

  showSignupForm(e) {
    e.preventDefault()

    this.props.showSignupForm()
  }

  render() {
    return (
        form({ className: 'ui login form inverted segment', onSubmit: (e) => this.login(e) },
            div({ className: 'fields' },
                div({ className: 'field' },
                    input({ type: 'email', ref: 'email', placeholder: 'Email' })),
                div({ className: 'field' },
                    input({ type: 'password', ref: 'password', placeholder: 'Password' })),
                div({ className: 'field' },
                    button({ className: 'ui primary button', type: 'submit' }, 'Login'))),
            a({ href: '#', onClick: (e) => this.showSignupForm(e) }, 'Individual signup'))
    )
  }
}

export class WelcomeView extends Component {
  render() {
    return (
        div({ className: 'welcome container' },
            div({ className: 'ui inverted first segment' },
                h1({ className: 'ui header' }, 'Making Healthy Choices is Hard.')),
            div({ className: 'ui inverted second segment' },
                h1({ className: 'ui header' }, 'We Make Healthy Rewards Easy.'))))
  }
}

export class SignupView extends Component {
  render() {
    return (
      div({ className: 'ui inverted segment', id: 'signup' },
          form({ className: 'ui form' },
              div({ className: 'field' },
                  div({ className: 'two fields'},
                      div({ className: 'field' },
                          input({ type: 'text', name: 'shipping[first-name]', placeholder: 'First Name' })),
                      div({ className: 'field' },
                          input({ type: 'text', name: 'shipping[last-name]', placeholder: 'Last Name' })))),
              div({ className: 'field' },
                  div({ className: 'fields'},
                      div({ className: 'twelve wide field' },
                          input({ type: 'text', name: 'shipping[address]', placeholder: 'Street Address' })),
                      div({ className: 'four wide field' },
                          input({ type: 'text', name: 'shipping[address-2]', placeholder: 'Apt #' }))))))
    )
  }
}

export class LoggedOutView extends Component {
  render() {
    const { loginUser, showSignupForm, mainView } = this.props

    return (
        div({ className: 'splash page' },
            el(LoginFormView, { loginUser, showSignupForm }),
            el(mainView)))
  }
}
