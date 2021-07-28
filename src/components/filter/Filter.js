import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as contactActions from "../../redux/contacts/contacts-actions";
import contactSelectors from "../../redux/contacts/contacts-selectors";
import styles from "../filter/Filter.module.css";

const Filter = ({ value, onChange }) => (
  <div className={styles.filter}>
    <h3 className={styles.filter_title}>Find contacts by name</h3>
    <label>
      <input type="text" value={value} onChange={onChange} />
    </label>
  </div>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  value: contactSelectors.getFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (e) => {
    dispatch(contactActions.filterByName(e.target.value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
