import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { saveBaseCurrency } from '~/store/actions';
import ScrollWrapper from '~/components/ScrollWrapper';
import CurrencySelectField from '~/components/CurrencySelectField';
import TextLink from '~/components/TextLink';
import ScreenWrapper from '~/components/ScreenWrapper';

/**
 * Represents the profile screen containing user data and preferences.
 */
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const baseCurrency = useSelector((state) => state.user.baseCurrency);
  const styles = useDynamicStyleSheet(dynamicStyles);

  const logout = async () => {
    await auth().signOut();
  };

  const saveCurrency = (currency) => {
    dispatch(saveBaseCurrency(currency));
  };

  return (
    <ScreenWrapper>
      <ScrollWrapper>
        <View>
          <DescriptionText style={styles.descriptionText}>{t('selectYourBaseCurrencyLongDescription')}</DescriptionText>
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
    </ScreenWrapper>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  descriptionText: {
    color: new DynamicValue('#444', 'hsl(0, 0%, 80%)')
  }
});

const DescriptionText = styled.Text`
  margin-top: 6px;
  padding: 12px 12px 6px 12px;
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
