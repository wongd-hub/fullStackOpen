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
          .map(el => <li key={el}>{el}</li>)
        }
      </ul>
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

  const changeSearchHandler = (event) => setSearch(event.target.value);

  // const showMoreHandler = (country) => { return ( setSpotlightCountry(country) ) }

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
                  results.map(el => {
                    return (
                      <p key={el.cioc}>{el.name.common} <button onClick={() => {setSpotlightCountry(el); console.log('setting spotlight as ', el)}}>Show more</button></p>
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
