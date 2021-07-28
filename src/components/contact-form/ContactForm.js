import React, { Component } from "react";
import { connect } from "react-redux";
import contactOperations from "../../redux/contacts/contacts-operations";
import shortid from "shortid";
import styles from "../contact-form/ContactForm.module.css";
import contactSelectors from "../../redux/contacts/contacts-selectors";
import Button from "@material-ui/core/Button";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };
  componentDidMount() {
    this.props.fetchContact();
  }

  handleChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { contacts, onSubmit } = this.props;
    const { name, number } = this.state;
    contacts.find((contact) => contact.name === name)
      ? alert(`Name ${name} is already in the contacts`)
      : contacts.find((contact) => contact.number === number)
      ? alert(`Number ${number} is already in the contacts`)
      : onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: "", number: "" });
  };
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
            variant="contained"
            color="primary" /* className={styles.form__btn} */
          >
            Add contact
          </Button>
        </form>
      </div>
    );
  }
}
/* const mapStateToProps = (state) => ({
  isLoadingContacts: contactSelectors.getLoading(state),
}); */
const mapStateToProps = (state) => {
  return {
    contacts: contactSelectors.getVisibleContacts(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (text) => dispatch(contactOperations.addContact(text)),
  fetchContact: () => dispatch(contactOperations.fetchContact()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
