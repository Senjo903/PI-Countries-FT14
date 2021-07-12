import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData, dataError } from '../../actions';
import TablaCountries from '../../components/TableCountries';
import Preferences from '../../components/Preferences';
import axios from 'axios';

function ListOfCountries() {
  const CountrySearch = useSelector((state) => state.CountrySearch);
  const dispatch = useDispatch();

  useEffect(() => {
    if(CountrySearch.searchStatus === 'pending'){
      var filterSelector;
      if(CountrySearch.filter === 'continent'){
        filterSelector = CountrySearch.optionFilterContinent;
      } else {
        filterSelector = CountrySearch.optionFilterActivities;
      }
      const requestAll = [
        axios(`/countries?filter=${CountrySearch.filter}&options=${filterSelector}&tipeOrden=${CountrySearch.tipeOrden}&order=${CountrySearch.order}&page=${CountrySearch.page}`),
        axios('/list/continent'),
        axios('/list/activities')
      ];

      axios.all(requestAll).then(axios.spread((...responses) => {
        let arrayContinent = responses[1].data.map((element) => { return element.name })
        let arrayActivities = responses[2].data.map((element) => { return element.name })
        let dataSearch = {
          continentList: arrayContinent,
          activitiesList: arrayActivities,
          resultSearch: responses[0].data
        }
        dispatch(getData(dataSearch));
      })).catch(e => {
        dispatch(dataError(e));
      })
      }
  })

  return (
    <div>
      <Preferences/>
      <TablaCountries/>
    </div>
  )
};

export default ListOfCountries;



/*
function Home() {
  const targetSearch = useSelector((state) => state.targetSearch);
  const searchStatus = useSelector((state) => state.searchStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    loading();
  })

  const loading = async() => {
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

  return (
    <div>
      <h1>preferencias:</h1>
      <div><Preferences/></div>
      <h1>estado:</h1>
      <h2>{searchStatus}</h2>
      <div>
        { searchStatus ==='complete' ? (<TablaCountries />) : searchStatus ==='error' ? (<ErrorMsj/>): (<h4> esperando </h4>)}
      </div>
    </div>
  )*/