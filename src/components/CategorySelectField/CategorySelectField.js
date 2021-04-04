import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteAssetCategory, updateAssetCategory } from '~/store/actions';
import SelectField from '~/components/SelectField';
import UpdateNameModal from '~/components/UpdateNameModal';
import AddCategoryRow from './AddCategoryRow';
import DeletedRow from './DeletedRow';
import Row from './Row';

/**
 * Represents a SelectField for asset categories.
 * Provides functionality to delete a category by swiping.
 *
 * @param {Function} goToAddCategory: called to navigate to the add category screen
 * @param {Function} onValueSelected: called when a value is selected
 * @param {Function} selectedValue: input field value
 * @param {Boolean}  hasCategoryPreviewBeenShown: indicates if the functionality preview has been shown before on this phone
 */
const CategorySelectField = ({ goToAddCategory, onValueSelected, selectedValue, hasCategoryPreviewBeenShown }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.assetCategories);
  const [forceCloseActionSheet, setForceCloseActionSheet] = useState();
  const [options, setOptions] = useState([]);
  const [editableOption, setEditableOption] = useState();
  const newCategoryNameRef = useRef();

  useEffect(() => {
    const initialOptions = categories.map((category, i) => ({
      component: (
        <Row
          label={category.name}
          onDelete={() => deleteOption(category.id)}
          onEdit={() => onEditOption(category)}
          onSelected={onSelected}
          preview={!hasCategoryPreviewBeenShown && i === 0}
        />
      ),
      height: 60,
      id: category.id,
      label: category.name
    }));

    initialOptions.push({
      component: <AddCategoryRow onPress={onManageCategoriesClick} />,
      height: 48,
    });

    setOptions(initialOptions);
  }, [categories, hasCategoryPreviewBeenShown]);

  const onOpen = async () => {
    await AsyncStorage.setItem('category-preview-shown', 'YES');
  };

  const onSelected = (value) => {
    onValueSelected(value);
  };

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
    options.forEach((option) => {
      option.deleted && dispatch(deleteAssetCategory(option.id));
    });

    setOptions((prevOptions) => (
      prevOptions.filter((option) => (
        !option.deleted
      ))
    ));
  };

  const onManageCategoriesClick = () => {
    setForceCloseActionSheet(new Date());
    goToAddCategory();
  };

  const onEditOption = (option) => {
    setForceCloseActionSheet(new Date());
    setEditableOption(option);
  };

  const updateCategoryName = () => {
    dispatch(updateAssetCategory(editableOption, newCategoryNameRef.current));
    setEditableOption(null);
  };

  return (
    <>
      <SelectField
        label={t('category')}
        actionSheetTitle={t('categoryListTitle')}
        actionSheetOptions={options}
        onClose={removeDeletedRows}
        onOpen={onOpen}
        selectedValue={selectedValue}
        forceClose={forceCloseActionSheet}
      />
      {editableOption && (
        <UpdateNameModal
          title={t('updateCategoryName')}
          defaultValue={editableOption.name}
          onDismiss={() => { setEditableOption(null); }}
          onChangeText={(value) => { newCategoryNameRef.current = value; }}
          onSavePressed={updateCategoryName}
        />
      )}
    </>
  );
};

export default CategorySelectField;
