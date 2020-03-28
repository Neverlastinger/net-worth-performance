import React from 'react';
import { formatCurrency } from '~/lib/currency';
import Modal from '~/components/Modal';
import TextField from '~/components/TextField';
import { BRAND_COLOR_RED } from '~/styles';

const UpdateMonthModal = ({ onDismiss, title, currency, currentAmount, onChangeText, onSavePressed, additionalButtons = [] }) => (
  <Modal
    onDismiss={onDismiss}
    title={title}
    content={(
      <TextField
        label={currentAmount
          ? t('currentAmount', { amount: formatCurrency({ amount: currentAmount, currency }) })
          : `${t('amount')} (${currency})`}
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
    )}
    buttons={[
      ...additionalButtons,
      {
        color: BRAND_COLOR_RED,
        onPress: onSavePressed,
        label: t('save')
      }
    ]}
  />
);

export default UpdateMonthModal;
