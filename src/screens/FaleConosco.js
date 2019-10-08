import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  ImageBackground,
  TextInput,
  Dimensions,
  ScrollView
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

const subject = "";
const message = "";

var width = Dimensions.get("window").width;

export default class FaleConosco extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: subject,
      message: message
    };
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
            <Text style={styles.text}>FALE CONOSCO</Text>
            <View style={[{ width: 45 }]} />
          </View>

          <ScrollView>
            <View style={styles.flatList}>
              <View>
                <Text style={styles.inputTitle}>Assunto</Text>
                <TextInput
                  style={{
                    height: 50,
                    backgroundColor: "#fff",
                    width: width - 50,
                    fontSize: 16,
                    paddingLeft: 15,
                    marginBottom: 15
                  }}
                  onChangeText={subject => this.setState({ subject })}
                  value={this.state.subject}
                  placeholder={"Assunto da Mensagem"}
                />
              </View>

              <View>
                <Text style={styles.inputTitle}>Mensagem</Text>
                <TextInput
                  style={{
                    backgroundColor: "#fff",
                    width: width - 50,
                    fontSize: 16,
                    paddingLeft: 15,
                    marginBottom: 15
                  }}
                  onChangeText={message => this.setState({ message })}
                  value={this.state.message}
                  multiline={true}
                  numberOfLines={15}
                  textAlignVertical={"top"}
                  placeholder={"Sua Mensagem"}
                />
              </View>

              <TouchableHighlight
                onPress={() =>
                  this.props.navigation.navigate("RespostaFaleConosco")
                }
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
            </View>
          </ScrollView>
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
    borderBottomWidth: 2,
    borderColor: "#fff"
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
  },
  flatList: {
    alignItems: "center",
    marginTop: 25
  }
});
