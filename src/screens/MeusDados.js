import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TextInput,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  AsyncStorage,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import api from "../services/api";

var width = Dimensions.get("window").width;

export default class MeusDados extends React.Component {
  state = {
    name: "",
    email: "",
    age: "",
    nickname: "",
    phone: "",
    loading: false
  };

  constructor(props) {
    super(props);
    this.loadUser();
  }
  async loadUser() {
    const user = JSON.parse(await AsyncStorage.getItem("@User:profile"));

    if (user) this.setState({ ...this.state, ...user });
  }

  async handleSubmit() {
    this.setState({ ...this.state, loading: true });
    const userToken = await AsyncStorage.getItem("@User:token");
    const pastUser = await AsyncStorage.getItem("@User:profile");
    await api.patch(
      `/users/${this.state._id}`,
      {
        ...this.state
      },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );
    await AsyncStorage.setItem(
      "@User:profile",
      JSON.stringify({ ...pastUser, ...this.state })
    );
    this.setState({ ...this.state, loading: false });
    alert("Atualizado com sucesso!");
  }

  async handleRemovePhoto() {
    this.setState({ ...this.state, loading: true });
    const userToken = await AsyncStorage.getItem("@User:token");
    await api.patch(
      `/users/${this.state._id}`,
      {
        avatar: null
      },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );
    let user = JSON.parse(await AsyncStorage.getItem("@User:profile"));
    user.avatar = null;
    await AsyncStorage.setItem("@User:profile", JSON.stringify(user));
    this.setState({ ...this.state, loading: false });
    alert("Atualizado com sucesso!");
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <View style={{ width: "100%", height: "100%" }}>
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
            <Text style={styles.text}>MEUS DADOS</Text>
            <View style={[{ width: 45 }]} />
          </View>
          <ScrollView style={styles.view}>
            <View style={styles.profilePictureView}>
              <Image
                source={
                  this.state.avatar
                    ? { uri: this.state.avatar }
                    : require("../assets/profile-picture-base.png")
                }
                style={styles.profilePicture}
              />
              <View>
                <TouchableHighlight onPress={this.handleRemovePhoto.bind(this)}>
                  <Text style={styles.alterarFoto}>Remover foto</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <View>
                <Text style={styles.inputTitle}>Nome Completo</Text>
                <TextInput
                  style={{
                    height: 50,
                    backgroundColor: "#fff",
                    width: width - 50,
                    fontSize: 16,
                    paddingLeft: 15,
                    marginBottom: 15
                  }}
                  onChangeText={name => this.setState({ ...this.state, name })}
                  value={this.state.name}
                />
              </View>

              <View>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <Text style={styles.inputTitle}>Apelido</Text>
                  <Text style={styles.inputTitle2}>
                    {" "}
                    (como gostaria de ser identificado)
                  </Text>
                </View>
                <TextInput
                  style={{
                    height: 50,
                    backgroundColor: "#fff",
                    width: width - 50,
                    fontSize: 16,
                    paddingLeft: 15,
                    marginBottom: 15
                  }}
                  onChangeText={nickname =>
                    this.setState({ ...this.state, nickname })
                  }
                  value={this.state.nickname}
                />
              </View>

              <View>
                <Text style={styles.inputTitle}>E-mail</Text>
                <TextInput
                  style={{
                    height: 50,
                    backgroundColor: "#fff",
                    width: width - 50,
                    fontSize: 16,
                    paddingLeft: 15,
                    marginBottom: 15
                  }}
                  editable={false}
                  value={this.state.email}
                  keyboardType={"email-address"}
                />
              </View>

              <View>
                <Text style={styles.inputTitle}>Telefone</Text>
                <TextInput
                  style={{
                    height: 50,
                    backgroundColor: "#fff",
                    width: width - 50,
                    fontSize: 16,
                    paddingLeft: 15,
                    marginBottom: 15
                  }}
                  keyboardType={"phone-pad"}
                  onChangeText={phone =>
                    this.setState({ ...this.state, phone })
                  }
                  value={this.state.phone}
                />
              </View>

              <View>
                <Text style={styles.inputTitle}>Idade</Text>
                <TextInput
                  style={{
                    height: 50,
                    backgroundColor: "#fff",
                    width: width - 50,
                    fontSize: 16,
                    paddingLeft: 15,
                    marginBottom: 15
                  }}
                  keyboardType={"number-pad"}
                  onChangeText={age => this.setState({ ...this.state, age })}
                  value={this.state.age.toString()}
                />
              </View>
              {!this.state.loading ? (
                <TouchableHighlight
                  onPress={this.handleSubmit.bind(this)}
                  underlayColor={"#FFFFFF00"}
                >
                  <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#D11C46", "#FA8624"]}
                    style={styles.button}
                  >
                    <Text style={styles.bottonText}>SALVAR</Text>
                  </LinearGradient>
                </TouchableHighlight>
              ) : (
                <ActivityIndicator size="large" />
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
  profilePicture: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
    marginRight: 20
  },
  profilePictureView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 50
  },
  alterarFoto: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
    padding: 5
  },
  inputTitle: {
    color: "#fff",
    fontWeight: "100",
    marginBottom: 5,
    fontSize: 16
  },
  inputTitle2: {
    color: "#fff",
    fontWeight: "100",
    marginBottom: 6,
    fontSize: 12
  },
  button: {
    padding: 10,
    width: width - 50,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15
  },
  bottonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  }
});
