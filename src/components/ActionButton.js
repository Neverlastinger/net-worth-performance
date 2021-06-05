import React from 'react';
import styled from 'styled-components/native';
import useColors from '~/hooks/useColors';

const ActionButton = ({ label, onPress, disabled }) => {
  const colors = useColors();

  return (
    <Button onPress={onPress} disabled={disabled} style={{ opacity: disabled ? 0.25 : 1, backgroundColor: colors.BRAND_COLOR_RED }}>
      <Text>{label}</Text>
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  padding: 12px 72px;
  min-width: 80%;
  border-radius: 50px;
`;

const Text = styled.Text`
  font-size: 18px;
  color: white;
  text-align: center;
`;

export default ActionButton;
