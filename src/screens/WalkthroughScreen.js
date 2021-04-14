import React, { useState } from 'react';
import { Image, Dimensions, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { STORAGE_KEYS } from '~/const';
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
    <SwiperWrapper
      loop={false}
      onIndexChanged={onIndexChanged}
      activeDotColor={BRAND_COLOR_BLUE}
      scrollEnabled={scrollEnabled}
    >
      <Slide>
        <SlideImage source={imageOne} />
        <Description>{t('walkthroughSlide1')}</Description>
      </Slide>
      <Slide>
        <SlideImage source={imageTwo} />
        <Description>{t('walkthroughSlide2')}</Description>
      </Slide>
      <Slide>
        <SlideImage source={imageThree} />
        <Description>{t('walkthroughSlide3')}</Description>
      </Slide>
      <LastSlide>
        <Description>{t('walkthroughSlideLast')}</Description>
        <ActivityIndicator />
      </LastSlide>
    </SwiperWrapper>
  );
};

const SwiperWrapper = styled(Swiper)`
`;

const Slide = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background-color: #f2f2f2;
`;

const LastSlide = styled(Slide)`
  justify-content: center;
`;

const SlideImage = styled(Image)`
  width: ${Dimensions.get('window').width}px;
  height: undefined;
  max-height: 80%;
  aspectRatio: 1;
`;

const Description = styled.Text`
  margin-bottom: 18px;
  padding: 18px 36px;
  text-align: center;
  line-height: 22px;
  font-size: 16px;
  color: #444;
`;

export default WalkthroughScreen;
