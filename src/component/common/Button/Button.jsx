import React from 'react';

import "./Button.scss";
import classNames from 'classnames';

export default function BiakalButton(props) {
  const { children, onClickHandler, onClickHandlerArg, additionClassname, ...attrs } = props;
  const classes = classNames(
    'baikal_btn',
    additionClassname,
  );

  const onSubmitHandler = (event) => {
    if (event.charCode === 13) {
      this.props.onClickHandler(onClickHandlerArg);
    }
  }

  return (
    <button {...attrs} className={classes} onClick={
      () => {
        onClickHandler(onClickHandlerArg);
      }
    }
      onKeyPress={onSubmitHandler}
    >
      {children}
    </button>);
}