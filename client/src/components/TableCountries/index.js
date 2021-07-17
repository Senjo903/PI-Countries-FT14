import React from 'react';
import { useSelector } from 'react-redux';
import CardCountry from '../../components/CardCountry';
import PaginationBar from '../../components/PaginationBar';
import './TablesCountries.css';
import ErrorMsj from '../../components/Error';
import Loading from '../../components/Loading';

export default function TableCountries() {
  const CountrySearch = useSelector((state) => state.CountrySearch);

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
    return (<div>
      <ErrorMsj data="we could not load the server data"/>
    </div>)
  } else {
    return (<div>
      <Loading/>
    </div>)
  }
};