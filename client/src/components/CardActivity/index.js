import React from 'react';
import './CardActivity.css';
import { FiSun } from 'react-icons/fi';
import { FaStar} from 'react-icons/fa';
import { GiWinterGloves, GiFallingLeaf } from 'react-icons/gi';
import { SiSpring } from 'react-icons/si';

export default function CardActivity(props) {
    return (
        <div className="body-activity">
            <div className="card-activity">
                <div>
                    <img className="activity-img" src={props.data.imgURL?props.data.imgURL:"https://mirabhayanderinfo.com/v2/uploads/images/image-not-found.jpg"} alt={props.data.name}/>
                </div>
                <div className="box-column">
                    <div className="activity-label">
                        Actividad: {props.data.name}
                    </div>
                    <div className="activity-label">
                        duracion: {props.data.duration}
                    </div>
                    <div className="activity-label box-row">
                        dificultad:
                        <FaStar className={props.data.difficulty >= 1 ? 'starUp-activity space': 'star-activity space'}/>
                        <FaStar className={props.data.difficulty >= 2 ? 'starUp-activity': 'star-activity'}/>
                        <FaStar className={props.data.difficulty >= 3 ? 'starUp-activity': 'star-activity'}/>
                        <FaStar className={props.data.difficulty >= 4 ? 'starUp-activity': 'star-activity'}/>
                        <FaStar className={props.data.difficulty >= 5 ? 'starUp-activity': 'star-activity'}/>
                    </div>
                    <div className="activity-label box-row">
                        estacion: {props.data.station}
                        {props.data.station === 'summer'?
                        (<FiSun className="station-activity summer-activity"/>):
                        props.data.station === 'fall'?
                        (<GiFallingLeaf className="station-activity fall-activity"/>):
                        props.data.station === 'winter'?
                        (<GiWinterGloves className="station-activity winter-activity"/>):
                        (<SiSpring className="station-activity spring-activity"/>)}
                    </div>
                </div>
            </div>
        </div>
    )
};