import React, { useState } from 'react';
import { formatCurrency } from '~/lib/currency';
import useColors from '~/hooks/useColors';
import Modal from '~/components/Modal';
import TextField from '~/components/TextField';

const UpdateMonthModal = ({ onDismiss, title, currency, currentAmount, onChangeText, onSavePressed, additionalButtons = [] }) => {
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const colors = useColors();

  const onValueChanged = (value) => {
    setIsSaveDisabled(value.length === 0);
    onChangeText(value);
  };

  return (
    <Modal
      onDismiss={onDismiss}
      title={title}
      content={(
        <TextField
          label={currentAmount
            ? t('currentAmount', { amount: formatCurrency({ amount: currentAmount, currency }) })
            : `${t('amount')} (${currency})`}
          onChangeText={onValueChanged}
          keyboardType="numeric"
          onSubmitEditing={onSavePressed}
        />
      )}
      buttons={[
        ...additionalButtons,
        {
          color: colors.BRAND_COLOR_RED,
          onPress: onSavePressed,
          label: t('save'),
          disabled: isSaveDisabled
        }
      ]}
    />
  );
};

export default UpdateMonthModal;
