import {makeAutoObservable} from 'mobx';

export default class OptionBarUIState {
  constructor({ from, to, currency}) {
    this.from = from;
    this.to = to;
    this.currency = currency;
    
    makeAutoObservable(this);
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

  set setFrom(from) {
    this.from = from;
  }

  set setTo(to) {
    this.to = to;
  }

  set setCurrency(currency) {
    this.currency = currency;
  }

}