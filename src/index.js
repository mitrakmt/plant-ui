import React from "react";
import { render } from "react-dom";

// Redux
import { Provider } from "react-redux";

// App
import App from "containers/app/app";

// Config
import * as serviceWorker from "serviceWorker";
import store from "./store";

// CSS
import "./index.css";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
