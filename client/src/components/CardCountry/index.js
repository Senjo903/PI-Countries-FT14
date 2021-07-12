import React from 'react';
import { Link } from 'react-router-dom'
import './CardCountry.css';

export default function CardCountry(props) {
    return (
        <div className="body-card">
            ID: { props.data.ID }<br/>
            Nombre: { props.data.name }<br/>
            IMG: { props.data.imgURL }<br/>
            continente: { props.data.continent }<br/>
            detalles: <Link to={`/country-details/${props.data.ID}`}>mas...</Link>
        </div>
        )
};