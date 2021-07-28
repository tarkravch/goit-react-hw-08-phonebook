import React from "react";
import { connect } from "react-redux";
import { authSelectors, authOperations } from "../redux/auth";
import defaultAvatar from "../img/default-avatar.svg";
import Button from "@material-ui/core/Button";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: 4,
  },
  name: {
    fontWeight: 700,
    marginRight: 12,
  },
  btn: {
    display: "inline-block",
    width: 60,
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
  },
};

const UserMenu = ({ avatar, name, onLogout }) => (
  <div style={styles.container}>
    <img src={avatar} alt={name} width="32" style={styles.avatar} />
    <span style={styles.name}>Welcome, {name}</span>
    <Button
      /* style={styles.btn} */ type="button"
      onClick={onLogout}
      variant="contained"
      color="primary"
    >
      Logout
    </Button>
  </div>
);
const mapStateToProps = (state) => ({
  name: authSelectors.getUsername(state),
  avatar: defaultAvatar,
});

const mapDispatchToProps = {
  onLogout: authOperations.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
