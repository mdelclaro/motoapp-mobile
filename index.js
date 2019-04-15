import { Navigation } from "react-native-navigation";
import registerScreens from "./src/register-screens";

registerScreens();

// Navigation.events().registerAppLaunchedListener(() => {
//   Navigation.setRoot({
//     root: {
//       component: {
//         name: "motoapp.Auth"
//       }
//     }
//   });
// });

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "motoapp.Chats"
      }
    }
  });
});
