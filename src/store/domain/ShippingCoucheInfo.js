export default class ShippingCoucheInfo {
  constructor({ id, size, netWeight, grossWeight, count }) {
    this.id = id; // ref to our couche dictionary
    this.size = size;
    this.netWeight = netWeight;
    this.grossWeight = grossWeight;
    this.count = count;
  }
}