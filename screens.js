import {Navigation} from 'react-native-navigation';
import AuthScreen from "./src/screens/Auth/Auth";
import ReviewScreen from "./src/screens/FindPlace/ReviewScreen";
import ScanScreen from "./src/screens/ScanScreen/ScanScreen";
import HomeScreen from "./src/screens/Home/HomeScreen";
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail"
import {Provider} from "react-redux";
import configureStore from './src/store/configureStore';
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
import AnswerQuestionsScreen from "./src/screens/answerQuestions/AnswerQuestionsScreen";

//const store = configureStore();
export function registerScreens(store) {
    Navigation.registerComponentWithRedux(
        "mobile_client_rel.AuthScreen",
        () => AuthScreen,
        Provider, store);

    Navigation.registerComponentWithRedux(
        "mobile_client_rel.HomeScreen",
        () => HomeScreen,
        Provider,store);
    Navigation.registerComponentWithRedux(
        "mobile_client_rel.ReviewScreen",
        () => ReviewScreen,
        Provider,store);
    Navigation.registerComponentWithRedux(
        "mobile_client_rel.AnswerQuestionsScreen",
        () => AnswerQuestionsScreen,
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
