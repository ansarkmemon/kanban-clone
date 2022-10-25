import {
  Box,
  Divider,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiFilterAlt, BiShareAlt, BiEditAlt, BiExport } from "react-icons/bi";
import { IconButton } from "../IconButton";

export const BoardHeader = () => {
  const colorScheme = useColorModeValue("blackAlpha", "whiteAlpha");
  return (
    <Box>
      <Heading as="h3" size="lg">
        Overview
      </Heading>
      <Box
        paddingY={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text colorScheme={colorScheme}>
          Edit or modify all the cards as you want
        </Text>
        <Box display="flex">
          <IconButton icon={BiEditAlt} text="Edit" />
          <IconButton icon={BiFilterAlt} text="Filter" />
          <IconButton icon={BiShareAlt} text="Share" />
          <IconButton icon={BiExport} text="Export" />
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};
