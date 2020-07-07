import {Navigation} from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";
//import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ReviewScreen from "../FindPlace/ReviewScreen";
import React from "react";
const ScanIcon = require('../../assets/scan.png');
const HomeIcon = require('../../assets/home.png');
const ReviewIcon = require('../../assets/review.png');
const SurveyIcon = require('../../assets/survey.png');

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
                                                name: 'mobile_client_rel.HomeScreen',
                                                passProps: {
                                                    text: 'Share place screen'
                                                },
                                                options: {
                                                    topBar: {
                                                        title: {
                                                            text: 'View my attendances'
                                                        }
                                                    },
                                                    bottomTab: {
                                                        text: 'Home',
                                                        visible: true,
                                                        icon: HomeIcon,
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
                                                text: 'Scan QR',
                                                visible: true,
                                                icon: ScanIcon,
                                                testID: 'SECOND_TAB_BAR_BUTTON'
                                            }
                                        }
                                    }
                                },

                                {
                                    stack: {
                                        id: "myStack2",
                                        children: [
                                            {
                                                component: {
                                                    name: 'mobile_client_rel.AnswerQuestionsScreen',
                                                    passProps: {
                                                        text: 'Take survey'
                                                    },
                                                    options: {
                                                        topBar: {
                                                            title: {
                                                                text: 'Take survey for class'
                                                            }
                                                        },
                                                        bottomTab: {
                                                            text: 'Survey',
                                                            visible: true,
                                                            icon: SurveyIcon,
                                                            testID: 'FOURTH_TAB_BAR_BUTTON'
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
                                },
                                {
                                    stack: {
                                        id: "myStack",
                                        children: [
                                            {
                                                component: {
                                                    name: 'mobile_client_rel.ReviewScreen',
                                                    passProps: {
                                                        text: 'Find places'
                                                    },
                                                    options: {
                                                        topBar: {
                                                            title: {
                                                                text: 'Send observations for a professor'
                                                            }
                                                        },
                                                        bottomTab: {
                                                            text: 'Feedback',
                                                            visible: true,
                                                            icon: ReviewIcon,
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
