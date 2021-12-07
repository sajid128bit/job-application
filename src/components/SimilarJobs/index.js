import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarJobsDetails} = props
  const jobsArrayCamel = {
    companyLogoUrl: similarJobsDetails.company_logo_url,
    title: similarJobsDetails.title,
    location: similarJobsDetails.location,
    employmentType: similarJobsDetails.employment_type,
    rating: similarJobsDetails.rating,
    packagePerAnnum: similarJobsDetails.package_per_annum,
    jobDescription: similarJobsDetails.job_description,
  }

  const {
    companyLogoUrl,
    title,
    location,
    rating,
    employmentType,
    jobDescription,
  } = jobsArrayCamel

  return (
    <div className="similarjob-container">
      <div className="similarjob-logo-title-container">
        <img
          src={companyLogoUrl}
          alt="company logo"
          className="similarjob-company-logo"
        />
        <div className="similarjob-title-rating-container">
          <p className="similarjob-title">{title}</p>
          <div className="similarjob-start-rating-container">
            <AiFillStar className="similarjob-star" />
            <p className="similarjob-rating-text">{rating}</p>
          </div>
        </div>
      </div>
      <p className="similarjob-package">Description</p>
      <p className="similarjob-location similarjob-descrption-margin">
        {jobDescription}
      </p>
      <div className="similarjob-location-package-type">
        <div className="similarjob-icons-container">
          <div className="similarjob-icon-name-container">
            <HiLocationMarker className="similarjob-icon-size" />
            <p className="similarjob-location">{location}</p>
          </div>
          <div className="similarjob-icon-name-container">
            <BsFillBriefcaseFill className="similarjob-icon-size" />
            <p className="similarjob-location">{employmentType}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobs
