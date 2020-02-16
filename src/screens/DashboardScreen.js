import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Card } from 'react-native-paper';
import { assetListForChart } from '~/store/reducers';
import NoAsset from '~/components/NoAsset';
import Summary from '~/components/Summary';
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
          <ChartCard>
            <Summary data={assetList} />
          </ChartCard>
          <ChartCard>
            <ChartTitle>{t('assetChartTitle')}</ChartTitle>
            <AssetPieChart data={assetList} blurDetected={viewTouched} />
          </ChartCard>
          <ChartCard>
            <ChartTitle>{t('categoryChartTitle')}</ChartTitle>
            <CategoryPieChart data={assetList} blurDetected={viewTouched} />
          </ChartCard>
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
  padding-top: 12px;
`;

const ChartCard = styled(Card)`
  margin: 0 6px 12px 6px;
`;

const ChartTitle = styled.Text`
  margin: 18px 12px;
  font-size: 16px;
  color: black;
`;

export default DashboardScreen;
