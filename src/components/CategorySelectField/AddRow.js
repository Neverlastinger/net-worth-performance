import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BRAND_COLOR_RED } from '~/styles';

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Label = styled.Text`
  flex: 1;
  padding: 0 48px;
  font-size: 16px;
  color: ${BRAND_COLOR_RED};
  text-align: center;
`;

const AddIcon = styled(Icon)`
  position: absolute;
  right: 12px;
  top: 3px;
`;

const AddRow = () => {
  const onPress = (e) => {
    e.stopPropagation();
  };

  return (
    <Wrapper onPress={onPress}>
      <Label>Add a category</Label>
      <AddIcon name="plus-circle" size={16} color={BRAND_COLOR_RED} />
    </Wrapper>
  );
};

export default AddRow;
