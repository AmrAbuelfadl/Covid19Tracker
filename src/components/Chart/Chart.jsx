import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Line, Bar} from 'react-chartjs-2'
import styles from './Chart.module.css'

function Chart(props) {
    const [dailyData, setDailyData] = useState([])
    const  {data, country} = props
    useEffect(() => {
        setDailyData( props.dailyData)
        console.log("props.data from Chart", data)
    }, [props.dailyData, data])

   
    
    const lineChart = (
       dailyData.length != 0 ? 
       (<Line
            data={{
                labels: dailyData.map((dailyDataItem) => (dailyDataItem.date)), //X-axis
                datasets: [{ //FirstLine
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, { //SecondLine
                    data: dailyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                }],

            }}
        />) : null
    )

  const barChart = (
      data.confirmed? (
        <Bar
            data={{
                labels:['Infected', "Recovered", "Deaths"],
                datasets:[{
                    label: 'People',
                    data:[data.confirmed.value, data.recovered.value, data.deaths.value],
                    backgroundColor: [
                        'rgba(0,0,255,0.5)',
                        'rgba(0,255,0,0.5)',
                        "rgba(255,0,0,0.5)"
                    ]

                }]
            }}
            options={{
                legend: {display: false},
                title: {display: true, text: `Current State in ${country}`},
            }}
        />
      ) : null
  )
    return (
        <div className = {styles.container}>
           {JSON.stringify(country) === JSON.stringify('') ? lineChart : barChart}
        </div>
    )
}

export default Chart
