import React from "react";

import { View, StyleSheet, Dimensions, Image } from "react-native";

var { width } = Dimensions.get("window");

export default class ItemFoto extends React.Component {
  render() {
    return (
      <View>
        <Image
          source={{
            uri:
              "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
              this.props.photo_reference +
              "&key=AIzaSyCd84shidpHvlHFI0b5P0odF8sAzhocTj0"
          }}
          style={styles.foto}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  foto: {
    height: 250,
    width: width - 20,
    marginBottom: 5,
    marginTop: 5
  }
});
