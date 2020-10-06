import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

const Loader = () => (
  <Wrapper>
    <ActivityIndicator />
  </Wrapper>
);

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
`;

export default Loader;
