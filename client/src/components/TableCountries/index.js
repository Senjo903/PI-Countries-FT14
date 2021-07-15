import React from 'react';
import { useSelector } from 'react-redux';
import CardCountry from '../../components/CardCountry';
import PaginationBar from '../../components/PaginationBar';
import './TablesCountries.css';

export default function TableCountries() {
  const CountrySearch = useSelector((state) => state.CountrySearch);
  //const searchStatus = useSelector((state) => state.searchStatus);
  //const dispatch = useDispatch();

  if (CountrySearch.searchStatus === 'complete') {
    return (
      <div className="body-countries">
      <div className="countries">
        <PaginationBar />
        <div className="country-container">
          {CountrySearch.resultSearch.pageResult.map((country) => {
          return (<CardCountry key={country.ID} data={country}/>)
          })}
        </div>
      </div>
      </div>
    );
  } if(CountrySearch.searchStatus === 'error') {
    return (<div>console.error();</div>)
  } else {
    return (<div>cargando...</div>)
  }
};