import React, { useState } from 'react';

import "./SearchBar.scss";

export default function SearchBar(props) {
  const { searchCriteriaChangeDispatcher } = props;
  const [searchCriteria, setSearchCriteria] = useState('');

  return (
    <div className="baikal_search_bar">
      <input name="baikal_search_bar__input" className="baikal_search_bar__input" type="text" placeholder="Введите название" value={searchCriteria} onChange={
        (event) => {
          setSearchCriteria(event.target.value);
        }
      } />
      <div className="col-md-3 px-0">
        <div className="baikal_search_bar__control">
          <button className="baikal_search_bar__control__btn" onClick={
            () => {
              searchCriteriaChangeDispatcher(searchCriteria);
            }
          }>
            <span className="baikal_search_bar__control__btn__text">
              Поиск
                        </span>
          </button>
        </div>
      </div>
    </div>
  );
}