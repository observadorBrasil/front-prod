import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#315985",
    secondary: "#FFFFFF",
    lightGrey: "#F5F5F5",
  },
  breakpoints: {
    sm: "400px",
    md: "600px",
    lg: "800px",
    xl: "1000px",
    "2xl": "1200px",
  },
  styles: {
    global: () => ({
      body: {
        color: "primary",
      },
    }),
  },
});

export default theme;
