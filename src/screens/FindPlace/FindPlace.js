import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";
import PlaceList from "../../components/PlaceList/PlaceList";
import {Navigation} from "react-native-navigation";
class FindPlaceScreen extends Component{

    static options() {
        return {
            topBar: {
                leftButtons: {
                    id: 'openDrawer',
                    icon: require('../../assets/side_menu.png')
                }
            }
        };
    }

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }
    itemSelectedHandler = key => {
        const selPlace = this.props.places.find(place => {
            return place.key === key;
        });
        Navigation.push('myStack', {
            component:{
                name: "mobile_client_rel.PlaceDetailScreen",
                passProps: {
                    selectedPlace: selPlace
                },
                options: {
                    topBar: {
                        title: {
                            text: 'Place details'
                        }
                    }
                }
            }
        });
    };
    navigationButtonPressed({ buttonId }) {
        if (buttonId === "openDrawer") {
            Navigation.mergeOptions('sideDrawerToggle', {
                sideMenu: {
                    left: {
                        visible: true
                    }
                }
            });
        }
    }

    render() {
        return (
            <View>
                <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

export default connect(mapStateToProps) (FindPlaceScreen);

