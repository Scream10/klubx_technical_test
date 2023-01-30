import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import Header from "../../components/header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Contact from "../../components/contact";
import { ContactProps } from "src/components/contact/Contact.type";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import { FavoritesProps } from "./Favorites.type";

const Favorites: React.FC<FavoritesProps> = ({ navigation }) => {
  const [favorites, setFavorites] = useState<ContactProps["contact"][] | []>(
    []
  );

  const getFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("favorites_list");
      if (jsonValue !== null) {
        const result = JSON.parse(jsonValue);

        setFavorites(result);
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
    <Container>
      <SafeAreaView style={styles.container}>
        <Header title="Favoris" total={favorites?.length ?? 0} />
        {favorites?.length > 0 ? (
          <ScrollView style={styles.contacts}>
            {favorites?.map((favorite, id) => (
              <Contact
                key={id}
                contact={favorite}
                navigation={navigation}
                isFromFavorites
              />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.noFavorites}>
            <Text>Aucun favoris</Text>
          </View>
        )}
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  noFavorites: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: ScreenHeight - 300,
  },
  contacts: {
    height: "100%",
    marginTop: 10,
  },
});

export default Favorites;
