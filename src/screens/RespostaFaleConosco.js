import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableHighlight
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

var width = Dimensions.get("window").width;

export default class RespostaFaleConosco extends React.Component {
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
            <Text style={styles.descricao}>
              {
                "Sua mensagem foi enviada, em \nbreve entraremos em contato.\nObrigado!"
              }
            </Text>
          </View>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate("FaleConosco")}
            underlayColor={"#FFFFFF00"}
          >
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              colors={["#D11C46", "#FA8624"]}
              style={styles.button}
            >
              <Text style={styles.bottonText}>VOLTAR</Text>
            </LinearGradient>
          </TouchableHighlight>
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
  descricao: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center"
  },
  button: {
    padding: 10,
    width: width - 50,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
    alignSelf: "center"
  },
  bottonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  }
});
