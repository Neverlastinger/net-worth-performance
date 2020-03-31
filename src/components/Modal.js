import React from 'react';
import styled from 'styled-components/native';
import { Dialog, Portal, Button } from 'react-native-paper';

/**
 * Represents an overlay modal.
 *
 * @param {Function}        onDismiss
 * @param {String}          title
 * @param {React.Component} content
 * @param {Array}           buttons
 */
const Modal = ({ onDismiss, title, content, buttons }) => (
  <Portal>
    <Dialog visible onDismiss={onDismiss}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        {content}
      </Dialog.Content>
      <Dialog.Actions>
        <ModalActionWrapper>
          {buttons.map((button) => (
            <Button
              key={button.label}
              color={button.color}
              onPress={button.onPress}
              disabled={button.disabled}
            >
              {button.label}
            </Button>
          ))}
        </ModalActionWrapper>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

const ModalActionWrapper = styled.View`
  flex-direction: column;
  align-items: flex-end;
`;

export default Modal;
