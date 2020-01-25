import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { initLocalization } from '~/i18n';

(async () => {
  await initLocalization();
  const { default: App } = await import('./App');
  AppRegistry.registerComponent(appName, () => App);
})();
