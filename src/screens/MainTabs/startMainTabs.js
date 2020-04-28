import {Navigation} from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SharePlaceScreen from "../SharePlace/SharePlace";
import FindPlaceScreen from "../FindPlace/FindPlace";

const startTabs = () => {
    /*Promise.all([
        Icon.getImageSource("md-home", 30),
        Icon.getImageSource("md-menu", 30)
        //Icon.getImageSource("ios-share-alt", 30)
    ]).then(sources => {*/
    Navigation.setRoot({
        root: {
            sideMenu: {
                id: "sideMenu",
                left: {
                    component: {
                        id: "Drawer",
                        name: "mobile_client.SideDrawer"
                    }
                },
                center: {
                    bottomTabs: {
                        children: [
                            {
                                stack: {
                                    children: [{
                                        component: {
                                            name: 'mobile_client.SharePlaceScreen',
                                            passProps: {
                                                text: 'Share place screen'
                                            },
                                            options: {
                                                bottomTab: {
                                                    text: 'Share',
                                                    visible: true,
                                                    // icon: sources[0],
                                                    testID: 'FIRST_TAB_BAR_BUTTON'
                                                }

                                            }
                                        },
                                    }
                                    ],
                                }
                            },
                            {
                                component: {
                                    name: 'mobile_client.ScanScreen',
                                    passProps: {
                                        text: 'QR code scan '
                                    },
                                    options: {
                                        bottomTab: {
                                            text: 'QR',
                                            //icon: sources[1],
                                            testID: 'SECOND_TAB_BAR_BUTTON'
                                        }
                                    }
                                }
                            },

                            {
                                stack: {
                                    id: "myStack",
                                    children: [
                                        {
                                            component: {
                                                name: 'mobile_client.FindPlaceScreen',
                                                passProps: {
                                                    text: 'Find places'
                                                },
                                                options: {
                                                    bottomTab: {
                                                        text: 'Find',
                                                        //icon: sources[1],
                                                        testID: 'THIRD_TAB_BAR_BUTTON'
                                                    }
                                                },
                                                navigatorButtons: {
                                                    leftButtons: [
                                                        {
                                                            title: "menu"
                                                        }
                                                    ]
                                                }
                                            }
                                        }]
                                }
                            }]
                    }
                }
            }
        }
    });
};
export default startTabs;
