import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextField from '~/components/TextField';
import ActionSheet from '~/components/ActionSheet';

const SelectField = ({ label, actionSheetTitle, actionSheetOptions }) => {
  const [value, setValue] = useState();
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);

  const openActionSheet = () => {
    setIsActionSheetOpen(true);
  };

  const closeActionSheet = () => {
    setIsActionSheetOpen(false);
  };

  const onValueSelected = (newValue) => {
    setValue(newValue);
  };

  return (
    <TouchableOpacity onPress={openActionSheet}>
      <View>
        <TextField label={label} editable={false} pointerEvents="none" value={value} />
        <DropdownIcon name="chevron-down" size={8} color="#cacaca" />
      </View>
      <ActionSheet
        isOpen={isActionSheetOpen}
        onClose={closeActionSheet}
        onValueSelected={onValueSelected}
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
