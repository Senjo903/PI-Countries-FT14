import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchDetail, clearSearch } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import './SearchCountries.css';
import { Link } from 'react-router-dom'

function SearchCountries() {
  const CountriesResult = useSelector((state) => state.SearchList);
  const dispatch = useDispatch();
  const { fragmentName } = useParams();

  useEffect(() => {
    dispatch(searchDetail(fragmentName));
    return () => dispatch(clearSearch())
  }, [fragmentName, dispatch]);

  return (
    <><div className="align-views"></div>
    <div className="body-search2">
      {CountriesResult ?
      ((<div className="search2">
      <div className="border-box-data">
        <div><h2>search result: {CountriesResult.results}</h2></div>
        <div>
          {CountriesResult.msj.map((country) => {
            return (<div className="item-search" key={country.ID}><Link className="link-search" to={`/country-details/${country.ID}`}>{country.name}</Link></div>)
          })}
        </div>
      </div>
    </div>)):
      CountriesResult === undefined ?
      (<div>
        Cargando...
      </div>):
      (<div>
        hubo un error
      </div>)}
    </div>
    </>
  )
};


export default SearchCountries;
