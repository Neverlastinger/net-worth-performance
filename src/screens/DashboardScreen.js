import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { assetListForChart } from '~/store/reducers';
import NoAsset from '~/components/NoAsset';
import PieChart from '~/components/PieChart';

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
          <PieChart data={assetList} blurDetected={viewTouched} />
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
