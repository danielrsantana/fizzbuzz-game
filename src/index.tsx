import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import App from "./pages/app";
import { store } from "./redux/store";

require("./assets/scss/app.scss");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
