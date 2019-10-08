import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  ImageBackground,
  ScrollView,
  FlatList
} from "react-native";

import NotificationCard from "../components/NotificationCard";

export default class Notificacoes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [
        {
          id: 1,
          title: "Seja Bem Vindo!",
          content:
            "Olá criamos o app LGBT Friendly, com o objetivo de vocês encontrarem lugares mas familiarizados, onde vocês se sintam mais a vontade para levar seu companheiro e amigos."
        },
        {
          id: 2,
          title: "Foto de Perfil",
          content:
            "Adicione uma foto ao seu perfil, para que os outros possam lhe identificar."
        },
        {
          id: 3,
          title: "Apelido",
          content:
            "O Apelido é como os outros usuários vão lhe identificar, é como um nickname."
        },
        {
          id: 4,
          title: "Não quero ser identificado",
          content:
            "Se você não quiser ser identificado é só remover sua foto de perfil e colocar um apelido qualquer."
        }
      ]
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
            <Text style={styles.text}>NOTIFICAÇÕES</Text>
            <View style={[{ width: 45 }]} />
          </View>
          <ScrollView>
            <View style={styles.flatList}>
              <FlatList
                data={this.state.notifications}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => <NotificationCard {...item} />}
              />
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
    paddingTop: 20,
    borderBottomWidth: 2,
    borderColor: "#fff"
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
