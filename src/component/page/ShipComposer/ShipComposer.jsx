import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react';

import "./ShipComposer.scss";

import ShippingContext from "@/store/ShippingContext";
import { getCoucheDictData } from "@/store/data/CoucheDictData";

import SearchBar from "@/component/common/SearchBar/SearchBar";
import CouchePreview from "@/component/common/CouchePreview/CouchePreview";
import CoucheEditor from "@/component/common/CoucheEditor/CoucheEditor";


const ShipComposer = observer(() => {

  // const store = useContext(ShippingContext);

  const [couchePreviewList, setCouchePreviewList] = useState(getCoucheDictData());
  const [selectedCouchePreview, setSelectedCouchePreview] = useState(null);
  const getCouchePreviewList = () => {
    return getCoucheDictData().map((couchePreviewList) => <CouchePreview icon={couchePreviewList.icon} title={couchePreviewList.title} />);
  };

  const getCoucheEditItem = () => {
    if (selectedCouchePreview === null) {
      return (<h2 className="ship_composer__body__content__edit_placeholder_title">Вы не выбрали пока ни одного элемента.</h2>);
    } else {
      return (<CoucheEditor />);
    }
  };

  const getFilteredCouchePreviewList = (searchCriteria) => {
    return getCoucheDictData().filter((couche) => {
      const searchCriteriaRegExp = new RegExp('^(' + searchCriteria + '.*)$', 'gi');
      return couche.title.match(searchCriteriaRegExp) !== null;
    })
  }

  return (
    <div className="ship_composer">
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
        <section className="ship_composer__body__search_bar">
          <div className="container ml-0">
            <div className="row">
              <div className="col-md-5 px-0">
                <SearchBar searchCriteriaChangeDispatcher={
                  (searchCriteria) => {
                    setCouchePreviewList(getFilteredCouchePreviewList(searchCriteria))
                  }
                } />
              </div>
            </div>
          </div>
        </section>
        {/* <section className="ship_composer__body__content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                {getCouchePreviewList()}
                            </div>
                            <div className="col-md-6">
                                {getCoucheEditItem()}
                            </div>
                        </div>
                    </div>
                </section> */}
      </main>

    </div>
  );
});

export default ShipComposer;