import React from 'react';
import Modal from '~/components/Modal';
import { BRAND_COLOR_RED } from '~/styles';

const ConfirmModal = ({ title, onCancel, onConfirm }) => (
  <Modal
    onDismiss={onCancel}
    title={title}
    buttons={[
      {
        color: 'black',
        onPress: onCancel,
        label: t('cancel')
      },
      {
        color: BRAND_COLOR_RED,
        onPress: onConfirm,
        label: t('yes')
      }
    ]}
  />
);

export default ConfirmModal;
