import { Navigation } from 'react-native-navigation';
import registerScreens from './src/register-screens';
import './src/config/ReactotronConfig';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'motoapp.Auth'
      }
    }
  });
});
