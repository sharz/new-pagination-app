import {combineReducers} from "redux";
import {Payments} from "./payments";
import {reducer as reduxFormReducer} from "redux-form";

const initial = {
  searchUrl: ""
};
export default combineReducers({
  form: reduxFormReducer,
  initial: initial,
  payments: Payments
});
