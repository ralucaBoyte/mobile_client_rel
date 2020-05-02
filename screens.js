import {Navigation} from 'react-native-navigation';
import AuthScreen from "./src/screens/Auth/Auth";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import ScanScreen from "./src/screens/ScanScreen/ScanScreen";
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail"
import {Provider} from "react-redux";
import configureStore from './src/store/configureStore';
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";

const store = configureStore();
export function registerScreens() {
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
    Navigation.registerComponentWithRedux(
        "mobile_client_rel.SideDrawer",
        () => SideDrawer,
        Provider, store
    );
    Navigation.registerComponent(
        "mobile_client_rel.PlaceDetailScreen",
        () => PlaceDetailScreen,
        store,
        Provider
    );

}
