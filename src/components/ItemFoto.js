import React from "react";
import ImageView from "react-native-image-view";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

var { width } = Dimensions.get("window");

export default class ItemFoto extends React.Component {
  state = { isVisible: false };
  render() {
    return (
      <View>
        <ImageView
          images={[
            {
              source: {
                uri:
                  "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
                  this.props.photo_reference +
                  "&key=AIzaSyCd84shidpHvlHFI0b5P0odF8sAzhocTj0"
              }
            }
          ]}
          imageIndex={0}
          isVisible={this.state.isVisible}
          onClose={() => this.setState({ ...this.state, isVisible: false })}
        />
        <TouchableWithoutFeedback
          onPress={() => this.setState({ ...this.state, isVisible: true })}
        >
          <Image
            source={{
              uri:
                "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
                this.props.photo_reference +
                "&key=AIzaSyCd84shidpHvlHFI0b5P0odF8sAzhocTj0"
            }}
            style={styles.foto}
          />
        </TouchableWithoutFeedback>
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
