import { Avatar, Box, Text } from "@chakra-ui/react";

export const UserAvatar = () => {
  return (
    <Box marginX={4} marginY={5} alignItems="center" display="flex">
      <Avatar
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
        marginX={3}
      />
      <Text as="b" fontSize="lg">
        Dan Abrahmov
      </Text>
    </Box>
  );
};
