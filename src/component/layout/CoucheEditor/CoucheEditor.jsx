import React, { Component, useState } from 'react';
import classNames from 'classnames';

import "./CoucheEditor.scss";

import ShippingContext from "@/store/ShippingContext";
import Utility from "@/helper/utility";
import { findCoucheDictItem } from "@/store/data/CoucheDictData";

import CouchePreview from "@/component/layout/CouchePreview/CouchePreview";
import Counter from "@/component/common/Counter/Counter";
import Button from "@/component/common/Button/Button";
import Input from "@/component/common/Input/Input";
import Tooltip from "@/component/common/Tooltip/Tooltip";

export default function CoucheEditor(props) {
  const { id, createShipInfoHandler } = props;
  const coucheDictItem = findCoucheDictItem(id);

  const [shipInfo, setShipInfo] = useState({
    count: '',
    size: '',
    netWeight: '',
    grossWeight: '',
    price: '',
  });

  const [shipInfoValidator, setShipInfoValidator] = useState({
    isCountValid: true,
    isSizeValid: true,
    isNetWeightValid: true,
    isGrossWeightValid: true,
    isPriceValid: true,
  });

  const changeInputHandler = (event) => {
    const { name, value, type, checked } = event.target;
    setShipInfo((prevState) => {
      if (type === "checkbox") {
        return {
          ...prevState,
          [name]: checked,
        }
      } else {
        return {
          ...prevState,
          [name]: value,
        }
      }
    });
  }

  const resetShippingInfo = () => {
    setShipInfo((prevState) => {
      for (let k in prevState) {
        prevState[k] = '';
      }
      return { ...prevState };
    })
  }

  const validate = () => {
    const { count, size, netWeight, grossWeight, price } = shipInfo;
    if (!count) {
      shipInfoValidator['isCountValid'] = false;
    } else {
      shipInfoValidator['isCountValid'] = true;
    }

    if (!size || parseFloat(size) === NaN) {
      shipInfoValidator['isSizeValid'] = false;
    } else {
      shipInfoValidator['isSizeValid'] = true;
    }

    if (!netWeight || parseFloat(netWeight) === NaN) {
      shipInfoValidator['isNetWeightValid'] = false;
    } else {
      shipInfoValidator['isNetWeightValid'] = true;
    }

    if (!grossWeight || parseFloat(grossWeight) === NaN) {
      shipInfoValidator['isGrossWeightValid'] = false;
    } else {
      shipInfoValidator['isGrossWeightValid'] = true;
    }

    if (!price || parseFloat(price) === NaN) {
      shipInfoValidator['isPriceValid'] = false;
    } else {
      shipInfoValidator['isPriceValid'] = true;
    }

    setShipInfoValidator({ ...shipInfoValidator });
    return shipInfoValidator['isCountValid']
      && shipInfoValidator['isSizeValid']
      && shipInfoValidator['isNetWeightValid']
      && shipInfoValidator['isGrossWeightValid']
      && shipInfoValidator['isPriceValid'];
  }

  const addShippingInfo = () => {
    console.log("CoucheEditor [addShippingInfo]");
    debugger;
    if (validate()) {
      // add a new ship info 
      createShipInfoHandler(shipInfo);
    }
  }
  const countInputClassname = classNames(
    'couche_editor__input_panel__input mobile_block_md_hide',
    {
      'is_baikal_invalid_input': !shipInfoValidator['isCountValid']
    }
  );
  const sizeInputClassname = classNames(
    'couche_editor__input_panel__input',
    {
      'is_baikal_invalid_input': !shipInfoValidator['isSizeValid']
    }
  );
  const netWeightInputClassname = classNames(
    'couche_editor__input_panel__input',
    {
      'is_baikal_invalid_input': !shipInfoValidator['isNetWeightValid']
    }
  );
  const grossWeightInputClassname = classNames(
    'couche_editor__input_panel__input',
    {
      'is_baikal_invalid_input': !shipInfoValidator['isGrossWeightValid']
    }
  );
  const priceInputClassname = classNames(
    'couche_editor__input_panel__input',
    {
      'is_baikal_invalid_input': !shipInfoValidator['isPriceValid']
    }
  );

  if (coucheDictItem) {
    return (
      <div className="couche_editor">
        <div className="couche_editor__preview content_panel_sz">
          <CouchePreview key={coucheDictItem['id'] + '_' + coucheDictItem['title']}
            id={coucheDictItem['id']} icon={coucheDictItem['icon']}
            title={coucheDictItem['title']}
            selectCouchePreviewCallback={null} isControl={false} />
        </div>

        <Tooltip content='Теперь заполните поля для этого элемента'
          additionWrapperClassname="w-full"
          position="top">
          <div className="couche_editor__counter content_panel_sz md_block_mobile_hide">
            <Counter count={shipInfo['count'] ? shipInfo['count'] : 0} label="Кол-во:" onChangeHandler={(count) => {
              setShipInfo((prevState) => {
                return {
                  ...prevState,
                  count: count,
                }
              })
            }}
              isValid={shipInfoValidator['isCountValid']}
            />
          </div>
        </Tooltip>
        <div className="couche_editor__input_panel content_panel_sz">
          <Input onChangeHandler={changeInputHandler} value={shipInfo['count']} className={countInputClassname} name="count" type="text" placeholder="Кол-во" isFocus={Utility.isSmViewport()} required />
          <Input onChangeHandler={changeInputHandler} value={shipInfo['size']} className={sizeInputClassname} name="size" type="text" placeholder="Объем, м3" isFocus={!Utility.isSmViewport()} required />
          <Input onChangeHandler={changeInputHandler} value={shipInfo['netWeight']} className={netWeightInputClassname} name="netWeight" type="text" placeholder="Общая масса нетто, кг" required />
          <Input onChangeHandler={changeInputHandler} value={shipInfo['grossWeight']} className={grossWeightInputClassname} name="grossWeight" type="text" placeholder="Общая масса брутто, кг" required />
          <Input onChangeHandler={changeInputHandler} value={shipInfo['price']} className={priceInputClassname} name="price" type="text" placeholder="Стоимость одной единицы" required />
        </div>

        <Tooltip content='Здесь вы можете сбросить параметры и добавить элемент'
          additionWrapperClassname="w-full"
          additionContentClassname="baikal_maxw_reset"
          position="left">
          <div className="couche_editor__btn_panel content_panel_sz">
            <div className="couche_editor__btn_panel__btn_wrapper">
              <Button label="Сбросить"
                onClickHandler={resetShippingInfo}
                onClickHandlerArg={{}}
                additionClassname="couche_editor__btn">
                <span className="couche_editor__btn_label">Сбросить</span>
              </Button>
            </div>
            <div className="couche_editor__btn_panel__btn_wrapper">
              <Button label="Добавить"
                onClickHandler={addShippingInfo}
                onClickHandlerArg={{}}
                additionClassname="couche_editor__btn">
                <span className="couche_editor__btn_label">Добавить</span>
              </Button>
            </div>
          </div>
        </Tooltip>
      </div>
    );
  }
  return null;
}
