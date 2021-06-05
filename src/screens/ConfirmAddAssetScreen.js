import React from 'react';
import styled from 'styled-components/native';
import { useDarkMode, DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode';
import LottieView from 'lottie-react-native';
import ActionButton from '~/components/ActionButton';
import ScreenWrapper from '~/components/ScreenWrapper';

/* eslint-disable global-require */

const ConfirmAddAssetScreen = ({ navigation }) => {
  const isDarkMode = useDarkMode();
  const styles = useDynamicStyleSheet(dynamicStyles);

  const goToDashboard = () => {
    try {
      navigation.popToTop();
    } catch (e) {
      // do nothing
    }

    navigation.navigate('Dashboard');
  };

  return (
    <ScreenWrapper>
      <Wrapper>
        <Confirm>
          <Lottie
            source={isDarkMode ? require('~/assets/lf30_editor_ujZKnM_light.json') : require('~/assets/lf30_editor_ujZKnM.json')}
            autoPlay
            loop={false}
            speed={0.5}
          />
          <MainText style={styles.mainText}>{t('confirmAddAssetMainText')}</MainText>
          <DescriptionText style={styles.descriptionText}>{t('confirmAddAssetDescriptionText')}</DescriptionText>
        </Confirm>
        <ButtonView>
          <ActionButton label={t('done')} onPress={goToDashboard} />
        </ButtonView>
      </Wrapper>
    </ScreenWrapper>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  mainText: {
    color: new DynamicValue('black', 'white')
  },
  descriptionText: {
    color: new DynamicValue('#404040', '#bfbfbf')
  }
});

const Wrapper = styled.View`
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
  text-align: center;
`;

const ButtonView = styled.View`
  position: absolute;
  bottom: 60px;
`;

export default ConfirmAddAssetScreen;
