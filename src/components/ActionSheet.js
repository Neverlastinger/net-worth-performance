import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { ActionSheetCustom } from 'react-native-custom-actionsheet';

const CANCEL_INDEX = 0;

const ActionSheet = ({ isOpen, onValueSelected, onClose, title, options }) => {
  const actionSheetRef = useRef();

  useEffect(() => {
    isOpen && actionSheetRef.current.show();
  }, [isOpen]);

  const getComponentOptions = () => (
    [t('cancel'), ...options]
  );

  const handlePress = (index) => {
    const item = getComponentOptions()[index];
    index !== CANCEL_INDEX && onValueSelected(typeof item === 'string' ? item : item.value);
    onClose();
  };

  return (
    <View>
      <ActionSheetCustom
        ref={actionSheetRef}
        title={title}
        options={getComponentOptions(options)}
        cancelButtonIndex={CANCEL_INDEX}
        onPress={handlePress}
      />
    </View>
  );
};

export default ActionSheet;
