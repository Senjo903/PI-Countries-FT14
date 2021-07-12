import axios from "axios";
export const GET_COUNTRY = 'GET_COUNTRY';
export const ERROR = 'ERROR';
export const GET_PAGE = 'GET_PAGE';
export const GET_TARGET = 'GET_TARGET';
export const GET_OPTION_FILTER = 'GET_OPTION_FILTER';
export const COUNTRY_DETAIL = 'COUNTRY_DETAIL';
export const CLEAR_COUNTRY = 'CLEAR_COUNTRY';

export function getData(payload) {
  return { type: GET_COUNTRY, payload: payload }
}

export function dataError(payload) {
  return { type: ERROR, payload: payload }
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
    axios.get(`/countries/${countryID}`)
      .then((r) => {
        dispatch({ type: COUNTRY_DETAIL, payload: r.data })
      })
      .catch(error => {
        if (error.response?.status) {
          if (error.response.status === 404) {
            return dispatch({ type: COUNTRY_DETAIL, payload: null })
          }
        }
        alert("Ups!!! 😥")
      })
  }
}
export function clearCountry(payload) {
  return { type: CLEAR_COUNTRY, payload: payload }
}