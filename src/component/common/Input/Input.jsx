import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import './Input.scss';

export default function Input({
  id, className, label, error, onChangeHandler, value, isFocus, ...attrs
}) {
  const classes = classNames(
    'baikal_input__input',
    className,
    { error },
  );

  const [inputState, setInputState] = useState({
    id: id ? id : _.uniqueId("baikal_dl__input__"),
    isFocus,
  })

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputState['isFocus']) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="baikal_input">
      {label
        &&
        <div className="baikal_input__label_wrapper">
          <label className="baikal_input__label_wrapper__label" htmlFor={inputState['id']}>{label}</label>
          {attrs.required
            && <span className="baikal_input__label_wrapper__required">*</span>
          }
        </div>
      }
      <input
        ref={inputRef}
        name={inputState['id']}
        id={inputState['id']}
        className={classes}
        onChange={onChangeHandler}
        value={value}
        {...attrs}
      />
      {error
        && <span className="baikal_input__input_error">{error}</span>
      }
    </div>
  );
};
