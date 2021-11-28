import React from 'react';

import "./Counter.scss";
import classNames from 'classnames';

export default function BaikalCounter(props) {
  const { label, count, isValid, onChangeHandler } = props;
  const countClassname = classNames("baikal_counter__panel__score control_box", { 'is_baikal_invalid_input': !isValid });

  return (
    <div className="baikal_counter">
      <header className="baikal_counter__label">{label}</header>
      <div className="container-fluid pl-0">
        <div className="row">
          <div className="col-md-8 col-lg-6">
            <main className="baikal_counter__panel">
              <div className="baikal_counter__panel__minus control_box" onClick={() => onChangeHandler(count > 0 ? count - 1 : count)}></div>
              <div className={countClassname}>{count}</div>
              <div className="baikal_counter__panel__plus control_box" onClick={() => onChangeHandler(count + 1)}></div>
            </main>
          </div>
        </div>

      </div>
    </div>
  );
}