import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useSelector } from 'react-redux';
import { getActiveMonths } from '~/store/reducers';
import { dateKeyToHumanReadable } from '~/lib/dates';
import ConfirmModal from '~/components/ConfirmModal';

/**
 * This components subscribes to Firebase push notifications (Cloud Messaging) and displays a Modal when one is received.
 * It also requests permissions on iOS.
 *
 * @param {Object} navigation: react-native-navigation's navigation object
 */
const NotificationHandler = ({ navigation }) => {
  const [remoteData, setRemoteData] = useState(false);
  const activeMonths = useSelector(getActiveMonths);

  useEffect(() => {
    messaging().requestPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (message) => {
      setRemoteData(message.data);
    });

    messaging().onNotificationOpenedApp(async (message) => {
      if (message.data.dateKey) {
        navigation.navigate('UpdateExistingAssets');
        setRemoteData(false);
      }
    });

    return unsubscribe;
  }, []);

  const hasNoAssetsForNotificationMonth = () => (
    activeMonths[0] && remoteData.dateKey && activeMonths[0] !== remoteData.dateKey
  );

  return (
    <>
      {remoteData && remoteData.dateKey && hasNoAssetsForNotificationMonth() && (
        <ConfirmModal
          title={t('welcomeToNewMonthTitle', { month: dateKeyToHumanReadable(remoteData.dateKey) })}
          content={(
            <Text>{t('welcomeToNewMonthModalMessage')}</Text>
          )}
          cancelLabel={t('maybeLater')}
          confirmLabel={t('addDataFor', { month: dateKeyToHumanReadable(remoteData.dateKey) })}
          onCancel={() => { setRemoteData(false); }}
          onConfirm={() => { navigation.navigate('UpdateExistingAssets'); setRemoteData(false); }}
        />
      )}
    </>
  );
};

export default NotificationHandler;
