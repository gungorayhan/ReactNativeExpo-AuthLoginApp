import { StatusBar } from 'expo-status-bar';
import ToastManager, { Toast } from 'toastify-react-native'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import "react-native-gesture-handler"
import { LogBox } from 'react-native';

//store
import { Provider } from 'react-redux';
import store from "./src/store"
import RootNavigator from "./src/navigators/RootNavigator"

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={store}>
      <ToastManager 
        duration={1500}
      />
      <RootNavigator />
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
