import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { ActionSheetCustom } from 'react-native-custom-actionsheet';

const CANCEL_INDEX = 0;

/**
 * Native-looking action sheet.
 *
 * @param {Boolean} isOpen: opens/shows this component
 * @param {Function}  onValueSelected: called when a value (action) is selected
 * @param {Function}  onClose: called when the component closes
 * @param {String}  title: action sheet title
 * @param {Array}  options: array of components or strings - one per action in the sheet
 */
const ActionSheet = ({ isOpen, onValueSelected, onClose, title, options }) => {
  const actionSheetRef = useRef();

  useEffect(() => {
    isOpen ? actionSheetRef.current.show() : actionSheetRef.current.hide();
  }, [isOpen]);

  const getComponentOptions = () => (
    [t('close'), ...options]
  );

  const handlePress = (index) => {
    onClose();

    if (!index) {
      return;
    }

    const item = getComponentOptions()[index];
    index !== CANCEL_INDEX && onValueSelected(typeof item === 'string' ? item : item.value);
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
