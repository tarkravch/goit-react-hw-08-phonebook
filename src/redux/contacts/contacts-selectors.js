import { createSelector } from "@reduxjs/toolkit";

const getFilter = (state) => state.contacts.filter;
const getAllContacts = (state) => state.contacts.items;
const getLoading = (state) => state.contacts.loading;

const getVisibleContacts = createSelector(
  [getAllContacts, getFilter],
  (contacts, filter) => {
    /* порядок селекторів має відповідати порядку функцій в масиві! */
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);

export default {
  getLoading,
  getFilter,
  getVisibleContacts,
  getAllContacts,
};
