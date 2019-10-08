import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  Dimensions,
  TouchableHighlight,
  AsyncStorage
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

var width = Dimensions.get("window").width;

export default class RedefinicaoDeSenha extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }
  async componentDidMount() {
    const user = JSON.parse(await AsyncStorage.getItem("@User:profile"));
    this.setState({
      email: user.email
    });
  }
  render() {
    return (
      <ImageBackground
        source={require("../assets/icons/fundo.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View />
          <Image
            source={require("../assets/LGBT-friendly-LOGO.png")}
            style={styles.logo}
          />
          <View style={styles.conteudo}>
            <Text style={styles.titulo}>ESQUECI MINHA SENHA</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              placeholder={"E-mail"}
              placeholderTextColor={"#fff"}
            />
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate("Login")}
              underlayColor={"#FFFFFF00"}
            >
              <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                colors={["#D11C46", "#FA8624"]}
                style={styles.button}
              >
                <Text style={styles.bottonText}>Redefinir Senha</Text>
              </LinearGradient>
            </TouchableHighlight>
          </View>
          <View />
          <View />
        </View>
      </ImageBackground>
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
    marginTop: 40,
    marginBottom: 15,
    alignSelf: "center"
  },
  bottonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
  titulo: {
    fontSize: 20,
    color: "#fff",
    alignSelf: "center",
    marginBottom: 20
  },
  textInput: {
    backgroundColor: "#00000000",
    borderBottomWidth: 3,
    borderBottomColor: "#fff",
    width: width - 100,
    fontSize: 16,
    color: "#fff"
  }
});
