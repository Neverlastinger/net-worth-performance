import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import ConfirmModal from '~/components/ConfirmModal';
import Modal from '~/components/Modal';

const NOTIFICATION_TYPES = {
  NEW_MONTH: 'NEW_MONTH'
};

/**
 * This components subscribes to Firebase push notifications (Cloud Messaging) and displays a Modal when one is received.
 * It also requests permissions on iOS.
 *
 * @param {Object} navigation: react-native-navigation's navigation object
 */
const NotificationHandler = ({ navigation }) => {
  const [remoteData, setRemoteData] = useState(false);

  useEffect(() => {
    messaging().requestPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (message) => {
      setRemoteData(message.data);
    });

    messaging().onNotificationOpenedApp(async (message) => {
      if (message.data.type === NOTIFICATION_TYPES.NEW_MONTH) {
        navigation.navigate('UpdateExistingAssets');
        setRemoteData(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {remoteData && (
        <>
          {remoteData.type === NOTIFICATION_TYPES.NEW_MONTH ? (
            <ConfirmModal
              title={remoteData.notification.title}
              content={(
                <Text>{remoteData.notification.body}</Text>
              )}
              cancelLabel={t('maybeLater')}
              confirmLabel={t('updateAssetValues')}
              onCancel={() => { setRemoteData(false); }}
              onConfirm={() => { navigation.navigate('UpdateExistingAssets'); setRemoteData(false); }}
            />
          ) : (
            <Modal
              title={remoteData.notification.title}
              content={(
                <Text>{remoteData.notification.body}</Text>
              )}
              onDismiss={() => { setRemoteData(false); }}
            />
          )}
        </>
      )}
    </>
  );
};

export default NotificationHandler;
