import {Navigation} from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";
//import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SharePlaceScreen from "../SharePlace/SharePlace";
import FindPlaceScreen from "../FindPlace/FindPlace";
import React from "react";

const startTabs = () => {
    Promise.all([
       //Icon.getImageSource("md-home", 30),
       //Icon.getImageSource("md-menu", 30),
       //Icon.getImageSource("ios-share-alt", 30)
    ]).then(sources => {
        Navigation.setRoot({
            root: {
                sideMenu: {
                    id: "sideMenu",
                    left: {
                        component: {
                            id: "sideDrawerToggle",
                            name: "mobile_client_rel.SideDrawer"
                        }
                    },
                    center: {
                        bottomTabs: {
                            children: [
                                {
                                    stack: {
                                        children: [{
                                            component: {
                                                name: 'mobile_client_rel.SharePlaceScreen',
                                                passProps: {
                                                    text: 'Share place screen'
                                                },
                                                options: {
                                                    bottomTab: {
                                                        text: 'Welcome',
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
                                        name: 'mobile_client_rel.ScanScreen',
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
                                                    name: 'mobile_client_rel.FindPlaceScreen',
                                                    passProps: {
                                                        text: 'Find places'
                                                    },
                                                    options: {
                                                        bottomTab: {
                                                            text: 'Feedback',
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
    });
};
export default startTabs;
