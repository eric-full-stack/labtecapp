import React from "react";

import { View, Text, StyleSheet, Dimensions } from "react-native";

import { Rating } from "react-native-ratings";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

var { width } = Dimensions.get("window");
const HEART_IMAGE = require("../assets/icons/heart.png");

export default class RatingCard extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.title}>{this.props.place.name}</Text>
            <Rating
              type="heart"
              startingValue={this.props.vote}
              imageSize={30}
              readonly
              style={{ alignItems: "flex-start" }}
            />
          </View>
          <Icon
            onPress={() =>
              this.props.navigation.navigate("Avaliar", {
                vote: this.props.vote,
                name: this.props.place.name,
                description: this.props.description,
                voteId: this.props._id
              })
            }
            name="border-color"
            size={34}
            color="#fff"
          />
        </View>
        <View style={styles.contentView}>
          <Text style={styles.content}>{this.props.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 16
  },
  contentView: {
    backgroundColor: "#fff",
    width: width - 50,
    padding: 5,
    marginBottom: 20,
    marginTop: 5
  },
  titleRow: {
    width: width - 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
