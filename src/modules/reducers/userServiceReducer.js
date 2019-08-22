import { LOGIN_STATUS, SERVICES_LIST, REGISTER_USER,
  FETCH_API, FETCHED_DATA, STUDENT_SELECTED , SELECTION_POPUP, LOGIN_USER} from '../actions/allAction';
import initialState from "../constants/initialState.js";

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_STATUS:
      return Object.assign({}, state, { loginStatus: action.data })
    case LOGIN_USER:
      return Object.assign({}, state, { userDetails: action.user })
    case REGISTER_USER:
      return Object.assign({}, state, { register: action.data })
    case SERVICES_LIST:
      return Object.assign({}, state, { serviceList: action.data })
    case FETCH_API:
      return Object.assign({}, state, { fetchAPI: !state.fetchAPI })
    case FETCHED_DATA:
      return Object.assign({}, state, {
        studentList: action.data
       })
    case STUDENT_SELECTED:
      return Object.assign({}, state, { selectedStudent: action.selectedStudent })
    case SELECTION_POPUP:
      return Object.assign({}, state, { studentDetailsPopup: action.payload })
    default:
      return state
  }
}
