import * as React from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const AddModal = ({ onDismiss }) => (
  <Portal>
    <Dialog visible onDismiss={onDismiss}>
      <Dialog.Title>Alert</Dialog.Title>
      <Dialog.Content>
        <Paragraph>This is simple dialog</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Done</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

export default AddModal;
