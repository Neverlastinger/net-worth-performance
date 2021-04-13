import React from 'react';
import Modal from '~/components/Modal';
import { BRAND_COLOR_RED } from '~/styles';

/**
 * Represents a confirm modal.
 * The user can cancel or confirm an action.
 *
 * @param {String} title
 * @param {React.Component} content, optional content component
 * @param {Function} onCancel
 * @param {Function} onConfirm
 * @param {String} cancelLabel: optional cancel label
 * @param {String} confirmLabel: optional confirm label
 */
const ConfirmModal = ({ title, content, onCancel, onConfirm, cancelLabel, confirmLabel }) => (
  <Modal
    onDismiss={onCancel}
    title={title}
    content={content}
    buttons={[
      {
        color: 'black',
        onPress: onCancel,
        label: cancelLabel || t('cancel')
      },
      {
        color: BRAND_COLOR_RED,
        onPress: onConfirm,
        label: confirmLabel || t('yes')
      }
    ]}
  />
);

export default ConfirmModal;
