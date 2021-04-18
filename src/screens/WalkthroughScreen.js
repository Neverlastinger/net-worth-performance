import React, { useState } from 'react';
import { Image, Dimensions, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { STORAGE_KEYS } from '~/const';
import logoIcon from '~/assets/logo-full.png';
import imageOne from '~/assets/walkthrough/walkthrough-1.png';
import imageTwo from '~/assets/walkthrough/walkthrough-2.png';
import imageThree from '~/assets/walkthrough/walkthrough-3.png';
import { BRAND_COLOR_BLUE } from '~/styles';

const SLIDE_COUNT = 3;
let isDone = false;

/**
 * Represetns the walkthrough of the application. Renders on first-time usage.
 *
 * @param {Object} navigation: react-native-navigation's navigation object
 */
const WalkthroughScreen = ({ navigation }) => {
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const onIndexChanged = (index) => {
    if (index === SLIDE_COUNT) {
      setScrollEnabled(false);

      AsyncStorage.setItem(STORAGE_KEYS.WALKTHROUGH_SHOWN, 'YES');

      setTimeout(() => {
        isDone = true;
        navigation.navigate('AuthLandingPage');
      }, 300);
    }
  };

  if (isDone) {
    navigation.navigate('AuthLandingPage');
    return null;
  }

  return (
    <Screen>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <TopBar>
        <Logo source={logoIcon} />
      </TopBar>
      <SwiperWrapper
        loop={false}
        onIndexChanged={onIndexChanged}
        activeDotColor={BRAND_COLOR_BLUE}
        scrollEnabled={scrollEnabled}
      >
        <Slide>
          <Description>{t('walkthroughSlide1')}</Description>
          <SlideImage source={imageOne} />
        </Slide>
        <Slide>
          <Description>{t('walkthroughSlide2')}</Description>
          <SlideImage source={imageTwo} />
        </Slide>
        <Slide>
          <Description>{t('walkthroughSlide3')}</Description>
          <SlideImage source={imageThree} />
        </Slide>
        <LastSlide>
          <Description>{t('walkthroughSlideLast')}</Description>
          <ActivityIndicator />
        </LastSlide>
      </SwiperWrapper>
    </Screen>
  );
};

const Screen = styled.View`
  flex: 1;
`;

const TopBar = styled.View`
  padding-top: 40px;
  flex-basis: 130px;
  height: 130px;
  background-color: black;
`;

const SwiperWrapper = styled(Swiper)`
`;

const Slide = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 60px;
  background-color: #f2f2f2;
`;

const LastSlide = styled(Slide)`
  justify-content: center;
`;

const SlideImage = styled(Image)`
  width: ${0.9 * Dimensions.get('window').width}px;
  height: undefined;
  max-height: 80%;
  aspectRatio: 1;
`;

const Description = styled.Text`
  padding: 18px 36px;
  text-align: center;
  line-height: 22px;
  font-size: 16px;
  font-weight: bold;
  color: black
`;

const Logo = styled.Image`
  align-self: center;
  width: 80%;
  height: undefined;
  aspectRatio: 4.1;
`;

export default WalkthroughScreen;
