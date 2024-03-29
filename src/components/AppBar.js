import React from "react";
import { connect } from "react-redux";
import Navigation from "./Navigation";
import UserMenu from "./UserMenu";
import AuthNav from "./AuthNav";
import { authSelectors } from "../redux/auth";

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottom: "1px solid var(--btn-color)",
  },
};

const AppBar = ({ isAuthenticated }) => (
  <header style={styles.header}>
    <Navigation />
    {isAuthenticated ? <UserMenu /> : <AuthNav />}
  </header>
);

const mapStateToProps = (state) => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(AppBar);
