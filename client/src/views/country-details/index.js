import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { countryDetail, clearCountry } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import './CountryDetails.css';
import CardActivity from '../../components/CardActivity';
import ErrorMsj from '../../components/Error';
import Loading from '../../components/Loading';

function CountryDetails () {
  const Country = useSelector((state) => state.CountryDetail);
  const dispatch = useDispatch();
  const { countryID } = useParams();

  useEffect(() => {
    dispatch(countryDetail(countryID));
    return () => dispatch(clearCountry())
  }, [countryID, dispatch]);

  return (
    <>
      <div className="align-views"></div>
      <div className="body-details">
        {Country ?
        (<div className="details">
          <div id="border-box-data" className="border-box-data box-row">
          <div className="box-box-img">
            <img id="box-img-detail2" className="box-img" src={Country.imgURL} alt={Country.name}/>
          </div>
          <div id="box-box-text" className="box-box-text">
            <div className="box-label">ID: {Country.ID}</div>
            <div className="box-label">Name: {Country.name.replace(/\b\w/g, l => l.toUpperCase())}</div>
            <div className="box-label">Continent: {Country.continent}</div>
            <div className="box-label">Capital: {Country.capital}</div>
            <div className="box-label">Sub Region:{Country.subregion}</div>
            <div className="box-label">Area: {Country.area}</div>
            <div className="box-label">Population: {Country.population}</div>
            </div>
          </div>
          <div className="border-box-data2">
            <div><h2>Activites:</h2></div>
            {Country.ConAct.length === 0?
            (<h3>no hay hactividades registradas</h3>):
            (Country.ConAct.map((activity) => {
              return (<CardActivity key={activity.ID} data={activity}/>)
            }))}
          </div>
        </div>):
        Country === undefined ?
        (<div>
          <Loading/>
        </div>):
        (<div>
          <ErrorMsj data="we could not load the server data"/>
        </div>)}
      </div>
    </>
  );
};

export default CountryDetails;