import { Component } from 'react'
import { div, form, input, button, h1, el } from './helpers'

class LoginFormView extends Component {
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

class WelcomeView extends Component {
  render() {
    return (
        div({ className: 'welcome container' },
            div({ className: 'ui inverted first segment' },
                h1({ className: 'ui header' }, 'Making Healthy Choices is Hard.')),
            div({ className: 'ui inverted second segment' },
                h1({ className: 'ui header' }, 'We Make Healthy Rewards Easy.'))))
  }
}

export class LoggedOutView extends Component {
  render() {
    const { loginUser } = this.props

    return (
        div({ className: 'splash page' },
            el(LoginFormView, { loginUser }),
            el(WelcomeView)))
  }
}
