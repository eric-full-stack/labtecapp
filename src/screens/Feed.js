import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import ItemFeed from "../components/ItemFeed";

import api from "../services/api";

export default class Feed extends React.Component {
  async componentDidMount() {
    try {
      this.setState({ ...this.state, loading: true });
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== "granted") {
        alert("Permissão de localização não concedida.");
      }
      let location = await Location.getCurrentPositionAsync({});

      location = `${location.coords.latitude},${location.coords.longitude}`;
      const userToken = await AsyncStorage.getItem("@User:token");
      await api
        .get(`/nearbySearch`, {
          params: { location },
          headers: { Authorization: `Bearer ${userToken}` }
        })
        .then(res => {
          const lugares = res.data;
          this.setState({ lugares });
        });
      this.setState({ ...this.state, loading: false });
    } catch (err) {
      console.log(err);
    }
  }
  state = {
    status: false,
    location: null,
    latlon: null,
    lugares: []
  };

  ShowHideTextComponentView = () => {
    this.setState({ status: !this.state.status });
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/icons/fundo.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.header}>
          <Icon
            onPress={() => this.props.navigation.openDrawer()}
            name="menu"
            size={34}
            color="#fff"
          />
          <Text style={styles.title}>{this.state.latlon}</Text>
          <View style={[{ flexDirection: "row" }]}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate("Pesquisar")}
              underlayColor={"#FFFFFF00"}
            >
              <Image
                source={require("../assets/icons/header-search.png")}
                style={styles.icon}
              />
            </TouchableHighlight>
            {/*<TouchableHighlight onPress={this.ShowHideTextComponentView} underlayColor={'#FFFFFF00'}><Image source={require('../assets/icons/header-maps.png')} style={styles.icon} /></TouchableHighlight>*/}
          </View>
        </View>
        <View style={styles.viewFlatList}>
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={this.state.lugares}
              contentContainerStyle={{
                alignSelf: "center"
              }}
              numColumns={2}
              keyExtractor={item => `${item.id}`}
              renderItem={({ item }) => (
                <ItemFeed {...item} navigation={this.props.navigation} />
              )}
            />
          )}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 58,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  icon: {
    height: 32,
    width: 30,
    marginLeft: 5,
    marginRight: 5
  },
  viewFlatList: {
    padding: 5,
    marginBottom: 90
  }
});
