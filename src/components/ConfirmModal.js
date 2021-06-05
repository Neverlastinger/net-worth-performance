import React from 'react';
import Modal from '~/components/Modal';
import useColors from '~/hooks/useColors';

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
const ConfirmModal = ({ title, content, onCancel, onConfirm, cancelLabel, confirmLabel }) => {
  const colors = useColors();

  return (
    <Modal
      onDismiss={onCancel}
      title={title}
      content={content}
      buttons={[
        {
          color: colors.black,
          onPress: onCancel,
          label: cancelLabel || t('cancel')
        },
        {
          color: colors.BRAND_COLOR_RED,
          onPress: onConfirm,
          label: confirmLabel || t('yes')
        }
      ]}
    />
  );
};

export default ConfirmModal;
