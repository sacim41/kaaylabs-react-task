import React from 'react';
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./view/store";
import Home from "./view/Home";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </React.Fragment>
    </Provider>
  );
}

export default App;
