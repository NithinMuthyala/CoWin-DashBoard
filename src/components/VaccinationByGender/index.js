import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationGender = props => {
  const {vaccinationByGender} = props

  return (
    <div className="cov-container">
      <h1 className="header">Vaccination by gender</h1>
      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="40%"
          data={vaccinationByGender}
          startAngle={0}
          endAngle={180}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
          align="center"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="middle"
          align="center"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationGender
