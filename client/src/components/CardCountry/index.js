import React from 'react';
import { Link } from 'react-router-dom'
import './CardCountry.css';
import { AiOutlineGlobal } from 'react-icons/ai';
import { IoPeopleCircleOutline } from 'react-icons/io5';
import { BiDetail } from 'react-icons/bi';

export default function CardCountry(props) {
    return (
        <div id="body-card" className="body-card">
            <div className="card">
                <div id="card-one" className="card-one">
                    { (props.data.name).replace(/\b\w/g, l => l.toUpperCase()) }
                </div>
                <div id="horizontal-card">
                    <div className="card-two">
                        <img id="card-img" className="card-img" src={props.data.imgURL} alt={props.data.name}/>
                    </div>
                    <div className="card-three" id="card-three2">
                        <label className="card-country-label">
                            <AiOutlineGlobal className="icon-country-card"/>
                            Continent:
                        </label>
                        <label className="result-card">
                        { (props.data.continent).charAt(0).toUpperCase() + (props.data.continent).slice(1) }
                        </label>
                        <label className="card-country-label">
                            <IoPeopleCircleOutline className="icon-country-card"/>
                            Population:
                        </label>
                        <label className="result-card">
                        {props.data.population}
                        </label>
                        <label className="card-country-label">
                            <BiDetail className="icon-country-card"/>
                            Details:
                        </label>
                        <label className="result-card">
                        <Link className="link-card-country" to={`/country-details/${props.data.ID}`}>more</Link>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
};