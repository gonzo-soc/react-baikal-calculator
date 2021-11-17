export default class ShippingCoucheInfo {
  constructor({id, size, netWeight, grossWeight}) {
    this.id = id; // ref to our couche dictionary
    this.size = size;
    this.netWeight = netWeight;
    this.grossWeight = grossWeight;
  }
}