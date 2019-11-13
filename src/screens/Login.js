{
  /* APP LGBT FRIENDLY */
}

import React from "react";
import * as Facebook from "expo-facebook";
import { AsyncStorage } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";

import api from "../services/api";

import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-navigation";

var width = Dimensions.get("window").width;

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      loading: false,
      password: ""
    };
  }

  async componentDidMount() {
    try {
      const userToken = await AsyncStorage.getItem("@User:token");
      if (userToken !== null) {
        this.props.navigation.navigate("Feed");
      }
    } catch ({ message }) {
      alert(`Error: ${message}`);
    }
  }

  async handleLogin() {
    try {
      this.setState({ ...this.state, loading: true });
      const request = await api.post("/authenticate/default", {
        password: this.state.password,
        email: this.state.email
      });
      if (!request.data.error) {
        await AsyncStorage.setItem(
          "@User:profile",
          JSON.stringify(request.data.profile)
        );
        await AsyncStorage.setItem("@User:token", request.data.token);
        this.props.navigation.navigate("Feed");
      } else {
        alert(request.data.error);
      }
      this.setState({ ...this.state, loading: false });
    } catch ({ message }) {
      alert(`Error: ${message}`);
    }
  }

  async handleFacebookLogin() {
    try {
      this.setState({ ...this.state, loading: true });
      const userToken = await AsyncStorage.getItem("@User:token");
      if (userToken !== null) {
        this.props.navigation.navigate("Feed");
      } else {
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions
        } = await Facebook.logInWithReadPermissionsAsync("871291876575585", {
          permissions: ["public_profile", "email"]
        });
        if (type === "success") {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}&fields=email,avatar`
          );
          const request = await api.post("/authenticate/facebook", {
            access_token: token,
            email: (await response.json()).email
          });

          await AsyncStorage.setItem(
            "@User:profile",
            JSON.stringify(request.data.profile)
          );
          await AsyncStorage.setItem("@User:token", request.data.token);
          this.setState({ ...this.state, loading: false });
          this.props.navigation.navigate("Feed");
        } else {
          // type === 'cancel'
        }
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <SafeAreaView
          style={{ with: "100%", height: "100%", marginTop: "20%" }}
        >
          <Image
            source={require("../assets/LGBT-friendly-LOGO.png")}
            style={styles.logo}
          />
          <View style={styles.conteudo}>
            <TouchableHighlight onPress={this.handleFacebookLogin.bind(this)}>
              <View style={styles.botaoFacebook}>
                <Text
                  style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}
                >
                  Entrar com o Facebook
                </Text>
              </View>
            </TouchableHighlight>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                margin: 10,
                alignSelf: "center"
              }}
            >
              ou
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              placeholder={"E-mail"}
              placeholderTextColor={"#fff"}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              secureTextEntry={true}
              textContentType={"password"}
              placeholder={"Senha"}
              placeholderTextColor={"#fff"}
            />
            {!this.state.loading ? (
              <TouchableHighlight
                underlayColor={"#FFFFFF00"}
                onPress={this.handleLogin.bind(this)}
              >
                <LinearGradient
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  colors={["#D11C46", "#FA8624"]}
                  style={styles.button}
                >
                  <Text style={styles.bottonText}>ENTRAR</Text>
                </LinearGradient>
              </TouchableHighlight>
            ) : (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
            {/* <Text
                style={styles.textButtonType}
                onPress={() =>
                  this.props.navigation.navigate("RedefinicaoDeSenha")
                }
              >
                ESQUECI MINHA SENHA
              </Text> */}
            <Text
              style={styles.textButtonType}
              onPress={() => this.props.navigation.navigate("Cadastro")}
            >
              Não possui conta? CADASTRE-SE
            </Text>
          </View>
          <View />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    height: 204.63,
    width: 234.9,
    alignSelf: "center"
  },
  conteudo: {
    backgroundColor: "#00000099",
    borderRadius: 10,
    width: width - 40,
    justifyContent: "space-between",
    padding: 30,
    alignItems: "center",
    alignSelf: "center"
  },
  button: {
    padding: 10,
    width: width - 100,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
    alignSelf: "auto"
  },
  bottonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
  botaoFacebook: {
    backgroundColor: "#3b5998",
    height: 50,
    width: width - 100,
    alignSelf: "auto",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    backgroundColor: "#00000000",
    borderBottomWidth: 3,
    borderBottomColor: "#fff",
    width: width - 100,
    fontSize: 16,
    color: "#fff"
  },
  textButtonType: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 16
  }
});
