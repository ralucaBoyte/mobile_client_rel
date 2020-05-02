import React, {Component} from "react";
import {  View, Image, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {connect} from "react-redux";
import { deletePlace } from "../../store/actions/index";
import {Navigation} from "react-native-navigation";
class PlaceDetail extends Component
{
  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    Navigation.pop();
  };
  render()
  {
    return (
        <View style={styles.container}>
          <View>
            <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
            <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.placeDeletedHandler}>
              <View style={styles.deleteButton}>
                <Icon size={30} name="ios-trash" color="red" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
  ;
}

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key))
  };
};


const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  deleteButton: {
    alignItems: "center"
  }
});

export default connect(null, mapDispatchToProps)( PlaceDetail);
