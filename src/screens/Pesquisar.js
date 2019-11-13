import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  StatusBar,
  TextInput,
  Dimensions,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  FlatList
} from "react-native";
import * as Location from "expo-location";
import ItemFeed from "../components/ItemFeed";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import api from "../services/api";

var width = Dimensions.get("window").width;

export default class Pesquisar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      lugares: [],
      loading: false
    };
  }
  async pesquisaTermo() {
    try {
      this.setState({ ...this.state, loading: true });
      const userToken = await AsyncStorage.getItem("@User:token");
      let location = await Location.getCurrentPositionAsync({});
      location = `${location.coords.latitude},${location.coords.longitude}`;
      await api
        .get(`/textSearch`, {
          params: { query: this.state.term, location },
          headers: { Authorization: `Bearer ${userToken}` }
        })
        .then(res => {
          const lugares = res.data.results;
          this.setState({ lugares });
        });
      this.setState({ ...this.state, loading: false });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <View style={styles.header}>
          <Icon
            onPress={() => this.props.navigation.openDrawer()}
            name="menu"
            size={34}
            color="#fff"
          />
          <Text style={styles.title}>PESQUISAR</Text>
          <View style={[{ flexDirection: "row" }]}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate("Feed")}
              underlayColor={"#FFFFFF00"}
            >
              <Image
                source={require("../assets/icons/header-search.png")}
                style={styles.icon}
              />
            </TouchableHighlight>
          </View>
        </View>

        <ScrollView style={styles.view}>
          <View style={styles.viewInput}>
            <TextInput
              style={styles.textInput}
              onChangeText={term => this.setState({ term })}
              value={this.state.term}
              placeholder={"Restaurante..."}
              autoFocus
            />
            <TouchableHighlight onPress={this.pesquisaTermo.bind(this)}>
              <Image
                source={require("../assets/icons/header-search.png")}
                style={styles.icon}
              />
            </TouchableHighlight>
          </View>

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
                <ItemFeed
                  {...item}
                  navigation={this.props.navigation}
                  back={"Pesquisar"}
                />
              )}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewInput: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  view: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)"
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center"
  },
  header: {
    height: 58,
    backgroundColor: "rgba(0, 0, 0, 1)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: StatusBar.currentHeight
  },
  icon: {
    height: 32,
    width: 30,
    marginLeft: 5,
    marginRight: 5
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  textInput: {
    backgroundColor: "#fff",
    width: width - 70,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 20,
    borderColor: "#707070",
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    color: "#000"
  }
});
