const getLatest = (asset, month, field) => {
  const latestMonth = Object.keys(asset[field]).filter((key) => (
    key <= month
  )).sort((first, second) => (
    first > second ? -1 : 1
  ))[0];

  return asset[field][latestMonth] || 0;
};

export const getLatestAmountInBaseCurrency = (asset, month) => (
  getLatest(asset, month, 'amountInBaseCurrency')
);

export const getLatestAmount = (asset, month) => (
  getLatest(asset, month, 'amount')
);
