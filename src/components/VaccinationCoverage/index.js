import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {last7Daysvaccination} = props
  console.log(last7Daysvaccination)

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="cov-container">
      <h1 className="header">Vaccination Coverage</h1>
      <BarChart
        width={1000}
        height={300}
        data={last7Daysvaccination}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccine_date"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose_1" name="Dose 1" fill=" #f54394" barSize="20%" />
        <Bar dataKey="dose_2" name="Dose 2" fill="#5a8dee" barSize="20%" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
