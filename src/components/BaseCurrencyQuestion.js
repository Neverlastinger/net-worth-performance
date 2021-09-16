import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { closeBaseCurrencyQuestion, saveBaseCurrency } from '~/store/actions';
import ConfirmModal from '~/components/ConfirmModal';
import ActionSheet from '~/components/ActionSheet';
import GreyText from '~/components/GreyText';
import { STORAGE_KEYS } from '~/const';
import useCurrencyComponents from '../hooks/useCurrencyComponents';

/**
 * Encapsulates a popup that asks the user about their base currency preferences, as well as the currency action sheet selection.
 */
const BaseCurrencyQuestion = ({ navigation }) => {
  const dispatch = useDispatch();
  const showBaseCurrencyQuestion = useSelector((state) => state.showBaseCurrencyQuestion);
  const [showQuestion, setShowQuestion] = useState(false);
  const baseCurrency = useSelector((state) => state.user.baseCurrency);
  const [isCurrencySheetOpen, setIsCurrencySheetOpen] = useState(false);
  const currencyOptions = useCurrencyComponents();

  useEffect(() => {
    if (showBaseCurrencyQuestion) {
      setTimeout(() => {
        setShowQuestion(true);
      }, 2000);
    } else {
      setShowQuestion(false);
    }
  }, [showBaseCurrencyQuestion]);

  const cancelBaseCurrencyQuestion = () => {
    AsyncStorage.setItem(STORAGE_KEYS.BASE_CURRENCY_QUESTION_ASKED, 'YES');
    dispatch(closeBaseCurrencyQuestion());
  };

  const openCurrencySheet = () => {
    AsyncStorage.setItem(STORAGE_KEYS.BASE_CURRENCY_QUESTION_ASKED, 'YES');
    setIsCurrencySheetOpen(true);
  };

  const onCurrencySelected = (currency) => {
    if (currency === 'SEPARATOR') {
      return;
    }

    if (currency === 'VIEW_ALL') {
      navigation.navigate('Profile');
      return;
    }

    dispatch(saveBaseCurrency(currency));
    dispatch(closeBaseCurrencyQuestion());
  };

  return (
    <>
      {showQuestion && (
        <ConfirmModal
          title={t('baseCurrencyQuestion')}
          content={(
            <>
              <GreyText>
                {t('changeBaseCurrencyQuestion', { baseCurrency })}
              </GreyText>
              <AdditionalParagraph>
                {t('youCanAlwaysConfigure', { baseCurrency })}
              </AdditionalParagraph>
            </>
          )}
          cancelLabel={t('keep', { baseCurrency })}
          confirmLabel={t('seeAvailableOptions')}
          onCancel={cancelBaseCurrencyQuestion}
          onConfirm={openCurrencySheet}
        />
      )}

      {isCurrencySheetOpen && (
        <ActionSheet
          isOpen
          onClose={cancelBaseCurrencyQuestion}
          onValueSelected={onCurrencySelected}
          title={t('selectYourBaseCurrency')}
          options={currencyOptions}
        />
      )}
    </>
  );
};

const AdditionalParagraph = styled(GreyText)`
  margin-top: 18px;
`;

export default BaseCurrencyQuestion;
