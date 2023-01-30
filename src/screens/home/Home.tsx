import React, { useCallback, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../components/header";
import Container from "../../components/container/Container";
import Search from "../../components/search";
import { useQuery } from "react-query";
import Contact from "../../components/contact";
import { ContactProps } from "src/components/contact/Contact.type";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import { HomeProps } from "./Home.type";

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [value, setValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getContacts = async () => {
    try {
      const response = await fetch(
        `https://reqres.in/api/users?page=${page}&delay=1`
      );
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["contacts", page],
    queryFn: getContacts,
  });

  const filterContacts = data?.data?.filter(
    (contact: ContactProps["contact"]) =>
      contact.first_name.toLowerCase().indexOf(value?.toLowerCase().trim()) !==
        -1 ||
      contact.last_name.toLowerCase().indexOf(value?.toLowerCase().trim()) !==
        -1 ||
      contact.email.toLowerCase().indexOf(value?.toLowerCase().trim()) !== -1
  );

  const onChangeText = (text: string) => {
    setValue(text);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    if (page === 1) {
      setPage(2);
    } else {
      setPage(1);
    }

    setRefreshing(false);
  }, [page]);

  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <Header title="Contacts" total={filterContacts?.length} />
        <Search
          onChangeText={onChangeText}
          value={value}
          placeholder="Rechercher par prénom, nom ou email"
        />
        {isLoading ? (
          <View style={styles.loading}>
            <Text>Chargement...</Text>
          </View>
        ) : (
          <ScrollView
            style={styles.contacts}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {filterContacts.map(
              (contact: ContactProps["contact"], id: string) => (
                <Contact key={id} contact={contact} navigation={navigation} />
              )
            )}
          </ScrollView>
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
  contacts: {
    height: "100%",
    marginTop: 10,
  },
  loading: {
    height: ScreenHeight - 300,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
