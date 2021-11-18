import React from 'react';

import "./CouchePreview.scss";
import BaikalButton from "@/component/common/BaikalButton/BaikalButton";

export default function CouchePreview(props) {
  const { id, title, icon, selectCouchePreviewCallback, isControl } = props;

  const btnAdditionStyleClassList = {
    'btn': 'couche_preview__btn',
    'label': 'couche_preview__btn_label',
  }

  return (<div className="couche_preview">
    <div className="container">
      <div className="row">
        <div className={isControl ? 'col-md-4 pl-0' : 'col-md-5 pl-0'}>
          <img src={icon} alt={`Icon for couche ${title}`} className="couche_preview__icon" />
        </div>
        <div className={isControl ?
          'col-md-4 couche_preview__title_wrapper' :
          'col-md-6 couche_preview__title_wrapper'}>
          <span className="couche_preview__title_wrapper__title">
            {title}
          </span>
        </div>
        {
          isControl ?
            <div className="col-md-4">
              <BaikalButton label="Выбрать"
                parentComponentClickHandle={selectCouchePreviewCallback}
                parentCallbackArgument={{ id }}
                additionStyleClassList={btnAdditionStyleClassList} />
            </div> : ''
        }
      </div>
    </div>
  </div>);
}