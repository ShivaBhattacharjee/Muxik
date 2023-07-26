import React from "react";
import { BrowserRouter } from "react-router-dom";
import AnimateRoutes from "./Routes";
import { SideNav, RightSideMenu, TopNav } from "./components";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <BrowserRouter>
    <Toaster />
      <TopNav />
      <SideNav />
      <AnimateRoutes />
      <RightSideMenu />
    </BrowserRouter>
  );
}

export default App;
