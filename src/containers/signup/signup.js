import React, { useState } from "react";

// MUI
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createStructuredSelector } from "reselect";
import { getLoggedIn, signup } from "redux/user";

// CSS
import "./signup.scss";

function Signup({ loggedIn, signup }) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let completeSignup = () => {
    signup({ email, password });
  };

  return (
    <Box
      className="Signup"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <h1>Signup</h1>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        className="Signup-formContainer"
      >
        <TextField
          label="Email"
          type="string"
          className="Signup-formContainer-input"
          onChange={event => setEmail(event.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          className="Signup-formContainer-input"
          onChange={event => setPassword(event.target.value)}
          fullWidth
        />
        <Button
          onClick={completeSignup}
          className="Signup-formContainer-button"
          variant="contained"
          color="primary"
        >
          Signup
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
      signup
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
