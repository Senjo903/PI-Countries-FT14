import React from 'react';
import './Home.css';
import { FcTreeStructure, FcList, FcSupport} from "react-icons/fc";


function Home() {
  return (
    <>
      <div>
        <div className="style-box-three">
          <div className="style-box-one"></div>
          <div className="style-box-two"></div>
        </div>
      </div>
      <div className="style-box-four">
        <div className="home">
          <h2>Individual Project Presentation</h2>
          <h5>Jose Leonardo Agreda Anchaise</h5>
        </div>
      </div>
      <div className="style-body-contents box-row">

        <div className="box-contents box-column">
          <FcTreeStructure className="icon-home"/>
          <label className="label-title">
            Implemented Technologies
          </label>
          <div className="label-contents box-column">
            <label>React</label>
            <label>Redux</label>
            <label>Express</label>
            <label>Sequelize - Postgres</label>
          </div>
        </div>

        <div className="box-contents box-column">
          <FcList className="icon-home"/>
          <label className="label-title">
            Objectives of the Project
          </label>
          <div className="label-contents box-column">
            <label>Build an App using React, Redux, Node and Sequelize.</label>
            <label>Affirm and connect the concepts learned in the race.</label>
            <label>Learn best practices.</label>
            <label>Learn and practice the GIT workflow.</label>
            <label>Use and practice testing.</label>
          </div>
        </div>

        <div className="box-contents box-column">
          <FcSupport className="icon-home"/>
          <label className="label-title">
            Testing Development
          </label>
          <div className="label-contents box-column">
            <label>A frontend component with its respective tests.</label>
            <label>A backend path with its respective tests.</label>
            <label>A model of the database with its respective tests.</label>
          </div>
        </div>

      </div>
    </>
  )
};

export default Home;

/*
<div className="body-item-home1">
        <div className="item-home1">
          <h1>Objetivos del proyecto:</h1>

          <div className="border-box-home box-column">
            <div className="home-title"><FcTreeStructure/></div>
            <div className="box-column">
              <label>React</label>
              <label>Redux</label>
              <label>Express</label>
              <label>Sequelize - Postgres</label>
            </div>
          </div>


          <div className="box-column">
            <div>Objetivos del Proyecto:<FcList/></div>
            <div className="box-column">
              <label>Construir una App utlizando React, Redux, Node y Sequelize.</label>
              <label>Afirmar y conectar los conceptos aprendidos en la carrera.</label>
              <label>Aprender mejores prácticas.</label>
              <label>Aprender y practicar el workflow de GIT.</label>
              <label>Usar y practicar testing.</label>
            </div>
          </div>


          <div className="box-column">
            <div>Desarrollo de Testing:<FcSupport/></div>
            <div className="box-column">
              <label>Al menos tener un componente del frontend con sus tests respectivos.</label>
              <label>Al menos tener una ruta del backend con sus tests respectivos.</label>
              <label>Al menos tener un modelo de la base de datos con sus tests respectivos.</label>
            </div>
          </div>



        </div>
      </div>
      */