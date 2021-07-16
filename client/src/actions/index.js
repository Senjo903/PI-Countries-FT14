import axios from "axios";
export const GET_COUNTRY = 'GET_COUNTRY';
export const GET_STATUS = 'GET_STATUS';
export const GET_PAGE = 'GET_PAGE';
export const GET_TARGET = 'GET_TARGET';
export const GET_OPTION_FILTER = 'GET_OPTION_FILTER';
export const COUNTRY_DETAIL = 'COUNTRY_DETAIL';
export const CLEAR_COUNTRY = 'CLEAR_COUNTRY';
export const RESET_ALL = 'RESET_ALL';
export const SEARCH_DETAIL = 'SEARCH_DETAIL';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

export function getData(payload) {
  return { type: GET_COUNTRY, payload: payload }
}
export function getStatus(payload) {
  return { type: GET_STATUS, payload: payload }
}
export function resetAll(payload) {
  return { type: RESET_ALL, payload: payload }
}
export function getPage(payload) {
  return { type: GET_PAGE, payload: payload }
}
export function getTarget(payload) {
  return { type: GET_TARGET, payload: payload }
}
export function getFilter(payload) {
  return { type: GET_OPTION_FILTER, payload: payload }
}
export function countryDetail(countryID) {
  return (dispatch) => {
    axios.get(`/countries/${countryID}`).then((r) => {
        dispatch({ type: COUNTRY_DETAIL, payload: r.data })
      })
      .catch(error => {
        return dispatch({ type: COUNTRY_DETAIL, payload: null })
      })
  }

}
export function clearCountry(payload) {
  return { type: CLEAR_COUNTRY, payload: payload }
}
export function searchDetail(fragmentName) {
  return (dispatch) => {
    axios.get(`/countries?name=${fragmentName}`).then((r) => {
        dispatch({ type: SEARCH_DETAIL, payload: r.data })
      })
      .catch(error => {
        return dispatch({ type: SEARCH_DETAIL, payload: null })
      })
  }

}
export function clearSearch(payload) {
  return { type: CLEAR_SEARCH, payload: payload }
}