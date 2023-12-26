import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

import CheckDark from "../../../assets/icons/check_dark.svg";
import SyncIcon from "../../../assets/icons/sync.svg";
import CustomButton from "../../../components/Button/Button";

const Sync = ({
  handleSync = () => {},
  syncImagesSuccess = false,
  uploadImageSuccess = false,
  uploadImageLoading = false,
  editEventLoading = false,
  verifyEventSuccess = false,
  setIsVerified = (e) => {},
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const closeVerifyModal = () => {
    setModalVisible(false);
  };

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
            {/* <View style={styles.check}>
              <CheckDark />
            </View> */}
            <Text
              style={{
                fontSize: 14,
                lineHeight: 28,
                color: "rgb(200,200,200)",
                textAlign: "center",
                marginVertical: 8,
              }}
            >
              {syncImagesSuccess}
            </Text>
            <CustomButton
              title="Ok"
              onPress={closeVerifyModal}
              buttonStyle={{ paddingVertical: 8, backgroundColor: "#222222" }}
              containerStyle={{ marginVertical: 8, width: 70 }}
              textStyle={{ color: "#FFFFFF" }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  useEffect(() => {
    if (syncImagesSuccess && (!uploadImageLoading || uploadImageSuccess)) {
      setModalVisible(true);
    }
  }, [syncImagesSuccess, uploadImageSuccess]);

  return (
    <View style={styles.verifyModal}>
      {renderModal()}
      <View style={styles.syncContainer}>
        <View>
          <SyncIcon />
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              lineHeight: 24,
              fontWeight: "700",
              color: "#FC7A1B",
            }}
          >
            Syncing Paused
          </Text>
          <Text
            style={{
              color: "#ADADAD",
              textAlign: "left",
              marginTop: 4,
              marginBottom: 8,
            }}
          >
            Few photos in this event are not yet synced.
          </Text>

          <CustomButton
            title="Sync Now"
            onPress={handleSync}
            buttonStyle={{ backgroundColor: "#222222" }}
            containerStyle={{ marginVertical: 8, width: 100 }}
            textStyle={{ color: "#FFFFFF" }}
          />
        </View>
      </View>
    </View>
  );
};

export default Sync;

const styles = StyleSheet.create({
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
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#0E0E0E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "#3B3B3B",
  },
  check: {
    backgroundColor: "#58DAC3",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    borderRadius: 60,
  },
  verifyModal: {
    marginVertical: 24,
    flex: 1,
    width: "100%",
    backgroundColor: "#0E0E0E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "#3B3B3B",
  },
  syncContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 16,
    gap: 12,
    alignItems: "flex-start",
  },
});
