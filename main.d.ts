import { CustomThemeType } from "./src/theme/customTheme";

declare module "@react-navigation/native" {
  export function useTheme(): CustomThemeType;
}
