import { Box, Heading, Switch, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useWorkspaceContext } from "../../contexts/WorkspaceContext";

export const WorkspaceHeader = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { activeWorkspace } = useWorkspaceContext();
  const isDark = colorMode === "dark";

  return (
    <Box
      as="header"
      paddingX={10}
      paddingY={6}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading as="h2" size="xl">
        {activeWorkspace?.title}
      </Heading>
      <Box>
        <Box display="inline-block" paddingRight={2}>
          {isDark ? <SunIcon /> : <MoonIcon />}
        </Box>
        <Switch
          isChecked={isDark}
          onChange={toggleColorMode}
          colorScheme="teal"
          size="lg"
        />
      </Box>
    </Box>
  );
};
