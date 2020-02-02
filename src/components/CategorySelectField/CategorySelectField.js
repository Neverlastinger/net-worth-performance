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
 * @param {Function} goToManageCategories: called to navigate to the manage categories screen
 */
const CategorySelectField = ({ goToManageCategories }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.assetCategories);
  const [selectedValue, setSelectedValue] = useState();
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
    setSelectedValue(value);
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
    goToManageCategories();
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
