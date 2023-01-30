import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { useTheme } from "@react-navigation/native";

import { ContainerProps } from "./Container.type";

const Container: React.FC<ContainerProps> = ({ children, noMargin = true }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.white, marginHorizontal: noMargin ? 0 : 20 },
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Container;
