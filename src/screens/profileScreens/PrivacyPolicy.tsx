import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "../../components/Button/Button";

import Logo from "../../assets/images/logo.svg";

import { ScrollView } from "react-native-gesture-handler";
import GeneralHeader from "../../components/Header/GeneralHeader";

const PrivacyPolicy = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <GeneralHeader title={`Privacy Policy `} />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <ScrollView>
          <Text style={styles.paragraph}>
            Your privacy is important to us. We collect and use your data solely
            to enhance our services. We don't share your personal information
            without your consent. Your data is secure with us, and you have
            control over it. For details, read our full Privacy Policy on our
            website. If you have questions, contact us at [Contact Information].
            Your privacy is our priority. Your privacy is important to us. We
            collect and use your data solely to enhance our services. We don't
            share your personal information without your consent. Your data is
            secure with us, and you have control over it. For details, read our
            full Privacy Policy on our website. If you have questions, contact
            us at [Contact Information]. Your privacy is our priority.
          </Text>
          <Text style={[styles.paragraph, { marginBottom: 75 }]}>
            Your privacy is important to us. We collect and use your data solely
            to enhance our services. We don't share your personal information
            without your consent. Your data is secure with us, and you have
            control over it. For details, read our full Privacy Policy on our
            website. If you have questions, contact us at [Contact Information].
            Your privacy is our priority. Your privacy is important to us. We
            collect and use your data solely to enhance our services. We don't
            share your personal information without your consent. Your data is
            secure with us, and you have control over it. For details, read our
            full Privacy Policy on our website. If you have questions, contact
            us at [Contact Information]. Your privacy is our priority. Your
            privacy is important to us. We collect and use your data solely to
            enhance our services. We don't share your personal information
            without your consent. Your data is secure with us, and you have
            control over it. For details, read our full Privacy Policy on our
            website. If you have questions, contact us at [Contact Information].
            Your privacy is our priority. Your privacy is important to us. We
            collect and use your data solely to enhance our services. We don't
            share your personal information without your consent. Your data is
            secure with us, and you have control over it. For details, read our
            full Privacy Policy on our website. If you have questions, contact
            us at [Contact Information]. Your privacy is our priority. Your
            privacy is important to us. We collect and use your data solely to
            enhance our services. We don't share your personal information
            without your consent. Your data is secure with us, and you have
            control over it. For details, read our full Privacy Policy on our
            website. If you have questions, contact us at [Contact Information].
            Your privacy is our priority. Your privacy is important to us. We
            collect and use your data solely to enhance our services. We don't
            share your personal information without your consent. Your data is
            secure with us, and you have control over it. For details, read our
            full Privacy Policy on our website. If you have questions, contact
            us at [Contact Information]. Your privacy is our priority. Your
            privacy is important to us. We collect and use your data solely to
            enhance our services. We don't share your personal information
            without your consent. Your data is secure with us, and you have
            control over it. For details, read our full Privacy Policy on our
            website. If you have questions, contact us at [Contact Information].
            Your privacy is our priority.
          </Text>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  logoContainer: {
    marginBottom: 22,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    marginBottom: 8,
    fontSize: 20,
    lineHeight: 28,
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
  },
  paragraph: {
    color: "#ADADAD",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(14, 14, 14, 0.9)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 5,
  },
});

export default PrivacyPolicy;
