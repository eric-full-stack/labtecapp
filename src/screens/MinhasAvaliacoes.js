import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  AsyncStorage,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  StatusBar,
  FlatList
} from "react-native";

import RatingCard from "../components/RatingCard";
import api from "../services/api";

export default class MinhasAvaliacoes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: [],
      loading: true
    };
  }
  async componentDidMount() {
    this.getVotes();
  }

  async getVotes() {
    this.setState({ ...this.state, loading: true });
    const userToken = await AsyncStorage.getItem("@User:token");
    const votes = await api.get("/votes", {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    this.setState({ ratings: votes.data, loading: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.navigation !== prevProps.navigation) {
      this.getVotes();
    }
  }
  render() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

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
          <Text style={styles.text}>MINHAS AVALIAÇÕES</Text>
          <View style={[{ width: 45 }]} />
        </View>
        <ScrollView style={styles.view}>
          {!this.state.loading ? (
            <View style={styles.flatList}>
              <FlatList
                data={this.state.ratings}
                keyExtractor={item => `${item._id}`}
                renderItem={({ item }) => (
                  <RatingCard {...item} navigation={this.props.navigation} />
                )}
              />
            </View>
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </ScrollView>
      </View>
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
    marginTop: StatusBar.currentHeight
  },
  icon: {
    height: 32,
    width: 30,
    marginLeft: 5,
    marginRight: 5
  },
  flatList: {
    alignItems: "center",
    marginTop: 25
  }
});
