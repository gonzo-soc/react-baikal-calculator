export default class ShippingCoucheInfo {
  constructor({ coucheId, size, netWeight, grossWeight, count, price }) {
    this.id = _.uniqueId('baikal_shipping_info::');
    this.coucheId = coucheId;
    this.size = size;
    this.netWeight = netWeight;
    this.grossWeight = grossWeight;
    this.count = count;
    this.price = price;
  }
}