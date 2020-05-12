import React from 'react';
import { Navigation } from "react-native-navigation";
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './src/store/configureStore';
import {registerScreens} from "./screens";

const store = configureStore();
registerScreens(store);

const RNRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

Navigation.registerComponent('mobile_client_rel', () => RNRedux);

const loginRoot = {
    root: {
        component: {
            name: 'mobile_client_rel'
        }
    }
};
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot(loginRoot);
  });
/*if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('mobile_client', { rootTag });
}*/
