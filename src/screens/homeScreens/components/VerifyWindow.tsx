import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

import CheckDark from "../../../assets/icons/check_dark.svg";
import CustomButton from "../../../components/Button/Button";

const VerifyWindow = ({
  handleVerify = () => {},
  editEventLoading = false,
  verifyEventSuccess = false,
  setIsVerified = (e) => {},
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const closeVerifyModal = () => {
    setModalVisible(false);
    setIsVerified(() => true);
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
            <View style={styles.check}>
              <CheckDark />
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
              This Event is Verified!
            </Text>
            <View
              style={{
                marginTop: 40,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 12,
              }}
            >
              <CustomButton
                title="Close"
                buttonStyle={{ backgroundColor: "#222222", paddingVertical: 8 }}
                textStyle={{ color: "#FFFFFF" }}
                onPress={closeVerifyModal}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  useEffect(() => {
    if (verifyEventSuccess) {
      setModalVisible(true);
    }
  }, [verifyEventSuccess]);

  return (
    <View style={styles.verifyModal}>
      {renderModal()}
      <Text
        style={{
          fontSize: 18,
          lineHeight: 24,
          fontWeight: "700",
          color: "#FC7A1B",
          marginVertical: 8,
        }}
      >
        This Event is not Verified!
      </Text>
      <Text
        style={{
          color: "#ADADAD",
          textAlign: "center",
          paddingHorizontal: 4,
        }}
      >
        This event was created automatically as per the saved Auto-entry time.
        Please verify the event.
      </Text>
      <View
        style={{
          marginTop: 40,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 12,
        }}
      >
        <CustomButton
          Icon={CheckDark}
          disabled={editEventLoading}
          isLoading={editEventLoading}
          title="Mark as Verified"
          onPress={handleVerify}
        />
      </View>
    </View>
  );
};

export default VerifyWindow;

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
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: "#0E0E0E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
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
    marginTop: 24,
    flex: 1,
    width: "100%",
    backgroundColor: "#0E0E0E",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3B3B3B",
  },
});
