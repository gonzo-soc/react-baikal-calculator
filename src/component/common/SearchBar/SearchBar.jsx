import React, { useState } from 'react';

import Button from "@/component/common/Button/Button";

import "./SearchBar.scss";

export default function SearchBar(props) {
  const { searchCriteriaSubmitHandler } = props;
  const [searchCriteria, setSearchCriteria] = useState('');

  return (
    <div className="baikal_search_bar">
      <input name="baikal_search_bar__input" className="baikal_search_bar__input" type="text" placeholder="Введите название" value={searchCriteria} onChange={
        (event) => {
          setSearchCriteria(event.target.value);
        }
      } />
      <div className="col-md-3 px-0 mobile_is_hidden">
        <div className="baikal_search_bar__control">
          <Button
            onClickHandle={
              () => {
                searchCriteriaSubmitHandler(searchCriteria);
              }
            }
            additionClassname="baikal_search_bar__control__btn">
            <span className="baikal_search_bar__control__btn__text">Поиск</span>
          </Button>
        </div>
      </div>
    </div>
  );
}