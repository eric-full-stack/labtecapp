import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  ImageBackground,
  AsyncStorage,
  ScrollView,
  FlatList
} from "react-native";

import ItemFoto from "../components/ItemFoto";
import api from "../services/api";

export default class Local extends React.Component {
  state = {
    loading: false,
    favorited: this.props.navigation.getParam("favorited")
  };
  async handleFavorite() {
    this.setState({ ...this.state, loading: true });
    const userToken = await AsyncStorage.getItem("@User:token");

    await api.post(
      "/favorites/toggle",
      {
        placeId: this.props.navigation.getParam("placeId")
      },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );
    console.log("foi");
    this.setState({
      ...this.state,
      loading: false,
      favorited: !this.state.favorited
    });
  }
  render() {
    return (
      <ImageBackground
        source={require("../assets/icons/fundo.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.view}>
          <View style={styles.header}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate("Local")}
              underlayColor={"#FFFFFF00"}
            >
              <Image
                source={require("../assets/icons/back-black.png")}
                style={styles.icon}
              />
            </TouchableHighlight>
            <Text style={styles.text}>
              {this.props.navigation.getParam("name")}
            </Text>
            <TouchableHighlight onPress={this.handleFavorite.bind(this)}>
              {this.state.favorited ? (
                <Image
                  source={require("../assets/icons/star.png")}
                  style={styles.icon2}
                />
              ) : (
                <Image
                  source={require("../assets/icons/star_black.png")}
                  style={styles.icon2}
                />
              )}
            </TouchableHighlight>
          </View>

          <ScrollView>
            <FlatList
              data={this.props.navigation.getParam("photos")}
              contentContainerStyle={{
                alignSelf: "center"
              }}
              keyExtractor={item => `${item.photo_reference}`}
              renderItem={({ item }) => <ItemFoto {...item} />}
            />
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.75)"
  },
  text: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center"
  },
  header: {
    height: 58,
    backgroundColor: "rgba(255, 255, 255, 1)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderColor: "#000"
  },
  icon: {
    height: 32,
    width: 30,
    marginLeft: 5,
    marginRight: 5
  },
  icon2: {
    height: 24,
    width: 24,
    marginLeft: 5,
    marginRight: 5
  }
});
