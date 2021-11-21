import React from 'react';

import "./Button.scss";
import classNames from 'classnames';

export default function BiakalButton(props) {
  const { children, onClickHandle, onClickHandleArg, additionClassname, ...attrs } = props;
  const classes = classNames(
    'baikal_btn',
    additionClassname,
  );

  return (
    <button {...attrs} className={classes} onClick={
      () => {
        onClickHandle(onClickHandleArg);
      }
    }>
      {children}
    </button>);
}