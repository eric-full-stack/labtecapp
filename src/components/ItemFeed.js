import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableHighlight
} from "react-native";

import { Rating } from "react-native-ratings";
import { LinearGradient } from "expo-linear-gradient";

var { width } = Dimensions.get("window");
const HEART_IMAGE = require("../assets/icons/heart.png");

export default class ItemFeed extends React.Component {
  render() {
    return (
      <TouchableHighlight
        onPress={() =>
          this.props.navigation.navigate("Local", {
            id: this.props.place_id,
            back: this.props.back
          })
        }
        underlayColor={"#FFFFFF00"}
      >
        <ImageBackground
          source={
            this.props.photos
              ? {
                  uri:
                    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
                    this.props.photos[0].photo_reference +
                    "&key=AIzaSyCd84shidpHvlHFI0b5P0odF8sAzhocTj0"
                }
              : require("../assets/upload-photo.png")
          }
          style={styles.view}
        >
          <View style={styles.starContent}>
            {/*this.props.favorite ? <Image source={require('../assets/icons/star.png')} style={styles.icon} /> : <View style={styles.icon}/>*/}
          </View>
          <View style={styles.viewContent}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["rgba(0, 0, 0, 0.0)", "rgba(0, 0, 0, 0.9)"]}
              style={styles.placeContent}
            >
              <Text style={styles.title}>{this.props.name}</Text>
              <Rating
                type="heart"
                ratingCount={5}
                ratingBackgroundColor="#f2b3c5"
                startingValue={this.props.rating || 5}
                readonly
                imageSize={30}
              />
            </LinearGradient>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    height: width / 2 - 20,
    width: width / 2 - 20,
    backgroundColor: "#000",
    margin: 5,
    borderRadius: 5
  },
  icon: {
    height: 18,
    width: 18,
    margin: 5
  },
  title: {
    color: "#fff",
    textAlign: "center"
  },
  starContent: {
    alignItems: "flex-end",
    paddingRight: 5,
    paddingTop: 5
  },
  viewContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  placeContent: {
    justifyContent: "flex-end",
    width: width / 2 - 20,
    paddingTop: 10,
    paddingBottom: 5
  }
});
