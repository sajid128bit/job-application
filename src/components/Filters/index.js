import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Filters = props => {
  // eslint-disable-next-line no-unused-vars
  const {
    employmentType,
    minimumPackage,
    addEmploymentType,
    removeEmploymentType,
    removeMinimumSalary,
    addMinimumSalary,
  } = props

  const changeEmpCheckBox = employmentTypeId => {
    if (employmentType.includes(employmentTypeId)) {
      removeEmploymentType(employmentTypeId)
    } else {
      addEmploymentType(employmentTypeId)
    }
  }

  const changeSalCheckBox = salaryRangeId => {
    if (salaryRangeId === minimumPackage) {
      removeMinimumSalary()
    } else {
      addMinimumSalary(salaryRangeId)
    }
  }

  const renderEmploymentFilter = () => (
    <>
      <hr className="filter-hori-line" />
      <p className="filter-paragraph">Types of Employment</p>
      <ul className="filter-emplyment-unlist">
        {employmentTypesList.map(eachItem => {
          let checkedVal = ''
          if (employmentType.includes(eachItem.employmentTypeId)) {
            checkedVal = true
          }
          return (
            <li className="filter-checkboxes" key={eachItem.employmentTypeId}>
              <input
                type="checkbox"
                id={eachItem.employmentTypeId}
                value={eachItem.label}
                className="filter-checkBoxItemSquare"
                checked={checkedVal}
                onChange={() => changeEmpCheckBox(eachItem.employmentTypeId)}
              />
              <label htmlFor={eachItem.employmentTypeId}>
                {eachItem.label}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )

  const renderSalaryFilter = () => (
    <>
      <hr className="filter-hori-line" />
      <p className="filter-paragraph">Salary Range</p>
      <ul className="filter-emplyment-unlist">
        {salaryRangesList.map(eachItem => {
          let checkedVal = ''
          if (minimumPackage === eachItem.salaryRangeId) {
            checkedVal = true
          }
          return (
            <li className="filter-checkboxes" key={eachItem.salaryRangeId}>
              <input
                type="checkbox"
                id={eachItem.salaryRangeId}
                value={eachItem.label}
                className="filter-checkBoxItemCircle"
                checked={checkedVal}
                onChange={() => changeSalCheckBox(eachItem.salaryRangeId)}
              />
              <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
            </li>
          )
        })}
      </ul>
    </>
  )

  return (
    <div className="filters-container">
      {renderEmploymentFilter()}
      {renderSalaryFilter()}
    </div>
  )
}

export default Filters
