import { makeAutoObservable } from 'mobx';

export default class OptionBarUIState {

  static attributeNameDict = {
    from: 'Откуда',
    to: 'Куда',
    currency: 'Валюта',
  }

  constructor({ from, to, currency }) {
    this.from = from;
    this.to = to;
    this.currency = currency;

    makeAutoObservable(this);
  }

  get getAttributeNameDict() {
    return OptionBarUIState.attributeNameDict;
  }

  get currencySym() {
    let sym = "$"
    switch (this.currency['title']) {
      case "RUB":
        sym = "₽";
        break;

      case "USD":
        sym = "$";
        break;

      case "EUR":
        sym = "€";
        break;

      case "CNY":
        sym = '¥';
        break;

      default:
        console.warn("OptionBarUIState [get currencyDisplay] Unknown set currency");
        break;
    }

    return sym;
  }

  get isFromInvalid() {
    return (!this.from || !this.from['title'] || this.from['title'] === this.to['title']);
  }

  get isToInvalid() {
    return (!this.to || !this.to['title'] || this.to['title'] === this.from['title']);
  }

  get isCurrencyInvalid() {
    return (!this.currency || !this.currency['title']);
  }

  set setFrom(from) {
    this.from = from;
  }

  set setTo(to) {
    this.to = to;
  }

  set setCurrency(currency) {
    this.currency = currency;
  }

  changeAttribute(name, value) {
    const attributeNameDict = OptionBarUIState.attributeNameDict;
    switch (name) {
      case attributeNameDict['from']:
        this.from = value;
        break;

      case attributeNameDict['to']:
        this.to = value;
        break;

      case attributeNameDict['currency']:
        this.currency = value;
        break;

      default:
        console.warn("OptionBarUIState [changeAttribute] Unknown attribute name [ " + name + " ]");
        break;
    }
  }

  changeFrom(value) {
    this.changeAttribute(OptionBarUIState.attributeNameDict['from'], value);
  }

  changeTo(value) {
    this.changeAttribute(OptionBarUIState.attributeNameDict['to'], value);
  }

  changeCurrency(value) {
    this.changeAttribute(OptionBarUIState.attributeNameDict['currency'], value);
  }

}