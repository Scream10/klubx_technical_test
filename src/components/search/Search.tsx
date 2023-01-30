import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Icon } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import { SearchProps } from "./Search.type";

const Search: React.FC<SearchProps> = ({
  onChangeText,
  value,
  placeholder,
}) => {
  const { colors } = useTheme();

  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.white, borderColor: colors.midGrey },
        ]}
      >
        <Icon
          style={styles.icon}
          name="search"
          size={20}
          color={colors.textInput}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          keyboardType="default"
          placeholderTextColor={colors.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  icon: {
    paddingVertical: 10,
    paddingLeft: 12,
    paddingRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 12,
    paddingLeft: 0,
    fontSize: 16,
    width: "100%",
  },
});

export default Search;
