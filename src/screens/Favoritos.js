import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  ImageBackground,
  AsyncStorage,
  FlatList
} from "react-native";

import ItemFeed from "../components/ItemFeed";
import api from "../services/api";

export default class Favoritos extends React.Component {
  state = {
    loading: false,
    lugares: []
  };
  async componentDidMount() {
    try {
      this.setState({ ...this.state, loading: true });
      const userToken = await AsyncStorage.getItem("@User:token");
      await api
        .get(`/favorites`, {
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
  render() {
    return (
      <ImageBackground
        source={require("../assets/icons/fundo.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.view}>
          <View style={styles.header}>
            <TouchableHighlight
              onPress={() => this.props.navigation.openDrawer()}
              underlayColor={"#FFFFFF00"}
            >
              <Image
                source={require("../assets/icons/back.png")}
                style={styles.icon}
              />
            </TouchableHighlight>
            <Text style={styles.text}>FAVORITOS</Text>
            <View style={[{ width: 45 }]} />
          </View>
          <View style={styles.viewFlatList}>
            <FlatList
              data={this.state.lugares || []}
              contentContainerStyle={{
                alignSelf: "center"
              }}
              numColumns={2}
              keyExtractor={item => `${item.place._id}`}
              renderItem={({ item }) => (
                <ItemFeed
                  {...item.place}
                  navigation={this.props.navigation}
                  back={"Favoritos"}
                />
              )}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
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
    paddingTop: 20,
    borderBottomWidth: 2,
    borderColor: "#fff"
  },
  icon: {
    height: 32,
    width: 30,
    marginLeft: 5,
    marginRight: 5
  },
  viewFlatList: {
    padding: 5,
    marginBottom: 58
  }
});
