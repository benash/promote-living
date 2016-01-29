import { Component } from 'react'
import { div, form, label, button } from './helpers'

export class LoggedInView extends Component {
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
