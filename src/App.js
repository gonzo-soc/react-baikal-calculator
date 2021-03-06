import React, {
  useState,
} from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "@/component/page/Home/Home";
import ShipComposer from "@/component/page/ShipComposer/ShipComposer";
import Layout from "@/component/layout/Layout";
import Header from "@/component/layout/Header/Header";
import ContextShippingStore from "@/store/ContextShippingStore";

function App() {
  const [isMobileMenuOpenned, setIsMobileMenuOpenned] = useState(false);
  return (
    <div className="app">
      <ContextShippingStore>
        <Header onClickMobileMenuHandler={(isMobileMenuOpenned) => {
          setIsMobileMenuOpenned(isMobileMenuOpenned);
        }} />
        {!isMobileMenuOpenned &&
          <Routes>
            <Route path="/" elmenent={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/composer" element={<ShipComposer />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        }
      </ContextShippingStore>
    </div>
  );
}

export default App;
