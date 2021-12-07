import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {VscLinkExternal} from 'react-icons/vsc'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const statusDetails = {
  success: 'success',
  failed: 'failed',
  loading: 'loading',
}

class JobItem extends Component {
  state = {details: '', status: statusDetails.loading}

  componentDidMount() {
    this.getData()
  }

  onSuccess = data => {
    this.setState({details: data, status: statusDetails.success})
  }

  onFailure = () => {
    this.setState({status: statusDetails.failed})
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
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

  renderSuccess = () => {
    const {details} = this.state
    const detailsCamel = {
      jobDetails: details.job_details,
      similarJobs: details.similar_jobs,
    }
    const jobsArrayCamel = {
      companyLogoUrl: detailsCamel.jobDetails.company_logo_url,
      title: detailsCamel.jobDetails.title,
      location: detailsCamel.jobDetails.location,
      employmentType: detailsCamel.jobDetails.employment_type,
      rating: detailsCamel.jobDetails.rating,
      packagePerAnnum: detailsCamel.jobDetails.package_per_annum,
      jobDescription: detailsCamel.jobDetails.job_description,
      id: detailsCamel.jobDetails.id,
      companyWebsiteUrl: detailsCamel.jobDetails.company_website_url,
      skills: detailsCamel.jobDetails.skills,
      lifeAtCompany: detailsCamel.jobDetails.life_at_company,
      similarJobs: detailsCamel.similarJobs,
    }
    const {
      companyLogoUrl,
      title,
      location,
      rating,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
      similarJobs,
    } = jobsArrayCamel
    return (
      <div className="jobitem-container ">
        <div className="jobitemsub-container">
          <div className="jobitem-logo-title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="jobitem-company-logo"
            />
            <div className="jobitem-title-rating-container">
              <p className="jobitem-title">{title}</p>
              <div className="jobitem-start-rating-container">
                <AiFillStar className="jobitem-star" />
                <p className="jobitem-rating-text">{rating}</p>
              </div>
            </div>
          </div>
          <div className="jobitem-location-package-type">
            <div className="jobitem-icons-container">
              <div className="jobitem-icon-name-container">
                <HiLocationMarker className="jobitem-icon-size" />
                <p className="jobitem-location">{location}</p>
              </div>
              <div className="jobitem-icon-name-container">
                <BsFillBriefcaseFill className="jobitem-icon-size" />
                <p className="jobitem-location">{employmentType}</p>
              </div>
            </div>
            <p className="jobitem-package">{packagePerAnnum}</p>
          </div>
          <hr className="jobitem-horizontal-line" />
          <div className="jobitem-description-visit-continer">
            <p className="jobitem-description">Description</p>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="jobitem-visit jobitem-visit-visiticon-container"
            >
              Visit
              <VscLinkExternal className="jobitem-visit-icon" />
            </a>
          </div>
          <p className="alljobs-location alljobs-descrption-margin">
            {jobDescription}
          </p>
          <h1 className="jobitem-skills">Skills</h1>
          <ul className="jobitem-skills-unorderlist-container">
            {skills.map(eachItem => (
              <li key={eachItem.name} className="jobitem-skills-name-list">
                <img
                  src={eachItem.image_url}
                  alt="skills logo"
                  className="jobitem-skill-image"
                />
                <p className="jobitem-skill-name">{eachItem.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="jobitem-description">Life at Company</h1>
          <p className="alljobs-location alljobs-descrption-margin">
            {lifeAtCompany.description}
          </p>
          <img
            src={lifeAtCompany.image_url}
            alt="company"
            className="jobitem-life-at-company-pic"
          />
        </div>
        <h1 className="jobitem-similar-jobs">Similar Jobs</h1>
        <ul className="jobitem-unorder-similarjob">
          {similarJobs.map(eachItem => (
            <SimilarJobs similarJobsDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
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

  getApiAgainjobs = () => {
    this.getData()
  }

  renderFailed = () => (
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

  switchCaseRender = () => {
    const {status} = this.state
    switch (status) {
      case statusDetails.success:
        return this.renderSuccess()
      case statusDetails.failed:
        return this.renderFailed()
      default:
        return this.renderLoading()
    }
  }

  render() {
    return (
      <div className="jobitem-container-main">
        <Header />
        {this.switchCaseRender()}
      </div>
    )
  }
}

export default JobItem
