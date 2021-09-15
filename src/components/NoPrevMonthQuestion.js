import React from 'react';
import ConfirmModal from '~/components/ConfirmModal';
import GreyText from '~/components/GreyText';

/**
 * Encapsulates a popup that is shown when the user selects the previous month but no assets have been added for it.
 */
const NoPrevMonthQuestion = ({ isActive, onCancel, onConfirm, earlierMonth }) => (
  <>
    {isActive && (
      <ConfirmModal
        title={t('noDataPrior', { month: earlierMonth })}
        content={(
          <GreyText>{t('noPrevMonthAddHistoricalData', { month: earlierMonth })}</GreyText>
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
