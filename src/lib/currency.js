import 'intl';
import 'intl/locale-data/jsonp/en';

export const formatCurrency = ({ amount, currency }) => (
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
);
