import {
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tag,
  Badge,
  ThemingProps,
  AvatarGroup,
  Avatar,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { ITask } from "../../types/workspace";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { TaskModal } from "../TaskModal/TaskModal";
import { useWorkspaceContext } from "../../contexts/WorkspaceContext";

interface ITaskCardProps {
  readonly task: ITask;
  readonly index: number;
}

const categoryColorGenerator = (cat: string): ThemingProps["colorScheme"] => {
  cat = cat.toLowerCase();

  if (cat === "design") return "teal";
  if (cat === "prototype") return "purple";
  if (cat === "research") return "cyan";
  return "pink";
};

export const TaskCard: React.FC<ITaskCardProps> = ({ task, index }) => {
  const { activeWorkspace, removeTask } = useWorkspaceContext();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const backgroundColor = useColorModeValue("whiteAlpha.800", "dark");

  const onRemove = () => {
    removeTask(activeWorkspace?.id!, task.associations?.column!, task.id);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => {
          return (
            <Box
              borderWidth={2}
              borderRadius={4}
              borderColor="blackAlpha.100"
              bgColor={backgroundColor}
              marginY={2}
              paddingLeft={2}
              paddingY={1.5}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <Header>
                <Text fontSize="14px" fontWeight={500}>
                  {task.content}
                </Text>
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        isActive={isOpen}
                        as={IconButton}
                        size="sm"
                        variant="link"
                        icon={<SettingsIcon w={3} h={3} />}
                      />
                      <MenuList>
                        <MenuItem onClick={onOpen}>Edit</MenuItem>
                        <MenuItem onClick={onRemove}>Delete</MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </Header>
              <Tags>
                {task.tags.map((tag) => (
                  <Tag marginX={0.5} key={`${tag}-${task.id}`} size="sm">
                    {tag}
                  </Tag>
                ))}
                {task.category && (
                  <Badge
                    marginX={0.5}
                    colorScheme={categoryColorGenerator(task.category)}
                  >
                    {task.category}
                  </Badge>
                )}
              </Tags>

              <Meta>
                <AvatarGroup size="sm" max={2}>
                  <Avatar
                    name="Ryan Florence"
                    src="https://bit.ly/ryan-florence"
                  />
                  <Avatar
                    name="Segun Adebayo"
                    src="https://bit.ly/sage-adebayo"
                  />
                  <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                </AvatarGroup>
              </Meta>
            </Box>
          );
        }}
      </Draggable>

      <TaskModal
        key={task.id}
        operation="Edit"
        isOpen={isOpen}
        onClose={onClose}
        task={task}
      />
    </>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
`;

const Tags = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const Meta = styled.div`
  margin-top: 20px;
`;
