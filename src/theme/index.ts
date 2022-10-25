/* eslint-disable import/no-anonymous-default-export */
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const colors = {
  dark: "#1B1D22",
};

const theme = extendTheme({ config, colors });

export default theme;

// export default {
//   colors: {
//     gray: {
//       "50": "#EFF4F6",
//       "100": "#D1E0E5",
//       "200": "#B4CDD5",
//       "300": "#96B9C5",
//       "400": "#79A5B4",
//       "500": "#5B92A4",
//       "600": "#497583",
//       "700": "#375762",
//       "800": "#243A42",
//       "900": "#121D21",
//     },
//   },
// };
