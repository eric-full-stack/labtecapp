import React from "react";

import { View, Text, StyleSheet, Dimensions } from "react-native";

var { width } = Dimensions.get("window");

export default class NotificationCard extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>{this.props.title}</Text>
        <View style={styles.contentView}>
          <Text style={styles.content}>{this.props.content}</Text>
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
  }
});
