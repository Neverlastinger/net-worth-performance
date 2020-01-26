import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { ActionSheetCustom } from 'react-native-custom-actionsheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BRAND_COLOR_RED } from '~/styles';

const CANCEL_INDEX = 0;

const TitleView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TitleText = styled.Text`
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

const Title = () => (
  <TitleView>
    <TitleText>Add/Remove Categories</TitleText>
    <AddAssetIcon name="edit" size={24} color={BRAND_COLOR_RED} />
  </TitleView>
);

const options = [
  t('categories.cancel'),
  t('categories.cash'),
  t('categories.stocks'),
  t('categories.bonds'),
  t('categories.p2pLending'),
  {
    component: <Title />,
    height: 48,
  },
];

const ActionSheet = ({ isOpen, onClose }) => {
  const actionSheetRef = useRef();

  useEffect(() => {
    isOpen && actionSheetRef.current.show();
  }, [isOpen]);

  const handlePress = (index) => {
    onClose(index);
  };

  return (
    <View>
      <ActionSheetCustom
        ref={actionSheetRef}
        title={t('categoryListTitle')}
        options={options}
        cancelButtonIndex={CANCEL_INDEX}
        onPress={handlePress}
      />
    </View>
  );
};

export default ActionSheet;
