import React, { useState } from 'react';
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

  const INITIAL_OPTIONS = [
    {
      component: <Row label={t('categories.cash')} onDelete={() => deleteOption(1)} onSelected={onSelected} preview />,
      height: 60,
      id: 1,
      label: t('categories.cash')
    },
    {
      component: <Row label={t('categories.stocks')} onDelete={() => deleteOption(2)} onSelected={onSelected} />,
      height: 60,
      id: 2,
      label: t('categories.stocks')
    },
    {
      component: <Row label={t('categories.bonds')} onDelete={() => deleteOption(3)} onSelected={onSelected} />,
      height: 60,
      id: 3,
      label: t('categories.bonds')
    },
    {
      component: <Row label={t('categories.p2pLending')} onDelete={() => deleteOption(4)} onSelected={onSelected} />,
      height: 60,
      id: 4,
      label: t('categories.p2pLending')
    },
    {
      component: <ManageCategoriesRow onPress={onManageCategoriesClick} />,
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
      forceClose={forceCloseActionSheet}
    />
  );
};

export default CategorySelectField;
