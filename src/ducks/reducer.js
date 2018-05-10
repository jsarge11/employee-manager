import axios from 'axios'
import logo from '../img/logo2.png'

let initialState = {
  user: {},
  company: {},
  img: logo,
  backgroundClass: 'main-page'
}

const UPDATE_USER = 'UPDATE_USER';
const UPDATE_COMPANY = 'UPDATE_COMPANY'
const LOGOUT_USER = 'LOGOUT_USER'
const CHANGE_USER_INFO = 'CHANGE_USER_INFO'
const CHANGE_IMAGE = 'CHANGE_IMAGE'
const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND'

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user
  }
}
export function updateCompany(company) {
  return {
    type: UPDATE_COMPANY,
    payload: company
  }
}
export function logOut() {
  axios.get('/logout').then(()=>{});
  return {
    type: LOGOUT_USER,
    payload: initialState
  }
}
export function changeUserInfo(field, value) {
  return {
    type: CHANGE_USER_INFO,
    payload_field: field,
    payload_value: value
  }
}
export function changeImage(value) {
  if (!value) {
    value = logo;
  }
  return {
    type: CHANGE_IMAGE,
    payload: value
  }
}
export function changeBackground(value) {
  return {
    type: CHANGE_BACKGROUND,
    payload: value
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case (UPDATE_USER):
      return Object.assign({}, state, { user: action.payload })
    case (UPDATE_COMPANY):
      return Object.assign({}, state, { company: action.payload })
    case (LOGOUT_USER):
      return Object.assign({}, state, action.payload);
    case (CHANGE_USER_INFO):
      let newObj = Object.assign({}, state)
      newObj.user[0][`${action.payload_field}`] = action.payload_value;
      return newObj;
    case (CHANGE_IMAGE): 
      return Object.assign({}, state, {img: action.payload});
    case (CHANGE_BACKGROUND):
      return Object.assign({}, state, {backgroundClass: action.payload })
    default:
      return state;
  }
} 