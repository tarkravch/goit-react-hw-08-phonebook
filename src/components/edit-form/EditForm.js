import React, { Component } from "react";
import { connect } from "react-redux";
import contactOperations from "../../redux/contacts/contacts-operations";
import shortid from "shortid";
import styles from "../contact-form/ContactForm.module.css";
import contactSelectors from "../../redux/contacts/contacts-selectors";
import Button from "@material-ui/core/Button";
import {
  idOfContactToChange,
  nameToChange,
  numberToChange,
} from "../contact-list/ContactList";

class EditForm extends Component {
  state = {
    id: idOfContactToChange,
    name: nameToChange,
    number: numberToChange,
  };

  handleChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { contacts, onSubmit } = this.props;
    const { number } = this.state;

    contacts.find((contact) => contact.number === number)
      ? alert(`Number ${number} is already in the contacts`)
      : onSubmit(this.state);
    this.reset();
    this.props.onSave();
    /* передаємо значення на проп onSubmit */
  };
  reset = () => {
    this.setState({ id: "", name: "", number: "" });
  };
  componentWillUnmount() {
    this.props.fetchContact();
  }
  nameInputId = shortid.generate();
  numberInputId = shortid.generate();

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <label htmlFor={this.nameInputId} className={styles.form__label}>
            Name
            <input
              className={styles.form__input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
              value={this.state.name}
              onChange={this.handleChange}
              id={this.nameInputId}
            />
          </label>
          <label htmlFor={this.numberInputId} className={styles.form__label}>
            Number
            <input
              className={styles.form__input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
              value={this.state.number}
              onChange={this.handleChange}
              id={this.numberInputId}
            />
          </label>
          <Button
            type="submit"
            /* className={styles.form__btn} */
            variant="contained"
            color="primary"
          >
            Save contact
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: contactSelectors.getVisibleContacts(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (contact) => dispatch(contactOperations.editContact(contact)),
  fetchContact: () => dispatch(contactOperations.fetchContact()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
