import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Delete from "../../assets/icons/delete.svg";

const BackDropMenu = ({ navigation, menu }) => {
  return (
    <View style={styles.container}>
      {menu.map((m) => (
        <TouchableOpacity
          key={m.name}
          onPress={m?.onPress}
          style={styles.menuItem}
        >
          {m?.icon && m.icon()}
          <Text style={{ color: "#ADADAD" }}>{m?.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BackDropMenu;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "stretch",
    borderRadius: 12,
    padding: 8,
    backgroundColor: "rgba(14, 14, 14, 0.9)",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
});
