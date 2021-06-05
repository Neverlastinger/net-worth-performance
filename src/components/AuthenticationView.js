import React from 'react';
import styled from 'styled-components/native';
import { DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode';
import logoIcon from '~/assets/logo-full.png';
import { LIGHT_BACKGROUND_COLOR } from '../styles';

const AuthenticationView = ({ children }) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <Wrapper style={styles.wrapper}>
      <ContentWrapper contentContainerStyle={{ justifyContent: 'center', minHeight: '100%' }}>
        <Logo source={logoIcon} />
        <ChildrenWrapper>
          {children}
        </ChildrenWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  wrapper: {
    backgroundColor: new DynamicValue(LIGHT_BACKGROUND_COLOR, 'black'),
  },
});

const Wrapper = styled.View`
  flex: 1;
`;

const ContentWrapper = styled.ScrollView`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px;
`;

const Logo = styled.Image`
  align-self: center;
  margin-bottom: 36px;
  width: 90%;
  height: undefined;
  aspectRatio: 4.1;
`;

const ChildrenWrapper = styled.View`
  margin-top: 6px;
  margin-bottom: 6px;
`;

export default AuthenticationView;
