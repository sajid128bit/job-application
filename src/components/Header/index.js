import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const removeToken = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="header-webiste-logo"
      />
      <div className="header-buttons-container-mobile">
        <Link to="/">
          <AiFillHome className="header-icons" />
        </Link>
        <Link to="/jobs">
          <BsFillBriefcaseFill className="header-icons" />
        </Link>
        <FiLogOut className="header-icons" onClick={removeToken} />
      </div>
      <div className="header-buttons-container-laptops">
        <div className="header-home-jobs-container">
          <Link to="/" className="header-link-style">
            <h1 className="header-home-job">Home</h1>
          </Link>
          <Link to="/jobs" className="header-link-style">
            <h1 className="header-home-job">Jobs</h1>
          </Link>
        </div>
        <button
          type="button"
          className="header-logout-button"
          onClick={removeToken}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
