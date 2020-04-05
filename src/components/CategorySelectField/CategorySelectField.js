import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAssetCategory } from '~/store/actions';
import SelectField from '~/components/SelectField';
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
 */
const CategorySelectField = ({ goToAddCategory, onValueSelected, selectedValue }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.assetCategories);
  const [forceCloseActionSheet, setForceCloseActionSheet] = useState();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const initialOptions = categories.map((category, i) => ({
      component: (
        <Row
          label={category.name}
          onDelete={() => deleteOption(category.id)}
          onSelected={onSelected}
          preview={i === 0}
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
  }, [categories]);

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

  return (
    <SelectField
      label={t('category')}
      actionSheetTitle={t('categoryListTitle')}
      actionSheetOptions={options}
      onClose={removeDeletedRows}
      selectedValue={selectedValue}
      forceClose={forceCloseActionSheet}
    />
  );
};

export default CategorySelectField;
