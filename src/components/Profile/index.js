import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const status = {
  loading: 'loading',
  success: 'success',
  failed: 'failed',
}
class Profile extends Component {
  state = {profileData: '', statusInfo: status.loading}

  componentDidMount() {
    this.getProfileApi()
  }

  onSuccess = data => {
    this.setState({profileData: data, statusInfo: status.success})
  }

  onFailure = () => {
    this.setState({statusInfo: status.failed})
  }

  getApiAgain = () => {
    this.getProfileApi()
  }

  getProfileApi = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data)
    } else {
      this.onFailure()
    }
  }

  renderLoading = () => (
    <div className="profile-bg-image">
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        className="profile-loading"
      />
    </div>
  )

  renderFailuer = () => (
    <button type="button" className="profile-retry" onClick={this.getApiAgain}>
      Retry
    </button>
  )

  switchByRender = () => {
    const {statusInfo} = this.state
    switch (statusInfo) {
      case status.success:
        return this.renderDataProfile()
      case status.failed:
        return this.renderFailuer()
      default:
        return this.renderLoading()
    }
  }

  renderDataProfile = () => {
    const {profileData} = this.state
    const profileDetailsCamel = {
      name: profileData.profile_details.name,
      profileImageUrl: profileData.profile_details.profile_image_url,
      shortBio: profileData.profile_details.short_bio,
    }
    const {name, profileImageUrl, shortBio} = profileDetailsCamel
    return (
      <div className="profile-bg-image">
        <img src={profileImageUrl} alt={name} className="profile-image" />
        <p className="profile-name">{name}</p>
        <p>{shortBio}</p>
      </div>
    )
  }

  render() {
    return <div className="profile-container">{this.switchByRender()}</div>
  }
}
export default Profile
