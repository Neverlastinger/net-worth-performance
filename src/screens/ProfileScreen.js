import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { saveBaseCurrency } from '~/store/actions';
import ScrollWrapper from '~/components/ScrollWrapper';
import CurrencySelectField from '~/components/CurrencySelectField';
import TextLink from '~/components/TextLink';

/**
 * Represents the profile screen containing user data and preferences.
 */
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const baseCurrency = useSelector((state) => state.user.baseCurrency);

  const logout = async () => {
    await auth().signOut();
  };

  const saveCurrency = (currency) => {
    dispatch(saveBaseCurrency(currency));
  };

  return (
    <SafeArea>
      <ScrollWrapper>
        <View>
          <CurrencySelectField
            label={t('baseCurrency')}
            selectedValue={baseCurrency}
            onValueSelected={saveCurrency}
          />
        </View>
        <ButtonView>
          <TextLink label={t('logout')} onPress={logout} />
        </ButtonView>
      </ScrollWrapper>
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
