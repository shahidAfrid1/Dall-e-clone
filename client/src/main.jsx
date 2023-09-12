import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// export const server = "https://dall-e-clone-ag43.onrender.com/api/v1";
export const server = "http://localhost:3000/api/v1";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
