import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { countryDetail, clearCountry } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

//countryDetail
function CountryDetails () {
  const Country = useSelector((state) => state.CountryDetail);
  const dispatch = useDispatch();
  const { countryID } = useParams();

  useEffect(() => {
    dispatch(countryDetail(countryID));
    return () => dispatch(clearCountry())
  }, [countryID, dispatch]);

  return (
    <div>
      {Country ? (
        <>
          <h3>{Country.name}</h3>
        </>
      ) : Country === undefined ? (
        <div>Cargando...</div>
      ) : (
        <h1>Pagina no encontrada</h1>
      )}
    </div>
  );
};

export default CountryDetails;