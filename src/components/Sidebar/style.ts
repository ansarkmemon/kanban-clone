import { ColorProps } from "@chakra-ui/react";

type Style = {
  bgColor: ColorProps["color"];
  workspaceTitle: ColorProps["color"];
};

export const light: Style = {
  bgColor: "gray.50",
  workspaceTitle: "blackAlpha.400",
};

export const dark: Style = {
  bgColor: "dark",
  workspaceTitle: "whiteAlpha.500",
};
