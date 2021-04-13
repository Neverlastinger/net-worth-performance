import React, { useEffect, useRef } from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import { useSelector } from 'react-redux';
import { BRAND_COLOR_BLUE } from '~/styles';

/**
 * A global info message shown on top of the screen.
 */
const InfoMessage = () => {
  const dropDownAlertRef = useRef();
  const message = useSelector((state) => state.infoMessage);

  useEffect(() => {
    if (message) {
      showMessage();
    }
  }, [message]);

  const showMessage = () => {
    dropDownAlertRef.current.alertWithType(
      'info',
      message,
      '',
      null,
      6000
    );
  };

  return (
    <DropdownAlert
      ref={dropDownAlertRef}
      infoColor={BRAND_COLOR_BLUE}
    />
  );
};

export default InfoMessage;
