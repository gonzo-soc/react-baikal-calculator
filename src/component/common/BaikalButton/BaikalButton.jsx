import React from 'react';

import "./BaikalButton.scss";

export default function BiakalButton(props) {
  const { label, parentComponentClickHandle, parentCallbackArgument, additionStyleClassList } = props;
  let btnStyleClasses = "baikal_btn_component__btn";
  let labelStyleClassses = "baikal_btn_component__label";

  if (additionStyleClassList) {
    if (additionStyleClassList['btn']) {
      btnStyleClasses += ` ${additionStyleClassList['btn']}`;
    }
    if (additionStyleClassList['label']) {
      labelStyleClassses += ` ${additionStyleClassList['label']}`;
    }
  }

  return (<div className="baikal_btn_component">
    <button className={btnStyleClasses} onClick={
      () => {
        parentComponentClickHandle(parentCallbackArgument);
      }
    }>
      <span className={labelStyleClassses}>
        {label}
      </span>
    </button>
  </div>);
}