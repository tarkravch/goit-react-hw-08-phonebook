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
  async (dispatch) => {
    dispatch(editContactRequest());
    console.log(id, name, number);
    try {
      const { data } = await axios.patch(`/contacts/${id}`, {
        name: name,
        number: number,
      });

      const newId = shortid.generate();
      dispatch(editContactSuccess({ id: newId, name, number }));
      dispatch(deleteContactSuccess(id));
    } catch (error) {
      dispatch(editContactError(error.message));
    }
  };
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
