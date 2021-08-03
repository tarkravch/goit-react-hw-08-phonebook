import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
// import initialContacts from "../../components/contactArr.json";
import {
  addContactSuccess,
  addContactRequest,
  addContactError,
  editContactSuccess,
  editContactRequest,
  editContactError,
  filterByName,
  deleteContactSuccess,
  deleteContactRequest,
  deleteContactError,
  fetchContactRequest,
  fetchContactSuccess,
  fetchContactError,
} from "./contacts-actions";

const items = createReducer([], {
  [fetchContactSuccess]: (_, action) => action.payload,
  [addContactSuccess]: (state, action) => [...state, action.payload],
  [editContactSuccess]: (state, { payload }) =>
    state.map((contact) => (contact.id === payload.id ? payload : contact)),
  [deleteContactSuccess]: (state, action) =>
    state.filter(({ id }) => id !== action.payload),
});

const filter = createReducer("", {
  [filterByName]: (_, action) => action.payload,
});

const loading = createReducer(false, {
  [fetchContactRequest]: () => false,
  [fetchContactSuccess]: () => true,
  [fetchContactError]: () => false,
  [addContactRequest]: () => false,
  [addContactSuccess]: () => true,
  [addContactError]: () => false,
  [deleteContactRequest]: () => false,
  [deleteContactSuccess]: () => true,
  [deleteContactError]: () => false,
  [editContactRequest]: () => false,
  [editContactSuccess]: () => false,
  [editContactError]: () => false,
});

export default combineReducers({
  items,
  filter,
  loading,
});
