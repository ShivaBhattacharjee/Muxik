import React from "react";
import { BrowserRouter } from "react-router-dom";
import AnimateRoutes from "./Routes";
import { SideNav, RightSideMenu, TopNav } from "./components";

function App() {
  return (
    <BrowserRouter>
      {/* <div className="grid grid-cols-[max-content,auto,max-content]"> */}
      <TopNav />
      <SideNav />
      <AnimateRoutes />
      <RightSideMenu />
    </BrowserRouter>
  );
}

export default App;
