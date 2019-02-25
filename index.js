import { Navigation } from 'react-native-navigation';
import registerScreens from './src/RegisterScreens';

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
