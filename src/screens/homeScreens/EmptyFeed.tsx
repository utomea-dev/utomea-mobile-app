import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import CustomButton from "../../components/Button/Button";

import PlusDark from "../../assets/icons/plus_dark.svg";
import PlusLight from "../../assets/icons/plus_light.svg";
import Welcome from "../../assets/icons/welcome.svg";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { reset } from "../../redux/slices/authSlice";

const createButtons = [1, 2, 3, 4];

const EmptyFeed = ({ navigation }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(true);

  const handleCreateEventButton = async () => {
    navigation.navigate("Create");
  };

  const handlePress = (entry) => {};

  const renderModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.welcome}>
              <Welcome />
            </View>
            <Text
              style={{
                fontSize: 24,
                lineHeight: 28,
                fontWeight: "700",
                color: "#FFFFFF",
                marginVertical: 8,
              }}
            >
              Welcome to Utomea!
            </Text>

            <Text style={{ color: "#ADADAD" }}>
              You have successfully signed up.
            </Text>
            <View style={{ marginTop: 40 }}>
              <CustomButton
                title="Continue"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderCreateButton = () => {
    return createButtons.map((entry) => (
      <TouchableOpacity
        key={entry}
        style={styles.button}
        onPress={() => handlePress(entry)}
      >
        <PlusLight />
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      {renderModal()}
      <View style={{ marginVertical: 24 }}>
        <Text style={styles.title}>Your feed is empty :(</Text>
        <View>
          <Text style={[styles.paragraph, { marginBottom: 10 }]}>
            Events will be created automatically when you click pictures at a
            location. You could wait..
          </Text>
          <Text style={styles.paragraph}>
            OR, you can start creating events manually from your previous
            pictures!
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>{renderCreateButton()}</View>
      <View>
        <CustomButton
          Icon={PlusDark}
          title="Create an Event"
          onPress={handleCreateEventButton}
          buttonStyle={{ paddingVertical: 8 }}
          textStyle={{ fontSize: 16, lineHeight: 24 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(14, 14, 14, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    flex: 1,
    marginHorizontal: 16,
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: "#0E0E0E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3B3B3B",
  },
  welcome: {
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: 48,
    borderRadius: 40,
    backgroundColor: "#045D4D",
  },
  title: {
    marginBottom: 8,
    fontSize: 20,
    lineHeight: 28,
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "left",
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: "#ADADAD",
    fontWeight: "400",
  },
  buttonContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  button: {
    borderWidth: 1,
    borderColor: "#3B3B3B",
    backgroundColor: "#0E0E0E",
    borderRadius: 8,
    padding: 4,
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 38,
    lineHeight: 44,
    textAlign: "center",
    fontWeight: "400",
    color: "#FFFFFF",
  },
});

export default EmptyFeed;
