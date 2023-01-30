import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ContactProps } from "./Contact.type";
import { useTheme } from "@react-navigation/native";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Contact: React.FC<ContactProps> = ({
  contact,
  navigation,
  isFromFavorites = false,
}) => {
  const { colors } = useTheme();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<ContactProps["contact"][] | []>(
    []
  );

  const getFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("favorites_list");
      if (jsonValue !== null) {
        const result = JSON.parse(jsonValue);

        if (jsonValue === "{}") {
          setFavorites([]);
          return;
        }

        setFavorites(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleIsFavorite = async () => {
    setIsFavorite(!isFavorite);

    try {
      const contactCopy = { ...contact };
      contactCopy.isFavorite = true;

      const isAlreadyInStorage =
        favorites?.length > 0 &&
        favorites?.filter((fav: any) => fav?.id === contact?.id)?.length > 0;

      if (isAlreadyInStorage) {
        const removeContactFromFavorites = favorites.filter(
          (favorite) => favorite?.id !== contact?.id
        );

        const jsonValue = JSON.stringify(removeContactFromFavorites);
        await AsyncStorage.setItem("favorites_list", jsonValue);
        return;
      }

      if (!isAlreadyInStorage || favorites?.length === 0) {
        // @ts-ignore
        favorites.push(contactCopy);

        const jsonValue = JSON.stringify(favorites);
        await AsyncStorage.setItem("favorites_list", jsonValue);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getFavorites();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.black }]}>
      <View style={styles.wrapperInfos}>
        <Image source={{ uri: contact?.avatar }} style={styles.roundIcon} />
        <View style={styles.information}>
          <Text style={[styles.name, { color: colors.white }]}>
            {contact?.first_name} {contact?.last_name}
          </Text>
          <Text style={{ color: colors.white }}>{contact?.email}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleIsFavorite} disabled={isFromFavorites}>
        <Icon
          name={isFavorite || contact?.isFavorite ? "heart" : "heart-outline"}
          type="ionicon"
          size={30}
          color={colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    padding: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: ScreenWidth - 40,
    borderWidth: 1,
    borderRadius: 6,
  },
  roundIcon: {
    borderRadius: 50,
    width: 52,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 20,
  },
  wrapperInfos: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    width: ScreenWidth - 130,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
  },
  information: {
    display: "flex",
  },
});

export default Contact;
