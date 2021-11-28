import React from 'react';
import className from "classnames";

import "./MobileMenu.scss";
import Button from "@/component/common/Button/Button";
import instagramIcoSVG from "@/styles/images/icons/common/social-net/instagram_ico.svg";
import whatsappIcoSVG from "@/styles/images/icons/common/social-net/whatsapp_ico.svg";
import facebookIcoSVG from "@/styles/images/icons/common/social-net/facebook_ico.svg";
import wechatIcoSVG from "@/styles/images/icons/common/social-net/wechat_ico.svg";

export default function MobileMenu(props) {
  const { isActive } = props;
  const mobileMenuWrapperClassname = className('baikal_mobile_menu', { 'is_active': isActive });

  return (<div className={mobileMenuWrapperClassname}>
    <main className="baikal_mobile_menu__content">
      <h2 className="baikal_mobile_menu__content__email">asia@baikalvl.ru</h2>
      <h2 className="baikal_mobile_menu__content__phone">8 800 201-87-77</h2>
      <Button
        onClickHandler={() => { console.info("MobileMenu ContactButton [onClickHandler]") }}
        onClickHandlerArg={{}}
        additionClassname="baikal_mobile_menu__content__contact_btn">
        <span className="baikal_mobile_menu__content__contact_btn__label">Связаться</span>
      </Button>
    </main>
    <footer className="baikal_mobile_menu__footer">
      <h2 className="baikal_mobile_menu__footer__header">Мы в соц. сетях:</h2>
      <div className="baikal_mobile_menu__footer__social_net">
        <img src={instagramIcoSVG} alt="" className="baikal_mobile_menu__footer__social_net__ico" />
        <img src={whatsappIcoSVG} alt="" className="baikal_mobile_menu__footer__social_net__ico" />
        <img src={facebookIcoSVG} alt="" className="baikal_mobile_menu__footer__social_net__ico" />
        <img src={wechatIcoSVG} alt="" className="baikal_mobile_menu__footer__social_net__ico" />
      </div>
    </footer>
  </div>);
}