import React from "react";
import { BrowserRouter } from "react-router-dom";
import AnimateRoutes from "./Routes";
import { SideNav, RightSideMenu, TopNav } from "./components";

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <SideNav />
      <AnimateRoutes />
      <RightSideMenu />
    </BrowserRouter>
  );
}

export default App;
