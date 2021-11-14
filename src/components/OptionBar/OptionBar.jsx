import React, { useContext } from "react";
import { observer } from 'mobx-react';

import { getCityList } from "../../stores/CityListData";
import { getCurrencyList } from "../../stores/CurrencyListData";
import { getCurrencyRate } from "../../stores/CurrencyListData";

import "./OptionBar.scss";

import DataList from "../DataList/DataList";
import ShippingContext from "../../stores/ShippingContext";
import rightArrowIcon from "../../styles/images/icons/common/right_arrow.svg";

const OptionBar = observer(() => {
    const store = useContext(ShippingContext);
    const optionBarState = store.getOptionBarUIState;

    const attributeNameDict = {
        from: 'Откуда',
        to: 'Куда',
        currency: 'Валюта',
    };
    const attributeChangeCallback = (name, value) => {
        switch (name) {
            case attributeNameDict['from']:
                optionBarState.from = value;
                break;

            case attributeNameDict['to']:
                optionBarState.to = value;
                break;

            case attributeNameDict['currency']:
                optionBarState.currency = value;
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

    return (
        <div className="baikal_option_bar">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 px-0">
                        <DataList label={attributeNameDict['from']} dictItemList={getCityList()} selectedItem={optionBarState.from} attributeChangeDispatcher={fromChangeDispatcher} />
                    </div>
                    <div className="col-md-2 px-0">
                        <DataList label={attributeNameDict['to']} dictItemList={getCityList()} selectedItem={optionBarState.to}  attributeChangeDispatcher={toChangeDispatcher}/>
                    </div>
                    <div className="col-md-2 px-0">
                        <DataList label={attributeNameDict['currency']} dictItemList={getCurrencyList()}  selectedItem={optionBarState.currency}  attributeChangeDispatcher={currencyChangeDispatcher}/>
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
                            <button className="baikal_option_bar__control__btn">
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