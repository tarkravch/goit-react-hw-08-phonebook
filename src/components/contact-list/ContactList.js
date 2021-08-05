import React, { Component } from "react";
import { connect } from "react-redux";

import contactOperations from "../../redux/contacts/contacts-operations";
import contactSelectors from "../../redux/contacts/contacts-selectors";

import styles from "../contact-list/ContactList.module.css";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import Modal from "../Modal/Modal";
import EditForm from "../edit-form/EditForm";

export let nameToChange = "";
export let numberToChange = "";
export let idOfContactToChange = "";

class ContactList extends Component {
  state = {
    showModal: false,
  };

  toggleModal = (actualId, oldName, oldNumber) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    nameToChange = oldName;
    numberToChange = oldNumber;
    idOfContactToChange = actualId;
  };

  render() {
    const { showModal } = this.state;
    const { contacts, onDeleteContact } = this.props;
    const sortedContacts = contacts.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    return (
      <>
        <div className={styles.contacts__block}>
          <ul id="contacts" className={styles.list}>
            {sortedContacts.map((itemName) => (
              <li key={itemName.id} className={styles.list__item}>
                <div className={styles.list__spec}>
                  <span className={styles.list__name}>{itemName.name}</span>
                  <span className={styles.list__number}>
                    {itemName.number}
                  </span>{" "}
                </div>
                <div className={styles.btn__block}>
                  <Button
                    onClick={() =>
                      this.toggleModal(
                        itemName.id,
                        itemName.name,
                        itemName.number
                      )
                    }
                    /* className={styles.list__btn} */
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDeleteContact(itemName.id)}
                    variant="contained"
                    color="secondary"
                    // className={classes.button}
                    startIcon={<DeleteIcon />}
                    // className={styles.list__btn}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <EditForm onSave={this.toggleModal} />
          </Modal>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: contactSelectors.getVisibleContacts(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteContact: (id) => dispatch(contactOperations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
