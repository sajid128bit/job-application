import {Component} from 'react'
import {BiSearch} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Profile from '../Profile'
import Filters from '../Filters'
import Alljobs from '../Alljobs'
import './index.css'

const statusDetails = {
  success: 'success',
  failed: 'failed',
  loading: 'loading',
}

class Jobs extends Component {
  state = {
    search: '',
    employmentType: [],
    minimumPackage: '',
    status: statusDetails.loading,
    alljobs: '',
  }

  componentDidMount() {
    this.getData()
  }

  changeSearchInput = event => {
    this.setState({search: event.target.value}, this.getData)
  }

  addEmploymentType = empType => {
    this.setState(
      prevState => ({
        employmentType: [...prevState.employmentType, empType],
      }),
      this.getData,
    )
  }

  removeEmploymentType = empType => {
    const {employmentType} = this.state
    const updatedemploymentType = employmentType.filter(
      eachItem => eachItem !== empType,
    )
    this.setState({employmentType: updatedemploymentType}, this.getData)
  }

  addMinimumSalary = minSalary => {
    this.setState({minimumPackage: minSalary}, this.getData)
  }

  removeMinimumSalary = () => {
    this.setState({minimumPackage: ''}, this.getData)
  }

  getEntervalue = event => {
    if (event.keyCode === 13) {
      this.getData()
    }
  }

  onsuccess = data => {
    this.setState({status: statusDetails.success, alljobs: data})
  }

  onfailure = () => {
    this.setState({status: statusDetails.failed})
  }

  getData = async () => {
    const {search, employmentType, minimumPackage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const employmentConcatenated = employmentType.join()
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentConcatenated}&minimum_package=${minimumPackage}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onsuccess(data)
    } else {
      this.onfailure()
    }
  }

  renderLoading = () => (
    <Loader
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
      className="job-loading"
    />
  )

  renderAlljobs = () => {
    const {alljobs} = this.state
    return <Alljobs alljobs={alljobs} />
  }

  getApiAgainjobs = () => {
    this.getData()
  }

  renderFailedView = () => (
    <div className="jobs-failed-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failed-image"
      />
      <p className="jobs-wentwrong">Oops! Something Went Wrong</p>
      <p className="jobs-wentwrong-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="jobs-failed-retry-btn"
        onClick={this.getApiAgainjobs}
      >
        Retry
      </button>
    </div>
  )

  renderSwitch = () => {
    const {status} = this.state
    switch (status) {
      case statusDetails.success:
        return this.renderAlljobs()
      case statusDetails.failed:
        return this.renderFailedView()
      default:
        return this.renderLoading()
    }
  }

  render() {
    const {search, minimumPackage, employmentType} = this.state
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-mobile-device-container">
          <div className="jobs-search-container">
            <input
              type="text"
              className="jobs-searchinput"
              placeholder="Search"
              onChange={this.changeSearchInput}
              value={search}
              onKeyUp={this.getEntervalue}
            />
            <div className="jobs-searchicon-container">
              <BiSearch className="jobs-searchicon" />
            </div>
          </div>
          <Profile />
          <Filters
            employmentType={employmentType}
            minimumPackage={minimumPackage}
            addEmploymentType={this.addEmploymentType}
            removeEmploymentType={this.removeEmploymentType}
            addMinimumSalary={this.addMinimumSalary}
            removeMinimumSalary={this.removeMinimumSalary}
          />
          {this.renderSwitch()}
        </div>
        <div className="jobs-largedevice-container">
          <div className="jobs-largedevice-profile-filter-container">
            <Profile />
            <Filters
              employmentType={employmentType}
              minimumPackage={minimumPackage}
              addEmploymentType={this.addEmploymentType}
              removeEmploymentType={this.removeEmploymentType}
              addMinimumSalary={this.addMinimumSalary}
              removeMinimumSalary={this.removeMinimumSalary}
            />
          </div>
          <div className="jobs-largedevice-input-jobs-container">
            <div className="jobs-search-container">
              <input
                type="text"
                className="jobs-searchinput"
                placeholder="Search"
                onChange={this.changeSearchInput}
                value={search}
                onKeyUp={this.getEntervalue}
              />
              <div className="jobs-searchicon-container">
                <BiSearch className="jobs-searchicon" />
              </div>
            </div>
            {this.renderSwitch()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
