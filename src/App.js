import { Platform } from "react-native";
import { Navigation } from "react-native-navigation";
import { getImageSource } from "react-native-vector-icons/Ionicons";
import { store } from "./store/configureStore";
import { uiStopLoading } from "./store/actions/UIAction";

import { baseColor } from "./config";

console.disableYellowBox = true;

Navigation.setDefaultOptions({
  topBar: {
    visible: false,
    drawBehind: true,
    animate: false
  }
});

const startApp = () => {
  Promise.all([
    getImageSource(
      Platform.OS === "android" ? "md-pin" : "ios-pin",
      35,
      baseColor
    ),
    getImageSource(
      Platform.OS === "android" ? "md-paper-plane" : "ios-paper-plane",
      35,
      baseColor
    ),
    getImageSource(
      Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back",
      35,
      baseColor
    )
  ]).then(icons => {
    Navigation.setRoot({
      root: {
        sideMenu: {
          right: {
            component: {
              id: "rightDrawer",
              name: "motoapp.SideMenu"
            }
          },
          center: {
            bottomTabs: {
              id: "bottomTabs",
              backgroundColor: "white",
              options: {
                topbar: {
                  visible: true,
                  id: "topBar",
                  title: {
                    text: "Moto App"
                  }
                }
              },
              children: [
                {
                  stack: {
                    id: "tab1",
                    children: [
                      {
                        component: {
                          id: "Main",
                          name: "motoapp.Main",
                          options: {
                            topbar: {
                              visible: true
                              // leftButton: [
                              //   {
                              //     id: "backButton",
                              //     icon: icons[2],
                              //     visible: false
                              //   }
                              // ]
                            },
                            bottomTab: {
                              text: "Corrida",
                              textColor: "white",
                              selectedTextColor: "white",
                              icon: icons[0],
                              iconColor: "white"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
                // {
                //   stack: {
                //     id: "tab2",
                //     children: [
                //       {
                //         component: {
                //           id: "Home2",
                //           name: "motoapp.Main",
                //           options: {
                //             bottomTab: {
                //               text: "Entrega",
                //               textColor: "white",
                //               icon: icons[1],
                //               iconColor: "white"
                //             }
                //           }
                //         }
                //       }
                //     ]
                //   }
                // }
              ]
            }
          },
          options: {
            sideMenu: {
              right: {
                width: 260
              }
            }
          }
        }
      }
    });
    store.dispatch(uiStopLoading());
  });
};

export default startApp;
