import { useSelector } from 'react-redux';

const useUserCurrencies = () => {
  const { assetList } = useSelector((state) => state);

  const currencies = assetList.map((asset) => asset.currency);
  const uniqueCurrencies = [...new Set(currencies)];

  return uniqueCurrencies.sort((first, second) => (
    assetList.filter((asset) => asset.currency === first).length > assetList.filter((asset) => asset.currency === second).length
      ? -1
      : 1
  ));
};

export default useUserCurrencies;
