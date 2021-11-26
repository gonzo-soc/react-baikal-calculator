import React from 'react';

import "./CouchePreview.scss";
import Button from "@/component/common/Button/Button";
import classNames from "classnames";

export default function CouchePreview(props) {
  const { id, title, icon, selectCouchePreviewCallback, isControl } = props;
  const couchePreviewClassname = classNames('couche_preview', { 'noncontrol_mode': !isControl });
  const iconClassname = classNames('couche_preview__wrapper__icon', { 'noncontrol_mode_icon': !isControl });
  const titleClassname = classNames('couche_preview__wrapper__title', { 'noncontrol_mode_title': !isControl });

  return (<div className={couchePreviewClassname}>
    <div className="container couche_preview__wrapper">
      <div className="row">
        <div className={isControl ? 'col-3 col-md-3 col-lg-4 pl-md-0' : 'col-5 col-md-4 col-lg-5 pl-0'}>
          <img src={icon} alt={`Icon for couche ${title}`} className={iconClassname} />
        </div>
        <div className={isControl ?
          'col-5 col-md-5 col-lg-4 d-flex flex-column justify-content-center align-items-center' :
          'col-7 col-md-6 col-lg-6 d-flex flex-column justify-content-center align-items-center'}>
          <span className={titleClassname}>
            {title}
          </span>
        </div>
        {
          isControl ?
            <div className="col-4 col-md-4 col-lg-4 d-flex flex-column justify-content-center align-items-center">
              <Button
                onClickHandle={selectCouchePreviewCallback}
                onClickHandleArg={{ id }}
                additionClassname="couche_preview__wrapper__btn">
                <span className="couche_preview__wrapper__btn_label">Выбрать</span>
              </Button>
            </div> : ''
        }
      </div>
    </div>
  </div>);
}