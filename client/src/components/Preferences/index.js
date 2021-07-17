import { FaSearch, FaSortAlphaDown, FaSortAlphaDownAlt, FaSortNumericDown, FaSortNumericDownAlt } from 'react-icons/fa';
import { AiOutlineGlobal } from 'react-icons/ai';
import { IoFitnessSharp, IoText, IoPeopleCircleOutline } from 'react-icons/io5';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTarget, getFilter } from '../../actions';
import './Preferences.css';
import axios from 'axios';
import { Link } from 'react-router-dom'
import ErrorMsj from '../../components/Error';
import Loading from '../../components/Loading';

export default function Preferences() {
  const [values, setValues] = React.useState({
    inputSearch:''
  });
  function changeSearch(e) {
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value
    }))
    const reset = () => {
      let box = document.getElementById('search-box');
      while (box.firstChild) {
        box.removeChild(box.firstChild);
      }
    }
    const box = document.getElementById('search-box');
    reset();
    if (e.target.value !=='') {
      const boxList = document.createElement('div');
      boxList.className= 'search-countries-list';
      axios(`/countries?name=${e.target.value}`).then((r) => {
        if(parseInt(r.data.results) > 0) {
          r.data.msj.forEach(element => {
            let elementBox = document.createElement('div');
            elementBox.id = element.ID;
            elementBox.textContent = element.name;
            elementBox.onclick = ()=>{
              reset();
              setValues(values => ({
                ...values,
                inputSearch: element.name
              }))
            }
            boxList.appendChild(elementBox);
          });
          box.appendChild(boxList);
        } else {
          let elementBox = document.createElement('div');
          elementBox.textContent = 'no results';
          boxList.appendChild(elementBox);
          box.appendChild(boxList);
        }
      }).catch((e) =>{
          var elementBox = document.createElement('div');
          elementBox.textContent = '404 Found';
          boxList.appendChild(elementBox);
          box.appendChild(boxList);
      })
    }
  }

  const CountrySearch = useSelector((state) => state.CountrySearch);
  const dispatch = useDispatch();
  function handleSubmit(e) {
      e.preventDefault()
  }

  function handleChange(e) {
    if (e.target.name === 'optionFilter'){
      if (CountrySearch.filter === 'continent'){
        dispatch(getFilter( { continent: e.target.value, activities: 'all' }));
      } else {
        dispatch(getFilter({ continent: 'all', activities: e.target.value }));
      }
    }
      dispatch(getTarget({tipe: e.target.name, value: e.target.value}));
  }

  if (CountrySearch.searchStatus === 'complete') {
    return(
      <div className="body-preferences">
        <div className="preferences">
          <form onSubmit={handleSubmit}  className="preferences-form">
            <div className="form-search">
              <div className="border-search box-column">
                <div className="box-row">
                  <input addEventListener id="search-input-preferences" type='search' autoComplete="off" onChange={changeSearch} name="inputSearch" value={values.inputSearch} placeholder="search countries..." className="search"/>
                  <Link to={`/search-countries/${values.inputSearch}`} ><FaSearch className="icon"/></Link>
                </div>
                <div id="search-box" className="search-box-absolute"></div>
              </div>
            </div>
            <div className="form-data">
              <div id="border-selectors" className="border-selectors">
                <div className="box-row">
                  <div className="border-selector">
                    {CountrySearch.filter === 'continent'?
                    (<AiOutlineGlobal className="icon"/>):
                    (<IoFitnessSharp className="icon"/>)}
                    <select className="select-form" onChange={handleChange} name="filter" defaultValue={CountrySearch.filter}>
                      <option value="continent">Continent</option>
                      <option value="activities">Activity</option>
                    </select>
                  </div>
                  <div className="border-selector">
                    {CountrySearch.filter === 'continent'?(
                    <select className="select-form" onChange={handleChange} name="optionFilter" defaultValue={CountrySearch.optionFilterContinent}>
                      <option value='all'>all</option>
                      {CountrySearch.continentList.map((objOption) =>{return <option key={objOption} value={objOption}>{objOption}</option>})}
                    </select>) :(
                    <select className="select-form" onChange={handleChange} name="optionFilter" defaultValue={CountrySearch.optionFilterActivities}>
                      <option value='all'>all</option>
                      {CountrySearch.activitiesList.map((objOption) =>{return <option key={objOption} value={objOption}>{objOption}</option>})}
                    </select>)}
                  </div>
                  </div>
                  <div id="border-div-order-two" className="box-row">
                  <div className="border-selector">
                    {CountrySearch.tipeOrden === 'name'?
                    (<IoText className="icon"/>):
                    (<IoPeopleCircleOutline className="icon"/>)}
                    <select className="select-form" onChange={handleChange} name="tipeOrden" defaultValue={CountrySearch.tipeOrden}>
                      <option value="name">Name</option>
                      <option value="population">Population</option>
                    </select>
                  </div>
                  <div className="border-selector">
                    {CountrySearch.tipeOrden === 'name'?
                    (CountrySearch.order === 'ASC'?
                    (<FaSortAlphaDown className="icon"/>):
                    (<FaSortAlphaDownAlt className="icon"/>)):
                    (CountrySearch.order === 'ASC'?
                    (<FaSortNumericDown className="icon"/>):
                    (<FaSortNumericDownAlt className="icon"/>))}
                    <select className="select-form" onChange={handleChange} name="order" defaultValue={CountrySearch.order}>
                      <option value="ASC">Acendent</option>
                      <option value="DESC">Decendent</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  } if(CountrySearch.searchStatus === 'error') {
    return (
    <div>
      <ErrorMsj data="we could not load the server data"/>
    </div>)
  } else {
    return (<div>
      <Loading/>
    </div>)
  }
};
