import React from 'react';
import { Text } from 'react-native';
import ConfirmModal from '~/components/ConfirmModal';

/**
 * Encapsulates a popup that is shown when the user selects the previous month but no assets have been added for it.
 */
const NoPrevMonthQuestion = ({ isActive, onCancel, onConfirm, earlierMonth }) => (
  <>
    {isActive && (
      <ConfirmModal
        title={t('noDataPrior', { month: earlierMonth })}
        content={(
          <Text>{t('noPrevMonthAddHistoricalData', { month: earlierMonth })}</Text>
        )}
        cancelLabel={t('noThanks')}
        confirmLabel={t('addHistoricalData')}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    )}
  </>
);

export default NoPrevMonthQuestion;
