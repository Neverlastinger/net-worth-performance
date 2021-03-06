# Net Worth Performance

This is the source code of the [Net Worth Performance App](https://www.getnetworthapp.com/).

## To develop

- Generate `debug.keystore` and register the SHA1 in Firebase
- Add `.env` (`WEB_CLIENT_ID`, `EXCHANGERATESAPI_ACCESS_KEY`), `/android/app/google-services.json` & `/ios/GoogleService-Info.plist`
- `yarn`
- `yarn run cleanRNSVG`
- Fix images on iOS: https://github.com/facebook/react-native/issues/29279#issuecomment-658244428
- `npx react-native start --reset-cache`
- For android: `adb uninstall com.radoslavpopov.networthperformance`
- `npx react-native run-ios / run-android`

## To release
- https://reactnative.dev/docs/signed-apk-android
