import React from 'react';

import "./CouchePreview.scss";
import Button from "@/component/common/Button/Button";

export default function CouchePreview(props) {
  const { id, title, icon, selectCouchePreviewCallback, isControl } = props;

  return (<div className="couche_preview">
    <div className="container">
      <div className="row">
        <div className={isControl ? 'col-3 col-md-3 col-lg-4 pl-0' : 'col-4 col-md-4 col-lg-5 pl-0'}>
          <img src={icon} alt={`Icon for couche ${title}`} className="couche_preview__icon" />
        </div>
        <div className={isControl ?
          'col-5 col-md-5 col-lg-4 d-flex flex-column justify-content-center align-items-center' :
          'col-5 col-md-6 col-lg-6 d-flex flex-column justify-content-center align-items-center'}>
          <span className="couche_preview__title">
            {title}
          </span>
        </div>
        {
          isControl ?
            <div className="col-4 col-md-4 col-lg-4 d-flex flex-column justify-content-center align-items-center">
              <Button
                onClickHandle={selectCouchePreviewCallback}
                onClickHandleArg={{ id }}
                additionClassname="couche_preview__btn">
                <span className="couche_preview__btn_label">Выбрать</span>
              </Button>
            </div> : ''
        }
      </div>
    </div>
  </div>);
}