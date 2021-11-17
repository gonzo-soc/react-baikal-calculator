import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from 'mobx-react';

import ShippingContext from "@/store/ShippingContext";
import { getCityList } from "@/store/data/CityListData";
import { getCurrencyList } from "@/store/data/CurrencyListData";
import { getCurrencyRate } from "@/store/data/CurrencyListData";

import "./OptionBar.scss";

import DataList from "@/component/common/DataList/DataList";
import rightArrowIcon from "@/styles/images/icons/common/right_arrow.svg";

const OptionBar = observer(() => {
  const store = useContext(ShippingContext);
  const navigate = useNavigate();
  const [isFromValid, setIsFromValid] = useState(true);
  const [isToValid, setIsToValid] = useState(true);
  const [isCurrencyValid, setIsCurrencyValid] = useState(true);

  const optionBarState = store.getOptionBarUIState;

  const attributeNameDict = {
    from: 'Откуда',
    to: 'Куда',
    currency: 'Валюта',
  };
  const attributeChangeCallback = (name, value) => {
    switch (name) {
      case attributeNameDict['from']:
        optionBarState.setFrom = value;
        break;

      case attributeNameDict['to']:
        optionBarState.setTo = value;
        break;

      case attributeNameDict['currency']:
        optionBarState.setCurrency = value;
        break;

      default:
        console.warn("OptionBar [attributeChangeCallback] Unknown attribute name [ " + name + " ]");
        break;
    }
  }

  const attributeChangeDispatcher = (name, value) => { attributeChangeCallback(name, value); }
  const fromChangeDispatcher = (value) => attributeChangeDispatcher(attributeNameDict['from'], value);
  const toChangeDispatcher = (value) => attributeChangeDispatcher(attributeNameDict['to'], value);
  const currencyChangeDispatcher = (value) => attributeChangeDispatcher(attributeNameDict['currency'], value);

  const validateFrom = () => {
    if (!optionBarState.from || !optionBarState.from['title'] || optionBarState.from['title'] === optionBarState.to['title']) {
      setIsFromValid(false);
      return false;
    } else {
      setIsFromValid(true);
    }
    return true;
  }
  const validateTo = () => {
    if (!optionBarState.to || !optionBarState.to['title'] || optionBarState.to['title'] === optionBarState.from['title']) {
      setIsToValid(false);
      return false;
    } else {
      setIsToValid(true);
    }
    return true;
  }
  const validateCurrency = () => {
    if (!optionBarState.currency || !optionBarState.currency['title']) {
      setIsCurrencyValid(false);
      return false;
    } else {
      setIsCurrencyValid(true);
    }
    return true;
  }

  const validate = () => {
    const isFromValid = validateFrom();
    const isToValid = validateTo();
    const isCurrencyValid = validateCurrency();
    return isFromValid && isToValid && isCurrencyValid;
  };

  const handleNextButtonClick = () => {
    if (validate()) {
      navigate("/composer");
    }
  };

  return (
    <div className="baikal_option_bar">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 px-0">
            <DataList label={attributeNameDict['from']} dictItemList={getCityList()} selectedItem={optionBarState.from} attributeChangeDispatcher={fromChangeDispatcher} isValid={isFromValid} />
          </div>
          <div className="col-md-2 px-0">
            <DataList label={attributeNameDict['to']} dictItemList={getCityList()} selectedItem={optionBarState.to} attributeChangeDispatcher={toChangeDispatcher} isValid={isToValid} />
          </div>
          <div className="col-md-2 px-0">
            <DataList label={attributeNameDict['currency']} dictItemList={getCurrencyList()} selectedItem={optionBarState.currency} attributeChangeDispatcher={currencyChangeDispatcher} isValid={isCurrencyValid} />
          </div>
          <div className="col-md-2 px-0">
            <div className="baikal_option__bar__rate">
              <label htmlFor="" className="baikal_option_bar__rate__label">
                Курс
                            </label>
              <input name="baikal_dl__input" className="baikal_option_bar__rate__input" type="text" value={getCurrencyRate(optionBarState.currency)} disabled />
            </div>
          </div>

          <div className="col-md-3 px-0">
            <div className="baikal_option_bar__control">
              <button className="baikal_option_bar__control__btn" onClick={() => handleNextButtonClick()}>
                <div className="baikal_option_bar__control__btn__text">
                  <span>Далее</span>
                  <img src={rightArrowIcon} alt="Right arrow" className="baikal_option_bar__control__btn__text__right_arrow" />
                </div>

              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})

export default OptionBar;