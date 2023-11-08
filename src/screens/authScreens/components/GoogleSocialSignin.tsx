import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import GoogleIcon from "../../../assets/icons/google.svg";

import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  socialLoginSignup,
  updateUserForm,
} from "../../../redux/slices/authSlice";
import { StackActions, useNavigation } from "@react-navigation/native";

const GoogleSocialSignin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { socialSuccess, socialError, socialLoading, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "197300810699-65ejpaosi57t0bg95et8v2gvb5eifsm7.apps.googleusercontent.com",
      // webClientId:
      //   "309522091284-bq3m191abpvpqjhvisgh3gd0qsqe4nih.apps.googleusercontent.com",
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      const res = await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("googl user__________", userInfo);
      dispatch(updateUserForm({ key: "name", value: userInfo.user?.name }));
      dispatch(socialLoginSignup({ email: userInfo.user?.email }));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Signin cancelled.");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Signin in progress ...");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Service not available!");
      } else {
        console.error(error);
      }
    }
  };

  // useEffect(() => {
  //   GoogleSignin.isSignedIn().then((isAuth) => {
  //     if (!isAuth) {
  //       // AsyncStorage.clear();
  //       navigation.navigate("Signin");
  //     }
  //   });
  // }, []);

  useEffect(() => {
    if (socialError) {
      GoogleSignin.signOut();
      console.log("LOGGED OUT");
    }
  }, [socialError]);

  useEffect(() => {
    if (user.user?.name) {
      navigation.dispatch(
        StackActions.replace("MainTabs", { params: "comingFromSocialSignin" })
      );
      return;
    }
    if (socialSuccess) {
      navigation.dispatch(StackActions.replace("UserDetails"));
    }
  }, [socialSuccess, user]);

  return (
    <View>
      <CustomButton
        disabled={socialLoading}
        Icon={GoogleIcon}
        title="Log In with Google"
        onPress={signInWithGoogle}
        buttonStyle={styles.socialButton}
        textStyle={{ color: "#FFFFFF" }}
      />
    </View>
  );
};

export default GoogleSocialSignin;

const styles = StyleSheet.create({
  socialButton: {
    backgroundColor: "#0E0E0E",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#3B3B3B",
    borderRadius: 100,
  },
});
