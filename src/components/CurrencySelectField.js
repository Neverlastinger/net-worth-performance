import React, { useState } from 'react';
import SelectField from '~/components/SelectField';
import useCurrencyComponents from '../hooks/useCurrencyComponents';
import AllCurrencyList from './AllCurrencyList';

/**
 * Represents a select field for currency selection.
 * An action sheet with all available currencies is opened when the user taps on the component.
 *
 * @param {Function} onValueSelected: called when an action sheet value is selected
 * @param {String} label: an optional label
 * @param {String} selectedValue: an optional selected value to make this component controlled
 */
const CurrencySelectField = ({ onValueSelected, label, selectedValue }) => {
  const options = useCurrencyComponents();
  const [viewAllCurrencies, setViewAllCurrencies] = useState(false);

  const handleSelectedValue = (value) => {
    if (value === 'VIEW_ALL') {
      setViewAllCurrencies(true);
      return;
    }

    setViewAllCurrencies(false);

    if (value !== 'SEPARATOR') {
      onValueSelected(value);
    }
  };

  return (
    <>
      <AllCurrencyList
        isOpen={viewAllCurrencies}
        onValueSelected={handleSelectedValue}
        onClose={() => { setViewAllCurrencies(false); }}
      />

      <SelectField
        label={label || t('currency')}
        actionSheetTitle={t('currencyListTitle')}
        actionSheetOptions={options}
        onValueSelected={handleSelectedValue}
        selectedValue={selectedValue}
      />
    </>
  );
};

export default CurrencySelectField;
