import React, { useState } from 'react';
import { formatCurrency } from '~/lib/currency';
import Modal from '~/components/Modal';
import TextField from '~/components/TextField';
import { BRAND_COLOR_RED } from '~/styles';

const UpdateMonthModal = ({ onDismiss, title, currency, currentAmount, onChangeText, onSavePressed, additionalButtons = [] }) => {
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

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
        />
      )}
      buttons={[
        ...additionalButtons,
        {
          color: BRAND_COLOR_RED,
          onPress: onSavePressed,
          label: t('save'),
          disabled: isSaveDisabled
        }
      ]}
    />
  );
};

export default UpdateMonthModal;
