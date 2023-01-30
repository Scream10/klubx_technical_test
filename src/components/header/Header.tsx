import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { HeaderProps } from "./Header.type";

const Header: React.FC<HeaderProps> = ({ title, total }) => {
  return (
    <View>
      <Text style={styles.title}>
        {title} <Text style={styles.total}>({total})</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 12,
  },
  total: {
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    fontSize: 21,
  },
});

export default Header;
