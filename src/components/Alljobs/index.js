import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Alljobs = props => {
  const {alljobs} = props
  const jobsArray = alljobs.jobs
  const renderJobAsList = jobsArrayone => {
    const jobsArrayCamel = {
      companyLogoUrl: jobsArrayone.company_logo_url,
      title: jobsArrayone.title,
      location: jobsArrayone.location,
      employmentType: jobsArrayone.employment_type,
      rating: jobsArrayone.rating,
      packagePerAnnum: jobsArrayone.package_per_annum,
      jobDescription: jobsArrayone.job_description,
      id: jobsArrayone.id,
    }
    const {
      companyLogoUrl,
      title,
      location,
      rating,
      employmentType,
      packagePerAnnum,
      jobDescription,
      id,
    } = jobsArrayCamel

    return (
      <Link to={`/jobs/${id}`} className="alljobs-link-style">
        <div className="alljobs-container">
          <div className="alljobs-logo-title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="alljobs-company-logo"
            />
            <div className="alljobs-title-rating-container">
              <p className="alljobs-title">{title}</p>
              <div className="alljobs-start-rating-container">
                <AiFillStar className="alljobs-star" />
                <p className="alljobs-rating-text">{rating}</p>
              </div>
            </div>
          </div>
          <div className="alljobs-location-package-type">
            <div className="alljobs-icons-container">
              <div className="alljobs-icon-name-container">
                <HiLocationMarker className="alljobs-icon-size" />
                <p className="alljobs-location">{location}</p>
              </div>
              <div className="alljobs-icon-name-container">
                <BsFillBriefcaseFill className="alljobs-icon-size" />
                <p className="alljobs-location">{employmentType}</p>
              </div>
            </div>
            <p className="alljobs-package">{packagePerAnnum}</p>
          </div>
          <hr className="alljobs-horizontal-line" />
          <p className="alljobs-package">Description</p>
          <p className="alljobs-location alljobs-descrption-margin">
            {jobDescription}
          </p>
        </div>
      </Link>
    )
  }
  const renderNoJobsImage = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="jobless-image-size"
      />
      <p className="jobless-nojobs-found">No Jobs Found</p>
      <p className="jobless-nojobs-found-para">
        We count not find any jobs. Try other filters.
      </p>
    </>
  )

  const renderInsideList = () => (
    <ul className="jobsal-under-orderlist-style">
      {jobsArray.map(eachItem => (
        <li key={eachItem.id}>{renderJobAsList(eachItem)}</li>
      ))}
    </ul>
  )
  const renderBasedonSize = () => {
    if (jobsArray.length === 0) {
      return renderNoJobsImage()
    }
    return renderInsideList()
  }

  return <div className="alljob-main-container">{renderBasedonSize()}</div>
}

export default Alljobs
