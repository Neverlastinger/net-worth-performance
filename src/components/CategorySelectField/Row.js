import React from 'react';
import { SwipeRow } from 'react-native-swipe-list-view';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BRAND_COLOR_RED } from '~/styles';

export const SwipeableRow = styled(SwipeRow)`
  width: 100%;
  height: 60px;
`;

export const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: ${BRAND_COLOR_RED};
`;

export const CategoryView = styled.TouchableHighlight`
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
`;

export const CategoryName = styled.Text`
  font-size: 20px;
  color: #2f7cf6;
`;

/**
 * Swipeable row in the category list.
 *
 * @param {String} label
 * @param {Function} onDelete: called when the delete button is pressed
 * @param {Boolean} preview: indicates if a swipe preview should be displayed for this row
 * @param {Function} onSelected: called when an option is selected; passes the label as an arg
 */
const Row = ({ label, onDelete, preview, onSelected }) => (
  <SwipeableRow preview={preview} previewOpenValue={-60} previewDuration={500} rightOpenValue={-60} disableRightSwipe stopRightSwipe={-60}>
    <DeleteButton onPress={onDelete}>
      <Icon name="trash" color="white" size={24} />
    </DeleteButton>
    <CategoryView onPress={() => { onSelected(label); }} underlayColor="#f9f9f9">
      <CategoryName>{label}</CategoryName>
    </CategoryView>
  </SwipeableRow>
);

export default Row;
