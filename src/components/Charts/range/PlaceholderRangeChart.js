import React, { useState } from 'react';
import { Text } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import styled from 'styled-components/native';
import ConfirmModal from '~/components/ConfirmModal';
import Gradient from '../Gradient';

/**
 * A placeholder range chart with mock data used to tease the user to add more data and see a real chart.
 */
const PlaceholderRangeChart = ({ initialAmount, navigation, xAxisHeight, verticalContentInset, axesSvg }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const amounts = [
    initialAmount,
    initialAmount * 1.5,
    initialAmount * 1.2,
    initialAmount * 1.6,
    initialAmount * 2,
    initialAmount * 1.9,
    initialAmount * 1.7,
    initialAmount * 1.3,
    initialAmount * 1.1,
    initialAmount * 2.2,
    initialAmount * 2.2,
    initialAmount * 2.3,
    initialAmount * 2.4
  ];

  const onPress = () => {
    setIsModalOpen(true);
  };

  return (
    <PlaceholderWrapper onPress={onPress}>
      <PeriodView>
        <PeriodButton
          text={t('months', { count: 1 })}
        />
        <PeriodButton
          text={t('months', { count: 2 })}
        />
        <PeriodButton
          text={t('months', { count: 6 })}
        />
        <PeriodButton
          text={t('YTD')}
        />
        <PeriodButton
          text={t('years', { count: 1 })}
          isActive
        />
        <PeriodButton
          text={t('max')}
        />
      </PeriodView>
      <ChartView>
        <YAxis
          data={amounts}
          style={{ marginBottom: xAxisHeight }}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <LineView>
          <LineChart
            style={{ flex: 1 }}
            data={amounts}
            contentInset={verticalContentInset}
            svg={{ stroke: 'url(#gradient)', strokeWidth: 3 }}
          >
            <Grid />
            <Gradient />
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10, height: xAxisHeight }}
            data={amounts}
            formatLabel={() => ''}
            contentInset={{ left: 30, right: 30 }}
            svg={axesSvg}
          />
        </LineView>
      </ChartView>

      {isModalOpen && (
        <ConfirmModal
          title={t('rangeMessageTitle')}
          content={(
            <>
              <Text>{t('rangeChartPlaceholderMessage')}</Text>
              <ModalText>{t('addHistoricalDataNow')}</ModalText>
            </>
          )}
          onCancel={() => { setIsModalOpen(false); }}
          onConfirm={() => { navigation.navigate('UpdateExistingAssets'); setIsModalOpen(false); }}
          confirmLabel={t('addHistoricalData')}
        />
      )}
    </PlaceholderWrapper>
  );
};

const PlaceholderWrapper = styled.TouchableOpacity`
  opacity: 0.25;
`;

const PeriodButton = ({ isActive, text, ...props }) => (
  isActive
    ? <PeriodActiveButtonWrapper {...props}><PeriodTextActive>{text}</PeriodTextActive></PeriodActiveButtonWrapper>
    : <PeriodButtonWrapper {...props}><PeriodText>{text}</PeriodText></PeriodButtonWrapper>
);

const PeriodView = styled.View`
  flex-direction: row;
  border-bottom-color: hsla(0, 0%, 0%, 0.25);
  border-bottom-width: 1px;
`;

const PeriodButtonWrapper = styled.TouchableOpacity`
  flex: 1;
  padding: 10px 0;
`;

const PeriodActiveButtonWrapper = styled.TouchableOpacity`
  flex: 1;
  padding: 10px 0;
  border-bottom-width: 2px;
  border-bottom-color: black;
`;

const PeriodText = styled.Text`
  text-align: center;
  font-size: 10px;
  color: hsla(0, 0%, 0%, 0.62);
`;

const PeriodTextActive = styled.Text`
  text-align: center;
  font-size: 10px;
  color: hsla(0, 0%, 0%, 1);
`;

const ChartView = styled.View`
  height: 300px;
  padding: 0 20px 16px 20px;
  flex-direction: row;
`;

const LineView = styled.View`
  flex: 1;
  margin-left: 10px;
`;

const ModalText = styled.Text`
  margin-top: 18px;
`;

export default PlaceholderRangeChart;
