import { FaSearch, FaSortAlphaDown, FaSortAlphaDownAlt, FaSortNumericDown, FaSortNumericDownAlt } from 'react-icons/fa';
import { AiOutlineGlobal } from 'react-icons/ai';
import { IoFitnessSharp, IoText, IoPeopleCircleOutline } from 'react-icons/io5';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTarget, getFilter } from '../../actions';
import './Preferences.css';

export default function Preferences() {
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

    return(
    <div className="body-preferences">
      <div className="preferences">
        <form onSubmit={handleSubmit}  className="preferences-form">
          <div className="form-search">
            <div className="border-search">
              <input type='search' name="countryName" placeholder='buscar paises...' className="search"/>
              <FaSearch className="icon"/>
            </div>
          </div>
          <div className="form-data">
            <div className="border-selectors">
              <div className="border-selector">
                {CountrySearch.filter === 'continent'?
                (<AiOutlineGlobal className="icon"/>):
                (<IoFitnessSharp className="icon"/>)}
                <select className="select-form" onChange={handleChange} name="filter" defaultValue={CountrySearch.filter}>
                  <option value="continent">Continente</option>
                  <option value="activities">Actividad</option>
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
              <div className="border-selector">
                {CountrySearch.tipeOrden === 'name'?
                (<IoText className="icon"/>):
                (<IoPeopleCircleOutline className="icon"/>)}
                <select className="select-form" onChange={handleChange} name="tipeOrden" defaultValue={CountrySearch.tipeOrden}>
                  <option value="name">Nombre</option>
                  <option value="population">Poblacion</option>
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
                  <option value="ASC">Acendente</option>
                  <option value="DESC">Decendente</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>)
};
/*
<form onSubmit={handleSubmit}>
        <label>
          filter: {targetSearch.filter}, options1: {targetSearch.optionContinent}, options2: {targetSearch.optionActivity}, tipeOrden: {targetSearch.tipeOrden}, order: {targetSearch.order}, page: {targetSearch.page}
        </label>
        <br/>
        <label> Orden:
          <select name="filter" defaultValue={targetSearch.filter}>
          <option value="continent">Continente</option>
          <option value="activities">Actividad</option>
          </select>
          {targetSearch.filter === 'continent'?(
            <div>Opciones:
              <select name="optionContinent" defaultValue={targetSearch.optionContinent}>
                {lists.continent.map((objOption) =>{return <option key={objOption} value={objOption}>{objOption}</option>})}
              </select>
            </div>) :(
          <div>Opciones:
          <select name="optionActivity" defaultValue={targetSearch.optionActivity}>
            {lists.activities.map((objOption) =>{return <option key={objOption} value={objOption}>{objOption}</option>})}
          </select>
        </div>)}
        </label><br/>
        <label> Orden:
          <select name="tipeOrden" defaultValue={targetSearch.tipeOrden}>
          <option value="name">Nombre</option>
          <option value="population">Poblacion</option>
          </select>
        </label><br/>
        <label> Orden:
            <select name="order" defaultValue={targetSearch.order}>
            <option value="ASC">Acendente</option>
            <option value="DESC">Decendente</option>
          </select>
        </label>
        <button>hola</button>
      </form>

/*const lists = useSelector((state) => state.lists);
  const dispatch = useDispatch();


  //dispatch(changeTarget({ continent:['all', 'lola', 'lklo']}))
  function handleSubmit(e) {
    e.preventDefault()
  }
  async function handleSubmit(e) {
    e.preventDefault()
    const result = await axios(`/countries?filter=${targetSearch.filter}&options=${targetSearch.options}&tipeOrden=${targetSearch.tipeOrden}&order=${targetSearch.order}&page=${targetSearch.page}`)
    .then((r) => {
      dispatch(resultSearch(r.data))
      return true
    }).catch((e) => {
      return false
    });
    if (result) {
      dispatch(statusChange('complete'))
    } else {
      dispatch(statusChange('error'))
    }
  }
*/

/*
<h1>preferecnias</h1>
      <form onSubmit={handleSubmit}>
        <label>
          filter: {targetSearch.filter}, options1: {targetSearch.optionContinent}, options2: {targetSearch.optionActivity}, tipeOrden: {targetSearch.tipeOrden}, order: {targetSearch.order}, page: {targetSearch.page}
        </label>
        <br/>
        <label> Orden:
          <select name="filter" defaultValue={targetSearch.filter}>
          <option value="continent">Continente</option>
          <option value="activities">Actividad</option>
          </select>
          {targetSearch.filter === 'continent'?(
            <div>Opciones:
              <select name="optionContinent" defaultValue={targetSearch.optionContinent}>
                {lists.continent.map((objOption) =>{return <option key={objOption} value={objOption}>{objOption}</option>})}
              </select>
            </div>) :(
          <div>Opciones:
          <select name="optionActivity" defaultValue={targetSearch.optionActivity}>
            {lists.activities.map((objOption) =>{return <option key={objOption} value={objOption}>{objOption}</option>})}
          </select>
        </div>)}
        </label><br/>
        <label> Orden:
          <select name="tipeOrden" defaultValue={targetSearch.tipeOrden}>
          <option value="name">Nombre</option>
          <option value="population">Poblacion</option>
          </select>
        </label><br/>
        <label> Orden:
            <select name="order" defaultValue={targetSearch.order}>
            <option value="ASC">Acendente</option>
            <option value="DESC">Decendente</option>
          </select>
        </label>
        <button>hola</button>
      </form>

      */