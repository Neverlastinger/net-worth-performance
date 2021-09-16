import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { getDateKey, dateKeyToHumanReadable, fillEmptyMonths } from '~/lib/dates';
import { assetListForChart, getActiveMonths } from '~/store/reducers';
import NoAsset from '~/components/NoAsset';
import AssetPieChart from '~/components/Charts/pie/AssetPieChart';
import CategoryPieChart from '~/components/Charts/pie/CategoryPieChart';
import AssetBarChart from '~/components/Charts/bar/AssetBarChart';
import CategoryBarChart from '~/components/Charts/bar/CategoryBarChart';
import NetWorthRangeChart from '~/components/Charts/range/NetWorthRangeChart';
import Loader from '~/components/Loader';
import BaseCurrencyQuestion from '~/components/BaseCurrencyQuestion';
import NotificationHandler from '~/components/NotificationHandler';
import NotificationCard from '~/components/NotificationCard';
import ScreenWrapper from '~/components/ScreenWrapper';
import MarginCard from '~/components/MarginCard';
import BlackText from '../components/BlackText';

/**
 * Represents the main dashboard screen of the application.
 * Displays various charts related to the user's net worth.
 *
 * @param {Object} navigation: react-native-navigation's navigation object
 */
const DashboardScreen = ({ navigation }) => {
  const [viewTouched, setViewTouched] = useState();
  const selectedMonth = useSelector((state) => state.selectedMonth);
  const assetsLoaded = useSelector((state) => state.assetsLoaded);
  const assetList = useSelector((state) => assetListForChart(state, selectedMonth));
  const activeMonths = useSelector(getActiveMonths);
  const currentMonthKey = getDateKey();

  const onViewTouch = () => {
    setViewTouched(Date.now());
  };

  /**
   * Returns true if the user does not have any assets updated for the current month
   */
  const isNewMonth = useMemo(() => (
    activeMonths[0] && currentMonthKey && activeMonths[0] !== currentMonthKey
  ), [activeMonths[0], currentMonthKey]);

  return (
    <ScreenWrapper>
      {assetList.length > 0 ? (
        <ChartView onTouchStart={onViewTouch}>
          <NotificationCards>
            {isNewMonth && (
              <NotificationCard
                title={t('welcomeToNewMonthTitle', { month: dateKeyToHumanReadable(currentMonthKey) })}
                message={t('welcomeToNewMonthMessage')}
                onPress={() => { navigation.navigate('UpdateExistingAssets'); }}
              />
            )}
          </NotificationCards>

          <MarginCard>
            <NetWorthRangeChart
              month={selectedMonth}
              monthCount={fillEmptyMonths(activeMonths).length}
              earliestRecordedMonth={activeMonths[activeMonths.length - 1]}
              displayChart={activeMonths.length > 1}
              navigation={navigation}
            />
          </MarginCard>
          <MarginCard>
            <ChartTitle>{t('assetChartTitle')}</ChartTitle>
            <AssetPieChart data={assetList} month={selectedMonth} blurDetected={viewTouched} navigation={navigation} />
          </MarginCard>
          <MarginCard>
            <ChartTitle>{t('categoryChartTitle')}</ChartTitle>
            <CategoryPieChart month={selectedMonth} blurDetected={viewTouched} navigation={navigation} />
          </MarginCard>
          <MarginCard>
            <ChartTitle>{t('assetByAbsoluteValueChartTitle')}</ChartTitle>
            <AssetBarChart data={assetList} navigation={navigation} />
          </MarginCard>
          <MarginCard>
            <ChartTitle>{t('categoryByAbsoluteValueChartTitle')}</ChartTitle>
            <CategoryBarChart month={selectedMonth} navigation={navigation} />
          </MarginCard>
        </ChartView>
      ) : !assetsLoaded ? (
        <Loader />
      ) : (
        <NoAsset goToAddAsset={() => { navigation.navigate('AddAsset'); }} />
      )}

      <BaseCurrencyQuestion navigation={navigation} />
      <NotificationHandler navigation={navigation} />
    </ScreenWrapper>
  );
};

const NotificationCards = styled.View`
  padding: 0 6px 12px 6px;
`;

const ChartView = styled.ScrollView`
  flex: 1;
  padding-top: 12px;
`;

const ChartTitle = styled(BlackText)`
  margin: 18px 12px;
  font-size: 16px;
`;

export default DashboardScreen;
