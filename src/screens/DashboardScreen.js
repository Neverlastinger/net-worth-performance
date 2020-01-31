import React from 'react';
import styled from 'styled-components/native';
import ActionButton from '~/components/ActionButton';

const DashboardScreen = () => (
  <SafeArea>
    <QuoteView>
      <QuoteText>{t('initialQuote')}</QuoteText>
      <AuthorText>{t('initialQuoteAuthor')}</AuthorText>
    </QuoteView>
    <ButtonView>
      <ActionButton label={t('addAssetButton')} />
    </ButtonView>
  </SafeArea>
);

const SafeArea = styled.SafeAreaView`
  flex: 1
`;

const QuoteView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const QuoteText = styled.Text`
  align-self: center;
  font-size: 12px;
  font-style: italic;
  text-align: center;
  color: #4d4d4d;
`;

const AuthorText = styled.Text`
  align-self: center;
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
  color: #4d4d4d;
`;

const ButtonView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

export default DashboardScreen;
