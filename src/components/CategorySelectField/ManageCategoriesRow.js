import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BRAND_COLOR_RED } from '~/styles';

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const RowText = styled.Text`
  flex: 1;
  padding: 0 48px;
  font-size: 16px;
  color: ${BRAND_COLOR_RED};
  text-align: center;
`;

const RowIcon = styled(Icon)`
  position: absolute;
  right: 12px;
  top: 3px;
`;

const ManageCategoriesRow = ({ onPress }) => (
  <Wrapper onPress={onPress}>
    <RowText>{t('manageCategories')}</RowText>
    <RowIcon name="plus-circle" size={16} color={BRAND_COLOR_RED} />
  </Wrapper>
);

export default ManageCategoriesRow;
