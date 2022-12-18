import React from "react";
import App from "./App";
//import { render } from "react-dom";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

//const container = document.getElementById("root");
//render(<App />, container);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
