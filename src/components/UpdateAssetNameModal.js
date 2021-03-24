import React, { useState } from 'react';
import Modal from '~/components/Modal';
import TextField from '~/components/TextField';
import { BRAND_COLOR_RED } from '~/styles';

const UpdateAssetNameModal = ({ onDismiss, title, onChangeText, onSavePressed, defaultValue }) => {
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
          label={t('addNewNameHere')}
          onChangeText={onValueChanged}
          onSubmitEditing={onSavePressed}
          defaultValue={defaultValue}
        />
      )}
      buttons={[
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

export default UpdateAssetNameModal;
