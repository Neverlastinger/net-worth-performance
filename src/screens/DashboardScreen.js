import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Card } from 'react-native-paper';
import DropdownAlert from 'react-native-dropdownalert';
import { getDateKey, dateKeyToHumanReadable } from '~/lib/dates';
import { assetListForChart, getActiveMonths } from '~/store/reducers';
import NoAsset from '~/components/NoAsset';
import Summary from '~/components/Charts/Summary';
import AssetPieChart from '~/components/Charts/AssetPieChart';
import CategoryPieChart from '~/components/Charts/CategoryPieChart';
import { BRAND_COLOR_BLUE } from '~/styles';

const DashboardScreen = ({ navigation }) => {
  const [viewTouched, setViewTouched] = useState();
  const dropDownAlertRef = useRef();
  const selectedMonth = useSelector((state) => state.selectedMonth);
  const assetList = useSelector(assetListForChart);
  const activeMonths = useSelector(getActiveMonths);
  const currentMonthKey = getDateKey();

  const onViewTouch = () => {
    setViewTouched(Date.now());
  };

  useEffect(() => {
    activeMonths[0] && currentMonthKey && activeMonths[0] !== currentMonthKey
      && setTimeout(() => {
        dropDownAlertRef.current.alertWithType(
          'info',
          t('welcomeToNewMonthTitle', { month: dateKeyToHumanReadable(currentMonthKey) }),
          t('welcomeToNewMonthMessage'),
          null,
          10000
        );
      }, 1000);
  }, [activeMonths[0], currentMonthKey]);

  return (
    <SafeArea>
      {assetList.length > 0 ? (
        <ChartView onTouchStart={onViewTouch}>
          <ChartCard>
            <Summary data={assetList} month={selectedMonth} />
          </ChartCard>
          <ChartCard>
            <ChartTitle>{t('assetChartTitle')}</ChartTitle>
            <AssetPieChart data={assetList} month={selectedMonth} blurDetected={viewTouched} />
          </ChartCard>
          <ChartCard>
            <ChartTitle>{t('categoryChartTitle')}</ChartTitle>
            <CategoryPieChart data={assetList} month={selectedMonth} blurDetected={viewTouched} />
          </ChartCard>
        </ChartView>
      ) : (
        <NoAsset goToAddAsset={() => { navigation.navigate('AddAsset'); }} />
      )}

      <DropdownAlert
        ref={dropDownAlertRef}
        infoColor={BRAND_COLOR_BLUE}
        onTap={() => { navigation.navigate('UpdateExistingAssets'); }}
      />

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
