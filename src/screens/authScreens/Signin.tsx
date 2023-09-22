import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { View, Alert, Text, StyleSheet, Image } from "react-native";
import CustomButton from "../../components/Button/Button";
import CustomInput from "../../components/Input/Input";

import Logo from "../../assets/images/logo.svg";
import GoogleIcon from "../../assets/icons/google.svg";
import Facebook from "../../assets/icons/facebook.svg";
import Apple from "../../assets/icons/apple.svg";

import { signinUser } from "../../redux/slices/authSlice";
import { useAuth } from "../../hooks/useAuth";
// import Calendar from "../../assets/icons/calendar.svg";

const isEmailValid = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

const Signin = ({ navigation }) => {
  const dispatch = useDispatch();

  const { signinSuccess, signinError, signinLoading } = useSelector(
    (state) => state.auth
  );
  console.log("signin success---", signinSuccess);
  console.log("signin Error---", signinError);
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState(signinError);
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    if (!email || !password) {
      setValidationError(() => "Signin Failed, Please fill in all fields");
      return;
    }

    if (!isEmailValid(email)) {
      setValidationError("Please enter a valid email address");
      return;
    }

    dispatch(signinUser({ email, password }));
  };

  const handleSocialSignin = () => {
    Alert.alert("Available Soon!");
  };

  const handleSignupLink = () => {
    navigation.navigate("Signup");
  };

  const checkAuth = async () => {
    try {
      const isAuthenticated = await useAuth();

      if (isAuthenticated) {
        navigation.navigate("MainTabs", { prevScreen: "Signin" });
      }
    } catch (error) {
      console.error("Error checking user token:", error);
    }
  };

  useFocusEffect(() => {
    checkAuth();
  });

  useEffect(() => {
    setValidationError(signinError);
  }, [signinError]);

  useEffect(() => {
    if (signinSuccess) {
      navigation.navigate("MainTabs");
    }
  }, [signinSuccess]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <Text style={styles.title}>Login to your account</Text>
      <CustomInput
        label="Email"
        placeholder="Enter user email"
        placeholderTextColor="grey"
        editable={!signinLoading}
        value={email}
        onChangeText={(text) => setEmail(text)}
        containerStyle={{ marginBottom: 16 }}
      />
      <CustomInput
        label="Choose a Password"
        editable={!signinLoading}
        placeholder="Enter your password"
        placeholderTextColor="grey"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        containerStyle={{ marginBottom: 16 }}
      />

      <CustomButton
        disabled={signinLoading}
        title="Login"
        onPress={handleSignin}
      />

      <View style={{ marginTop: 5 }}>
        <Text style={styles.errorText}>{validationError}</Text>
      </View>

      <View style={{ marginVertical: 24 }}>
        <Text style={styles.or}>OR</Text>
        <View style={{ height: 1, backgroundColor: "#3B3B3B" }} />
      </View>

      <View style={{ gap: 10, marginBottom: 20 }}>
        <CustomButton
          Icon={GoogleIcon}
          title="Log In with Google"
          onPress={handleSocialSignin}
          buttonStyle={styles.socialButton}
          textStyle={{ color: "#FFFFFF" }}
        />
        <CustomButton
          Icon={Facebook}
          title="Sign Up with Facebook"
          onPress={handleSocialSignin}
          buttonStyle={styles.socialButton}
          textStyle={{ color: "#FFFFFF" }}
        />
        <CustomButton
          Icon={Apple}
          title="Sign Up with Apple"
          onPress={handleSocialSignin}
          buttonStyle={styles.socialButton}
          textStyle={{ color: "#FFFFFF" }}
        />
      </View>

      <View style={{ paddingVertical: 32 }}>
        <Text style={{ color: "#ADADAD", textAlign: "center" }}>
          Don't have an account?{" "}
          <Text
            style={{ color: "#FFFFFF", textDecorationLine: "underline" }}
            onPress={handleSignupLink}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  logoContainer: {
    marginBottom: 48,
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    lineHeight: 28,
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    textAlign: "center",
  },
  or: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "400",
    color: "#ADADAD",
    position: "absolute",
    left: "46%",
    bottom: -6,
    backgroundColor: "#0E0E0E",
    paddingHorizontal: 8,
    zIndex: 9,
    textAlign: "center",
  },
  socialButton: {
    backgroundColor: "#0E0E0E",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#3B3B3B",
    borderRadius: 100,
  },
});

export default Signin;
