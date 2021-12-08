import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


const Form = (props) => {
  return (
    <form>
      <h2>Find countries: </h2>
      <input value={props.search} onChange={props.changeSearchHandler} />
    </form>  
  )
}

const CountryFeature = (props) => {
  const [weatherDat, setWeatherDat] = useState({});

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY; 

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${props.country.capital}&appid=${apiKey}&units=metric`)
      .then(response => setWeatherDat(response.data))
      .catch(error => {if (error.response) { setWeatherDat(undefined) } })
  }, [props.country.capital])

  return (
    <div className="country-feature">
      <h2>{props.country.name.common}</h2>
      <img src={props.country.flags.png} alt={`Flag of ${props.country.name.common}`}/>
      <p>Capital: {props.country.capital}</p> 
      <p>Population: {props.country.population}</p>
      <h3>Languages</h3>
      <ul>
        {
          Object
          .values(props.country.languages)
          .map((el, i) => <li key={`${el}${i}`}>{el}</li>)
        }
      </ul>

      { Object.keys(weatherDat).length > 0 ?
        (
          <>
            <h2>Weather in {props.country.capital}</h2>
            <p>Temperature: {weatherDat.main.temp} C, {weatherDat.weather[0].description}</p>
            <p>Wind: {weatherDat.wind.speed} meters/s {weatherDat.wind.deg} degrees</p>
          </>
        ) :
        <></>
    }
      

    </div>
  )
}

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [spotlightCountry, setSpotlightCountry] = useState(undefined);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const tmpResults = [];

        // Filter for entries where common name includes the search string
        response.data
          .map(el => {
            if (el.name.common.toLowerCase().includes(search.toLowerCase())) {
              tmpResults.push(el);
            }
            return null;
          })

        setResults(tmpResults);

      })
  }, [search])

  const changeSearchHandler = (event) => {
    setSearch(event.target.value);
    setSpotlightCountry(undefined);
  }

  return (
    <>
      <Form search={search} changeSearchHandler={changeSearchHandler} />
      <div className="results">
        {
          search.length === 0 ? <p>Awaiting input</p> :
          results.length === 0 ? <p>No results</p> :
          results.length === 1 ? <CountryFeature country={results[0]} /> :
          results.length > 10 ? <p>Too many matches, specify another filter</p> :
          (
            <>
              <div>
                {
                  results.map((el, i) => {
                    return (
                      <p key={`${el.cioc}${i}`}>{el.name.common} <button onClick={() => setSpotlightCountry(el)}>Show more</button></p>
                  )})
                }
              </div>
              {typeof spotlightCountry !== 'undefined' ? 
                <CountryFeature country={spotlightCountry} /> : 
                <></>}
            </>
          )
        }
      </div>
    </>
  );
}

export default App;
