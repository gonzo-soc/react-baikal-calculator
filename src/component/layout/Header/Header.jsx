import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import classNames from 'classnames';

import "./Header.scss";
import baikalLogo from "@/styles/images/icons/header/baikal-icon@2x.svg";
import MobileMenu from "@/component/layout/MobileMenu/MobileMenu.jsx"
import OptionEditor from "@/component/layout/OptionEditor/OptionEditor.jsx"
import Utility from "@/helper/utility.js";

export default function Header(props) {
  const { onClickMobileMenuHandler } = props;
  const [isMobileMenuOpenned, setIsMobileMenuOpenned] = useState(false);

  // We have to use the reference to store mutable state and get it from the lisetener.
  // see @link https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
  const windowSizeRef = useRef(Utility.getWindowSize());
  const orinetationChangeHandler = () => {
    const newWindowSize = Utility.getWindowSize();
    if (newWindowSize['wWidth'] !== windowSizeRef.current['wWidth']) {
      setIsMobileMenuOpenned(false);
      onClickMobileMenuHandler(false);
      windowSizeRef.current = newWindowSize;
    }
  }

  useEffect(() => {
    const eventType = Utility.getOrientationChangeEventName();
    if (eventType === 'change') {
      window.screen.orientation.addEventListener(eventType, orinetationChangeHandler, false);
    } else {
      window.addEventListener(eventType, orinetationChangeHandler, false);
    }

    return function cleanUp() {
      if (eventType === 'change') {
        window.screen.orientation.removeEventListener(orinetationChangeHandler);
      } else {
        window.removeEventListener(orinetationChangeHandler);
      }
    }
  }, []);

  const location = useLocation();
  const isShipComposerUrlActive = () => {
    const shipComposerFilter = /^(.*\/composer)$/g;
    if (shipComposerFilter.test(location.pathname)) {
      console.log('Location changed: home page');
      return true;
    } else {
      return false;
    }
  }

  const headerClassname = classNames("header", { 'header_if_mobile_menu_active': isMobileMenuOpenned });
  const hamburgerClassname = classNames("hamburger", { 'hamburger_is_active': isMobileMenuOpenned });
  const logoClassname = classNames("header__logo", { 'if_path_ship_composer': isShipComposerUrlActive });
  const contactBtnBoxClassname = classNames("d-flex flex-column justify-content-center", { "offset-md-1 ": isShipComposerUrlActive() },
    { "offset-md-8": !isShipComposerUrlActive() });

  return (
    <header className={headerClassname}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Link to="/">
              <img src={baikalLogo} alt="Baikal ico" className={logoClassname} />
            </Link>
          </div>

          {isShipComposerUrlActive() &&
            <div className="col-md-7 md_flex_mobile_hide align-items-center">
              <OptionEditor />
            </div>
          }

          <div className={contactBtnBoxClassname}>
            <button className="header__contact_btn">Связаться</button>
          </div>
        </div>
      </div>
      <div
        className={hamburgerClassname}
        onClick={() => {
          setIsMobileMenuOpenned(!isMobileMenuOpenned);
          onClickMobileMenuHandler(!isMobileMenuOpenned);
        }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <MobileMenu isActive={isMobileMenuOpenned} />
    </header>
  );
}