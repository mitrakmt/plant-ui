import React from "react";
import { Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

// Components
import asyncComponent from "components/AsyncComponent";
import AuthenticatedRoute from "components/AuthenticatedRoute";
import UnauthenticatedRoute from "components/UnauthenticatedRoute";
import Navigation from "containers/navbar/navbar";

// Redux
import { connect } from "react-redux";
import { history } from "store";
import { bindActionCreators } from "redux";
import { createStructuredSelector } from "reselect";
import { getLoggedIn } from "redux/user";

// CSS
import "./app.scss";

const AsyncHome = asyncComponent(() => import("containers/home/home"));
const AsyncLogin = asyncComponent(() => import("containers/login/login"));
const AsyncSignup = asyncComponent(() => import("containers/signup/signup"));

function App({ loggedIn }) {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Navigation loggedIn={loggedIn} />
        <Switch>
          <UnauthenticatedRoute
            path="/login"
            exact
            component={AsyncLogin}
            props={{ loggedIn }}
          />
          <UnauthenticatedRoute
            path="/signup"
            exact
            component={AsyncSignup}
            props={{ loggedIn }}
          />
          <UnauthenticatedRoute
            path="/"
            exact
            component={AsyncHome}
            props={{ loggedIn }}
          />
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

// Redux
const mapStateToProps = createStructuredSelector({
  loggedIn: getLoggedIn
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
