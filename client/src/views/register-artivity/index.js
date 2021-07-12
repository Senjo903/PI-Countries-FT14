import React from 'react';
import { FiSun } from 'react-icons/fi';
import { ImCross } from 'react-icons/im';
import { FaStar, FaCheck} from 'react-icons/fa';
import { GiWinterGloves, GiFallingLeaf } from 'react-icons/gi';
import { SiSpring } from 'react-icons/si';
import './RegisterActivity.css';
import axios from 'axios';

function RegisterActivity() {
  const [values, setValues] = React.useState({
    status:'',
    activityName: "",
    difficulty: 1,
    duration: "",
    station: "",
    countries: [],
    countriesResult: [],
    countryName: ""
  });
  function handleChange(e) {
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value
    }))
  }
  function changeStart(num) {
    return ()=>{
      setValues(values => ({
        ...values,
        difficulty: num
      }))
    }
  }
  function changeStation(station) {
    return ()=>{
      setValues(values => ({
        ...values,
        station: station
      }))
    }
  }
  function clearCountry(countryID) {
    return ()=>{
      setValues(values => ({
        ...values,
        countries: values.countries.filter(country => country.ID !== countryID)
      }))
    }
  }
  function getCountry(countryID, countryName) {
    return ()=>{
      if(values.countries.filter(country => country.ID === countryID).length === 0){
        setValues(values => ({
          ...values,
          countries: values.countries.concat([{ID: countryID, name: countryName}])
        }))
      }
      setValues(values => ({
        ...values,
        countriesResult: [], countryName: ""
      }))
    }
  }
  function ResetForm() {
    setValues(values => ({
      ...values,
      status:'',
      activityName: "",
      difficulty: 1,
      duration: "",
      station: "",
      countries: [],
      countriesResult: [],
      countryName: ""
    }))
  }
  function reportError(e) {
    setValues(values => ({
      ...values,
      status:'Tubimos el siguiente error'+e,
    }))
  }
  function handleChangeSearch(e) {
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value
    }))
    if (e.target.value !=='') {
      axios(`/countries?name=${e.target.value}`).then((r) => {
        setValues(values => ({
          ...values,
          countriesResult: r.data.msj
        }))
      }).catch((e) =>{
      })
    }
  }
  function handleSubmit(e) {
    e.preventDefault()
    axios.post('/activity', {
      name: values.activityName,
      difficulty: values.difficulty,
      duration: values.duration,
      station: values.station,
      countries: values.countries.map(country =>{return country.ID})
    }).then((r)=>{
      ResetForm();
    }).catch((e) => {
      reportError(e);
    })
  }
  return (
    <div>
      <h1>registro actividad</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Actividad: {values.activityName}</label><br/>
          <input onChange={handleChange} value={values.activityName} name="activityName" type="text"/>
        </div>
        <div>
          <label>dificultad: {values.difficulty}</label><br/>
          <FaStar onClick={changeStart(1)} className={values.difficulty >= 1 ? 'starUp': 'star'}/>
          <FaStar onClick={changeStart(2)} className={values.difficulty >= 2 ? 'starUp': 'star'}/>
          <FaStar onClick={changeStart(3)} className={values.difficulty >= 3 ? 'starUp': 'star'}/>
          <FaStar onClick={changeStart(4)} className={values.difficulty >= 4 ? 'starUp': 'star'}/>
          <FaStar onClick={changeStart(5)} className={values.difficulty >= 5 ? 'starUp': 'star'}/>
        </div>
        <div>
          <label>duration: {values.duration}</label><br/>
          <input onChange={handleChange} value={values.duration} name="duration" type="text"/>
        </div>
        <div>
          <label>estacion: {values.station}</label><br/>
          <label onClick={changeStation('summer')} className={values.station === 'summer' ? 'buttonStateUp': 'buttonState'}>verano <FiSun className='station summer' /></label>
          <label onClick={changeStation('fall')} className={values.station === 'fall' ? 'buttonStateUp': 'buttonState'}>otoño <GiFallingLeaf className='station fall'/></label>
          <label onClick={changeStation('winter')} className={values.station === 'winter' ? 'buttonStateUp': 'buttonState'}>invierno <GiWinterGloves className='station winter'/></label>
          <label onClick={changeStation('spring')} className={values.station === 'spring' ? 'buttonStateUp': 'buttonState'}>primavera <SiSpring className='station spring'/></label>
        </div>
        <div>
          <label>pais: {values.countryName}</label><br/>
          <div className='countries'>
            {values.countries.map((country)=> {
              return (<label onClick={clearCountry(country.ID)} key={country.ID} className='buttonCountry'>{country.name} <ImCross className='cross'/></label>);
            })}
          </div><br/>
        </div>
        <input type='search' onChange={handleChangeSearch} value={values.countryName} name="countryName" placeholder='buscar paises'/><br/>
        <div className='countries'>
          {(values.countryName.length !== 0 && values.countriesResult.length === 0)? (<h4>no hay resultados</h4>):(values.countryName.length === 0 && values.countriesResult.length === 0)?(<h4>Escriba arriba para agregar mas paises</h4>):(<h4>resultados de busqueda:</h4>)}<br/>
          {values.countriesResult.map((country)=> {
            return (<label onClick={getCountry(country.ID, country.name)} key={country.ID} className='buttonCountry'>{country.name} <FaCheck className='cross'/></label>);
          })}
        </div><br/>
        <button type="submit">SUBMIT</button><br/>
        <label>{values.status}</label>
      </form>

    </div>
  )
};


export default RegisterActivity;