import React, { Component } from "react";
import { connect } from "react-redux";
import { authOperations } from "../redux/auth";
import Button from "@material-ui/core/Button";

const styles = {
  form: {
    width: 320,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 15,
    color: "var(--main-font)",
  },
  btn: {
    display: "inline-block",
    minWidth: 60,
    height: "auto",
    fontFamily: "Ubuntu",
    fontSize: 16,
    lineHeight: 1.2,
    fontStyle: "normal",
    fontWeight: 700,
    color: "black",
    border: "2px solid var(--btn-color)",
    borderRadius: 10,
    backgroundColor: "var(--btn-color)",
    padding: 5,
    cursor: "pointer",
    boxShadow: "11px 10px 21px 0px rgba(34, 60, 80, 0.2)",
    "&:hover": {
      color: "var(--color-black)",
      backgroundColor: "var(--list-color)",
      border: "2px solid var(--list-color)",
    },
  },
};

class LoginView extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onLogin(this.state);

    this.setState({ name: "", email: "", password: "" });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h1>Log in page</h1>
        <form
          onSubmit={this.handleSubmit}
          style={styles.form}
          autoComplete="off"
        >
          <label style={styles.label}>
            Email
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>

          <label style={styles.label}>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </label>

          <Button
            /* style={styles.btn} */ type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  onLogin: authOperations.logIn,
};

export default connect(null, mapDispatchToProps)(LoginView);
