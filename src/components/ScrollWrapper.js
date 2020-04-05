import React from 'react';
import styled from 'styled-components/native';

const ScrollWrapper = ({ children }) => (
  <Wrapper contentContainerStyle={{ minHeight: '100%' }}>
    {children}
  </Wrapper>
);

const Wrapper = styled.ScrollView`
  flex: 1;
`;

export default ScrollWrapper;
