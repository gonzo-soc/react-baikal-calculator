import React from "react";
import { observable, makeObservable, action } from 'mobx';

import { getCoucheDictData } from "./data/CoucheDictData";
import { getCityList } from "./data/CityListData";
import { getCurrencyList } from "./data/CurrencyListData";

import CoucheDictionaryItem from "./domain/CoucheDictionaryItem";
import ShippingCoucheInfo from "./domain/ShippingCoucheInfo";

import ShippingContext from "./ShippingContext";
import OptionBarUIState from "./domain/OptionBarUIState";

/*
 * The domain store that we use to add and extract our shipping couche items
*/
class ShippingStore {

  /* Couche Dictionary Domain List */
  coucheDictList = [];

  shippingCoucheInfoList = [];

  optionBarUIState = new OptionBarUIState({
    from: getCityList()[0],
    to: getCityList()[1],
    currency: getCurrencyList()[0]
  });

  constructor() {
    makeObservable(this, {
      shippingCoucheInfoList: observable,
      edit: action,
      addToShip: action,
      removeFromShip: action,
    }
    );

    this.loadCoucheDict();
  }

  get getOptionBarUIState() {
    return this.optionBarUIState;
  }

  loadCoucheDict() {
    this.coucheDictList = getCoucheDictData().map((coucheData) => new CoucheDictionaryItem({
      id: coucheData.id,
      title: coucheData.title,
      icon: coucheData.icon,
    }));
  }

  edit(shippingCoucheInfo) {
    if (shippingCoucheInfo && shippingCoucheInfo instanceof ShippingCoucheInfo) {
      const infoIndex = this.shippingCoucheInfoList.findIndex((item) => item.id === shippingCoucheInfo.id);
      if (infoIndex >= 0) {
        const info = shippingCoucheInfo[infoIndex];
        for (let k in Object.keys(info)) {
          // not include property from __proto__
          if (shippingCoucheInfo.hasOwnProperty(k)) {
            info[k] = shippingCoucheInfo[k];
          }
        }

      } else {
        console.warn("ShippingStore [edit] Unfound shipping couche info");
      }
    } else {
      throw new Error("ShippingStore [edit] Invalid shipping couche info");
    }
  }

  addToShip(shippingCoucheInfo) {
    if (shippingCoucheInfo && shippingCoucheInfo instanceof ShippingCoucheInfo) {
      const isExist = this.coucheDictData.find((item) => item.id === shippingCoucheInfo.id) !== undefined;
      if (!isExist) {
        this.shippingCoucheInfoList.push(shippingCoucheInfo);
      }
    } else {
      throw new Error("ShippingStore [addToShip] Invalid shipping couche info");
    }
  }

  removeFromShip(shippingCoucheInfo) {
    if (shippingCoucheInfo && shippingCoucheInfo instanceof ShippingCoucheInfo) {
      const resultIndex = this.shippingCoucheInfoList.findIndex((item) => item.id === shippingCoucheInfo.id);
      if (resultIndex >= 0) {
        this.shippingCoucheInfoList.splice(resultIndex, 1);
      }
    } else {
      throw new Error("ShippingStore [removeFromShip] Invalid shipping couche info");
    }
  }
}

const ContextShippingStore = ({ children }) => {
  return (
    <ShippingContext.Provider value={new ShippingStore()}>{children}</ShippingContext.Provider>
  );
};

export default ContextShippingStore;