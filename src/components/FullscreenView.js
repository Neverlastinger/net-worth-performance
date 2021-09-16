import React from 'react';
import { Portal, Provider as PaperProvider } from 'react-native-paper';
import styled from 'styled-components/native';
import ScreenWrapper from '~/components/ScreenWrapper';

const Wrapper = styled(ScreenWrapper)`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 2;
`;

const FullscreenView = ({ children }) => (
  <Portal>
    <PaperProvider>
      <Wrapper contentContainerStyle={{ flexGrow: 1 }}>
        {children}
      </Wrapper>
    </PaperProvider>
  </Portal>
);

export default FullscreenView;
