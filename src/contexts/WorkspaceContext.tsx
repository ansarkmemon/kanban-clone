import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { DraggableLocation } from "react-beautiful-dnd";
import {
  deleteTask,
  fetchWorkspaceById,
  fetchWorkspaces,
  postNewTask,
  putTask,
  repositionTask,
} from "../helpers/request";
import { IColumn, ITask, IWorkspace } from "../types/workspace";

interface IWorkspaceProviderValue {
  activeWorkspace: IWorkspace | null;
  isLoading: boolean;
  workspaces: IWorkspace[];
  setActiveWorkspace: (workspace: IWorkspace) => void;
  board: IColumn[];
  isBoardLoading: boolean;
  createNewTask: (task: ITask) => void;
  updateTask: (task: ITask) => void;
  removeTask: (workspaceId: string, colId: string, taskId: string) => void;
  onTaskMove: (
    source: DraggableLocation,
    destination: DraggableLocation,
    taskId: string
  ) => void;
}

export const WorkspaceContext = createContext<
  IWorkspaceProviderValue | undefined
>(undefined!);

export const WorkspaceProvider = (props: PropsWithChildren<{}>) => {
  const [activeWorkspace, setActiveWorkspace] = useState<IWorkspace | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBoardLoading, setIsBoardLoading] = useState<boolean>(false);
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const [board, setBoard] = useState<IColumn[]>([]);

  useEffect(() => {
    loadWorkspaces();
  }, []);

  useEffect(() => {
    if (!activeWorkspace) return;
    loadTasks(activeWorkspace.id);
  }, [activeWorkspace]);

  const loadTasks = async (activeWorkspaceId: string) => {
    try {
      setIsBoardLoading(true);
      const columns = await fetchWorkspaceById(activeWorkspaceId);
      setBoard(columns);
    } catch (error) {
      // Todo: Error Handling
    } finally {
      setIsBoardLoading(false);
    }
  };

  const loadWorkspaces = async () => {
    try {
      setIsLoading(true);
      const response = await fetchWorkspaces();
      setWorkspaces(response.workspaces);
      setActiveWorkspace(response.workspaces[0]);
    } catch (error) {
      // TODO: Error handling
    } finally {
      setIsLoading(false);
    }
  };

  const createNewTask = async (task: ITask) => {
    try {
      const columns = await postNewTask(task);
      setBoard(columns);
    } catch (error) {}
  };

  const updateTask = async (task: ITask) => {
    try {
      const columns = await putTask(task);
      setBoard(columns);
    } catch (error) {}
  };

  const removeTask = async (
    workspaceId: string,
    colId: string,
    taskId: string
  ) => {
    try {
      const columns = await deleteTask(workspaceId, colId, taskId);
      setBoard(columns);
    } catch (error) {}
  };

  const onTaskMove = async (
    source: DraggableLocation,
    destination: DraggableLocation,
    taskId: string
  ) => {
    const boardCopy = [...board];

    if (source.droppableId === destination.droppableId) {
      const colIndex = boardCopy.findIndex(
        (col) => col.id === source.droppableId
      );
      const col = boardCopy[colIndex];
      const fromIndex = source.index;
      const toIndex = destination.index;

      const task = col.tasks.splice(fromIndex, 1)[0] as ITask;

      col.tasks.splice(toIndex, 0, task);
      boardCopy[colIndex] = col;

      await repositionTask(activeWorkspace?.id!, boardCopy);
      setBoard(boardCopy);
      return;
    }

    const destinationColIndex = boardCopy.findIndex(
      (col) => col.id === destination.droppableId
    );
    const sourceColIndex = boardCopy.findIndex(
      (col) => col.id === source.droppableId
    );

    const destinationCol = boardCopy[destinationColIndex];
    const sourceCol = boardCopy[sourceColIndex];

    const task = sourceCol?.tasks[source.index] as ITask;

    const updatedSourceColTasks = (sourceCol.tasks as ITask[]).filter(
      (t: ITask) => t.id !== task.id
    );

    destinationCol.tasks.splice(destination.index, 0, task);

    boardCopy[sourceColIndex] = { ...sourceCol, tasks: updatedSourceColTasks };
    boardCopy[destinationColIndex] = destinationCol;

    await repositionTask(activeWorkspace?.id!, boardCopy);

    setBoard(boardCopy);
  };

  const value = {
    activeWorkspace,
    isLoading,
    workspaces,
    setActiveWorkspace,
    isBoardLoading,
    board,
    onTaskMove,
    createNewTask,
    removeTask,
    updateTask,
  };

  return <WorkspaceContext.Provider value={value} {...props} />;
};

export const useWorkspaceContext = () => {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error(
      "useWorkspaceContext must be used within the WorkspaceProvider"
    );
  }

  return context;
};
