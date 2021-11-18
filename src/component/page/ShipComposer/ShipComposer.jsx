import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react';

import "./ShipComposer.scss";

import ShippingContext from "@/store/ShippingContext";
import { getCoucheDictData } from "@/store/data/CoucheDictData";
import { findCoucheDictItem } from "@/store/data/CoucheDictData";

import SearchBar from "@/component/common/SearchBar/SearchBar";
import CouchePreview from "@/component/layout/CouchePreview/CouchePreview";
import CoucheEditor from "@/component/layout/CoucheEditor/CoucheEditor";


const ShipComposer = observer(() => {

  // const store = useContext(ShippingContext);

  const [couchePreviewList, setCouchePreviewList] = useState(getCoucheDictData());
  const [selectedCouchePreview, setSelectedCouchePreview] = useState(null);

  const selectCouchePreviewHandle = ({ id }) => {
    const coucheDictItem = findCoucheDictItem(id);
    if (coucheDictItem) {
      setSelectedCouchePreview(coucheDictItem);
    } else {
      console.warn("ShipComposer [selectCouchePreview] Could find any couche dict item with the id = [ " + id + " ]");
    }
  }

  const getCouchePreviewList = () => {
    return getCoucheDictData().map(
      (couchePreview) =>
        <CouchePreview key={couchePreview['id'] + '_' + couchePreview['title']}
          id={couchePreview['id']} icon={couchePreview['icon']}
          title={couchePreview['title']}
          selectCouchePreviewCallback={selectCouchePreviewHandle} isControl={true} />
    );
  };

  const getCoucheEditItem = () => {
    if (selectedCouchePreview === null) {
      return (<span className="ship_composer__body__content__editor_wrapper__editor__placeholder">
        Вы не выбрали пока ни одного элемента.</span>);
    } else {
      return (<CoucheEditor id={selectedCouchePreview['id']}/>);
    }
  };

  const getFilteredCouchePreviewList = (searchCriteria) => {
    return getCoucheDictData().filter((couche) => {
      const searchCriteriaRegExp = new RegExp('^(' + searchCriteria + '.*)$', 'gi');
      return couche.title.match(searchCriteriaRegExp) !== null;
    })
  }

  return (
    <div className="ship_composer baikal_main_content">
      <header className="ship_composer__header">
        <div className="ship_composer__header__container">
          <h2 className="ship_composer__header__container__title">
            Выберите мебель, которую нужно перевезти
                </h2>
          <h2 className="ship_composer__header__container__title">
            Затем заполните следующие поля выбранного элемента:
                </h2>
        </div>
      </header>
      <main className="ship_composer__body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 pl-0">
              <section className="ship_composer__body__search_bar">
                <SearchBar searchCriteriaChangeDispatcher={
                  (searchCriteria) => {
                    setCouchePreviewList(getFilteredCouchePreviewList(searchCriteria))
                  }
                } />
                <div className="ship_composer__body__content__couche_preview_list">
                  <div className="ship_composer__body__content__couche_preview_list__wrapper">
                    {getCouchePreviewList()}
                  </div>
                </div>
              </section>
            </div>
            <div className="col-md-6 ship_composer__body__content__editor_wrapper">
              <div className="ship_composer__body__content__editor_wrapper__editor">
                {getCoucheEditItem()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});

export default ShipComposer;