import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import "./Tooltip.scss";
import upArrowSvgIcon from "@/styles/images/icons/tooltip/up_arrow.svg";
import rightArrowSvgIcon from "@/styles/images/icons/tooltip/right_arrow.svg";
import leftArrowSvgIcon from "@/styles/images/icons/tooltip/left_arrow.svg";
import downArrowSvgIcon from "@/styles/images/icons/tooltip/down_arrow.svg";
import redCrossSvgIcon from "@/styles/images/icons/tooltip/red_cross.svg";

export default function Tooltip(props) {
  const { children, content, style, position, isMouseControl,
    additionWrapperClassname, additionContentClassname, additionContentTextClassname,
    additionTargetClassname } = props;
  const [visible, setVisibility] = useState(true);

  const autoHide = () => {
    setTimeout(() => {
      hide();
    }, 3000);
  }

  const show = () => {
    setVisibility(true);
  }

  const hide = () => {
    setVisibility(false);
  }

  const isUpPosition = () => {
    return position === 'top';
  }

  const isRightPosition = () => {
    return position === 'right';
  }

  const isLeftPosition = () => {
    return position === 'left';
  }

  const isBottomPosition = () => {
    return position === 'bottom';
  }

  const wrapperClassname = classNames(
    'baikal_tooltip',
    additionWrapperClassname
  );

  const contentClasses = classNames(
    'baikal_tooltip__content_box',
    position,
    additionContentClassname,
  );

  const contentViewClasses = classNames(
    'baikal_tooltip__content_box__view',
    additionContentTextClassname,
  );

  const targetClasses = classNames(
    'baikal_tooltip__target',
    additionTargetClassname,
  );

  return (
    <div className={wrapperClassname}>
      { visible &&
        <div style={style} className={contentClasses}>
          <div className={contentViewClasses}>
            {isRightPosition() &&
              <span className="baikal_tooltip__content_box__view__arrow_box">
                <img src={leftArrowSvgIcon} alt="Tooltip: Left Arrow ico" className="baikal_tooltip__content_box__view__arrow_box__arrow left_arrow" />
              </span>}
            <span className="baikal_tooltip__content_box__view__text">{content}</span>
            <span className="baikal_tooltip__content_box__view__arrow_box">
              {isLeftPosition() && <img src={rightArrowSvgIcon} alt="Tooltip: Right Arrow ico" className="baikal_tooltip__content_box__view__arrow_box__arrow right_arrow" />}
              {isBottomPosition() && <img src={upArrowSvgIcon} alt="Tooltip: Up Arrow ico" className="baikal_tooltip__content_box__view__arrow_box__arrow up_arrow" />}
              {isUpPosition() && <img src={downArrowSvgIcon} alt="Tooltip: Down Arrow ico" className="baikal_tooltip__content_box__view__arrow_box__arrow down_arrow" />}
            </span>
          </div>
          <img src={redCrossSvgIcon} alt="Tooltip: Close the tip ico" onClick={hide} className="baikal_tooltip__content_box__cross" />
        </div>
      }
      <div
        className={targetClasses}
        onMouseEnter={() => { isMouseControl && show() }}
      >{children}</div>
    </div>
  );
}
