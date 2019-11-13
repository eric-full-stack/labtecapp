import React from "react";

import { View, Text, StyleSheet, Dimensions } from "react-native";

import Rating from "react-native-rating";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import images from "./RatingImages";
var { width } = Dimensions.get("window");

export default class RatingCard extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.title}>{this.props.place.name}</Text>
            <Rating
              selectedStar={images.starFilled}
              unselectedStar={images.starUnfilled}
              stagger={80}
              maxScale={1.4}
              starStyle={{
                width: 32,
                height: 32
              }}
              initial={this.props.vote || 0}
              editable={false}
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
