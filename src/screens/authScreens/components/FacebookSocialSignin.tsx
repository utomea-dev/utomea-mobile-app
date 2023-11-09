import { Settings } from "react-native-fbsdk-next";
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
} from "react-native-fbsdk-next";

import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Facebook from "../../../assets/icons/facebook.svg";
import CustomButton from "../../../components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  socialLoginSignup,
  updateUserForm,
} from "../../../redux/slices/authSlice";

Settings.setAppID("313238364904139");
Settings.initializeSDK();

import { StackActions, useNavigation } from "@react-navigation/native";
const FacebookSocialSignin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { socialSuccess, socialError, socialLoading, user } = useSelector(
    (state) => state.auth
  );
  console.log("User in componenne ---------", user);
  const fetchUserProfile = (accessToken) => {
    const infoRequest = new GraphRequest(
      "/me",
      {
        parameters: {
          fields: {
            string: "id,name,email",
          },
          access_token: {
            string: accessToken,
          },
        },
      },
      (error, result) => {
        if (error) {
          console.error("Error fetching user data:", error);
        } else {
          console.log("User data:", result);
          const { email, name } = result;
          dispatch(updateUserForm({ key: "name", value: name }));
          dispatch(socialLoginSignup({ email }));

          // You can use this user data in your app.
        }
      }
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  };

  const signInWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);
      if (result.isCancelled) {
        console.log("Facebook login was canceled");
      } else {
        console.log("Logged in with Facebook!", result);
        const accessToken = result.grantedPermissions?.includes("email")
          ? (await AccessToken.getCurrentAccessToken())?.accessToken
          : null;

        fetchUserProfile(accessToken);
      }
    } catch (error) {
      console.error("Error during Facebook login:", error);
    }
  };

  // useEffect(() => {
  //   AccessToken.getCurrentAccessToken().then((token) => {
  //     if (!token?.accessToken) {
  //       // AsyncStorage.clear();
  //       navigation.navigate("Signin");
  //     }
  //   });
  // }, []);

  useEffect(() => {
    if (socialError) {
      LoginManager.logOut();
      console.log("LOGGED OUT OF FB");
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
        Icon={Facebook}
        disabled={socialLoading}
        title="Sign Up with Facebook"
        onPress={signInWithFacebook}
        buttonStyle={styles.socialButton}
        textStyle={{ color: "#FFFFFF" }}
      />
    </View>
  );
};

export default FacebookSocialSignin;

const styles = StyleSheet.create({
  socialButton: {
    backgroundColor: "#0E0E0E",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#3B3B3B",
    borderRadius: 100,
  },
});
