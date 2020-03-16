import React from "react";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createStructuredSelector } from "reselect";
import { getLoggedIn } from "redux/user";

import "./home.scss";

function Home({ loggedIn }) {
  return (
    <div className="Home">
      {loggedIn ? (
        <div className="Home-loggedIn">
          <h1>Logged In Home</h1>
        </div>
      ) : (
        <div className="Home-loggedOut">
          <h1>Logged Out Home</h1>
        </div>
      )}
    </div>
  );
}

// Redux
const mapStateToProps = createStructuredSelector({
  loggedIn: getLoggedIn
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
