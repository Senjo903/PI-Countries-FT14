import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData, getStatus, resetAll } from '../../actions';
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
        dispatch(getStatus('error'));
      })
      }
  })
  useEffect(()=>{
    dispatch(resetAll());
  },[dispatch])

  return (
    <div className="align-views">
      {CountrySearch.searchStatus !=='error'?
      (<div>
        <Preferences/>
        <TablaCountries/>
      </div>):
      (<span>
        tubimos un error
      </span>)
    }</div>
  )
};

export default ListOfCountries;

