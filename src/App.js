import React, {Component} from 'react';
import {Cards, Chart, CountryPicker} from './components'
import styles from'./App.module.css'
import {fetchData, fetchDailyData, fetchingCountries} from './api'
import coronaImage from './images/ReactCOVID.png'
class App extends Component{
  constructor(props) {
    super(props)

    this.state = {
      data: {},
      dailyData: [],
      countries: [], 
      country: '',
    }
  }

  async componentDidMount(){
    document.title = "Covid-19 Tracker"
    const fetchedData = await fetchData()
    const fetchedDailyData = await fetchDailyData()
    const fetchedCountries = await fetchingCountries()
    this.setState({
      data: fetchedData,
      dailyData: fetchedDailyData,
      countries: fetchedCountries,
    })
  }

  handleCountryChange = async (country) => {
    let fetchedData
    if (country == 'global'){
       fetchedData = await fetchData('')
       this.setState({
        data: fetchedData,
        country: '',
      })
    }
    else{
       fetchedData = await fetchData(country)
       this.setState({
        data: fetchedData,
        country: country,
      })
    }
    
    console.log("Country from APP.js", country)
    console.log("fetchedData from APP.js", fetchedData)

  }

  render(){
    return(
      <div className = {styles.container}>
        <img src = {coronaImage} className = {styles.image} alt="COVID-19"></img>
        <Cards data = {this.state.data}/>
        <CountryPicker countries  = {this.state.countries} handleCountryChange = {this.handleCountryChange}/>
        <Chart dailyData = {this.state.dailyData} data = {this.state.data} country = {this.state.country}/>
      </div>
    )
  }
}
export default App;
