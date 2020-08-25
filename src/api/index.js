import axios from 'axios'

const url = "https://covid19.mathdro.id/api"

export const fetchData = (country) => {
    let changeableUrl = url
    if(country){
        changeableUrl = `${url}/countries/${country}`
    }
    return axios.get(changeableUrl)
    .then(response => {
        const {data: {confirmed, recovered, deaths, lastUpdate}} = response
        const modifieddata = {confirmed, recovered, deaths, lastUpdate}
        return modifieddata
    })
    .catch(error => {
        console.log("Errooorrrrrr",error)
    })
}

export const fetchDailyData = () => {
    return axios.get(`${url}/daily`)
    .then(response => {
        const {data} = response
        const modifiedData = data.map((dailydata) => ({
            confirmed: dailydata.confirmed.total,
            deaths: dailydata.deaths.total,
            date: dailydata.reportDate
        }))
        return modifiedData
    })
    .catch(error => {
        console.log("Error", error)
    })
}

export const fetchingCountries = () => {
    return axios.get(`${url}/countries`)
    .then(response => {
        const {data:{countries}} = response
        const countriesResult = countries.map((country) => (country.name))
        return countriesResult
    })
    .catch(error => {
        console.log("Error", error)
    })
}

