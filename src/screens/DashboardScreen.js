import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Card } from 'react-native-paper';
import { format, subMonths, addMonths } from 'date-fns';
import { getDateKey } from '~/lib/dates';
import { assetListForChart } from '~/store/reducers';
import NoAsset from '~/components/NoAsset';
import Summary from '~/components/Charts/Summary';
import AssetPieChart from '~/components/Charts/AssetPieChart';
import CategoryPieChart from '~/components/Charts/CategoryPieChart';

const DashboardScreen = ({ navigation }) => {
  const [viewTouched, setViewTouched] = useState();
  const [date, setDate] = useState(new Date());
  const month = getDateKey(date);
  const monthHumanReadable = format(date, 'MMM yyyy');
  const assetList = useSelector((state) => assetListForChart(state));

  const onViewTouch = () => {
    setViewTouched(Date.now());
  };

  const prevMonth = () => {
    setDate((state) => (
      subMonths(state, 1)
    ));
  };

  const nextMonth = () => {
    setDate((state) => (
      addMonths(state, 1)
    ));
  };

  return (
    <SafeArea>
      {assetList.length > 0 ? (
        <ChartView onTouchStart={onViewTouch}>
          <Text>Month: {monthHumanReadable}</Text>
          <TouchableOpacity onPress={() => { prevMonth(); }}>
            <Text>Prev Month</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { nextMonth(); }}>
            <Text>Next Month</Text>
          </TouchableOpacity>
          <ChartCard>
            <Summary data={assetList} month={month} />
          </ChartCard>
          <ChartCard>
            <ChartTitle>{t('assetChartTitle')}</ChartTitle>
            <AssetPieChart data={assetList} month={month} blurDetected={viewTouched} />
          </ChartCard>
          <ChartCard>
            <ChartTitle>{t('categoryChartTitle')}</ChartTitle>
            <CategoryPieChart data={assetList} month={month} blurDetected={viewTouched} />
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
