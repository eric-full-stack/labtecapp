import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  Linking,
  AsyncStorage,
  StatusBar,
  ActivityIndicator,
  FlatList
} from "react-native";
import openMap from "react-native-open-maps";
import { LinearGradient } from "expo-linear-gradient";

import Rating from "react-native-rating";
import images from "../components/RatingImages";

import MapView, { Marker } from "react-native-maps";

import ItemAvaliacao from "../components/ItemAvaliacao";

import api from "../services/api";

var width = Dimensions.get("window").width;

export default function Local(props) {
  const [loading, setLoading] = useState(true);
  const [favorited, setFavorited] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    async function getPlace() {
      try {
        setLoading(true);
        const userToken = await AsyncStorage.getItem("@User:token");
        await api
          .get(`/places/` + props.navigation.getParam("id"), {
            headers: { Authorization: `Bearer ${userToken}` }
          })
          .then(res => {
            setData({ ...res.data });
            setFavorited(res.data.favorited);
          });
        setLoading(false);
      } catch (err) {
        alert(err);
      }
    }
    getPlace();
  }, [props.navigation]);

  const handleFavorite = async () => {
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem("@User:token");

      await api.post(
        "/favorites/toggle",
        {
          placeId: data._id
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      setFavorited(!favorited);
    } catch (err) {
      alert(err);
    }
    setLoading(false);
  };
  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && data && (
        <View style={styles.view}>
          <View style={styles.header}>
            <TouchableHighlight
              onPress={() =>
                props.navigation.getParam("back")
                  ? props.navigation.navigate(props.navigation.getParam("back"))
                  : props.navigation.goBack()
              }
              underlayColor={"#FFFFFF00"}
            >
              <Image
                source={require("../assets/icons/back-black.png")}
                style={styles.icon}
              />
            </TouchableHighlight>
            <Text style={styles.text}>{data.name}</Text>
            <TouchableHighlight onPress={handleFavorite}>
              {favorited ? (
                <Image
                  source={require("../assets/icons/star.png")}
                  style={styles.icon2}
                />
              ) : (
                <Image
                  source={require("../assets/icons/star_black.png")}
                  style={styles.icon2}
                />
              )}
            </TouchableHighlight>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <ScrollView>
              <View style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}>
                {/*FOTOS*/}
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      marginTop: 15
                    }}
                  >
                    <Image
                      source={
                        data.photos
                          ? {
                              uri:
                                "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
                                data.photos[0].photo_reference +
                                "&key=AIzaSyCd84shidpHvlHFI0b5P0odF8sAzhocTj0"
                            }
                          : require("../assets/upload-photo.png")
                      }
                      style={{
                        backgroundColor: "#00000050",
                        height: 170,
                        width: width * (2 / 3) - 10,
                        margin: 2.5
                      }}
                    />
                    {data.photos && data.photos.length > 1 && (
                      <View
                        style={{
                          height: 170,
                          width: width * (1 / 3) - 10,
                          justifyContent: "space-between"
                        }}
                      >
                        <View>
                          {data.photos.map((photo, index) => {
                            return (
                              index >= 1 &&
                              index < 3 && (
                                <Image
                                  key={photo.photo_reference}
                                  source={{
                                    uri:
                                      "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
                                      photo.photo_reference +
                                      "&key=AIzaSyCd84shidpHvlHFI0b5P0odF8sAzhocTj0"
                                  }}
                                  style={{
                                    height: 82.5,
                                    width: width * (1 / 3) - 10,
                                    backgroundColor: "#00000050",
                                    margin: 2.5
                                  }}
                                />
                              )
                            );
                          })}
                        </View>
                      </View>
                    )}
                  </View>
                  <TouchableHighlight
                    onPress={() =>
                      props.navigation.navigate("VerFotos", {
                        photos: data.photos,
                        placeId: data._id,
                        name: data.name,
                        favorited
                      })
                    }
                  >
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 16,
                        color: "blue",
                        marginTop: 0,
                        marginLeft: 10
                      }}
                    >
                      Ver fotos
                    </Text>
                  </TouchableHighlight>
                </View>
                {/*AVALIAÇÃO MÉDIA*/}

                <View
                  style={{
                    marginTop: 25,
                    marginBottom: 25,
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "center"
                  }}
                >
                  <TouchableHighlight
                    onPress={() =>
                      props.navigation.navigate("Avaliar", {
                        name: data.name,
                        placeId: data._id,
                        vote: data.my_vote
                      })
                    }
                  >
                    <Rating
                      selectedStar={images.starFilled}
                      unselectedStar={images.starUnfilled}
                      stagger={80}
                      maxScale={1.4}
                      starStyle={{
                        width: 32,
                        height: 32
                      }}
                      initial={data.votes || 0}
                      editable={false}
                    />
                  </TouchableHighlight>
                  <Text style={{ color: "#000" }}>
                    ({data.total_votes ? data.total_votes : 0})
                  </Text>
                </View>
              </View>
              <View style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
                {/*SOCIAL E DADOS*/}
                {data.website ? (
                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 3,
                      borderColor: "rgba(255, 255, 255, 0.50)",
                      width: width - 20,
                      alignSelf: "center"
                    }}
                  >
                    <TouchableHighlight
                      onPress={() => {
                        Linking.openURL(data.website);
                      }}
                      underlayColor={"#FFFFFF00"}
                    >
                      <Image
                        source={require("../assets/icons/website.png")}
                        style={styles.icon3}
                      />
                    </TouchableHighlight>
                  </View>
                ) : null}

                <View style={styles.card}>
                  <Text
                    style={{
                      color: "#fff",
                      marginTop: 15,
                      marginBottom: 15,
                      marginLeft: 15,
                      fontSize: 16
                    }}
                  >
                    Aberto:{" "}
                    {data.opening_hours
                      ? data.opening_hours.open_now
                        ? "Sim"
                        : "Não"
                      : "Não informado"}
                  </Text>
                </View>

                <View style={styles.card}>
                  <Text
                    style={{
                      color: "#fff",
                      marginTop: 15,
                      marginBottom: 15,
                      marginLeft: 15,
                      fontSize: 16
                    }}
                  >
                    Telefone:{" "}
                    {data.formatted_phone_number
                      ? data.formatted_phone_number
                      : "Não informado"}
                  </Text>
                </View>

                <View style={styles.card}>
                  {typeof data.geometry !== "undefined" && (
                    <View
                      style={{
                        height: 150,
                        width: width - 20,
                        borderRadius: 20,
                        backgroundColor: "#E8E8E8",
                        marginTop: 10
                      }}
                    >
                      <MapView
                        style={{ flex: 1, ...StyleSheet.absoluteFillObject }}
                        minZoomLevel={15}
                        zoomEnabled={false}
                        zoomControlEnabled={false}
                        zoomTapEnabled={false}
                        rotateEnabled={false}
                        scrollEnabled={false}
                        pitchEnabled={false}
                        initialRegion={{
                          longitude: data.geometry.location.lng,
                          latitude: data.geometry.location.lat,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421
                        }}
                        onPress={() =>
                          openMap({
                            latitude: data.geometry.location.lat,
                            longitude: data.geometry.location.lng,
                            end: data.name,
                            zoom: 30
                          })
                        }
                        onMarkerPress={() =>
                          openMap({
                            latitude: data.geometry.location.lat,
                            longitude: data.geometry.location.lng,
                            end: data.name,
                            zoom: 30
                          })
                        }
                      >
                        <Marker
                          coordinate={{
                            latitude: data.geometry.location.lat,
                            longitude: data.geometry.location.lng
                          }}
                          title={data.name}
                        />
                      </MapView>
                    </View>
                  )}
                  <Text
                    style={{
                      color: "#fff",
                      marginTop: 15,
                      marginBottom: 15,
                      marginLeft: 15,
                      fontSize: 16
                    }}
                  >
                    Endereço: {data.formatted_address}
                  </Text>
                </View>
                {/*AVALIAR*/}
                <View style={styles.card}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        marginTop: 15,
                        marginBottom: 15,
                        marginLeft: 15,
                        fontSize: 16
                      }}
                    >
                      AVALIAÇÕES
                    </Text>
                    <TouchableHighlight
                      onPress={() =>
                        props.navigation.navigate("Avaliar", {
                          name: data.name,
                          placeId: data._id,
                          vote: data.my_vote
                        })
                      }
                      underlayColor={"#FFFFFF00"}
                    >
                      <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={["#D11C46", "#FA8624"]}
                        style={styles.button}
                      >
                        <Text style={styles.bottonText}>AVALIAR</Text>
                      </LinearGradient>
                    </TouchableHighlight>
                  </View>
                  <View
                    style={{
                      marginBottom: 15,
                      flexDirection: "row",
                      alignItems: "flex-end",
                      justifyContent: "center"
                    }}
                  >
                    <Rating
                      selectedStar={images.starFilled}
                      unselectedStar={images.starUnfilled}
                      stagger={80}
                      maxScale={1.4}
                      starStyle={{
                        width: 32,
                        height: 32
                      }}
                      initial={data.votes || 0}
                      editable={false}
                    />
                    <Text style={{ color: "#fff" }}>({data.total_votes})</Text>
                  </View>
                </View>
                {/*AVALIAÇÕES DO LOCAL*/}
                <View style={{ marginTop: 15, marginBottom: 15 }}>
                  <FlatList
                    data={data.comments}
                    contentContainerStyle={{
                      alignSelf: "center"
                    }}
                    keyExtractor={item => `${item._id}`}
                    renderItem={({ item }) => <ItemAvaliacao {...item} />}
                  />
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  text: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center"
  },
  header: {
    height: 58,
    backgroundColor: "rgba(255, 255, 255, 1)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderColor: "#000",
    marginTop: StatusBar.currentHeight
  },
  icon: {
    height: 32,
    width: 30,
    marginLeft: 5,
    marginRight: 5
  },
  icon2: {
    height: 24,
    width: 24,
    marginLeft: 5,
    marginRight: 5
  },
  icon3: {
    height: 45,
    width: 45,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5
  },
  card: {
    borderBottomWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.50)",
    width: width - 20,
    alignSelf: "center"
  },
  button: {
    padding: 5,
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
