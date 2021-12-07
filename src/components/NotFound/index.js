import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <Header />
    <div className="notfound-image-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="notfound-image-size"
      />
      <p className="notfound-wentwrong">Page Not Found</p>
      <p className="notfound-wentwrong-para">
        We&aposre sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
