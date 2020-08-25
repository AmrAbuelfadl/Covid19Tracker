import React, {useState, useEffect} from 'react'
import styles from './CountryPicker.module.css'
import {NativeSelect, FormControl} from '@material-ui/core'

function CountryPicker(props) {
    const[countries, setCountries] = useState([])

    useEffect(()=>{
        setCountries(props.countries)
        console.log("CountryPicker", props.countries)
    }, [props.countries])
    

    return (
        <FormControl className = {styles.formControl}>
            <NativeSelect defaultValue = "" onChange = {(event) => props.handleCountryChange(event.target.value)}>
                <option value="global">Global</option>
                {countries.map((country, i) => (<option key={i} value={country}> {country} </option>))}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker
