import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstants.initial, vaccineData: {}}

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok === true) {
      const data = await response.json()

      this.setState({apiStatus: apiStatusConstants.success})

      const formattedData = {
        last7Daysvaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      console.log(formattedData)
      this.setState({vaccineData: formattedData})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailurePage = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
      <h1>SomeThing Went Wrong</h1>
    </div>
  )

  renderSuccessPage = () => {
    const {vaccineData} = this.state
    const {
      last7Daysvaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = vaccineData
    return (
      <div className="page1">
        <VaccinationCoverage last7Daysvaccination={last7Daysvaccination} />
        <VaccinationGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </div>
    )
  }

  renderCards = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccessPage()
      case apiStatusConstants.failure:
        return this.renderFailurePage()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <p className="logo-text">C0-WIN</p>
        </div>
        <h1 className="main-heading">CoWin Vaccination In India</h1>
        <div>{this.renderCards()}</div>
      </div>
    )
  }
}

export default CowinDashboard
