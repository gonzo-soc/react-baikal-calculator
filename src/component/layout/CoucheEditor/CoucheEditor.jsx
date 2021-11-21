import React, { Component, useState } from 'react';

import "./CoucheEditor.scss";

import ShippingContext from "@/store/ShippingContext";
import { findCoucheDictItem } from "@/store/data/CoucheDictData";

import CouchePreview from "@/component/layout/CouchePreview/CouchePreview";
import Counter from "@/component/common/Counter/Counter";
import Button from "@/component/common/Button/Button";

export default function CoucheEditor(props) {
  const { id } = props;
  const coucheDictItem = findCoucheDictItem(id);

  const [count, setCount] = useState(0);
  const [volume, setVolume] = useState(0);
  const [netWeight, setNetWeight] = useState(0);
  const [grossWeight, setGrossWeight] = useState(0);
  const [price, setPrice] = useState(0);

  const resetShippingInfo = () => {
    console.log("CoucheEditor [resetShippingInfo]");
  }

  const addShippingInfo = () => {
    console.log("CoucheEditor [addShippingInfo]");
  }

  if (coucheDictItem) {
    return (
      <div className="couche_editor">
        <div className="couche_editor__preview content_panel_sz">
          <CouchePreview key={coucheDictItem['id'] + '_' + coucheDictItem['title']}
            id={coucheDictItem['id']} icon={coucheDictItem['icon']}
            title={coucheDictItem['title']}
            selectCouchePreviewCallback={null} isControl={false} />
        </div>
        <div className="couche_editor__counter content_panel_sz">
          <Counter start="0" label="Кол-во:" />
        </div>
        <div className="couche_editor__input_panel content_panel_sz">
          <input name="input_volume" className="couche_editor__input_panel__input" type="text" placeholder="Объем, м3" />
          <input name="input_net_weight" className="couche_editor__input_panel__input" type="text" placeholder="Общая масса нетто, кг" />
          <input name="input_net_weight" className="couche_editor__input_panel__input" type="text" placeholder="Общая масса брутто, кг" />
          <input name="input_net_weight" className="couche_editor__input_panel__input" type="text" placeholder="Стоимость одной единицы" />
        </div>
        <div className="couche_editor__btn_panel content_panel_sz">
          <div className="couche_editor__btn_panel__btn_wrapper">
            <Button label="Сбросить"
              onClickHandle={resetShippingInfo}
              onClickHandleArg={{}}
              additionClassname="couche_editor__btn">
              <span className="couche_editor__btn_label">Сбросить</span>
            </Button>
          </div>
          <div className="couche_editor__btn_panel__btn_wrapper">
            <Button label="Добавить"
              onClickHandle={addShippingInfo}
              onClickHandleArg={{}}
              additionClassname="couche_editor__btn">
              <span className="couche_editor__btn_label">Добавить</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
