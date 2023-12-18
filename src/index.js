import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

//react ko lagi
import { store } from './app/store';
import { Provider } from 'react-redux';


const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>

      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);