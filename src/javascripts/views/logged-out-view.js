import { Component } from 'react'
import { div, span, form, input, button, h1, el, a, label } from './helpers'
import R from 'ramda'
import moment from 'moment'

class AuthSegmentView extends Component {
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
        div({ className: 'auth-segment' },
            form({ className: 'login-form', onSubmit: (e) => this.login(e) },
                input({ type: 'email', ref: 'email', placeholder: 'Email' }),
                input({ type: 'password', ref: 'password', placeholder: 'Password' }),
                button({ type: 'submit' }, 'Login')),
            span({ className: 'signup-text'}, 'No account? ',
                a({ href: '#', onClick: (e) => this.showSignupForm(e) }, 'Sign up here')))
    )
  }
}

export class WelcomeView extends Component {
  render() {
    return (
        div({ className: 'welcome-container' },
            h1({}, 'Making Healthy Choices is Hard.'),
            h1({}, 'We Make Healthy Rewards Easy.')
        )
    )
  }
}

export class SignupView extends Component {
  refValues() {
    return R.mapObjIndexed(R.prop('value'), this.refs)
  }

  signup(e) {
    e.preventDefault()

    const vals = this.refValues()

    var unchangedAttrs = R.pick(['email', 'password', 'first_name', 'last_name'], vals)
    var birthday = moment(`${vals.birth_year}-${vals.birth_month}-${vals.birth_day}`, 'YYYY-MM-DD', true)

    if (birthday.isValid()) {
      this.props.signupUser(Object.assign({ birthday }, unchangedAttrs))
    }
    else
      console.log('invalid')
  }

  handleBlur(e) {
    const { name, value } = e.target
    this.validate(name, value)
  }

  handleChange(e) {

  }

  validate(name, value) {
    const isValid = this.constraints[name] || (val => true)
    this.setState({ validity: Object.assign(this.state.validity, { [name]: isValid(value) }) })
  }

  constructor() {
    super()

    const eq = rhs => lhs => lhs === rhs
    const gt = rhs => lhs => lhs > rhs
    const gte = rhs => lhs => lhs >= rhs
    const lt = rhs => lhs => lhs < rhs
    const lte = rhs => lhs => lhs <= rhs

    const length = cmp => length => str => cmp(length)(str.length)
    const present = length(gt)(0)

    const EMAIL_REGEX = /\S+@\S+\.\S+/
    const matches = regex => str => regex.test(str)

    const asInteger = fn => str => fn(parseInt(str))

    const allMatch = function(...args) {
      const x = function(val, first, ...rest) {
        if (first === undefined) return true
        return first(val) && x(val, ...rest)
      }

      return val => x(val, ...args)
    }

    this.constraints = {
      first_name: present,
      last_name: present,
      birth_year: allMatch(length(eq)(4), asInteger(allMatch(gte(1800), lte(2100)))),
      birth_month: allMatch(length(eq)(2), asInteger(allMatch(gte(1), lte(12)))),
      birth_day: allMatch(length(eq)(2), asInteger(allMatch(gte(1), lte(31)))),
      email: matches(EMAIL_REGEX),
      password: length(gte)(8),
    }

    this.state = {
      validity: {
      },
    }
  }

  render() {
    const y = this
    function validated(props) {
      return Object.assign({ 'data-valid': y.state.validity[props.name], }, props)
    }

    function refed(props) {
      return Object.assign({ ref: props.name, }, props)
    }

    function text(props) {
      return Object.assign({ type: 'text', }, props)
    }

    const genericInput = R.compose(input, validated, refed)
    const textInput = R.compose(input, text, validated, refed)

    return (
      div({ className: 'signup-segment' },
          div({ className: 'heading'}, 'This is gonna be great!'),
          form({
            onSubmit: (e) => this.signup(e),
            onBlur: (e) => this.handleBlur(e),
            onChange: (e) => this.handleChange(e),
          },
              div({},
                  textInput({ name: 'first_name', placeholder: 'First Name' }),
                  textInput({ name: 'last_name', placeholder: 'Last Name' })),
              div({},
                  label({}, 'Date of birth:'),
                  textInput({ name: 'birth_year', placeholder: 'YYYY' }),
                  textInput({ name: 'birth_month', placeholder: 'MM' }),
                  textInput({ name: 'birth_day', placeholder: 'DD' })),
              div({},
                  genericInput({ type: 'email', name: 'email', placeholder: 'Email' }),
                  genericInput({ type: 'password', name: 'password', placeholder: 'Create Password' })),
              button({}, 'Create Account'))))
  }
}

export class SplashView extends Component {
  render() {
    const { loginUser, showSignupForm } = this.props

    return (
        div({ className: 'splash-page' },
            el(AuthSegmentView, { loginUser, showSignupForm }),
            el(WelcomeView)))
  }
}
