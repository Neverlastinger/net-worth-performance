import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { fillEmptyMonths } from '~/lib/dates';
import { getActiveMonths } from '~/store/reducers';
import MonthSelectorHeader from '~/components/MonthSelectorHeader';
import AssetRangeChart from '~/components/Charts/range/AssetRangeChart';
import AssetRelativeToPortfolioRangeChart from '~/components/Charts/range/AssetRelativeToPortfolioRangeChart';
import ScreenWrapper from '~/components/ScreenWrapper';
import MarginCard from '~/components/MarginCard';

/**
 * Represents a dashboard for a single asset.
 *
 * @param {Object} navigation: react-native-navigation's navigation object
 * @param {Object} route: react-native-navigation's route object containing params
 */
const AssetDashboardScreen = ({ navigation, route }) => {
  const { assetId } = route.params;
  const selectedMonth = useSelector((state) => state.selectedMonth);
  const activeMonths = useSelector(getActiveMonths);

  return (
    <ScreenWrapper>
      <ChartView>
        <MarginCard>
          <MonthSelectorHeader navigation={navigation} />
        </MarginCard>

        <MarginCard>
          <ChartTitle>{t('assetRangeChartTitle', { asset: route.params.name })}</ChartTitle>
          <AssetRangeChart
            month={selectedMonth}
            monthCount={fillEmptyMonths(activeMonths).length}
            earliestRecordedMonth={activeMonths[activeMonths.length - 1]}
            displayChart={activeMonths.length > 1}
            assetId={assetId}
            navigation={navigation}
          />
        </MarginCard>

        <MarginCard>
          <ChartTitle>{t('assetRelativeToNetWorthRangeChartTitle', { asset: route.params.name })}</ChartTitle>
          <AssetRelativeToPortfolioRangeChart
            month={selectedMonth}
            monthCount={fillEmptyMonths(activeMonths).length}
            earliestRecordedMonth={activeMonths[activeMonths.length - 1]}
            displayChart={activeMonths.length > 1}
            assetId={assetId}
            navigation={navigation}
          />
        </MarginCard>
      </ChartView>
    </ScreenWrapper>
  );
};

const ChartView = styled.ScrollView`
  flex: 1;
  padding-top: 12px;
`;

const ChartTitle = styled.Text`
  margin: 18px 12px;
  font-size: 16px;
  color: black;
`;

export default AssetDashboardScreen;
