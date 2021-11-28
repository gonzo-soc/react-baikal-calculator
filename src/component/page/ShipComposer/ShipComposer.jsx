import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';

import "./ShipComposer.scss";

import ShippingContext from "@/store/ShippingContext";
import { getCoucheDictData } from "@/store/data/CoucheDictData";
import { findCoucheDictItem } from "@/store/data/CoucheDictData";
import ShippingCoucheInfo from "@/store/domain/ShippingCoucheInfo";

import SearchBar from "@/component/common/SearchBar/SearchBar";
import CouchePreview from "@/component/layout/CouchePreview/CouchePreview";
import CoucheEditor from "@/component/layout/CoucheEditor/CoucheEditor";
import Tooltip from "@/component/common/Tooltip/Tooltip";

import backArrowSvgIco from "@/styles/images/icons/ship_composer/back_arrow.svg";
import classNames from 'classnames';

const ShipComposer = observer(() => {
  const store = useContext(ShippingContext);
  const navigate = useNavigate();

  const [couchePreviewList, setCouchePreviewList] = useState(getCoucheDictData());
  const [selectedCouchePreview, setSelectedCouchePreview] = useState(null);

  const shipComposerEditorBlockClassname = classNames("ship_composer__editor", { 'md_flex_mobile_hide': (selectedCouchePreview === null) });
  const shipComposerSearchBarBlockClassname = classNames("ship_composer__search_bar", { 'md_block_mobile_hide': (selectedCouchePreview !== null) })

  const selectCouchePreviewHandle = ({ id }) => {
    const coucheDictItem = findCoucheDictItem(id);
    if (coucheDictItem) {
      setSelectedCouchePreview(coucheDictItem);
    } else {
      console.warn("ShipComposer [selectCouchePreview] Could find any couche dict item with the id = [ " + id + " ]");
    }
  }

  const createShipInfoItem = (shipInfo) => {
    const { count, size, netWeight, grossWeight, price } = shipInfo;
    const coucheId = selectedCouchePreview['id'];
    store.addToShip(new ShippingCoucheInfo({
      coucheId,
      size,
      netWeight,
      grossWeight,
      price,
      count
    }))
  }

  const getCouchePreviewList = () => {
    return couchePreviewList.map(
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
      return (<CoucheEditor id={selectedCouchePreview['id']} createShipInfoHandler={createShipInfoItem} />);
    }
  };

  const getFilteredCouchePreviewList = (searchCriteria) => {
    if (!searchCriteria) {
      return getCoucheDictData();
    }
    return getCoucheDictData().filter((couche) => {
      const searchCriteriaRegExp = new RegExp('^(' + searchCriteria + '.*)$', 'gi');
      return couche.title.match(searchCriteriaRegExp) !== null;
    });
  }

  const onBackArrowClickHandler = (event) => {
    console.log("Back");
    debugger;
    if (selectedCouchePreview) {
      setSelectedCouchePreview(null);
    } else {
      navigate(-1);
    }
  }

  return (
    <main className="baikal_main_content ship_composer">
      <img src={backArrowSvgIco}
        alt="Ship composer: back arrow icon"
        className="ship_composer__back_arrow_ico"
        onClick={onBackArrowClickHandler}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6 col-xl-5 offset-xl-1 pl-md-0">
            <section className={shipComposerSearchBarBlockClassname}>
              <h2 className="ship_composer__search_bar__header">
                Выберите мебель, которую нужно перевезти
              </h2>
              <Tooltip content='Теперь ваши параметры выведены сверху, нажмите на них, чтобы  внести изменения'
                additionWrapperClassname="w-full"
                additionContentClassname="baikal_maxw_reset"
                position="right">
                <div className="ship_composer__search_bar__control">
                  <SearchBar searchCriteriaSubmitHandler={
                    (searchCriteria) => {
                      setCouchePreviewList(getFilteredCouchePreviewList(searchCriteria))
                    }
                  } isFocus={true} />
                </div>
              </Tooltip>
              <div className="ship_composer__search_bar__result_wrapper">
                <div className="ship_composer__search_bar__result_wrapper__result">
                  {getCouchePreviewList()}
                </div>
              </div>
            </section>
          </div>
          <div className="col-12 col-md-5 col-xl-5 offset-xl-1">
            <section className={shipComposerEditorBlockClassname}>
              <h2 className="ship_composer__editor__header md_block_mobile_hide">
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