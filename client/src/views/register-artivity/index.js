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
    result: undefined,
    activityName: "",
    activityNameStatus: "",
    difficulty: 1,
    duration: "",
    station: "",
    countries: [],
    countriesResult: [],
    countryName: "",
    imgUrl: ""
  });
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
      activityName: '',
      activityNameStatus: "",
      difficulty: 1,
      duration: '',
      station: '',
      countries: [],
      countriesResult: [],
      countryName: '',
      imgUrl: ""
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
  async function handleSubmit(e) {
    e.preventDefault()
    if (values.activityName !== '' && values.duration !== '' && values.station !== '' && values.countries.length !== 0) {
      try {
        await axios.post('/activity', {
          name: values.activityName,
          difficulty: values.difficulty,
          duration: values.duration,
          station: values.station,
          countries: values.countries.map(country =>{return country.ID}),
          imgUrl: values.imgUrl
        }).then((r)=>{
          ResetForm();
          setValues(values => ({
            ...values,
            status: 'complete', result: r.data
          }))
        })
      } catch (error) {
        setValues(values => ({
          ...values,
          status: 'error', result: error.response.data.error
        }))
      }
    } else {
      setValues(values => ({
        ...values,
        status: 'incomplete'
      }))
    }
  }
  function handleChange(e) {
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value
    }))
  }
  function handleChangeActivityName(e) {
    setValues(values => ({
      ...values,
      activityName: e.target.value
    }))
    if (e.target.value !=='') {
      axios(`/activity/${e.target.value}`).then((r) => {
        if (r.data) {
          setValues(values => ({
            ...values,
            activityNameStatus: false
          }))
        } else {
          setValues(values => ({
            ...values,
            activityNameStatus: true
          }))
        }
      }).catch((e) =>{
      })
    } else {
      setValues(values => ({
        ...values,
        activityNameStatus: 'es obligatorio escrbir un nombre'
      }))
    }
  }
  return (
    <div className="body-register">
      <div className="register">
      <h1>Register Tourist Activity</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="aling-form">
          <label>
            Activity: {values.activityName === ''?(<label className="rejected tipe-text1">Required</label>):
            values.activityNameStatus?(<label className="accepted tipe-text1">available</label>):
            (<label className="rejected tipe-text1">the activity already exists</label>)}
          </label>
          <div>
            <input placeholder="name of the tourist activity" className="register-input width-input" onChange={handleChangeActivityName} value={values.activityName} name="activityName" type="text"/>
          </div>
        </div>
        <div className="aling-form">
          <label>Difficulty:</label>
          <div>
          <FaStar onClick={changeStart(1)} className={values.difficulty >= 1 ? 'starUp': 'star'}/>
          <FaStar onClick={changeStart(2)} className={values.difficulty >= 2 ? 'starUp': 'star'}/>
          <FaStar onClick={changeStart(3)} className={values.difficulty >= 3 ? 'starUp': 'star'}/>
          <FaStar onClick={changeStart(4)} className={values.difficulty >= 4 ? 'starUp': 'star'}/>
          <FaStar onClick={changeStart(5)} className={values.difficulty >= 5 ? 'starUp': 'star'}/>
          </div>
          </div>
        <div className="aling-form">
          <label>Duration: {values.duration !== ''?(<></>):(<label className="rejected tipe-text1">it is mandatory to specify a duration</label>)}</label>
          <div>
            <input className="register-input width-input" onChange={handleChange} value={values.duration} name="duration" type="text"/>
          </div>
        </div>
        <div className="aling-form">
          <label>Station: {values.station !== ''?(<></>):(<label className="rejected tipe-text1">it is mandatory to select a station</label>)}</label>
          <div className="stations">
          <label onClick={changeStation('summer')} className={values.station === 'summer' ? 'buttonStateUp': 'buttonState'}>Summer <FiSun className='station summer' /></label>
          <label onClick={changeStation('fall')} className={values.station === 'fall' ? 'buttonStateUp': 'buttonState'}>Fall <GiFallingLeaf className='station fall'/></label>
          <label onClick={changeStation('winter')} className={values.station === 'winter' ? 'buttonStateUp': 'buttonState'}>Winter <GiWinterGloves className='station winter'/></label>
          <label onClick={changeStation('spring')} className={values.station === 'spring' ? 'buttonStateUp': 'buttonState'}>Spring <SiSpring className='station spring'/></label>
          </div>
        </div>
        <div className="aling-form">
          <label>Countries: {values.countries.length !== 0?(<></>):(<label className="rejected tipe-text1">you must select at least one country</label>)}</label>
        </div>
        { values.countries.length !== 0 ?
        (<div className='countries-lists'>
          <div  className='countries-results'>
            {values.countries.map((country)=> {
              return (
                <label className='buttonCountry' onClick={clearCountry(country.ID)} key={country.ID}>
                {country.name} <ImCross className='country-icon-cross'/>
                </label>
              );
            })}</div>
        </div>):(<></>)}
        <input className="register-search" autoComplete="off" type='search' onChange={handleChangeSearch} value={values.countryName} name="countryName" placeholder='search countries...'/><br/>
        <div className='countries-lists'>
          {(values.countryName.length !== 0 && values.countriesResult.length === 0)?
          (<h4>No results</h4>):
          (values.countryName.length === 0 && values.countriesResult.length === 0)?
          (<h4>Write to add more countries</h4>):
          (<h4>Search results:</h4>)}
          <div className='countries-results'>
          {values.countriesResult.map((country)=> {
            return (<label onClick={getCountry(country.ID, country.name)} key={country.ID} className='buttonCountry'>{country.name} <FaCheck className='country-icon'/></label>);
          })}
          </div>
        </div>
        <div className="aling-form">
          <label>Url image: <label className="accepted tipe-text1">opcional</label></label>
          <input className="register-img" onChange={handleChange} value={values.imgUrl} name="imgUrl" type="text"/>
        </div>
        <button className="button-activity" type="submit">Create Activity</button><br/>
      </form>
      </div>
      {values.status === ''?
      (<></>):
      values.status === 'incomplete'?
      (<div className="register-result">
        <div className="countries-results">
        <h3 className="rejected">Missing complete data</h3>
        </div>
      </div>):
      values.status === 'complete'?
      (<div className="register-result">
        <div className="countries-results">
          <h3 className="accepted">The activity: {values.result.activity.name} was registered successfully</h3>
        </div>
      </div>):
      (<div className="register-result">
        <div className="countries-results">
          <h3 className="rejected">Error: {values.result}</h3>
        </div>
      </div>)}
    </div>
  )
};

export default RegisterActivity;