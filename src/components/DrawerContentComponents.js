import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableHighlight,
  AsyncStorage,
  StatusBar,
  ScrollView
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default class DrawerContentComponents extends React.Component {
  state = {
    user: {
      name: "",
      avatar: ""
    }
  };
  constructor(props) {
    super(props);
    this.loadUser();
  }
  async loadUser() {
    const user = JSON.parse(await AsyncStorage.getItem("@User:profile"));

    if (user) this.setState({ user });
  }
  async handleLogout() {
    await AsyncStorage.removeItem("@User:profile");
    await AsyncStorage.removeItem("@User:token");
    this.props.navigation.navigate("Login");
  }
  render() {
    return (
      <ImageBackground
        source={require("../assets/icons/fundo.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <ScrollView style={styles.view}>
          <View
            style={[
              { alignItems: "flex-end", marginTop: StatusBar.currentHeight }
            ]}
          >
            <TouchableHighlight
              onPress={() => this.props.navigation.closeDrawer()}
              underlayColor={"#FFFFFF00"}
            >
              <Image
                source={require("../assets/icons/open-feed.png")}
                style={styles.icon}
              />
            </TouchableHighlight>
          </View>
          <View style={[{ alignItems: "center" }]}>
            <Image
              source={
                this.state.user.avatar
                  ? { uri: this.state.user.avatar }
                  : require("../assets/profile-picture-base.png")
              }
              style={styles.profilePicture}
              onPress={() => null}
            />
            <Text style={styles.userName}>{this.state.user.name}</Text>
          </View>

          <View style={styles.menuView}>
            <Text
              style={styles.itemMenu}
              onPress={() => this.props.navigation.navigate("Feed")}
            >
              INÍCIO
            </Text>
            <Text
              style={styles.itemMenu}
              onPress={() => this.props.navigation.navigate("MeusDados")}
            >
              MEUS DADOS
            </Text>
            <Text
              style={styles.itemMenu}
              onPress={() => this.props.navigation.navigate("Notificacoes")}
            >
              NOTIFICAÇÕES
            </Text>
            <Text
              style={styles.itemMenu}
              onPress={() => this.props.navigation.navigate("MinhasAvaliacoes")}
            >
              MINHAS AVALIAÇÕES
            </Text>
            <Text
              style={styles.itemMenu}
              onPress={() => this.props.navigation.navigate("Favoritos")}
            >
              FAVORITOS
            </Text>
            {/* <Text
              style={styles.itemMenu}
              onPress={() => this.props.navigation.navigate("SugerirLocais")}
            >
              SUGERIR LOCAIS
            </Text> */}
            <Text
              style={styles.itemMenu}
              onPress={() => this.props.navigation.navigate("Idioma")}
            >
              IDIOMA
            </Text>
            <Text
              style={styles.itemMenu}
              onPress={() => this.props.navigation.navigate("AlterarSenha")}
            >
              ALTERAR SENHA
            </Text>
            {/* <Text
              style={styles.itemMenu}
              onPress={() => this.props.navigation.navigate("FaleConosco")}
            >
              FALE CONOSCO
            </Text> */}

            <TouchableHighlight
              onPress={this.handleLogout.bind(this)}
              underlayColor={"#FFFFFF00"}
            >
              <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                colors={["#D11C46", "#FA8624"]}
                style={styles.button}
              >
                <Text style={styles.bottonText}>SAIR</Text>
              </LinearGradient>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    flex: 1
  },
  icon: {
    height: 32,
    width: 30,
    marginTop: 15,
    marginRight: 15
  },
  userName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 25
  },
  profilePicture: {
    height: 140,
    width: 140,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: "#fff",
    marginBottom: 15
  },
  menuView: {
    borderTopWidth: 3,
    borderColor: "#fff",
    flex: 1,
    paddingTop: 25,
    alignItems: "center"
  },
  itemMenu: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#00000000"
  },
  button: {
    padding: 10,
    width: 200,
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
