import React from 'react';
import './Home.css';
import { FcTreeStructure, FcList, FcSupport} from "react-icons/fc";

function Home() {
  return (
    <>
      <div id="style-box-three" className="style-box-three">
        <div id="style-box-one" className="style-box-one">
        </div>
        <div id="style-box-two" className="style-box-two">
        </div>
        <div id="home-text1" className="style-box-four">
        <div className="home">
          <h2>Individual Project Presentation</h2>
          <h5>Jose Leonardo Agreda Anchaise</h5>
        </div>
      </div>
      </div>
      <div id="style-body-contents" className="style-body-contents flex-container2">
        <div id="box-home-one" className="box-contents box-column">
          <FcTreeStructure className="icon-home"/>
          <label className="label-title">
            Implemented Technologies
          </label>
          <div id="label-contents1" className="label-contents box-column">
            <label>React</label>
            <label>Redux</label>
            <label>Express</label>
            <label>Sequelize - Postgres</label>
          </div>
        </div>
        <div id="box-home-two" className="box-contents box-column">
          <FcList className="icon-home"/>
          <label className="label-title">
            Objectives of the Project
          </label>
          <div id="label-contents2" className="label-contents box-column">
            <label>Build an App using React, Redux, Node and Sequelize.</label>
            <label>Affirm and connect the concepts learned in the race.</label>
            <label>Learn best practices.</label>
            <label>Learn and practice the GIT workflow.</label>
            <label>Use and practice testing.</label>
          </div>
        </div>
        <div id="box-home-three" className="box-contents box-column">
          <FcSupport className="icon-home"/>
          <label className="label-title">
            Testing Development
          </label>
          <div id="label-contents3" className="label-contents box-column">
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