import React from 'react';
import classNames from 'classnames';
import './Input.scss';

export default function Input({
  id, className, label, error, onChangeHandler, value, ...attrs
}) {
  const classes = classNames(
    'baikal_input__input',
    className,
    { error },
  );

  return (
    <div className="baikal_input">
      {label
        &&
        <div className="baikal_input__label_wrapper">
          <label className="baikal_input__label_wrapper__label" htmlFor={id}>{label}</label>
          {attrs.required
            && <span className="baikal_input__label_wrapper__required">*</span>
          }
        </div>
      }
      <input
        name={id}
        id={id}
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
