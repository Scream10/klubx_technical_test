import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Animated, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import Home from "../screens/home";
import Favorites from "../screens/favorites";

const Tab = createBottomTabNavigator();

const BottomBar: React.FC = () => {
  const { colors } = useTheme();
  let translateYHome = new Animated.Value(0);
  let translateYHeart = new Animated.Value(0);

  const bounce = (title?: string | undefined) => {
    if (title === "home") {
      translateYHome = new Animated.Value(5);
      Animated.spring(translateYHome, {
        toValue: 0,
        friction: 1,
        tension: 30,
        useNativeDriver: false,
      }).start();

      return translateYHome;
    }
    if (title === "heart") {
      translateYHeart = new Animated.Value(5);
      Animated.spring(translateYHeart, {
        toValue: 0,
        friction: 1,
        tension: 30,
        useNativeDriver: false,
      }).start();

      return translateYHeart;
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: [
          styles.tabBar,
          { backgroundColor: colors.white, shadowColor: colors.textInput },
        ],
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={Home}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => {
            if (navigation?.isFocused()) {
              bounce("home");
            }

            return (
              <Animated.View
                style={{ transform: [{ translateY: translateYHome }] }}
              >
                <Icon
                  name={focused ? "home" : "home-outline"}
                  type="ionicon"
                  size={20}
                  color={focused ? colors.black : colors.textInput}
                />
              </Animated.View>
            );
          },
          headerShown: false,
          tabBarActiveTintColor: colors.black,
          tabBarInactiveTintColor: colors.textInput,
        })}
      />
      <Tab.Screen
        name="Favoris"
        component={Favorites}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => {
            if (navigation?.isFocused()) {
              bounce("heart");
            }

            return (
              <Animated.View
                style={{ transform: [{ translateY: translateYHeart }] }}
              >
                <Icon
                  name={focused ? "heart" : "heart-outline"}
                  type="ionicon"
                  size={20}
                  color={focused ? colors.black : colors.textInput}
                />
              </Animated.View>
            );
          },
          headerShown: false,
          tabBarActiveTintColor: colors.black,
          tabBarInactiveTintColor: colors.textInput,
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    display: "flex",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "transparent",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.35,
    shadowRadius: 75,
    paddingBottom: 25,
    paddingTop: 10,
    minHeight: 80,
  },
});

export default BottomBar;
