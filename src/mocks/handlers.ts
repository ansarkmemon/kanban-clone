import { rest } from "msw";
import { IColumn, ITask } from "../types/workspace";
import { initialData, IData } from "./mockdata";

const STORAGE_KEY = "workspaces";

const addSeedDataToStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  }
};

const getDataFromLocalStorage = (): IData => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return initialData;
  return JSON.parse(data);
};

const getExpandedColumnsForWorkspace = (workspaceId: string): IColumn[] => {
  const data = getDataFromLocalStorage();
  const workspace = data.workspaces[workspaceId];

  const columns = workspace.columns.map((columnId) => {
    const column = data.columns[columnId];
    const tasks = column.tasks.map((taskId) => {
      return typeof taskId === "string"
        ? data.tasks[taskId]
        : data.tasks[taskId.id];
    });
    column.tasks = tasks;
    return column;
  });
  return columns;
};

const saveUpdatedColumnsToStorage = (columns: IColumn[]) => {
  const data = getDataFromLocalStorage();
  const updatedColumnsMap: any = {};

  columns.forEach((col) => {
    updatedColumnsMap[col.id] = col;
  });

  data.columns = updatedColumnsMap;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const saveNewTaskToStorage = (task: ITask) => {
  const data = getDataFromLocalStorage();
  data.tasks[task.id] = task;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const handlers = [
  rest.get("/api/initialize", (req, res, ctx) => {
    addSeedDataToStorage();
    return res(ctx.status(200));
  }),
  rest.get("/api/workspaces", (req, res, ctx) => {
    const data = getDataFromLocalStorage();
    const workspaces = Object.entries(data.workspaces).map(
      ([_, value]) => value
    );
    return res(ctx.delay(300), ctx.json({ workspaces }));
  }),
  rest.get("/api/workspaces/:workspaceId", (req, res, ctx) => {
    const { workspaceId } = req.params;

    const id = typeof workspaceId === "string" ? workspaceId : workspaceId[0];
    const columns = getExpandedColumnsForWorkspace(id);

    return res(ctx.delay(1200), ctx.json(columns));
  }),
  rest.post("/api/workspaces/:workspaceId/tasks", (req, res, ctx) => {
    const task = req.body as ITask;
    const { workspaceId } = req.params;

    const wId = typeof workspaceId === "string" ? workspaceId : workspaceId[0];
    const columns = getExpandedColumnsForWorkspace(wId);
    const columnIdToAdd = task.associations?.column;

    const columnForNewTask = columns.findIndex(
      (col) => col.id === columnIdToAdd
    );

    (columns[columnForNewTask].tasks as ITask[]).unshift(task);

    saveNewTaskToStorage(task);
    saveUpdatedColumnsToStorage(columns);

    return res(ctx.json(columns));
  }),
  rest.put("/api/workspaces/:workspaceId/tasks", (req, res, ctx) => {
    const task = req.body as ITask;
    const { workspaceId } = req.params;

    const wId = typeof workspaceId === "string" ? workspaceId : workspaceId[0];
    const columns = getExpandedColumnsForWorkspace(wId);
    const columnIdToAdd = task.associations?.column;

    const columnForNewTask = columns.findIndex(
      (col) => col.id === columnIdToAdd
    );

    const taskIndexToUpdate = (
      columns[columnForNewTask].tasks as ITask[]
    ).findIndex((t) => t.id === task.id);

    (columns[columnForNewTask].tasks as ITask[]).splice(
      taskIndexToUpdate,
      1,
      task
    );

    saveNewTaskToStorage(task);
    saveUpdatedColumnsToStorage(columns);

    return res(ctx.json(columns));
  }),
  rest.delete(
    "/api/workspaces/:workspaceId/:columnId/:taskId",
    (req, res, ctx) => {
      const { columnId, taskId, workspaceId } = req.params;
      const tId = typeof taskId === "string" ? taskId : taskId[0];
      const cId = typeof columnId === "string" ? columnId : columnId[0];
      const wId =
        typeof workspaceId === "string" ? workspaceId : workspaceId[0];
      const data = getDataFromLocalStorage();

      delete data.tasks[tId];
      const colTasks = (data.columns[cId].tasks as ITask[]).filter(
        (t) => t.id !== tId
      );

      data.columns[cId].tasks = colTasks;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      const columns = getExpandedColumnsForWorkspace(wId);

      return res(ctx.json(columns));
    }
  ),
  rest.post("/api/workspaces/:workspaceId/reposition", (req, res, ctx) => {
    const columns = req.body as IColumn[];
    saveUpdatedColumnsToStorage(columns);
    return res(ctx.status(200));
  }),
];
