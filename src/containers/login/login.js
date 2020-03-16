import React, { useEffect, useState } from "react";
import { getAuthToken } from "utils/token";

// MUI
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createStructuredSelector } from "reselect";
import { getLoggedIn, login, autoLogin } from "redux/user";

// CSS
import "./login.scss";

function Login({ login, autoLogin }) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  useEffect(() => {
    const authToken = getAuthToken();
    if (authToken) {
      autoLogin(authToken);
    }
  }, [autoLogin]);

  let completeLogin = () => {
    login({ email, password });
  };

  return (
    <Box
      className="Login"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <h1>Login</h1>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        className="Login-formContainer"
      >
        <TextField
          label="Email"
          type="string"
          className="Login-formContainer-input"
          onChange={event => setEmail(event.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          className="Login-formContainer-input"
          onChange={event => setPassword(event.target.value)}
          fullWidth
        />
        <Button
          onClick={completeLogin}
          className="Login-formContainer-button"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

// Redux
const mapStateToProps = createStructuredSelector({
  loggedIn: getLoggedIn
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      autoLogin
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
