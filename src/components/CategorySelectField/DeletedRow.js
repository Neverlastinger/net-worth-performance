import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

const DeletedRowText = styled.Text`
  opacity: 0.3;
  text-decoration: line-through;
`;

const DeletedRowWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
`;

const DeletedRow = ({ text }) => (
  <TouchableWithoutFeedback
    onPress={(e) => { e.stopPropagation(); }}
  >
    <DeletedRowWrapper>
      <DeletedRowText>{text}</DeletedRowText>
    </DeletedRowWrapper>
  </TouchableWithoutFeedback>
);

export default DeletedRow;
