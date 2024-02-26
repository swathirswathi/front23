import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

function Appp() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="11893984886-e7uh93qd2pvmkg3tnieok9d7i8gna9q1.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

const root = document.getElementById("root");
createRoot(root).render(<Appp />);
