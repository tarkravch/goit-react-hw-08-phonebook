import React from "react";
import hiIcon from "../img/hi_cute_hello_icon.png";

const styles = {
  container: {
    minHeight: "calc(100vh - 50px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: 500,
    fontSize: 48,
    textAlign: "center",
    margin: "0 20px 0 0",
  },
  home_img: {
    display: "inline-block",
    margin: 0,
  },
};

const HomeView = () => (
  <div style={styles.container}>
    <h1 style={styles.title}>Welcome to our phonebook service</h1>
    <img src={hiIcon} alt="hi icon" width="100" style={styles.home_img} />
  </div>
);

export default HomeView;
