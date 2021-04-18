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
          <DescriptionText>{t('selectYourBaseCurrencyLongDescription')}</DescriptionText>
          <CurrencySelectField
            label={t('baseCurrency')}
            selectedValue={baseCurrency}
            onValueSelected={saveCurrency}
          />
        </View>
        <ButtonView>
          <TextLink label={t('logout')} color="#AAA" onPress={logout} />
        </ButtonView>
      </ScrollWrapper>
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const DescriptionText = styled.Text`
  margin-top: 6px;
  padding: 12px 12px 6px 12px;
  color: #444;
  font-size: 12px;
  line-height: 16px;
`;

const ButtonView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  margin-top: 30px;
`;

export default ProfileScreen;
