import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BRAND_COLOR_RED } from '~/styles';
import SelectField from '~/components/SelectField';

const EditView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const EditText = styled.Text`
  flex: 1;
  padding: 0 48px;
  font-size: 16px;
  color: ${BRAND_COLOR_RED};
  text-align: center;
`;

const AddAssetIcon = styled(Icon)`
  position: absolute;
  right: 12px;
  top: 0px;
`;

const EditCategories = () => (
  <EditView>
    <EditText>Add/Remove Categories</EditText>
    <AddAssetIcon name="edit" size={24} color={BRAND_COLOR_RED} />
  </EditView>
);

const SwipeableRow = styled(SwipeRow)`
  width: 100%;
  height: 60px;
`;

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: ${BRAND_COLOR_RED};
`;

const CategoryView = styled.TouchableHighlight`
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
`;

const CategoryName = styled.Text`
  font-size: 20px;
  color: #2f7cf6;
`;

const DeletedRowText = styled.Text`
  opacity: 0.3;
  text-decoration: line-through;
`;

const DeletedRowWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
`;

const DeletedRow = ({ text }) => (
  <TouchableWithoutFeedback
    onPress={(e) => { e.stopPropagation(); }}
  >
    <DeletedRowWrapper>
      <DeletedRowText>{text}</DeletedRowText>
    </DeletedRowWrapper>
  </TouchableWithoutFeedback>
);

/**
 * Represents a SelectField for asset categories.
 * Provides functionality to delete a category by swiping.
 */
const CategorySelectField = () => {
  const [selectedValue, setSelectedValue] = useState();

  const onSelected = (value) => {
    setSelectedValue(value);
  };

  /**
   * Swipeable row in the category list.
   *
   * @param {String} label
   * @param {Function} onDelete: called when the delete button is pressed
   * @param {Boolean} preview: indicates if a swipe preview should be displayed for this row
   */
  const CategoryRow = ({ label, onDelete, preview }) => (
    <SwipeableRow preview={preview} previewOpenValue={-60} previewDuration={500} rightOpenValue={-60} disableRightSwipe stopRightSwipe={-60}>
      <DeleteButton onPress={onDelete}>
        <Icon name="trash" color="white" size={24} />
      </DeleteButton>
      <CategoryView onPress={() => { onSelected(label); }} underlayColor="#f9f9f9">
        <CategoryName>{label}</CategoryName>
      </CategoryView>
    </SwipeableRow>
  );

  const deleteOption = (id) => {
    setOptions((prevOptions) => (
      prevOptions.map((option) => (
        option.id === id
          ? {
            ...option,
            component: <DeletedRow text={option.label} />,
            deleted: true
          }
          : option
      ))
    ));
  };

  const removeDeletedRows = () => {
    setOptions((prevOptions) => (
      prevOptions.filter((option) => (
        !option.deleted
      ))
    ));
  };

  const INITIAL_OPTIONS = [
    {
      component: <CategoryRow label={t('categories.cash')} onDelete={() => deleteOption(1)} preview />,
      height: 60,
      id: 1,
      label: t('categories.cash')
    },
    {
      component: <CategoryRow label={t('categories.stocks')} onDelete={() => deleteOption(2)} />,
      height: 60,
      id: 2,
      label: t('categories.stocks')
    },
    {
      component: <CategoryRow label={t('categories.bonds')} onDelete={() => deleteOption(3)} />,
      height: 60,
      id: 3,
      label: t('categories.bonds')
    },
    {
      component: <CategoryRow label={t('categories.p2pLending')} onDelete={() => deleteOption(4)} />,
      height: 60,
      id: 4,
      label: t('categories.p2pLending')
    },
    {
      component: <EditCategories />,
      height: 48,
    },
  ];

  const [options, setOptions] = useState(INITIAL_OPTIONS);

  return (
    <SelectField
      label={t('category')}
      actionSheetTitle={t('categoryListTitle')}
      actionSheetOptions={options}
      onClose={removeDeletedRows}
      selectedValue={selectedValue}
    />
  );
};

export default CategorySelectField;
