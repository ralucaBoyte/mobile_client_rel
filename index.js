import React from 'react';
import { Navigation } from "react-native-navigation";
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './src/store/configureStore';
import {registerScreens} from "./screens";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import ScanScreen from "./src/screens/ScanScreen/ScanScreen";
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
import AuthScreen from "./src/screens/Auth/Auth";

const store = configureStore();

Navigation.registerComponentWithRedux(
    "mobile_client_rel.AuthScreen",
    () => AuthScreen,
    Provider, store);

Navigation.registerComponentWithRedux(
    "mobile_client_rel.SharePlaceScreen",
    () => SharePlaceScreen,
    Provider,store);
Navigation.registerComponentWithRedux(
    "mobile_client_rel.FindPlaceScreen",
    () => FindPlaceScreen,
    Provider,store);
Navigation.registerComponentWithRedux(
    "mobile_client_rel.ScanScreen",
    () => ScanScreen,
    Provider,store);
Navigation.registerComponentWithRedux(
    "mobile_client_rel.PlaceDetailScreen",
    () => PlaceDetailScreen,
    Provider, store
);
Navigation.registerComponent(
    "mobile_client_rel.SideDrawer",
    () => SideDrawer,
);
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
