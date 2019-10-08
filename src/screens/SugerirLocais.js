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

const placeName = "";
const placeEmail = "";
const placePhone = "";
const adress = "";
const nwbrd = "";
const city = "";
const state = "";
const cep = "";

var width = Dimensions.get("window").width;

export default class SugerirLocais extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeName: placeName,
      placeEmail: placeEmail,
      placePhone: placePhone,
      adress: adress,
      nwbrd: nwbrd,
      city: city,
      state: state,
      cep: cep
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
            <Text style={styles.text}>SUGERIR LOCAIS</Text>
            <View style={[{ width: 45 }]} />
          </View>

          <ScrollView>
            <View style={{ alignItems: "center", marginTop: 30 }}>
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Image
                  source={require("../assets/upload-photo.png")}
                  style={styles.uploadPhoto}
                />
                <Text style={styles.inputTitle}>Adicionar uma foto</Text>
              </View>

              <View>
                <Text style={styles.inputTitle}>Nome do Estabelecimento</Text>
                <TextInput
                  style={{
                    height: 50,
                    backgroundColor: "#fff",
                    width: width - 50,
                    fontSize: 16,
                    paddingLeft: 15,
                    marginBottom: 15
                  }}
                  onChangeText={placeName => this.setState({ placeName })}
                  value={this.state.placeName}
                  placeholder={"Nome do Estabelecimento"}
                />
              </View>

              <View>
                <Text style={styles.inputTitle}>Email do Estabelecimento</Text>
                <TextInput
                  style={{
                    height: 50,
                    backgroundColor: "#fff",
                    width: width - 50,
                    fontSize: 16,
                    paddingLeft: 15,
                    marginBottom: 15
                  }}
                  onChangeText={placeEmail => this.setState({ placeEmail })}
                  value={this.state.placeEmail}
                  placeholder={"email@email.com"}
                />
              </View>

              <View>
                <Text style={styles.inputTitle}>
                  Telefone do Estabelecimento
                </Text>
                <TextInput
                  style={{
                    height: 50,
                    backgroundColor: "#fff",
                    width: width - 50,
                    fontSize: 16,
                    paddingLeft: 15,
                    marginBottom: 15
                  }}
                  onChangeText={placePhone => this.setState({ placePhone })}
                  value={this.state.placePhone}
                  placeholder={"(00)00000-0000"}
                />
              </View>

              <View>
                <Text style={styles.inputTitle}>
                  Endereço (Logradouro e Nº)
                </Text>
                <TextInput
                  style={{
                    height: 50,
                    backgroundColor: "#fff",
                    width: width - 50,
                    fontSize: 16,
                    paddingLeft: 15,
                    marginBottom: 15
                  }}
                  onChangeText={adress => this.setState({ adress })}
                  value={this.state.adress}
                  placeholder={"Endereço"}
                />
              </View>

              <View>
                <Text style={styles.inputTitle}>Bairro</Text>
                <TextInput
                  style={{
                    height: 50,
                    backgroundColor: "#fff",
                    width: width - 50,
                    fontSize: 16,
                    paddingLeft: 15,
                    marginBottom: 15
                  }}
                  onChangeText={nwbrd => this.setState({ nwbrd })}
                  value={this.state.nwbrd}
                  placeholder={"Bairro"}
                />
              </View>

              <View>
                <Text style={styles.inputTitle}>Cidade</Text>
                <TextInput
                  style={{
                    height: 50,
                    backgroundColor: "#fff",
                    width: width - 50,
                    fontSize: 16,
                    paddingLeft: 15,
                    marginBottom: 15
                  }}
                  onChangeText={city => this.setState({ city })}
                  value={this.state.city}
                  placeholder={"Cidade"}
                />
              </View>

              <View>
                <Text style={styles.inputTitle}>Estado</Text>
                <TextInput
                  style={{
                    height: 50,
                    backgroundColor: "#fff",
                    width: width - 50,
                    fontSize: 16,
                    paddingLeft: 15,
                    marginBottom: 15
                  }}
                  onChangeText={state => this.setState({ state })}
                  value={this.state.state}
                  placeholder={"Estado"}
                />
              </View>

              <View>
                <Text style={styles.inputTitle}>CEP</Text>
                <TextInput
                  style={{
                    height: 50,
                    backgroundColor: "#fff",
                    width: width - 50,
                    fontSize: 16,
                    paddingLeft: 15,
                    marginBottom: 15
                  }}
                  onChangeText={cep => this.setState({ cep })}
                  value={this.state.cep}
                  placeholder={"00000-000"}
                />
              </View>

              <TouchableHighlight
                onPress={() =>
                  this.props.navigation.navigate("RespostaSugerirLocais")
                }
                underlayColor={"#FFFFFF00"}
              >
                <LinearGradient
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  colors={["#D11C46", "#FA8624"]}
                  style={styles.button}
                >
                  <Text style={styles.bottonText}>ENVIAR SUGESTÃO</Text>
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
  uploadPhoto: {
    height: 150,
    width: 200
  }
});
