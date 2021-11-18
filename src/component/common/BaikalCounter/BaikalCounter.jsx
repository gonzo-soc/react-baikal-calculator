import React, { useState } from 'react';

import "./BaikalCounter.scss";

export default function BaikalCounter(props) {
  const { label, start } = props;
  const [count, setCount] = useState(start);

  return (
    <div className="baikal_counter">
      <header className="baikal_counter__label">{label}</header>
      <div className="container-fluid pl-0">
        <div className="row">
          <div className="col-md-6">
            <main className="baikal_counter__panel">
              <div className="baikal_counter__panel__minus control_box" onClick={() => setCount((count - 1) < 0 ? 0 : (count - 1))}></div>
              <div className="baikal_counter__panel__score control_box">{count}</div>
              <div className="baikal_counter__panel__plus control_box" onClick={() => setCount(count + 1)}></div>
            </main>
          </div>
        </div>

      </div>
    </div>
  );
}