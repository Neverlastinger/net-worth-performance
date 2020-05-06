import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { dateKeyToHumanReadable } from '~/lib/dates';
import { getActiveMonths } from '~/store/reducers';
import { setSelectedMonth } from '~/store/actions';
import ActionSheet from '~/components/ActionSheet';

const MonthSelectorHeader = () => {
  const dispatch = useDispatch();
  const months = useSelector(getActiveMonths);
  const monthsHumanReadable = months.map(dateKeyToHumanReadable);
  const selectedMonth = useSelector((state) => state.selectedMonth);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);

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

  return (
    <Title onPress={openActionSheet}>
      <Wrapper>
        <MonthText>{selectedMonth && dateKeyToHumanReadable(selectedMonth)}</MonthText>
        <DropdownIcon name="chevron-down" size={8} color="black" />
      </Wrapper>
      <ActionSheet
        isOpen={isActionSheetOpen}
        onClose={closeActionSheet}
        onValueSelected={onSelected}
        title={t('dashboardMonthSelectorTitle')}
        options={monthsHumanReadable}
      />
    </Title>
  );
};

const Title = styled.TouchableOpacity`
  padding: 12px;
`;

const Wrapper = styled.View`
  flex-direction: row;
`;

const MonthText = styled.Text`
  font-size: 12px
`;

const DropdownIcon = styled(Icon)`
  margin: 4px 0 0 18px;
`;

export default MonthSelectorHeader;
