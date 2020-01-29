import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BRAND_COLOR_RED } from '~/styles';

const EditView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const EditText = styled.Text`
  flex: 1;
  padding: 0 48px;
  font-size: 16px;
  color: ${BRAND_COLOR_RED};
  text-align: center;
`;

const AddAssetIcon = styled(Icon)`
  position: absolute;
  right: 12px;
  top: 0px;
`;

const EditCategoriesRow = () => (
  <EditView>
    <EditText>Add/Remove Categories</EditText>
    <AddAssetIcon name="edit" size={24} color={BRAND_COLOR_RED} />
  </EditView>
);

export default EditCategoriesRow;
