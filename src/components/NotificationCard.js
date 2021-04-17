import React, { useEffect } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import useAnimatedValue from '~/hooks/useAnimatedValue';

const COLOR = '#9A0553';

/**
 * Represents a notification card shown on the Dashboard to call the user to action.
 *
 * @param {String} title
 * @param {String} message
 * @param {Function} onPress
 */
const NotificationCard = ({ title, message, onPress }) => {
  const [height] = useAnimatedValue(0);
  const [opacity] = useAnimatedValue(0);

  useEffect(() => {
    setTimeout(() => {
      Animated.spring(height, {
        toValue: 193,
        tension: 3,
        friction: 4
      }).start();

      Animated.timing(opacity, {
        toValue: 1,
        duration: 800
      }).start();
    }, 1600);
  }, []);

  return (
    <Wrapper style={{ height }}>
      <TouchWrapper onPress={onPress}>
        <IconBorderWrapper style={{ opacity }}>
          <IconWrapper>
            <Icon name="calendar" size={18} color={COLOR} />
          </IconWrapper>
        </IconBorderWrapper>

        <Content style={{ opacity }}>
          <Title>{title}</Title>
          <Message>{message}</Message>
        </Content>
      </TouchWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Card)`
  width: 193px;
  height: 0px;
  border-radius: 12px;
  overflow: hidden;
`;

const TouchWrapper = styled.TouchableOpacity`
  flex: 1;
  background-color: ${COLOR};
`;

const IconBorderWrapper = styled(Animated.View)`
  align-items: center;
  justify-content: center;
  margin: 12px 0 0 12px;
  width: 50px;
  height: 50px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 25px;
`;

const IconWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 25px;
`;

const Content = styled(Animated.View)`
  position: absolute;
  bottom: 24px;
  left: 12px;
  right: 12px;
`;

const Title = styled.Text`
  font-size: 15px;
  color: white;
  font-weight: bold;
`;

const Message = styled.Text`
  margin-top: 6px;
  font-size: 10px;
  color: white;
  font-weight: 500;
`;

export default NotificationCard;
