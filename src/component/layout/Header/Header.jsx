import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import "./Header.scss";
import baikalLogo from "@/styles/images/icons/header/baikal-icon@2x.svg";
import MobileMenu from "@/component/layout/MobileMenu/MobileMenu.jsx"
import classNames from 'classnames';

export default function Header(props) {
  const { onClickMobileMenuHandler } = props;
  const [isMobileMenuOpenned, setIsMobileMenuOpenned] = useState(false);

  const location = useLocation();
  const isShipComposerUrlActive = () => {
    const homeFilterPage = /^(\/)$|^(\/composer)$/g;
    if (homeFilterPage.test(location.pathname)) {
      console.log('Location changed: home page');
      return true;
    } else {
      return false;
    }
  }

  const headerClassname = classNames("header", { 'header_if_mobile_menu_active': isMobileMenuOpenned });
  const hamburgerClassname = classNames("hamburger", { 'hamburger_is_active': isMobileMenuOpenned });
  const logoClassname = classNames("header_logo", { 'if_path_ship_composer': isShipComposerUrlActive });

  return (
    <header className={headerClassname}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <img src={baikalLogo} alt="Baikal ico" className={logoClassname} />
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
          onClickMobileMenuHandler();
        }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <MobileMenu isActive={isMobileMenuOpenned} />
    </header>
  );
}