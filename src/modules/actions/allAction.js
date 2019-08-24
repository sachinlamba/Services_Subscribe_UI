// import urls from '../constants/AppContants';

export const FETCH_API = "FETCH_API";
export const FETCHED_DATA = "FETCHED_DATA";
export const STUDENT_SELECTED = "STUDENT_SELECTED";
export const SELECTION_POPUP = "SELECTION_POPUP";

export const LOGIN_STATUS = "LOGIN_STATUS";
export const LOGIN_USER = "LOGIN_USER";
export const SERVICES_LIST = "SERVICES_LIST";
export const REGISTER_USER = "REGISTER_USER";
export const TOKEN_SETTER = "TOKEN_SETTER";

export const newUserRegister = (status) => dispatch => {
  dispatch({
      type: REGISTER_USER,
      data: status
    })
}
export const alterLoginStatus = (status) => dispatch => {
  dispatch({
      type: LOGIN_STATUS,
      data: status
    })
}
export const allServicesFetch = (data) => dispatch => {
  dispatch({
      type: SERVICES_LIST,
      data
    })
}

export const loggedInUser = (user) => dispatch => {
  dispatch({
      type: LOGIN_USER,
      user
    })
}

export const tokenSetter = (token) => dispatch => {
  dispatch({
      type: TOKEN_SETTER,
      token
    })
}

export const studentSelection = (selectedStudent) => dispatch => {
  dispatch({
    type: STUDENT_SELECTED,
    selectedStudent
  })
}

export const dataRequestUpdate = () => dispatch => {
  dispatch({
      type: FETCH_API
    })
}

export const alterDetailsPopup = (status) => dispatch => {
  dispatch({
      type: SELECTION_POPUP,
      payload: status
    })
}

export const studentDataFetch = (students) => dispatch => {
  dispatch({
      type: FETCHED_DATA,
      data: students
    })
}
