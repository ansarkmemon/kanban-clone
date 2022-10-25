import { Box, Divider } from "@chakra-ui/react";
import { Board } from "./Board";
import { BoardHeader } from "./BoardHeader";
import { WorkspaceHeader } from "./WorkspaceHeader";

export const Main = () => {
  return (
    <Box as="main">
      <WorkspaceHeader />
      <Divider />
      <Box marginX={10} marginY={4}>
        <BoardHeader />
        <Board />
      </Box>
    </Box>
  );
};
