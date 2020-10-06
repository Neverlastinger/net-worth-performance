import React from 'react';
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import TextLink from '~/components/TextLink';

const ProfileScreen = () => {
  const logout = async () => {
    await auth().signOut();
  };

  return (
    <SafeArea>
      <ButtonView>
        <TextLink label={t('logout')} onPress={logout} />
      </ButtonView>
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1
`;

const ButtonView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

export default ProfileScreen;
