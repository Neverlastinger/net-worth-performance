import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { closeBaseCurrencyQuestion, saveBaseCurrency } from '~/store/actions';
import ConfirmModal from '~/components/ConfirmModal';
import ActionSheet from '~/components/ActionSheet';
import { OPTIONS as CURRENCY_OPTIONS } from '~/components/CurrencySelectField';
import { STORAGE_KEYS } from '~/const';

/**
 * Encapsulates a popup that asks the user about their base currency preferences, as well as the currency action sheet selection.
 */
const BaseCurrencyQuestion = () => {
  const dispatch = useDispatch();
  const showBaseCurrencyQuestion = useSelector((state) => state.showBaseCurrencyQuestion);
  const [showQuestion, setShowQuestion] = useState(false);
  const baseCurrency = useSelector((state) => state.user.baseCurrency);
  const [isCurrencySheetOpen, setIsCurrencySheetOpen] = useState(false);

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
              <Text>
                {t('changeBaseCurrencyQuestion', { baseCurrency })}
              </Text>
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
          options={CURRENCY_OPTIONS}
        />
      )}
    </>
  );
};

const AdditionalParagraph = styled.Text`
  margin-top: 18px;
`;

export default BaseCurrencyQuestion;
