import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', error: false}

  changeUsername = event => {
    this.setState({username: event.target.value, error: false})
  }

  changePassword = event => {
    this.setState({password: event.target.value, error: false})
  }

  onSuccessLogin = data => {
    const jwtToken = data.jwt_token
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onFailedLogin = () => {
    this.setState({error: true})
  }

  submitData = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const credentials = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessLogin(data)
    } else {
      this.onFailedLogin()
    }
  }

  render() {
    const {username, password, error} = this.state
    return (
      <div className="loginForm-container">
        <div className="loginForm-login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-size"
          />
          <form className="loginForm-form" onSubmit={this.submitData}>
            <div className="loginForm-label-input-container">
              <label htmlFor="username" className="loginForm-label-name">
                USERNAME
              </label>
              <input
                type="text"
                placeholder="Username"
                id="username"
                value={username}
                className="loginForm-input-style"
                onChange={this.changeUsername}
              />
            </div>
            <div>
              <label htmlFor="password" className="loginForm-label-name">
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                className="loginForm-input-style"
                onChange={this.changePassword}
              />
            </div>
            <button type="submit" className="loginForm-login-button">
              Login
            </button>
          </form>
          {error ? (
            <p className="loginForm-error-message">
              *Username and Password didn&apos;t match
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}

export default LoginForm
