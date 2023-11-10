import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Email from "../../assets/images/email.svg";
import CustomInput from "../../components/Input/Input";
import CustomButton from "../../components/Button/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckEmail = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const [validationError, setValidationError] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);

  const handleCancel = () => {
    navigation.navigate("Signin");
  };

  const fetchUserProfile = async () => {
    try {
      const details = await AsyncStorage.getItem("EMAIL_FOR_OTP");
      setEmail(details);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleSendAgain = async () => {
    setValidationError("");
    setLoading(true);

    const emailForOTP = await AsyncStorage.getItem("EMAIL_FOR_OTP");
    console.log("emaillllllll---", emailForOTP);

    if (!emailForOTP) {
      console.error("Email for OTP not found in AsyncStorage");
      return;
    }

    try {
      const response = await axios.post(
        "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/auth/forgot-password",
        {
          email: emailForOTP,
        }
      );

      if (response.status === 200) {
        Alert.alert(`OTP Sent. Please check your email address`);
        setLoading(false);
      } else {
        console.error("Password reset request failed.");
        Alert.alert("Password reset request failed.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Password reset request failed:", error);
      Alert.alert("Something Went Wrong, Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!otp) {
      setValidationError("Please enter the OTP");
      return;
    }
    if (otp.length < 6) {
      setValidationError("Please enter a valid 6 Digit OTP");
      return;
    }

    setValidationError("");
    setLoadingOTP(true);

    try {
      const emailForOTP = await AsyncStorage.getItem("EMAIL_FOR_OTP");
      console.log("emaillllllll---", emailForOTP);

      if (!emailForOTP) {
        console.error("Email for OTP not found in AsyncStorage");
        setLoadingOTP(false);
        return;
      }

      console.log(otp);
      const response = await axios.post(
        "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/user/verify-forgot-otp",
        {
          email: emailForOTP.toLowerCase(),
          otp: otp,
        }
      );

      if (response.status === 200) {
        Alert.alert("Otp Verified Successfully");
        AsyncStorage.setItem("OTP_FOR_VERIFICATION", otp);
        setLoadingOTP(false);
        navigation.navigate("reset-password");
      } else {
        setValidationError("Invalid OTP. Please try again.");
        setLoadingOTP(false);
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log(error.response.status);
        setValidationError("Otp You entered is wrong, Please try again");
      } else {
        setValidationError(
          "oops!, Something went wrong please try again in sometime"
        );
      }
      console.error(error);
    } finally {
      setLoadingOTP(false);
    }
  };

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color="#58DAC3" size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={{ width: "100%" }}>
            <View style={styles.emailContainer}>
              <Email />
            </View>
            <Text style={styles.title}>Check your email</Text>
            <Text style={styles.paragraph}>
              We have sent the OTP for Resetting Password to{" "}
              {email.toLowerCase()}
            </Text>

            <CustomInput
              label="OTP"
              placeholder="Enter OTP"
              placeholderTextColor="grey"
              validationError={validationError}
              value={otp}
              onChangeText={(text) => setOtp(text)}
              inputStyle={{ paddingVertical: 10 }}
              containerStyle={{ marginTop: 32 }}
              keyboardType="numeric"
              disabled={loadingOTP}
            />

            <View style={{ marginVertical: 10 }}>
              <Text style={styles.paragraph}>
                Didn't receive the email?{" "}
                <Text
                  onPress={handleSendAgain}
                  style={{ color: "#FFFFFF", fontWeight: "500" }}
                >
                  Send Again
                </Text>
              </Text>
            </View>
            <CustomButton
              title="Verify OTP"
              isLoading={loadingOTP}
              onPress={handleVerify}
              disabled={otp.length !== 6 || loadingOTP}
              containerStyle={{ marginTop: 10 }}
            />

            <TouchableOpacity onPress={handleCancel}>
              <Text
                style={{ color: "#FFFFFF", textAlign: "center", marginTop: 10 }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  emailContainer: {
    marginTop: 48,
    marginBottom: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 4,
    fontSize: 20,
    lineHeight: 28,
    color: "#FFFFFF",
    fontWeight: "400",
    textAlign: "center",
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: "#ADADAD",
    textAlign: "center",
  },
});

export default CheckEmail;
