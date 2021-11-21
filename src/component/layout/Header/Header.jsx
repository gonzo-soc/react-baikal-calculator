import React, { useState } from 'react';

import "./Header.scss";
import baikalLogo from "@/styles/images/icons/header/baikal-icon@2x.svg";
import MobileMenu from "@/component/layout/MobileMenu/MobileMenu.jsx"
import classNames from 'classnames';

export default function Header() {
  const [isMobileMenuOpenned, setIsMobileMenuOpenned] = useState(false);

  const headerClassname = classNames("header", { 'header_if_mobile_menu_active': isMobileMenuOpenned });
  const hamburgerClassname = classNames("hamburger", { 'hamburger_is_active': isMobileMenuOpenned });

  return (
    <header className={headerClassname}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <img src={baikalLogo} alt="Baikal ico" className="header__logo" />
          </div>

          <div className="col-md-3 offset-md-6 offset-lg-7">
            <button className="header__contact_btn">Связаться</button>
          </div>
        </div>
      </div>
      <div
        className={hamburgerClassname}
        onClick={() => {
          setIsMobileMenuOpenned(!isMobileMenuOpenned)
        }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <MobileMenu isActive={isMobileMenuOpenned} />
    </header>
  );
}