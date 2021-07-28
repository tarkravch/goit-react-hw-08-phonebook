import React, { Component } from "react";
import { connect } from "react-redux";
import ContactForm from "../components/contact-form/ContactForm";
import ContactList from "../components/contact-list/ContactList";
import contactSelectors from "../redux/contacts/contacts-selectors";
import Filter from "../components/filter/Filter";
import Container from "../components/Container/Container";

class ContactsView extends Component {
  render() {
    const { contacts, filterValue } = this.props;

    return (
      <>
        <Container>
          <h1>Phonebook</h1>
          <ContactForm />
          <h2>Contacts</h2>
          {contacts.length > 1 || filterValue.length > 0 ? (
            <Filter />
          ) : (
            contacts.length !== 1 && (
              <h2>There are no contacts in your phonebook yet</h2>
            )
          )}
          <ContactList />
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  /* isLoadingContacts: contactSelectors.getLoading(state), */
  contacts: contactSelectors.getVisibleContacts(state),
  filterValue: contactSelectors.getFilter(state),
});

export default connect(mapStateToProps, null)(ContactsView);
