import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StackActions, useNavigation } from "@react-navigation/native";
import CustomButton from "../../../components/Button/Button";
import AppleIcon from "../../../assets/icons/apple.svg";
import {
  socialLoginSignup,
  updateUserForm,
} from "../../../redux/slices/authSlice";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
global.atob = decode;

const AppleSocialSignin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { socialSuccess, socialError, socialLoading, user } = useSelector(
    (state) => state.auth
  );

  const onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      console.log("appleAuthRequestResponse:", appleAuthRequestResponse);

      if (!appleAuthRequestResponse?.identityToken) {
        throw "Apple Sign In failed - no identity token returned";
      }

      // Decode the JWT token to extract information
      const decodedToken = jwtDecode(appleAuthRequestResponse.identityToken);
      console.log("decodedToken:", decodedToken);

      let email = decodedToken?.email;
      let name = decodedToken?.name;

      console.log("email:", email, name);

      const fullName = appleAuthRequestResponse.fullName ?? "";

      dispatch(updateUserForm({ key: "name", value: fullName }));
      dispatch(socialLoginSignup({ email }));
    } catch (error) {
      console.error("Error during Apple login:", error);
    }
  };

  useEffect(() => {
    if (socialError) {
      console.log("LOGGED OUT OF APPLE");
    }
  }, [socialError]);

  useEffect(() => {
    if (user?.user?.name) {
      navigation.dispatch(
        StackActions.replace("MainTabs", { params: "comingFromSocialSignin" })
      );
      return;
    }
    if (socialSuccess) {
      console.log(
        "Name and email fetched only on the first login. Modify Apple settings to update."
      );
      navigation.dispatch(StackActions.replace("UserDetails"));
    }
  }, [socialSuccess, user]);

  return (
    <View>
      <CustomButton
        Icon={AppleIcon}
        disabled={socialLoading}
        title="Log In with Apple"
        onPress={onAppleButtonPress}
        buttonStyle={styles.socialButton}
        textStyle={{ color: "#FFFFFF" }}
      />
    </View>
  );
};

export default AppleSocialSignin;

const styles = StyleSheet.create({
  socialButton: {
    backgroundColor: "#0E0E0E",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#3B3B3B",
    borderRadius: 100,
  },
});
