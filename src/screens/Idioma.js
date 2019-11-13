import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  StatusBar,
  Dimensions,
  ScrollView
} from "react-native";

var width = Dimensions.get("window").width;

export default class Idioma extends React.Component {
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
          <Text style={styles.text}>IDIOMA</Text>
          <View style={[{ width: 45 }]} />
        </View>

        <ScrollView style={styles.view}>
          <View style={[{ alignItems: "center" }]}>
            <View
              style={[
                { alignItems: "center", marginTop: 30, marginBottom: 30 }
              ]}
            >
              <TouchableHighlight
                onPress={() => null}
                underlayColor={"#FFFFFF00"}
              >
                <View style={[{ alignItems: "center" }]}>
                  <Image
                    source={require("../assets/pt-br.png")}
                    style={styles.flag}
                  />
                  <Text style={styles.titleIdioma}>Português</Text>
                </View>
              </TouchableHighlight>
            </View>

            <View style={styles.maisIdiomas}>
              <Text style={styles.descricao}>EM BREVE!</Text>
              <Text style={styles.descricao}>
                Novos Idioma estarão disponíveis.
              </Text>

              <View style={styles.maisIdiomas2}>
                <View style={[{ alignItems: "center" }]}>
                  <Image
                    source={require("../assets/fr.png")}
                    style={styles.flag}
                  />
                  <Text style={styles.titleIdioma}>Francês</Text>
                </View>
                <View style={[{ alignItems: "center" }]}>
                  <Image
                    source={require("../assets/es.png")}
                    style={styles.flag}
                  />
                  <Text style={styles.titleIdioma}>Espanhol</Text>
                </View>
                <View style={[{ alignItems: "center" }]}>
                  <Image
                    source={require("../assets/en.png")}
                    style={styles.flag}
                  />
                  <Text style={styles.titleIdioma}>Inglês</Text>
                </View>
              </View>
            </View>
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
  flag: {
    height: 60,
    width: 60,
    marginLeft: 15,
    marginRight: 15
  },
  titleIdioma: {
    color: "#fff",
    marginTop: 15,
    fontSize: 18
  },
  maisIdiomas: {
    backgroundColor: "#000",
    borderRadius: 10,
    width: width - 40,
    justifyContent: "space-between",
    padding: 30,
    alignItems: "center"
  },
  maisIdiomas2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  descricao: {
    color: "#fff",
    fontSize: 18
  }
});
