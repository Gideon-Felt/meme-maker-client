import React from "react";
import ReactDOM from "react-dom";
import {  useRoutes, A  } from "hookrouter"
import App from "./components/app";
import MemeForm from "./components/memeForm"

import "./style/main.scss";

const routes = {
  "/": () => <App />,
  "/form": () => <MemeForm />,
  "/form/:id": ({ id }) => <MemeForm id={id} editMode={true} />
}


function Main() {
  return (
    <div className="app-wrapper">
      <div className="nav-bar-wrapper">
        <div className="nav-links-wrapper">

          <div className="nav-link-wrapper">
            <A href="/">Home</A>
          </div>

          <div className="nav-link-wrapper">
            <A href="/form">Form</A>
          </div>

        </div>
      </div>
      <div>
        {useRoutes(routes)}
      </div>
  </div>
    
  )

}

ReactDOM.render(<Main />, document.querySelector(".app-wrapper"));
