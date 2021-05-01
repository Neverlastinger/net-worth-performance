import React, { useEffect, useReducer } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components/native';

const NEXT_STORY = 'NEXT_STORY';
const PREV_STORY = 'PREV_STORY';
const INCREASE_PROGRESS = 'INCREASE_PROGRESS';
const STOP_TIMER = 'STOP_TIMER';
const RESUME_TIMER = 'RESUME_TIMER';

/**
 * Represents a story container.
 *
 * @param {Array} stories: an array of React components used as stories
 * @param {Function} onStoryEnd: called when the last story ends.
 */
const Story = ({ stories, onStoryEnd }) => {
  const defaultState = {
    currentIndex: 0,
    indicators: Array(stories.length).fill({
      progress: 0
    }),
    active: true,
    isTimerRunning: true
  };

  const reducer = (state = defaultState, action) => {
    const getNextStoryState = () => {
      if (state.currentIndex + 1 < stories.length) {
        return {
          ...state,
          currentIndex: state.currentIndex + 1,
          indicators: state.indicators.map((item, index) => (
            index < state.currentIndex + 1
              ? {
                ...item,
                progress: 100
              }
              : item
          ))
        };
      }

      return {
        ...state,
        active: false
      };
    };

    switch (action.type) {
      case NEXT_STORY:
        return getNextStoryState();

      case PREV_STORY:
        return state.currentIndex === 0
          ? state
          : {
            ...state,
            currentIndex: state.currentIndex - 1,
            indicators: state.indicators.map((item, index) => (
              index >= state.currentIndex - 1
                ? {
                  ...item,
                  progress: 0
                }
                : item
            ))
          };

      case INCREASE_PROGRESS:
        if (state.indicators[state.currentIndex].progress === 100) {
          return getNextStoryState();
        }

        return {
          ...state,
          indicators: state.indicators.map((item, index) => (
            index === state.currentIndex
              ? {
                ...item,
                progress: Math.min(100, item.progress + (state.isTimerRunning ? 0.3 : 0))
              }
              : item
          ))
        };

      case STOP_TIMER:
        return {
          ...state,
          isTimerRunning: false
        };

      case RESUME_TIMER:
        return {
          ...state,
          isTimerRunning: true
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    if (!state.active) {
      onStoryEnd();
    }
  }, [state.active]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: INCREASE_PROGRESS });
    }, 16);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const onPress = (e) => {
    const touchX = e.nativeEvent.locationX;
    const screenWidth = Dimensions.get('window').width;

    touchX < screenWidth / 2
      ? dispatch({ type: PREV_STORY })
      : dispatch({ type: NEXT_STORY });
  };

  const onPressIn = () => {
    dispatch({ type: STOP_TIMER });
  };

  const onPressEnd = () => {
    dispatch({ type: RESUME_TIMER });
  };

  const onLongPress = () => {
    // added so onPress is not activated when the user long presses
  };

  return (
    <SafeArea>
      <StatusBar hidden />
      <TouchableWrapper onPress={onPress} onPressIn={onPressIn} onLongPress={onLongPress} onPressOut={onPressEnd}>
        <Wrapper>
          <IndicatorList>
            {state.indicators.map((indicator, i) => (
              <StoryIndicator progress={indicator.progress} key={i} />
            ))}
          </IndicatorList>
          <StoryWrapper>
            {stories[state.currentIndex]}
          </StoryWrapper>
        </Wrapper>
      </TouchableWrapper>
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const TouchableWrapper = styled.TouchableWithoutFeedback`
  flex: 1;
`;

const Wrapper = styled.View`
  flex: 1;
`;

const StoryWrapper = styled.View`
  flex: 1;
`;

const IndicatorList = styled.View`
  flex-direction: row;
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  height: 3px;
  z-index: 2;
`;

const StoryIndicator = ({ progress }) => (
  <IndicatorWrapper>
    <Progress style={{ width: `${progress}%` }} />
  </IndicatorWrapper>
);

const IndicatorWrapper = styled.View`
  flex: 1;
  margin: 0 2px;
  height: 3px;
  background: #0070ea;
`;

const Progress = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 3px;
  background: hsla(211, 100%, 75%, 1);
`;

export default Story;
