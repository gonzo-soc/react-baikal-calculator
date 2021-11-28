import React, { useState, useRef, useEffect } from 'react';

import Button from "@/component/common/Button/Button";
import Utility from "@/helper/utility";

import "./SearchBar.scss";

export default function SearchBar(props) {
  const { searchCriteriaSubmitHandler, isFocus } = props;
  const [searchCriteria, setSearchCriteria] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFocus) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="baikal_search_bar">
      <input name="baikal_search_bar__input" ref={inputRef} className="baikal_search_bar__input" type="text" placeholder="Введите название" value={searchCriteria} onChange={
        (event) => {
          const newSearchCriteria = event.target.value;
          setSearchCriteria(newSearchCriteria);
          // mediaquery width less or equal to 767px
          if (Utility.isSmViewport()) {
            searchCriteriaSubmitHandler(newSearchCriteria);
          }
        }
      } />
      <div className="col-md-3 px-0 md_block_mobile_hide">
        <div className="baikal_search_bar__control">
          <Button
            onClickHandler={
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