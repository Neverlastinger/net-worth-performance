import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { dateKeyToHumanReadable, getPrevMonth, getNextMonth, fillEmptyMonths } from '~/lib/dates';
import { getActiveMonths } from '~/store/reducers';
import { setSelectedMonth } from '~/store/actions';
import ActionSheet from '~/components/ActionSheet';
import NoPrevMonthQuestion from '~/components/NoPrevMonthQuestion';

/**
 * Represents the top bar on the Dashboard screen used to select a month.
 */
const MonthSelectorHeader = ({ navigation }) => {
  const dispatch = useDispatch();
  const months = useSelector(getActiveMonths);
  const monthsWithGaps = fillEmptyMonths(months);
  const monthsHumanReadable = months.map(dateKeyToHumanReadable);
  const selectedMonth = useSelector((state) => state.selectedMonth);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isHistoricalDataQuestionOpen, setIsHistoricalDataQuestionOpen] = useState(false);

  useEffect(() => {
    months[0] && dispatch(setSelectedMonth(months[0]));
  }, [months[0]]);

  const openActionSheet = () => {
    setIsActionSheetOpen(true);
  };

  const closeActionSheet = () => {
    setIsActionSheetOpen(false);
  };

  const onSelected = (value) => {
    dispatch(setSelectedMonth(months[monthsHumanReadable.indexOf(value)]));
  };

  const onPrev = () => {
    const prevMonth = getPrevMonth(selectedMonth);

    if (monthsWithGaps.includes(prevMonth)) {
      dispatch(setSelectedMonth(prevMonth));
    } else {
      setIsHistoricalDataQuestionOpen(true);
    }
  };

  const onNext = () => {
    const nextMonth = getNextMonth(selectedMonth);

    if (monthsWithGaps.includes(nextMonth)) {
      dispatch(setSelectedMonth(nextMonth));
    }
  };

  return (
    <Title>
      <PrevMonth onPress={onPrev}>
        <Icon name="chevron-left" size={18} />
      </PrevMonth>

      <Wrapper onPress={openActionSheet}>
        <MonthText>{selectedMonth && dateKeyToHumanReadable(selectedMonth)}</MonthText>
        <DropdownIcon name="chevron-down" size={8} color="black" />
      </Wrapper>

      <NextMonth onPress={onNext}>
        <Icon name="chevron-right" size={18} />
      </NextMonth>

      <ActionSheet
        isOpen={isActionSheetOpen}
        onClose={closeActionSheet}
        onValueSelected={onSelected}
        title={t('dashboardMonthSelectorTitle')}
        options={monthsHumanReadable}
      />

      <NoPrevMonthQuestion
        isActive={isHistoricalDataQuestionOpen}
        earlierMonth={selectedMonth && dateKeyToHumanReadable(selectedMonth)}
        onCancel={() => { setIsHistoricalDataQuestionOpen(false); }}
        onConfirm={() => { navigation.navigate('UpdateExistingAssets'); setIsHistoricalDataQuestionOpen(false); }}
      />
    </Title>
  );
};

const Title = styled.View`
  padding: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 300px;
`;

const MonthNavigation = styled.TouchableOpacity`
  position: absolute;
  z-index: 1;
  align-items: center;
  justify-content: center;
  padding: 6px 24px;
  height: 40px;
`;

const PrevMonth = styled(MonthNavigation)`
  left: 0px;
`;

const NextMonth = styled(MonthNavigation)`
  right: 0px;
`;

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  height: 40px;
`;

const MonthText = styled.Text`
  margin: 0 auto;
  font-size: 12px
`;

const DropdownIcon = styled(Icon)`
  margin: 2px 0 0 18px;
`;

export default MonthSelectorHeader;
