import React from 'react';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import ActionButton from '~/components/ActionButton';

const ConfirmAddAssetScreen = ({ navigation }) => {
  const goToDashboard = () => {
    try {
      navigation.popToTop();
    } catch (e) {
      // do nothing
    }

    navigation.navigate('Dashboard');
  };

  return (
    <SafeArea>
      <Confirm>
        { /* eslint-disable-next-line global-require */ }
        <Lottie source={require('~/assets/lf30_editor_ujZKnM.json')} autoPlay loop={false} speed={0.5} />
        <MainText>{t('confirmAddAssetMainText')}</MainText>
        <DescriptionText>{t('confirmAddAssetDescriptionText')}</DescriptionText>
      </Confirm>
      <ButtonView>
        <ActionButton label={t('done')} onPress={goToDashboard} />
      </ButtonView>
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Confirm = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: -110px;
  max-width: 80%;
  height: 220px;
`;

const Lottie = styled(LottieView)`
  height: 200px;
`;

const MainText = styled.Text`
  margin-top: -24px;
  font-size: 18px;
  font-weight: bold;
  color: black;
`;

const DescriptionText = styled.Text`
  margin-top: 6px;
  font-size: 12px;
  color: #404040;
  text-align: center;
`;

const ButtonView = styled.View`
  position: absolute;
  bottom: 60px;
`;

export default ConfirmAddAssetScreen;
