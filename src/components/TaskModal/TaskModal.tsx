import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  Text,
  ModalBody,
  Box,
  Button,
} from "@chakra-ui/react";
import { useId, useState } from "react";
import { useWorkspaceContext } from "../../contexts/WorkspaceContext";
import { IColumn, ITask } from "../../types/workspace";
import { EditableTextArea } from "./EditableTextArea";
import { EditableTitleInput } from "./EditableTitleInput";
import { SelectDropdown } from "./SelectDropdown";

interface IModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly operation: "Edit" | "Create";
}

interface IEditTaskProps extends IModalProps {
  readonly task: ITask;
}

interface ICreateTaskProps extends IModalProps {
  readonly column: IColumn;
}

export const TaskModal: React.FC<IEditTaskProps | ICreateTaskProps> = ({
  isOpen,
  onClose,
  operation,
  ...props
}) => {
  const newTaskId = useId();
  const { activeWorkspace, workspaces, createNewTask, updateTask } =
    useWorkspaceContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let columnId;

  if ("column" in props) {
    columnId = props.column.id;
  } else {
    columnId = props.task.associations?.column!;
  }

  const defaultState: ITask = {
    id: newTaskId,
    content: "Add task title",
    description: "Add some description",
    tags: ["#IUX-06"],
    category: "Prototype",
    associations: { workspace: activeWorkspace?.id!, column: columnId },
  };
  const [formData, setFormData] = useState<ITask>(() => {
    if ("task" in props) {
      return props.task;
    }
    return defaultState;
  });

  const handleSave = async () => {
    setIsLoading(true);
    if (operation === "Create") {
      await createNewTask(formData);
      setFormData(defaultState);
    } else {
      await updateTask(formData);
    }

    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent minHeight="300px">
        <ModalCloseButton />
        <ModalHeader>
          <EditableTitleInput
            onChange={(nextVal) =>
              setFormData({ ...formData, content: nextVal })
            }
            defaultValue={formData.content}
          />

          <Box display="flex" alignItems="center">
            <div>
              <Text fontSize="xs">In workspace</Text>
            </div>

            <SelectDropdown
              defaultValue={activeWorkspace?.id!}
              options={workspaces}
            />
          </Box>
        </ModalHeader>
        <ModalBody display="flex" alignItems="center">
          <Box width="100%">
            <Text as="h4" fontWeight={500}>
              Description
            </Text>
            <EditableTextArea
              value={formData.description}
              onChange={(newVal) =>
                setFormData({ ...formData, description: newVal })
              }
            />
            <Box marginY={5} display="flex" justifyContent="flex-end">
              <Button
                onClick={onClose}
                colorScheme="blackAlpha"
                size="sm"
                marginX={2}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                isLoading={isLoading}
                colorScheme="teal"
                size="sm"
              >
                Save
              </Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
