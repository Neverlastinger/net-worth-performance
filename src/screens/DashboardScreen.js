import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { assetListForChart } from '~/store/reducers';
import NoAsset from '~/components/NoAsset';
import AssetPieChart from '~/components/AssetPieChart';
import CategoryPieChart from '~/components/CategoryPieChart';

const DashboardScreen = ({ navigation }) => {
  const [viewTouched, setViewTouched] = useState();
  const assetList = useSelector((state) => assetListForChart(state));

  const onViewTouch = () => {
    setViewTouched(new Date().getTime());
  };

  return (
    <SafeArea>
      {assetList.length > 0 ? (
        <ChartView onTouchStart={onViewTouch}>
          <AssetPieChart data={assetList} blurDetected={viewTouched} />
          <CategoryPieChart data={assetList} blurDetected={viewTouched} />
        </ChartView>
      ) : (
        <NoAsset goToAddAsset={() => { navigation.navigate('AddAsset'); }} />
      )}

    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1
`;

const ChartView = styled.ScrollView`
  flex: 1;
`;

export default DashboardScreen;
