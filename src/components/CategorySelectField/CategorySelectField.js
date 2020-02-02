import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAssetCategory } from '~/store/actions';
import SelectField from '~/components/SelectField';
import ManageCategoriesRow from './ManageCategoriesRow';
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
    component: <ManageCategoriesRow onPress={onManageCategoriesClick} />,
    height: 48,
  });

  const [options, setOptions] = useState(initialOptions);

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
