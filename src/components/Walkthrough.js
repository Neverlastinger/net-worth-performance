import React from 'react';
import { Image, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode';
import Story from '~/components/Story';
import imageOne from '~/assets/walkthrough/walkthrough-1.png';
import imageTwo from '~/assets/walkthrough/walkthrough-2.png';
import imageThree from '~/assets/walkthrough/walkthrough-3.png';
import BlackText from '~/components/BlackText';
import GreyText from '~/components/GreyText';
import { LIGHT_BACKGROUND_COLOR } from '~/styles';

/**
 * Represetns the walkthrough of the application. Renders on first-time usage.
 */
const Walkthrough = ({ onEnd }) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <Story
      stories={[
        (
          <StoryWrapper style={styles.wrapper}>
            <SlideImage source={imageOne} />
            <StoryTitle>{t('walkthroughSlide1Title')}</StoryTitle>
            <StoryDescription>{t('walkthroughSlide1Description')}</StoryDescription>
          </StoryWrapper>
        ),
        (
          <StoryWrapper style={styles.wrapper}>
            <SlideImage source={imageTwo} />
            <StoryTitle>{t('walkthroughSlide2Title')}</StoryTitle>
            <StoryDescription>{t('walkthroughSlide2Description')}</StoryDescription>
          </StoryWrapper>
        ),
        (
          <StoryWrapper style={styles.wrapper}>
            <SlideImage source={imageThree} />
            <StoryTitle>{t('walkthroughSlide3Title')}</StoryTitle>
            <StoryDescription>{t('walkthroughSlide3Description')}</StoryDescription>
          </StoryWrapper>
        )
      ]}
      onStoryEnd={onEnd}
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  wrapper: {
    backgroundColor: new DynamicValue(LIGHT_BACKGROUND_COLOR, 'black'),
  },
});

const StoryWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #f2f2f2;
`;

const SlideImage = styled(Image)`
  width: ${0.9 * Dimensions.get('window').width}px;
  height: undefined;
  max-height: 80%;
  aspectRatio: 1;
`;

const StoryTitle = styled(BlackText)`
  margin-top: 36px;
  padding: 0 24px;
  font-size: 22px;
  text-align: center;
  font-weight: 500;
`;

const StoryDescription = styled(GreyText)`
  margin-top: 12px;
  padding: 0 24px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
`;

export default Walkthrough;
