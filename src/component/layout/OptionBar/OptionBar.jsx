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
import Button from "@/component/common/Button/Button";
import Tooltip from "@/component/common/Tooltip/Tooltip";

const OptionBar = observer(() => {
  const store = useContext(ShippingContext);
  const optionBarState = store.getOptionBarUIState;
  const attributeNameDict = optionBarState.getAttributeNameDict;

  const navigate = useNavigate();
  const [isFromInvalid, setIsFromInvalid] = useState(false);
  const [isToInvalid, setIsToInvalid] = useState(false);
  const [isCurrencyInvalid, setIsCurrencyInvalid] = useState(false);

  const validateFrom = () => {
    setIsFromInvalid(optionBarState.isFromInvalid)
    return !optionBarState.isFromInvalid;
  }
  const validateTo = () => {
    setIsToInvalid(optionBarState.isToInvalid)
    return !optionBarState.isToInvalid;
  }
  const validateCurrency = () => {
    setIsCurrencyInvalid(optionBarState.isCurrencyInvalid)
    return !optionBarState.isCurrencyInvalid;
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
          <div className="col-sm-11 col-md-9 px-0 m-sm-auto">
            <Tooltip content="Для начала заполните поля выше" position="bottom">
              <section className="baikal_option_bar__input_panel d-flex flex-wrap">
                <div className="col-12 col-sm-6 col-md-3 px-md-0">
                  <DataList label={attributeNameDict['from']}
                    dictItemList={getCityList()}
                    selectedItem={optionBarState.from}
                    attributeChangeHandler={(value) => {
                      debugger;
                      optionBarState.setFrom = value
                    }}
                    isInvalid={isFromInvalid} />
                </div>
                <div className="col-12 col-sm-6 col-md-3 px-md-0">
                  <DataList label={attributeNameDict['to']}
                    dictItemList={getCityList()}
                    selectedItem={optionBarState.to}
                    attributeChangeHandler={(value) => { optionBarState.setTo = value }}
                    isInvalid={isToInvalid} />
                </div>
                <div className="col-12 col-sm-6 col-md-3 px-md-0">
                  <DataList label={attributeNameDict['currency']}
                    dictItemList={getCurrencyList()}
                    selectedItem={optionBarState.currency}
                    attributeChangeHandler={(value) => { optionBarState.setCurrency = value }}
                    isInvalid={isCurrencyInvalid} />
                </div>
                <div className="col-12 col-sm-6 col-md-3 px-md-0">
                  <div className="baikal_option_bar__rate">
                    <label htmlFor="" className="baikal_option_bar__rate__label">
                      Курс
                            </label>
                    <input name="baikal_dl__input" className="baikal_option_bar__rate__input" type="text" value={getCurrencyRate(optionBarState.currency)} disabled />
                  </div>
                </div>
              </section>
            </Tooltip>
          </div>
          <div className="col-sm-11 col-md-3 px-0 d-flex flex-column justify-content-end">

            <div className="baikal_option_bar__control">
              <Tooltip content='Теперь нажмите на кнопку "Далее"'
                additionWrapperClassname="w-full"
                additionTargetClassname="m-sm-auto"
                position="top">
                <Button
                  onClickHandle={() => handleNextButtonClick()}
                  additionClassname="baikal_option_bar__control__btn">
                  <div className="baikal_option_bar__control__btn__text">
                    <span>Далее</span>
                    <img src={rightArrowIcon} alt="Right arrow" className="baikal_option_bar__control__btn__text__right_arrow is_right_move" />
                  </div>
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})

export default OptionBar;