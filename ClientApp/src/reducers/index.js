import { combineReducers } from "redux";
import character from "./character";
import characters from "./characters";
import location from "./location";
import persons from "./persons";
import products from "./Products";
import cartUpdate from './cartItemjs';
//import AddReducer from './AdminCreateProduct';
import createproduct from './AdminCreateProduct';

export default combineReducers({
  character,
  characters,
  location,
  persons,
  createproduct,
    products,
    cartUpdate

});
