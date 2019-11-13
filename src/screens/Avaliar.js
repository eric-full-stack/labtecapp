import React from "react";

import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableHighlight,
  StatusBar,
  TextInput,
  Dimensions,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  AsyncStorage,
  Easing
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Rating from "react-native-rating";
import images from "../components/RatingImages";
import api from "../services/api";

var width = Dimensions.get("window").width;

export default class Avaliar extends React.Component {
  state = {
    message: this.props.navigation.getParam("description")
      ? this.props.navigation.getParam("description")
      : "",
    vote: this.props.navigation.getParam("vote") || 0,
    voteRating: this.props.navigation.getParam("vote") || 0,
    loading: false
  };
  async componentWillMount() {
    const userToken = await AsyncStorage.getItem("@User:token");
    const votes = await api.get("/votes", {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    const res = votes.data.filter(
      vote => vote.place.name === this.props.navigation.getParam("name")
    );
    if (res.length > 0) {
      this.setState({
        ...this.state,
        message: res[0].description,
        vote: res[0].vote,
        voteRating: res[0].vote,
        voteId: res[0]._id
      });
    } else {
      this.setState({
        ...this.state,
        message: "",
        vote: 0,
        voteId: null
      });
    }
  }
  async handleUpdateRating() {
    this.setState({ ...this.state, loading: true });
    const userToken = await AsyncStorage.getItem("@User:token");
    if (this.state.message.length > 1) {
      await api.patch(
        `/votes/${this.props.navigation.getParam("voteId") ||
          this.state.voteId}`,
        {
          vote: this.state.voteRating || this.state.vote,
          description: this.state.message
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
    } else {
      alert("Escreva algo");
    }
    this.setState({ ...this.state, loading: false });
    this.props.navigation.navigate("MinhasAvaliacoes", { update: 1 });
  }

  async handleSaveRating() {
    this.setState({ ...this.state, loading: true });
    const userToken = await AsyncStorage.getItem("@User:token");
    await api.post(
      `/votes/${this.props.navigation.getParam("placeId")}`,
      {
        vote: this.state.voteRating || this.state.vote,
        description: this.state.message
      },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );
    this.setState({ ...this.state, loading: false });
    this.props.navigation.navigate("MinhasAvaliacoes", { update: 1 });
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <View style={{ width: "100%", height: "100%" }}>
          <View style={styles.header}>
            <TouchableHighlight
              onPress={() =>
                this.props.navigation.getParam("name")
                  ? this.props.navigation.goBack()
                  : this.props.navigation.navigate("MinhasAvaliacoes")
              }
              underlayColor={"#FFFFFF00"}
            >
              <Image
                source={require("../assets/icons/back.png")}
                style={styles.icon}
              />
            </TouchableHighlight>
            <Text style={styles.text}>AVALIAR</Text>
            <View style={[{ width: 45 }]} />
          </View>

          <ScrollView style={styles.view}>
            <View style={styles.flatList}>
              <Text style={styles.title}>
                {this.props.navigation.getParam("name")}
              </Text>
              <Rating
                onChange={rating =>
                  this.setState({ ...this.state, voteRating: rating })
                }
                selectedStar={images.starFilled}
                unselectedStar={images.starUnfilled}
                stagger={80}
                maxScale={1.4}
                starStyle={{
                  width: 32,
                  height: 32
                }}
                config={{
                  easing: Easing.inOut(Easing.ease),
                  duration: 350
                }}
                initial={this.state.vote}
                editable={true}
              />

              <TextInput
                style={{
                  backgroundColor: "#fff",
                  width: width - 50,
                  fontSize: 16,
                  paddingLeft: 15,
                  marginBottom: 15,
                  marginTop: 15
                }}
                onChangeText={message => this.setState({ message })}
                value={this.state.message}
                multiline={true}
                numberOfLines={15}
                textAlignVertical={"top"}
                placeholder={"Conte-nos como foi sua experiência neste lugar."}
              />
              {!this.state.loading ? (
                <View style={{ flexDirection: "row" }}>
                  <TouchableHighlight
                    onPress={() =>
                      this.props.navigation.navigate("MinhasAvaliacoes")
                    }
                    underlayColor={"#FFFFFF00"}
                  >
                    <View style={styles.buttonCancelar}>
                      <Text style={styles.bottonTextCancelar}>Cancelar</Text>
                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight
                    onPress={
                      typeof this.props.navigation.getParam("voteId") !==
                        "undefined" || this.state.vote
                        ? this.handleUpdateRating.bind(this)
                        : this.handleSaveRating.bind(this)
                    }
                    underlayColor={"#FFFFFF00"}
                  >
                    <LinearGradient
                      start={{ x: 0, y: 1 }}
                      end={{ x: 1, y: 1 }}
                      colors={["#D11C46", "#FA8624"]}
                      style={styles.button}
                    >
                      <Text style={styles.bottonText}>
                        {this.props.navigation.getParam("voteId") ||
                        this.state.vote
                          ? "ATUALIZAR"
                          : "SALVAR"}
                      </Text>
                    </LinearGradient>
                  </TouchableHighlight>
                </View>
              ) : (
                <ActivityIndicator size="large" color="#0000ff" />
              )}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
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
  button: {
    padding: 10,
    width: width / 2 - 40,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 15
  },
  bottonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
  buttonCancelar: {
    padding: 10,
    width: width / 2 - 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 15
  },
  bottonTextCancelar: {
    fontSize: 16,
    color: "#000",
    textAlign: "center"
  },
  flatList: {
    alignItems: "center",
    marginTop: 25
  },
  title: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 20,
    marginTop: 20
  }
});
