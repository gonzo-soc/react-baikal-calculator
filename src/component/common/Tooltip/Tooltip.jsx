import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import './Tooltip.scss';
import upArrowSvgIcon from "@/styles/images/icons/common/up_arrow.svg";
import rightArrowSvgIcon from "@/styles/images/icons/common/right_arrow.svg";
import leftArrowSvgIcon from "@/styles/images/icons/common/left_arrow.svg";
import downArrowSvgIcon from "@/styles/images/icons/common/down_arrow.svg";
import redCrossSvgIcon from "@/styles/images/icons/common/red_cross.svg";

export default function Tooltip(props) {
  const { children, content, style, position,
    additionWrapperClassname,
    additionContentTextClassname, additionTargetClassname } = props;
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

  const classes = classNames(
    'baikal_tooltip__content_box',
    position,
  );

  const contentTextClasses = classNames(
    'baikal_tooltip__content_box__text',
    additionContentTextClassname,
  );

  const targetClasses = classNames(
    'baikal_tooltip__target',
    additionTargetClassname,
  );

  /* Close tip after rendering */
  useEffect(() => {
    autoHide();
  }, []);

  return (
    <div className={wrapperClassname}>
      { visible &&
        <div style={style} className={classes}>
          {isRightPosition() && <img src={leftArrowSvgIcon} alt="Tooltip: Left Arrow ico" />}

          <span className={contentTextClasses}>{content}</span>

          {isLeftPosition() && <img src={rightArrowSvgIcon} alt="Tooltip: Right Arrow ico" />}
          {isBottomPosition() && <img src={upArrowSvgIcon} alt="Tooltip: Up Arrow ico" />}
          {isUpPosition() && <img src={downArrowSvgIcon} alt="Tooltip: Down Arrow ico" />}

          <img src={redCrossSvgIcon} alt="Tooltip: Close the tip ico" onClick={hide} />
        </div>
      }
      <div
        className={targetClasses}
        onMouseEnter={show}
        onMouseLeave={hide}
      >{children}</div>
    </div>
  );
}
