import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react';

import DataList from "@/component/common/DataList/DataList";
import ShippingContext from "@/store/ShippingContext";
import { getCityList } from "@/store/data/CityListData";
import { getCurrencyList } from "@/store/data/CurrencyListData";
import { getCurrencyRate } from "@/store/data/CurrencyListData";

import "./OptionEditor.scss";
import checkmarkSvgIco from "@/styles/images/icons/option_editor/checkmark_ico.svg";
import editSvgIco from "@/styles/images/icons/option_editor/edit_ico.svg";
import rightArrowSvgIco from "@/styles/images/icons/option_editor/right_arrow_ico.svg";

const OptionEditor = observer(() => {
  const store = useContext(ShippingContext);
  const optionBarState = store.getOptionBarUIState;

  const [isFromInvalid, setIsFromInvalid] = useState(false);
  const [isToInvalid, setIsToInvalid] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [from, setFrom] = useState(optionBarState.from);
  const [to, setTo] = useState(optionBarState.to);
  const [currency, setCurrency] = useState(optionBarState.currency);

  const getParameterHeader = () => {
    return (
      <span className="baikal_option_editor__review">
        { optionBarState.from['title']}
        <img className="baikal_option_editor__review__right_arrow" src={rightArrowSvgIco}></img>
        {optionBarState.to['title'] +
          ", " + optionBarState.currencySym}
        <img src={editSvgIco} alt="Edit icon" className="baikal_option_editor__review__edit" onClick={editHandler} />
      </span>
    );
  }

  const validateFrom = () => {
    const isValid = from && from !== to;
    setIsFromInvalid(!isValid);
    return isValid;
  }
  const validateTo = () => {
    const isValid = from && from !== to;
    setIsToInvalid(!isValid);
    return isValid;
  }

  const validate = () => {
    const isFromValid = validateFrom();
    const isToValid = validateTo();
    return isFromValid && isToValid;
  };

  const saveChangeHandler = () => {
    if (validate()) {
      optionBarState.setFrom = from;
      optionBarState.setTo = to;
      optionBarState.setCurrency = currency;
      setIsEditing(false);
    }
  }

  const editHandler = () => {
    setIsEditing(true);
  }

  return (
    <div className="baikal_option_editor">
      <div className="row">
        {isEditing
          ?
          <div className="col-md-12 col-lg-10 pr-md-0">
            <div className="row baikal_dl_item_height baikal_option_editor__edit_row">
              <div className="col-md-3 px-md-0">
                <DataList dictItemList={getCityList()}
                  selectedItem={optionBarState.from}
                  attributeChangeHandler={(value) => { setFrom(value) }}
                  isInvalid={isFromInvalid}
                  listItemClass="baikal_dl_item_height"
                  inputClass="baikal_dl_item_height"
                  isFocus={true} />
              </div>
              <div className="col-md-3 px-md-0">
                <DataList dictItemList={getCityList()}
                  selectedItem={optionBarState.to}
                  attributeChangeHandler={(value) => { setTo(value) }}
                  isInvalid={isToInvalid}
                  listItemClass="baikal_dl_item_height"
                  inputClass="baikal_dl_item_height" />
              </div>
              <div className="col-md-3 px-md-0">
                <DataList dictItemList={getCurrencyList()}
                  selectedItem={optionBarState.currency}
                  attributeChangeHandler={(value) => { setCurrency(value) }}
                  listItemClass="baikal_dl_item_height"
                  inputClass="baikal_dl_item_height" />
              </div>
              <div className="col-md-3 px-md-0">
                <div className="baikal_option_editor__edit_row__control_box baikal_dl_item_height">
                  <img src={checkmarkSvgIco} alt="Checkmark icon"
                    onClick={saveChangeHandler}
                    className="baikal_option_editor__edit_row__control_box__checkmark" />
                </div>
              </div>
            </div>
          </div>
          : getParameterHeader()
        }
      </div>
    </div>
  )
});

export default OptionEditor;

