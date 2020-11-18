import { combineReducers } from "redux";
import character from "./character";
import characters from "./characters";
import location from "./location";
import persons from "./persons";
import AddReducer from './Formdata';

export default combineReducers({
  character,
  characters,
  location,
    persons,
    AddReducer

});
