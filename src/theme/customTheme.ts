import { DefaultTheme } from "@react-navigation/native";

export type CustomThemeType = {
  colors: {
    textInput: string;
    white: string;
    midGrey: string;
    background: string;
    black: string;
  };
};

const customTheme: any = {
  ...DefaultTheme,
  colors: {
    textInput: "#768EA6",
    white: "#FFFFFF",
    midGrey: "#D8E0EC",
    background: "#F0F4F9",
    black: "#0A1F33",
  },
};

export default customTheme;
