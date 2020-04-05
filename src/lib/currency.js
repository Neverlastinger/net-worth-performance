import 'intl';
import 'intl/locale-data/jsonp/en';

export const formatCurrency = ({ amount, currency }) => (
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
);

export const formatCurrencyGrowth = ({ amount, currency }) => (
  `${amount >= 0 ? '+' : ''}${formatCurrency({ amount, currency })}`
);
