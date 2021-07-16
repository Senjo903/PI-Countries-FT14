import React from 'react';
import { Link } from 'react-router-dom'
import './CardCountry.css';

function toUpper(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(function(Word) {
            return Word[0].toUpperCase() + Word.substr(1);
        })
        .join(' ');
}

export default function CardCountry(props) {
    return (
        <div className="body-card">
            <div className="card">
                <div className="card-one">
                    { toUpper(props.data.name) }
                </div>
                <div className="card-two">
                    <img className="card-img" src={props.data.imgURL} alt={props.data.name}/>
                </div>
                <div className="card-three">
                    <label>
                        Continent: { (props.data.continent).charAt(0).toUpperCase() + (props.data.continent).slice(1) }
                    </label>
                    poblacio: {props.data.population}
                    detalles: <Link to={`/country-details/${props.data.ID}`}>mas...</Link>
                </div>
            </div>
        </div>
    )
};