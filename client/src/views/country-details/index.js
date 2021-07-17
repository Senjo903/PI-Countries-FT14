import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { countryDetail, clearCountry } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import './CountryDetails.css';
import CardActivity from '../../components/CardActivity';

function CountryDetails () {
  const Country = useSelector((state) => state.CountryDetail);
  const dispatch = useDispatch();
  const { countryID } = useParams();

  useEffect(() => {
    dispatch(countryDetail(countryID));
    return () => dispatch(clearCountry())
  }, [countryID, dispatch]);

  return (
    <><div className="align-views"></div>
    <div className="body-details">
      {Country ?
      (<div className="details">
        <div className="border-box-data box-row">
        <div className="box-box-img">
          <img className="box-img" src={Country.imgURL} alt={Country.name}/>
        </div>
        <div className="box-box-text">
          <div className="box-label">ID: {Country.ID}</div>
          <div className="box-label">Name: {Country.name}</div>
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
        Cargando...
      </div>):
      (<div>
        Pagina no encontrada o hubo un error
      </div>)}
    </div></>
  );
};

export default CountryDetails;