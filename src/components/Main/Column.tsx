import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { IColumn, ITask } from "../../types/workspace";
import { TaskCard } from "./TaskCard";
import {
  Box,
  Divider,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { TaskModal } from "../TaskModal/TaskModal";

interface IColumnProps {
  readonly column: IColumn;
}

export const Column: React.FC<IColumnProps> = ({ column }) => {
  const { onOpen, isOpen, onClose } = useDisclosure({
    id: "createModal",
  });
  const style = useColorModeValue(
    {
      backgroundColor: "gray.50",
      borderColor: "gray.200",
      titleText: "blackAlpha.600",
    },
    {
      backgroundColor: "gray.900",
      borderColor: "gray.700",
      titleText: "whiteAlpha.600",
    }
  );
  const tasks = column.tasks as ITask[];

  return (
    <Container
      bgColor={style.backgroundColor}
      borderWidth={1}
      borderColor={style.borderColor}
    >
      <Box height="inherit">
        <Text
          as="h3"
          padding={3}
          color={style.titleText}
          fontWeight={700}
          textTransform="uppercase"
          fontSize="sm"
        >
          {column.title}
        </Text>
        <Divider borderBottomWidth={2} />
        <Box
          borderRadius={2}
          borderWidth={1}
          margin={2}
          bgColor="blackAlpha.200"
        >
          <IconButton
            width="100%"
            aria-label="Add new task"
            icon={<PlusSquareIcon />}
            onClick={onOpen}
          />
        </Box>
        <Droppable droppableId={column.id} type="task">
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {Boolean(tasks.length) &&
                tasks.map((task: ITask, index: number) => {
                  return <TaskCard key={task.id} task={task} index={index} />;
                })}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Box>

      <TaskModal
        operation="Create"
        isOpen={isOpen}
        onClose={onClose}
        column={column}
      />
    </Container>
  );
};

const Container = styled(Box)`
  border-radius: 2px;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 70vh;
`;
const TaskList = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  background-color: ${(props) =>
    props.isDraggingOver ? "#D6BCFA" : "inherit"};
  min-height: "100%";
`;
