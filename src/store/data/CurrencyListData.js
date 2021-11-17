const currencyListData = [
  {
    id: 1,
    rate: 65.54,
    title: "USD",
    sym: "$",
  },

  {
    id: 2,
    rate: 83.41,
    title: "EUR",
    sym: "€",
  },

  {
    id: 3,
    rate: 97.79,
    title: "GBP",
    sym: "£",
  },
]

export function getCurrencyList() {
  return currencyListData;
}

export function getCurrencyRate(currency) {
  const currencyRateList = currencyListData.filter((c) => c['id'] === currency['id']);
  return currencyRateList[0]['rate'] + ' руб.';
}