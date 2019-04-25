# MotoApp Client - React Native App

The client's app

* [Driver's app](https://github.com/mdelclaro/motoappdriver-mobile)
* [Back-end](https://github.com/mdelclaro/motoapp-backend)

### Running (only on Android yet):
``` 
$ npm install 
$ npm run android
```

### Project's simplified structure:
```
.
├── src/                        # Source code
│   ├── assets/                 # Files and images
│   │   └── ...    
│   ├── components/             # Components used on the screens 
│   │   └── ...    
│   ├── screens/                # The screens of the app    
│   │   └── ...    
│   ├── store/                  # The app's state store and configuration
│   │   └── ...  
│   ├── App.js                  # App starting point after auth
│   ├── config.js               # App constants
│   ├── register-screens.js     # Screens registration for navigation
│   └── utils.js                # Util functions
├── index.js                    # App starting point
└── ...                         # Other configuration and standard files
```
