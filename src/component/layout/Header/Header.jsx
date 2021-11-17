import React from 'react';

import "./Header.scss";
import baikalLogo from "@/styles/images/icons/header/baikal-icon@2x.svg";

export default function Header() {
    return (
      <header className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <img src={baikalLogo} alt="Baikal ico" className="header__logo"/>
            </div>

            <div className="col-md-2 offset-md-8">
              <button className="header__contact_btn">Связаться</button>
            </div>
          </div>
        </div>
      </header>  
    );
}