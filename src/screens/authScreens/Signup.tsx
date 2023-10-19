import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { View, Alert, Text, StyleSheet, BackHandler } from "react-native";
import CustomButton from "../../components/Button/Button";
import CustomInput from "../../components/Input/Input";
import { StackActions } from "@react-navigation/native";

import Logo from "../../assets/images/logo.svg";
import GoogleIcon from "../../assets/icons/google.svg";
import Facebook from "../../assets/icons/facebook.svg";
import Apple from "../../assets/icons/apple.svg";

import { reset, signupUser } from "../../redux/slices/authSlice";
import { useAuth } from "../../hooks/useAuth";

const Signup = ({ navigation }) => {
  const dispatch = useDispatch();

  const { signupSuccess, signupError, signupLoading } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [validationError, setValidationError] = useState("");

  const clear = () => {
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
    setValidationError("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
    setValidationError("");
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const isPasswordValid = (pass) => {
    if (pass.length < 6) {
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    clearErrors();
    let errorFlag = false;

    if (!email || !isEmailValid(email)) {
      setEmailError(() => "Please enter a valid email address");
      errorFlag = true;
    }

    if (!password || !isPasswordValid(password)) {
      setPasswordError(
        () => "Please choose a password of atleast 6 characters"
      );
      errorFlag = true;
    }

    if (!errorFlag) {
      clearErrors();
      dispatch(signupUser({ email, password }));
    }
  };

  const handleSocialSignup = () => {
    Alert.alert("Available Soon!");
  };

  const handleSigninLink = () => {
    navigation.navigate("Signin");
    clear();
  };

  const checkAuth = async () => {
    try {
      const user = await useAuth();
      if (user) {
        if (user.privacy_policy_accepted) {
          navigation.dispatch(StackActions.replace("MainTabs"));
        } else {
          navigation.dispatch(StackActions.replace("UserDetails"));
        }
      }
    } catch (error) {
      console.error("Error checking user token:", error);
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
    };
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener("beforeRemove", () => {
        dispatch(reset());
      });

      checkAuth();
      return unsubscribe;
    }, [navigation])
  );

  useEffect(() => {
    setValidationError(signupError);
  }, [signupError]);

  useEffect(() => {
    if (signupSuccess) {
      clear();
      navigation.dispatch(StackActions.replace("UserDetails"));
    }
  }, [signupSuccess]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <Text style={styles.title}>Create an account</Text>
      <CustomInput
        label="Email"
        placeholder="Enter user email"
        placeholderTextColor="grey"
        validationError={emailError}
        editable={!signupLoading}
        value={email}
        onChangeText={(text) => setEmail(text)}
        containerStyle={{ marginBottom: 16 }}
      />
      <CustomInput
        label="Choose a password"
        editable={!signupLoading}
        placeholder="Enter your password"
        placeholderTextColor="grey"
        validationError={passwordError}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        containerStyle={{ marginBottom: 16 }}
      />

      <CustomButton
        isLoading={signupLoading}
        disabled={signupLoading}
        title="Create Account"
        onPress={handleSignup}
      />

      {validationError && (
        <View style={{ marginTop: 5 }}>
          <Text style={styles.errorText}>{validationError}</Text>
        </View>
      )}

      <View style={{ marginVertical: 24 }}>
        <Text style={styles.or}>OR</Text>
        <View style={{ height: 1, backgroundColor: "#3B3B3B" }} />
      </View>

      <View style={{ gap: 10, marginBottom: 20 }}>
        <CustomButton
          Icon={GoogleIcon}
          title="Sign Up with Google"
          onPress={handleSocialSignup}
          buttonStyle={styles.socialButton}
          textStyle={{ color: "#FFFFFF" }}
        />
        <CustomButton
          Icon={Facebook}
          title="Sign Up with Facebook"
          onPress={handleSocialSignup}
          buttonStyle={styles.socialButton}
          textStyle={{ color: "#FFFFFF" }}
        />
        <CustomButton
          Icon={Apple}
          title="Sign Up with Apple"
          onPress={handleSocialSignup}
          buttonStyle={styles.socialButton}
          textStyle={{ color: "#FFFFFF" }}
        />
      </View>

      <View style={{ paddingVertical: 32 }}>
        <Text style={{ color: "#ADADAD", textAlign: "center" }}>
          Already have an account?{" "}
          <Text
            style={{ color: "#FFFFFF", textDecorationLine: "underline" }}
            onPress={handleSigninLink}
          >
            Log in
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
    color: "#FC7A1B",
    textAlign: "left",
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

export default Signup;
