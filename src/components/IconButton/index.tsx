import { Box, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { IconType } from "react-icons";

interface IconButtonProps {
  readonly icon: IconType;
  readonly text: string;
}

export const IconButton: FC<IconButtonProps> = ({ icon, text }) => {
  const color = useColorModeValue("gray.600", "white");
  return (
    <Box marginX={2} as="button" display="flex" alignItems="center">
      <Icon as={icon} color={color} />
      <Text paddingLeft={1} color={color}>
        {text}
      </Text>
    </Box>
  );
};
