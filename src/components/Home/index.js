import Header from '../Header'
import './index.css'

const Home = props => {
  const pushJobsPath = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <div className="home-container">
      <Header />
      <div className="home-content-container">
        <h1 className="home-heading">Find The Job That Fits For Your Life</h1>
        <p className="home-paragraph">
          Millions of people are searching for job,salary information,company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button
          type="button"
          className="home-findjobs-button"
          onClick={pushJobsPath}
        >
          Find Jobs
        </button>
      </div>
    </div>
  )
}
export default Home
