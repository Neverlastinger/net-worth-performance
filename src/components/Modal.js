import React from 'react';
import styled from 'styled-components/native';
import { Dialog, Portal, Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useDarkMode } from 'react-native-dark-mode';

/**
 * Represents an overlay modal.
 *
 * @param {Function}        onDismiss
 * @param {String}          title
 * @param {React.Component} content
 * @param {Array}           buttons
 */
const Modal = ({ onDismiss, title, content, buttons = [] }) => {
  const isDark = useDarkMode();

  const theme = isDark
    ? {
      ...DefaultTheme,
      colors: {
        background: 'black',
        backdrop: 'hsla(0, 0%, 15%, 0.75)',
        text: 'white',
        surface: 'black'
      }
    } : {
      ...DefaultTheme
    };

  return (
    <Portal>
      <PaperProvider theme={theme}>
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
      </PaperProvider>
    </Portal>
  );
};

const ModalActionWrapper = styled.View`
  flex-direction: column;
  align-items: flex-end;
`;

export default Modal;
