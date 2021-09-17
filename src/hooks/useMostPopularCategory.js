import { useSelector } from 'react-redux';

const useMostPopularCategory = () => {
  const { assetList } = useSelector((state) => state);

  const categories = assetList.map((asset) => asset.category);

  if (categories.length === 0) {
    return null;
  }

  const uniqueCurrencies = [...new Set(categories)];

  return uniqueCurrencies.sort((first, second) => (
    assetList.filter((asset) => asset.category === first).length > assetList.filter((asset) => asset.category === second).length
      ? -1
      : 1
  ))[0];
};

export default useMostPopularCategory;
