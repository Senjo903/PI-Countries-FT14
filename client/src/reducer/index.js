import { GET_COUNTRY, GET_STATUS, GET_PAGE, GET_TARGET, GET_OPTION_FILTER, COUNTRY_DETAIL, CLEAR_COUNTRY, RESET_ALL, SEARCH_DETAIL, CLEAR_SEARCH } from '../actions'
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
  SearchList: undefined,
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
    case RESET_ALL: return {
      ...state,
      CountrySearch: { ...state.CountrySearch,
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
       }
    }
    case GET_STATUS: return {
      ...state,
      CountrySearch: { ...state.CountrySearch, searchStatus: payload }
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
    case SEARCH_DETAIL: return {
      ...state,
      SearchList: payload
    }
    case CLEAR_SEARCH: return {
      ...state,
      SearchList: payload
    }
    default: return state
  }
}