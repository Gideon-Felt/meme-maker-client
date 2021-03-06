import React from "react";
import ReactDOM from "react-dom";
import {  useRoutes, A  } from "hookrouter"
import App from "./components/app";
import MemeForm from "./components/memeForm"
import MemeDetail from "./components/meme-detail"

import "./style/main.scss";

const routes = {
  "/": () => <App />,
  "/form": () => <MemeForm />,
  "/form/:id": ({ id }) => <MemeForm id={id} editMode={true} />,
  "/meme/:id": ({ id }) => <MemeDetail id={id} />
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
      <div className="spacer"/>
      <div className="meme-space">
        {useRoutes(routes)}
      </div>
  </div>
    
  )

}

ReactDOM.render(<Main />, document.querySelector(".app-wrapper"));
