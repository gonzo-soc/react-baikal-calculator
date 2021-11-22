import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react';

import "./ShipComposer.scss";

import ShippingContext from "@/store/ShippingContext";
import { getCoucheDictData } from "@/store/data/CoucheDictData";
import { findCoucheDictItem } from "@/store/data/CoucheDictData";

import SearchBar from "@/component/common/SearchBar/SearchBar";
import CouchePreview from "@/component/layout/CouchePreview/CouchePreview";
import CoucheEditor from "@/component/layout/CoucheEditor/CoucheEditor";
import backArrowSvgIco from "@/styles/images/icons/ship_composer/back_arrow.svg";


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
      return (<span className="ship_composer__editor__content__placeholder">
        Вы не выбрали пока ни одного элемента.</span>);
    } else {
      return (<CoucheEditor id={selectedCouchePreview['id']} />);
    }
  };

  const getFilteredCouchePreviewList = (searchCriteria) => {
    return getCoucheDictData().filter((couche) => {
      const searchCriteriaRegExp = new RegExp('^(' + searchCriteria + '.*)$', 'gi');
      return couche.title.match(searchCriteriaRegExp) !== null;
    })
  }

  return (
    <main className="ship_composer baikal_main_content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-7 col-lg-6 pl-md-0">
            <section className="ship_composer__search_bar">
              <h2 className="ship_composer__search_bar__header mobile_is_hidden">
                Выберите мебель, которую нужно перевезти
              </h2>
              <div className="ship_composer__search_bar__control">
                <img src={backArrowSvgIco} alt="Ship composer: back arrow icon" className="ship_composer__search_bar__control__back_arrow_ico" />
                <SearchBar searchCriteriaSubmitHandler={
                  (searchCriteria) => {
                    setCouchePreviewList(getFilteredCouchePreviewList(searchCriteria))
                  }
                } />
              </div>
              <div className="ship_composer__search_bar__result_wrapper">
                <div className="ship_composer__search_bar__result_wrapper__result">
                  {getCouchePreviewList()}
                </div>
              </div>
            </section>
          </div>
          <div className="col-12 col-md-5 col-lg-6">
            <section className="ship_composer__editor">
              <h2 className="ship_composer__editor__header">
                Затем заполните следующие <br />поля выбранного элемента:
              </h2>
              <div className="ship_composer__editor__content">
                {getCoucheEditItem()}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
});

export default ShipComposer;