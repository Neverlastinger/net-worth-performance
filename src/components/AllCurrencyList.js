import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, BackHandler } from 'react-native';
import styled from 'styled-components';
import { Flag } from 'react-native-svg-flagkit';
import useAllCurrencies from '../hooks/useAllCurrencies';
import FullscreenView from './FullscreenView';
import GreyText from '~/components/GreyText';
import BlackText from '~/components/BlackText';
import { CURRENCY_DATA } from '~/app/currencies';
import TextField from '~/components/TextField';
import BlackIcon from '~/components/BlackIcon';

const CurrencyView = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 36px 0;
  height: 48px;
`;

const CurrencyLabel = styled.View`
  flex: 1;
  height: 48px;
  padding: 0 84px;
`;

const Header = styled(BlackText)`
  font-size: 16px;
  font-weight: bold;
`;

const Name = styled(GreyText)`
  font-size: 12px;
`;

const FlagView = styled.View`
  position: absolute;
  left: 24px;
  top: 7px;
  width: 48px;
  height: 48px;
`;

const SearchBarWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 76px;
`;

const Back = styled.TouchableOpacity`
  justify-content: center;
  height: 76px;
  margin: 0 24px 0 36px;
`;

const SearchField = styled(TextField)`
  flex: 1;
`;

const CurrencyItem = ({ id, label }) => (
  <CurrencyView>
    <FlagView>
      <Flag id={id} width={48} height={48} />
    </FlagView>
    <CurrencyLabel>
      <Header>{label}</Header>
      <Name>{CURRENCY_DATA[label] ? CURRENCY_DATA[label].name : ''}</Name>
    </CurrencyLabel>
  </CurrencyView>
);

/**
 * Represents the all currencies overlay with a filter on top.
 */
const AllCurrencyList = ({ isOpen, onClose, onValueSelected }) => {
  const allCurrencies = useAllCurrencies();
  const [filteredCurrencies, setFilteredCurrencies] = useState(allCurrencies);

  const [filter, setFilter] = useState();

  useEffect(() => {
    filter
      ? setFilteredCurrencies(allCurrencies.filter((currency) => (
        currency.toLowerCase().indexOf(filter.toLowerCase()) !== -1
          || CURRENCY_DATA[currency].name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      )))
      : setFilteredCurrencies(allCurrencies);
  }, [filter]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleClose
    );

    return () => backHandler.remove();
  }, []);

  const handleClose = () => {
    onClose();
    setFilter('');
    return true;
  };

  return (
    <>
      {isOpen && (
        <FullscreenView>
          <SearchBarWrapper>
            <Back onPress={handleClose}>
              <BlackIcon name="chevron-left" size={18} />
            </Back>
            <SearchField
              label={t('search')}
              onChangeText={setFilter}
            />
          </SearchBarWrapper>
          <FlatList
            data={filteredCurrencies}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => { onValueSelected(item); setFilter(''); }}>
                <CurrencyItem id={item} label={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </FullscreenView>
      )}
    </>
  );
};

export default AllCurrencyList;
