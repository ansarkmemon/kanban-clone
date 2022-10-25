import {
  Box,
  Divider,
  useColorModeValue,
  Text,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import styled from "styled-components";
import { BsBriefcaseFill } from "react-icons/bs";
import { light, dark } from "./style";
import { UserAvatar } from "./UserAvatar";
import { useWorkspaceContext } from "../../contexts/WorkspaceContext";

export const Sidebar = () => {
  const style = useColorModeValue(light, dark);
  const { activeWorkspace, setActiveWorkspace, workspaces, isLoading } =
    useWorkspaceContext();

  if (isLoading) return <div>isLoading</div>;

  return (
    <Box
      bgColor={style.bgColor}
      minHeight="100vh"
      borderRightWidth={2}
      paddingX={6}
    >
      <UserAvatar />
      <Divider borderWidth={1} />
      <Box marginY={4}>
        <Text
          as="b"
          textTransform="uppercase"
          fontSize="sm"
          color={style.workspaceTitle}
        >
          Workspaces
        </Text>
        <List spacing={3} marginTop={4}>
          {workspaces.map((workspace) => (
            <StyledListItem
              key={workspace.id}
              onClick={() => setActiveWorkspace(workspace)}
              selected={workspace.id === activeWorkspace?.id}
            >
              <ListIcon as={BsBriefcaseFill} color="gray.500" />
              <Text as="b" color="gray.600">
                {workspace.title}
              </Text>
            </StyledListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

const StyledListItem = styled(ListItem)<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#CBD5E0" : "")};
`;
