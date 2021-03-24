import React from 'react';
import { SwipeRow } from 'react-native-swipe-list-view';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BRAND_COLOR_RED, BRAND_COLOR_BLUE } from '~/styles';

export const SwipeableRow = styled(SwipeRow)`
  width: 100%;
  height: 60px;
`;

const ButtonView = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 60px;
`;

export const DeleteButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: ${BRAND_COLOR_RED};
`;

export const EditButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-left-width: 1px;
  border-left-color: hsla(0, 0%, 0%, 0.075);
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
const Row = ({ label, onDelete, onEdit, preview, onSelected }) => (
  <SwipeableRow preview={preview} previewOpenValue={-120} previewDuration={500} rightOpenValue={-120} disableRightSwipe stopRightSwipe={-120}>
    <ButtonView>
      <EditButton onPress={onEdit}>
        <Icon name="edit" color={BRAND_COLOR_BLUE} size={24} />
      </EditButton>
      <DeleteButton onPress={onDelete}>
        <Icon name="trash" color="white" size={24} />
      </DeleteButton>
    </ButtonView>
    <CategoryView onPress={() => { onSelected(label); }} underlayColor="#f9f9f9">
      <CategoryName>{label}</CategoryName>
    </CategoryView>
  </SwipeableRow>
);

export default Row;
