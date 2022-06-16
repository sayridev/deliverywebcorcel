import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigator/StackNavigator';
import {Provider as PaperProvider} from 'react-native-paper';
import {LogBox} from 'react-native';
import {FirebaseProvider} from './src/context/firebase/FirebaseContext';
import {AuthProvider} from './src/context/auth/AuthContext';
import {SnackBarProvider} from './src/context/snackBar/SnackBarContext';
import {ShoppingProvider} from './src/context/shopping/ShoppingContext';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
LogBox.ignoreLogs(['AsyncStorage']);
LogBox.ignoreLogs(['ViewPropTypes']);
LogBox.ignoreLogs(['EventEmitter.removeListener']);
const AppState = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return (
    <SnackBarProvider>
      <FirebaseProvider>
        <AuthProvider>
          <ShoppingProvider>{children}</ShoppingProvider>
        </AuthProvider>
      </FirebaseProvider>
    </SnackBarProvider>
  );
};

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppState>
          <StackNavigator />
        </AppState>
      </NavigationContainer>
    </PaperProvider>
  );
};
export default App;
