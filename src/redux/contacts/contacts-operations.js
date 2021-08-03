import axios from "axios";
import shortid from "shortid";
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  editContactRequest,
  editContactSuccess,
  editContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  fetchContactRequest,
  fetchContactSuccess,
  fetchContactError,
} from "./contacts-actions";

axios.defaults.baseURL = "https://connections-api.herokuapp.com/";

const fetchContact = () => async (dispatch) => {
  dispatch(fetchContactRequest());

  try {
    const { data } = await axios.get("/contacts");
    dispatch(fetchContactSuccess(data));
  } catch (error) {
    dispatch(fetchContactError(error.message));
  }
};

const editContact =
  ({ id, name, number }) =>
  (dispatch) => {
    dispatch(editContactRequest());
    const contact = { name, number };
    axios
      .patch(`/contacts/${id}`, contact)
      .then(({ data }) => {
        dispatch(editContactSuccess(data));
      })
      .catch((error) => dispatch(editContactError(error.message)));
    
const addContact =
  ({ name, number }) =>
  (dispatch) => {
    const contact = { name, number };
    dispatch(addContactRequest());
    axios
      .post("/contacts", contact)
      .then(({ data }) => {
        dispatch(addContactSuccess(data));
      })
      .catch((error) => dispatch(addContactError(error.message)));
  };

const deleteContact = (id) => (dispatch) => {
  dispatch(deleteContactRequest());

  axios
    .delete(`/contacts/${id}`)
    .then(() => {
      dispatch(deleteContactSuccess(id));
    })
    .catch((error) => dispatch(deleteContactError(error.message)));
};

export default {
  addContact,
  editContact,
  deleteContact,
  fetchContact,
};
