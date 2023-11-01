import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import GeneralHeader from "../../components/Header/GeneralHeader";
import Excluded from "./Components/Excluded";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../components/Button/Button";

const ExcludedLocation = ({ navigation }) => {
  const [excludedLocations, setExcludedLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await AsyncStorage.getItem("utomea_user");
        const userData = JSON.parse(details);
        const { token } = userData;

        const apiUrl =
          "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/excluded-locations";

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        if (data && data.data) {
          setExcludedLocations(data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (location) => {
    setSelectedLocation(location);
    setConfirmationModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const details = await AsyncStorage.getItem("utomea_user");
      const userData = JSON.parse(details);
      const { token } = userData;

      if (selectedLocation) {
        setDeleteLoading(true);
        const apiUrl = `https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/excluded-location/${selectedLocation.id}`;

        await axios.delete(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setExcludedLocations((prevLocations) =>
          prevLocations.filter(
            (location) => location.id !== selectedLocation.id
          )
        );

        setDeleteLoading(false);
        setConfirmationModalVisible(false);
        setSelectedLocation(null);

        // Show success message
        Alert.alert("Success", "Location deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting location:", error);
      setDeleteLoading(false);

      // Show error message
      Alert.alert("Error", "Failed to delete location");
    }
  };

  const closeConfirmationModal = () => {
    setConfirmationModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <GeneralHeader title={`Excluded Locations`} />
      <View>
        <Text style={styles.paragraph}>
          New Events are not created for any of the listed locations here. To
          start creating events for any of these locations, you may delete them
          from the Excluded Locations list.
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#07AA8C" />
        ) : excludedLocations.length === 0 ? (
          <Text
            style={{
              color: "white",
              fontSize: 15,
            }}
          >
            No Excluded Locations Found
          </Text>
        ) : (
          excludedLocations.map((location) => (
            <Excluded
              key={location.id}
              title={location.identifier}
              subtitle={location.identifier}
              onPress={() => handleDelete(location)}
            />
          ))
        )}

        <Modal
          animationType="fade"
          transparent={true}
          visible={confirmationModalVisible}
          onRequestClose={closeConfirmationModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Text style={styles.confirmationTitle}>Are you sure?</Text>
              <Text style={styles.confirmationText}>
                Once deleted, App will start creating new events on this
                location.
              </Text>
              <View style={styles.modalButtons}>
                <CustomButton
                  title="Cancel"
                  buttonStyle={{ backgroundColor: "#222222" }}
                  textStyle={{ color: "#FFFFFF" }}
                  onPress={closeConfirmationModal}
                />
                <CustomButton
                  title="Yes, Delete"
                  buttonStyle={{ backgroundColor: "#58DAC3" }}
                  textStyle={{ color: "#0E0E0E" }}
                  onPress={handleConfirmDelete}
                  isLoading={deleteLoading}
                  disabled={deleteLoading}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  paragraph: {
    fontSize: 14,
    marginTop: 15,
    lineHeight: 20,
    color: "#ADADAD",
    fontWeight: "400",
    marginBottom: 10,
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
  confirmationTitle: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginVertical: 8,
  },
  confirmationText: {
    color: "#ADADAD",
    textAlign: "center",
    paddingHorizontal: 4,
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
    gap: 50,
    justifyContent: "space-between",
  },
});

export default ExcludedLocation;
