import React from "react";

import { View, StyleSheet, Dimensions, Image, Text } from "react-native";

import { Rating } from "react-native-ratings";

var { width } = Dimensions.get("window");

const AVATAR_IMAGE = require("../assets/profile-picture-base.png");

export default class ItemAvaliacao extends React.Component {
  render() {
    return (
      <View style={{ marginTop: 12.5, marginBottom: 12.5 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={
              this.props.user.avatar
                ? { uri: this.props.user.avatar }
                : AVATAR_IMAGE
            }
            style={styles.profilePicture}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.name}>{this.props.user.name}</Text>
            <Rating
              type="heart"
              ratingCount={5}
              startingValue={this.props.vote}
              imageSize={25}
              readonly
            />
          </View>
        </View>
        <View>
          <View style={styles.commentView}>
            <Text style={styles.comment}>{this.props.description}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profilePicture: {
    height: 55,
    width: 55,
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: "#fff"
  },
  name: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5
  },
  commentView: {
    backgroundColor: "#fff",
    width: width - 20,
    borderRadius: 5,
    padding: 10,
    marginTop: 10
  },
  comment: {
    color: "#000",
    fontSize: 14
  }
});
