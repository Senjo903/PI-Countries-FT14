import { GET_COUNTRY, ERROR, GET_PAGE, GET_TARGET, GET_OPTION_FILTER, COUNTRY_DETAIL, CLEAR_COUNTRY} from '../actions'

const initialState = {
  CountrySearch: {
    searchStatus: 'pending',
    filter: 'continent',
    optionFilterContinent: 'all',
    optionFilterActivities: 'all',
    tipeOrden: 'name',
    order: 'ASC',
    page: 1,
    continentList: ['all'],
    activitiesList: ['all'],
    resultSearch: {}
  },
  CountryDetail: undefined,
  activityForm:[]
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_COUNTRY:
      return { ...state,
        CountrySearch:{
          ...state.CountrySearch,
          searchStatus: 'complete',
          continentList: payload.continentList,
          activitiesList: payload.activitiesList,
          resultSearch: payload.resultSearch
        }
    }
    case ERROR: return {
      ...state,
      CountrySearch: { ...state.CountrySearch, searchStatus: 'complete' }
    }
    case GET_PAGE: return {
      ...state,
      CountrySearch: {...state.CountrySearch, searchStatus: 'pending', page: payload}
    }
    case GET_TARGET: return {
      ...state,
      CountrySearch: {...state.CountrySearch, searchStatus: 'pending', page: 1, [payload.tipe]: payload.value}
    }
    case GET_OPTION_FILTER: return {
      ...state,
      CountrySearch: {...state.CountrySearch, searchStatus: 'pending', page: 1, optionFilterContinent: payload.continent, optionFilterActivities: payload.activities}
    }
    case COUNTRY_DETAIL: return {
      ...state,
      CountryDetail: payload
    }
    case CLEAR_COUNTRY: return {
      ...state,
      CountryDetail: payload
    }
    default: return state
  }
}

/*



    case RESULT:
      let{ count, numberPages, actualPage, pageResult } = payload;
      return {
        ...state,
        resultSearch: { count,  numberPages,  actualPage,  pageResult }
    }
    case CHANCE_STATUS: return {
      ...state,
      searchStatus: payload
    }*/