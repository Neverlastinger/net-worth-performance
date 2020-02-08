import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextField from '~/components/TextField';
import ActionSheet from '~/components/ActionSheet';

/**
 * Represents a component that looks very similar to an input field, but brings out an action sheet to select an option.
 *
 * @param {String} label: input label
 * @param {String} actionSheetTitle
 * @param {Array} actionSheetOptions: array of components or strings, each one representing a row in the action sheet.
 * @param {Function} onClose: called when the action sheet closes
 * @param {String} selectedValue: a custom-selected value for this component;
 *                                 when not provided, the ActionSheet itself is responsible for providing the selected value
 * @param {hack} forceClose: a random value used to close the ActionSheet
 */
const SelectField = ({ label, actionSheetTitle, actionSheetOptions, onClose, selectedValue, forceClose, onValueSelected }) => {
  const [value, setValue] = useState();
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);

  useEffect(() => {
    setIsActionSheetOpen(false);
  }, [selectedValue]);

  useEffect(() => {
    setIsActionSheetOpen(false);
  }, [forceClose]);

  const openActionSheet = () => {
    setIsActionSheetOpen(true);
  };

  const closeActionSheet = () => {
    setIsActionSheetOpen(false);
    onClose && onClose();
  };

  const onSelected = (newValue) => {
    setValue(newValue);
    onValueSelected(newValue);
  };

  return (
    <TouchableOpacity onPress={openActionSheet}>
      <View>
        <TextField label={label} editable={false} pointerEvents="none" value={selectedValue || value} />
        <DropdownIcon name="chevron-down" size={8} color="#cacaca" />
      </View>
      <ActionSheet
        isOpen={isActionSheetOpen}
        onClose={closeActionSheet}
        onValueSelected={onSelected}
        title={actionSheetTitle}
        options={actionSheetOptions}
      />
    </TouchableOpacity>
  );
};

const DropdownIcon = styled(Icon)`
  position: absolute;
  top: 33px;
  right: 24px;
`;

export default SelectField;
