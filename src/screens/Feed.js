import React from "react";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
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
      this.fetchData();
    } catch (err) {
      console.log(err);
    }
  }
  fetchData = async (refresh = null) => {
    let location = await Location.getCurrentPositionAsync({});
    location = `${location.coords.latitude},${location.coords.longitude}`;
    const next_page_token = await AsyncStorage.getItem(
      "@Places:next_page_token"
    );
    const userToken = await AsyncStorage.getItem("@User:token");
    const response = await api.get(`/nearbySearch`, {
      params: { location, pagetoken: next_page_token },
      headers: { Authorization: `Bearer ${userToken}` }
    });
    if (
      (response.data.next_page_token &&
        response.data.next_page_token !== next_page_token) ||
      (response.data.next_page_token && next_page_token === null)
    ) {
      await AsyncStorage.setItem(
        "@Places:next_page_token",
        response.data.next_page_token
      );
    } else {
      await AsyncStorage.removeItem("@Places:next_page_token");
    }

    this.setState({
      ...this.state,
      loadingMore: false,
      loading: false,
      refreshing: false,
      lugares: refresh
        ? [...response.data.results]
        : [...this.state.lugares, ...response.data.results]
    });
  };
  state = {
    status: false,
    location: null,
    latlon: null,
    lugares: [],
    loadingMore: false,
    refreshing: false,
    next_page_token: null
  };

  _renderFooter = () => {
    if (!this.state.loadingMore) {
      return null;
    }
    return (
      <View
        style={{
          position: "relative",
          width: "100%",
          height: 50,
          paddingVertical: 20,
          borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 10,
          borderColor: "gray"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleLoadMore = async () => {
    if (this.state.loading === false && this.state.loadingMore === false) {
      const next_page_token = await AsyncStorage.getItem(
        "@Places:next_page_token"
      );
      if (next_page_token) {
        this.setState({ ...this.state, loadingMore: true });
        await this.fetchData();
      }
    }
  };

  _handleRefresh = async () => {
    this.setState({ ...this.state, refreshing: true });
    await this.fetchData(true);
  };

  render() {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
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
          </View>
        </View>
        <View style={styles.viewFlatList}>
          {!this.state.loading && (
            <FlatList
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.5}
              data={this.state.lugares}
              contentContainerStyle={{
                alignSelf: "center",
                paddingBottom: 70
              }}
              scrollEnabled={!this.state.loadingMore}
              numColumns={2}
              onRefresh={this._handleRefresh}
              refreshing={this.state.refreshing}
              keyExtractor={item => item._id || item.id}
              renderItem={({ item }) => (
                <ItemFeed {...item} navigation={this.props.navigation} />
              )}
              ListFooterComponent={this._renderFooter}
            />
          )}
          {(this.state.loading || this.state.loadingMore) && (
            <ActivityIndicator />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 58,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10
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
    marginBottom: 120
  }
});
