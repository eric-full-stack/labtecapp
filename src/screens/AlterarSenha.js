import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  StatusBar,
  ScrollView,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  Dimensions
} from "react-native";

import api from "../services/api";

import { LinearGradient } from "expo-linear-gradient";

var width = Dimensions.get("window").width;

export default class AlterarSenha extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: "",
      loading: false,
      confirmNewPassword: ""
    };
  }

  async handleNewPassword() {
    try {
      this.setState({ ...this.state, loading: true });
      console.log(this.state.newPassword);
      if (
        this.state.newPassword == this.state.confirmNewPassword &&
        this.state.newPassword.length >= 6
      ) {
        const user = JSON.parse(await AsyncStorage.getItem("@User:profile"));
        const userToken = await AsyncStorage.getItem("@User:token");
        const response = await api.patch(
          `/users/${user._id}/password`,
          { password: this.state.newPassword },
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Senha alterada com sucesso.");
        }
      } else {
        alert("Erro: senhas não conferem ou mínimo de 6 caracteres.");
      }
    } catch (e) {
      alert(e.message);
    }
    this.setState({
      ...this.state,
      newPassword: "",
      confirmNewPassword: "",
      loading: false
    });
  }

  render() {
    return (
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
          <Text style={styles.text}>ALTERAR SENHA</Text>
          <View style={[{ width: 45 }]} />
        </View>
        <ScrollView style={styles.view}>
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <View>
              <Text style={styles.inputTitle}>Nova Senha</Text>
              <TextInput
                style={{
                  height: 50,
                  backgroundColor: "#fff",
                  width: width - 50,
                  fontSize: 16,
                  paddingLeft: 15,
                  marginBottom: 15
                }}
                onChangeText={newPassword => this.setState({ newPassword })}
                value={this.state.newPassword}
                secureTextEntry={true}
                textContentType={"password"}
                placeholder={"Nova Senha"}
              />
            </View>

            <View>
              <Text style={styles.inputTitle}>Confirmar Nova Senha</Text>
              <TextInput
                style={{
                  height: 50,
                  backgroundColor: "#fff",
                  width: width - 50,
                  fontSize: 16,
                  paddingLeft: 15,
                  marginBottom: 15
                }}
                onChangeText={confirmNewPassword =>
                  this.setState({ confirmNewPassword })
                }
                value={this.state.confirmNewPassword}
                secureTextEntry={true}
                textContentType={"password"}
                placeholder={"Repetir Nova Senha"}
              />
            </View>
            {!this.state.loading ? (
              <TouchableHighlight
                onPress={this.handleNewPassword.bind(this)}
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
  inputTitle: {
    color: "#fff",
    fontWeight: "100",
    marginBottom: 5,
    fontSize: 16
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
