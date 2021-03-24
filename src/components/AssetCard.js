import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { updateAsset, deleteAsset as deleteAssetAction } from '~/store/actions';
import { formatCurrency } from '~/lib/currency';
import { dateKeyToHumanReadable, getSortedMonthKeys, getDateKey, fillEmptyMonths, addTrailingMonths } from '~/lib/dates';
import { getGrowthPercentage } from '~/lib/number';
import TappableWrapper from '~/components/TappableWrapper';
import ActionButton from '~/components/ActionButton';
import UpdateNameModal from '~/components/UpdateNameModal';
import TextLink from '~/components/TextLink';
import ConfirmModal from '~/components/ConfirmModal';
import { BRAND_COLOR_RED, LIGHT_TEXT_COLOR } from '~/styles';

const TRAILING_MONTHS_BATCH = 3;

const AssetCard = ({ asset, onPress, onMonthPress, maxMonthsShown, showEmptyMonths, showAddHistoricData, showDeleteAsset }) => {
  const dispatch = useDispatch();
  const currentMonthKey = getDateKey(new Date());
  const [months, setMonths] = useState(getSortedMonthKeys(asset.amount));
  const [trailingMonths, setTrailingMonths] = useState(0);
  const [isEditTitleOpen, setIsEditTitleOpen] = useState(false);
  const newAssetNameRef = useRef();

  const [isDeleteConfirmShown, setIsDeleteConfirmShown] = useState(false);

  useEffect(() => {
    let monthList = getSortedMonthKeys(asset.amount);

    monthList = maxMonthsShown
      ? monthList.slice(0, maxMonthsShown)
      : monthList;

    monthList = showEmptyMonths
      ? fillEmptyMonths(monthList)
      : monthList;

    monthList = trailingMonths
      ? addTrailingMonths(monthList, trailingMonths)
      : monthList;

    setMonths(monthList);
  }, [asset.amount, trailingMonths, maxMonthsShown, showEmptyMonths]);

  const renderMonth = (monthKey) => (
    dateKeyToHumanReadable(monthKey).split(' ').map((word) => (
      <MonthWord key={word}>{word}</MonthWord>
    ))
  );

  const onAddHistoricDataPress = () => {
    setTrailingMonths((prev) => (
      prev + TRAILING_MONTHS_BATCH
    ));
  };

  const growth = calculateGrowth(asset, months);

  const isAssetOutdated = months[0] !== currentMonthKey;

  useEffect(() => {
    maxMonthsShown && isAssetOutdated && setMonths((m) => m.slice(0, -1));
  }, [isAssetOutdated, maxMonthsShown]);

  const onTitlePress = () => {
    setIsEditTitleOpen(true);
  };

  const updateAssetName = () => {
    setIsEditTitleOpen(false);

    dispatch(updateAsset({
      ...asset,
      name: newAssetNameRef.current
    }));
  };

  const onDeletePress = () => {
    setIsDeleteConfirmShown(true);
  };

  const deleteAsset = () => {
    dispatch(deleteAssetAction(asset.id));
  };

  return (
    <AssetWrapper>
      <TappableWrapper onPress={onPress}>
        <Title>
          <TitleText>
            {asset.name}
          </TitleText>
          <TouchableOpacity onPress={onTitlePress}>
            <EditIcon name="edit" size={18} />
          </TouchableOpacity>
        </Title>

        {isAssetOutdated && (
          <TappableWrapper onPress={onMonthPress && (() => { onMonthPress(currentMonthKey); })}>
            <MonthData key={currentMonthKey}>
              <Month>
                {renderMonth(currentMonthKey)}
              </Month>
              <OutdatedText>{t('outdatedAssetText')}</OutdatedText>
            </MonthData>
          </TappableWrapper>
        )}

        {months.map((monthKey) => (
          <TappableWrapper key={monthKey} onPress={onMonthPress && (() => { onMonthPress(monthKey); })}>
            <MonthData>
              <Month>
                {renderMonth(monthKey)}
              </Month>
              <Amount>
                <AmountText>
                  {asset.amount[monthKey] !== undefined
                    ? formatCurrency({
                      amount: asset.amount[monthKey],
                      currency: asset.currency
                    })
                    : <OutdatedText>{t('outdatedAssetText')}</OutdatedText>
                  }
                </AmountText>
                {growth[monthKey] && growth[monthKey].absolute !== null && growth[monthKey].absolute !== 0 && (
                  <>
                    <AmountDetailsText style={{ color: growth[monthKey].isPositive ? 'green' : 'red' }}>
                      {
                        `${growth[monthKey].isPositive ? '+' : ''}${formatCurrency({
                          amount: growth[monthKey].absolute,
                          currency: asset.currency
                        })}`
                      }
                    </AmountDetailsText>
                    <AmountDetailsText style={{ color: growth[monthKey].isPositive ? 'green' : 'red' }}>
                      {growth[monthKey].percentage}
                    </AmountDetailsText>
                  </>
                )}
                {asset.amount[monthKey] !== undefined && !asset.isInBaseCurrency && (
                  <AmountDetailsText>
                    {formatCurrency({
                      amount: asset.amountInBaseCurrency[monthKey],
                      currency: asset.baseCurrency
                    })}
                  </AmountDetailsText>
                )}
              </Amount>
            </MonthData>
          </TappableWrapper>
        ))}

        {maxMonthsShown && months.length > maxMonthsShown && (
          <MonthData>
            <Month>
              <MonthWord>
                ...
              </MonthWord>
            </Month>
          </MonthData>
        )}

        {showAddHistoricData && months.length > 0 && (
          <ButtonView>
            <ActionButton label={t('addHistoricDataButton')} onPress={onAddHistoricDataPress} />
          </ButtonView>
        )}

        {showDeleteAsset && (
          <ButtonView>
            <TextLink label={t('deleteAsset')} onPress={onDeletePress} />
          </ButtonView>
        )}
      </TappableWrapper>

      {isDeleteConfirmShown && (
        <ConfirmModal
          title={t('deleteAssetForever', { assetName: asset.name })}
          onCancel={() => { setIsDeleteConfirmShown(false); }}
          onConfirm={deleteAsset}
        />
      )}

      {isEditTitleOpen && (
        <UpdateNameModal
          title={t('changeAssetName')}
          onChangeText={(value) => { newAssetNameRef.current = value; }}
          onDismiss={() => { setIsEditTitleOpen(false); }}
          onSavePressed={updateAssetName}
          defaultValue={asset.name}
        />
      )}
    </AssetWrapper>
  );
};

