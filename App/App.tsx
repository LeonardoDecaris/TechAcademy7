import React from "react";
import "./src/css/global.css"
import Routes from "./src/navigation/Routes";

import { AuthProvider } from "./src/context/AuthContext";
export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
