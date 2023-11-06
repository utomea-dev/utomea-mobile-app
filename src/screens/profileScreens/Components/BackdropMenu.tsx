import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const BackDropMenu = ({ navigation, menu, onDelete }) => {
  return (
    <View style={styles.container}>
      {menu.map((m) => (
        <TouchableOpacity
          key={m.name}
          onPress={() => (m.name === "Delete" ? onDelete() : m.onPress())}
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
    zIndex: 999,
    justifyContent: "center",
    alignItems: "stretch",
    borderRadius: 10,
    padding: 7,
    backgroundColor: "#3B3B3B",
  },
  menuItem: {
    color: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});
