import React, { useState } from 'react';
import styled from 'styled-components/native';
import NoAsset from '~/components/NoAsset';
import PieChart from '~/components/PieChart';

const hasAsset = true;

const DATA = [
  {
    name: 'Mintos',
    value: 4004
  },
  {
    name: 'Revolut Stocks',
    value: 19500
  },
  {
    name: 'FiBank',
    value: 9999
  },
  {
    name: 'ETFMatic',
    value: 500
  }
];

const DashboardScreen = () => {
  const [viewTouched, setViewTouched] = useState();

  const onViewTouch = () => {
    setViewTouched(new Date().getTime());
  };

  return (
    <SafeArea>
      {hasAsset ? (
        <ChartView onTouchStart={onViewTouch}>
          <PieChart data={DATA} blurDetected={viewTouched} />
          <PieChart data={DATA} blurDetected={viewTouched} />
          <PieChart data={DATA} blurDetected={viewTouched} />
        </ChartView>
      ) : (
        <NoAsset />
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
