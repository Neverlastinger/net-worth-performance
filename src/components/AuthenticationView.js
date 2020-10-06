import React from 'react';
import styled from 'styled-components/native';
import background from '~/assets/pat-whelen-FFDcZr49Dmw-unsplash.jpg';

const AuthenticationView = ({ children }) => (
  <Wrapper>
    <Background source={background} />
    <ContentWrapper contentContainerStyle={{ justifyContent: 'center', minHeight: '100%' }}>
      <Logo>
        <Line1 />
        <Line2 />
        <Line3 />
        <Line4 />
      </Logo>

      {children}
    </ContentWrapper>
  </Wrapper>
);

const Wrapper = styled.View`
  flex: 1;
`;

const Background = styled.Image`
  flex: 1;
  resize-mode: stretch;
`;

const ContentWrapper = styled.ScrollView`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px;
  opacity: 0.75;
`;

const Logo = styled.View`
  align-self: center;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 30px 36px;
  width: 200px;
  height: 200px;
  border: 12px solid black;
  border-radius: 36px;
`;

const Line = styled.View`
  width: 12px;
  height: 150px;
  background-color: black;
  border-radius: 6px;
`;

const Line1 = styled(Line)`
  height: 38px;
`;

const Line2 = styled(Line)`
  height: 84px;
`;

const Line3 = styled(Line)`
  height: 70px;
`;

const Line4 = styled(Line)`
  height: 116px;
`;

export default AuthenticationView;
