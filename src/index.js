import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const scriptMaps = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`;
const script = document.createElement("script");
script.src = scriptMaps;
document.body.appendChild(script);
root.render(<App />);