const calculateGrowth = (asset, months) => (
  months.reduce((result, currentMonth, index) => ({
    ...result,
    [currentMonth]: {
      percentage: months[index + 1] && asset.amount[currentMonth] && asset.amount[months[index + 1]]
        ? getGrowthPercentage({
          current: asset.amount[currentMonth],
          prev: asset.amount[months[index + 1]]
        })
        : null,
      absolute: months[index + 1] && asset.amount[currentMonth] && asset.amount[months[index + 1]]
        ? asset.amount[currentMonth] - asset.amount[months[index + 1]]
        : null,
      isPositive: asset.amount[currentMonth] >= asset.amount[months[index + 1]]
    }
  }), {})
);

const AssetWrapper = styled(Surface)`
  margin: 12px;
  padding: 30px 18px;
  backgroundColor: white;
  elevation: 2;
`;

const Title = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

const TitleText = styled.Text`
  font-size: 24px;
  font-weight: 500;
`;

const EditIcon = styled(Icon)`
  padding: 4px;
  padding-left: 12px;
  marginTop: 4px;
`;

const MonthData = styled(Surface)`
  flex-direction: row;
  margin-bottom: 6px;
  padding: 12px;
  elevation: 2;
`;

const Month = styled.View`
  flex: 2;
  flex-direction: row;
`;

const MonthWord = styled.Text`
  min-width: 24px;
  margin-right: 6px;
  font-size: 13px;
  font-weight: 500;
`;

const Amount = styled.View`
  flex: 1;
`;

const AmountText = styled.Text`
  margin-bottom: 2px;
  font-size: 12px;
  font-weight: 700;
`;

const AmountDetailsText = styled.Text`
  margin-bottom: 2px;
  font-size: 12px;
  color: ${LIGHT_TEXT_COLOR}
`;

const OutdatedText = styled.Text`
  flex: 1;
  font-size: 11px;
  font-style: italic;
  color: ${BRAND_COLOR_RED};
`;

const ButtonView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-top: 60px;
`;

export default AssetCard;
