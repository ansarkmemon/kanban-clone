import { IColumn, ITask, IWorkspace } from "../types/workspace";

export const initializeAppData = (): Promise<number> => {
  return fetch("/api/initialize").then((res) => res.status);
};

export const fetchWorkspaces = (): Promise<{
  workspaces: IWorkspace[];
}> => {
  return fetch("/api/workspaces").then((res) => res.json());
};

export const fetchWorkspaceById = (workspaceId: string): Promise<IColumn[]> => {
  return fetch(`/api/workspaces/${workspaceId}`).then((res) => res.json());
};

export const repositionTask = (
  workspaceId: string,
  columns: IColumn[]
): Promise<number> => {
  return fetch(`/api/workspaces/${workspaceId}/reposition`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(columns),
  }).then((res) => res.status);
};

export const postNewTask = (task: ITask): Promise<IColumn[]> => {
  return fetch(`/api/workspaces/${task.associations?.workspace}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((res) => res.json());
};

export const putTask = (task: ITask): Promise<IColumn[]> => {
  return fetch(`/api/workspaces/${task.associations?.workspace}/tasks`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((res) => res.json());
};

export const deleteTask = (
  workspaceId: string,
  colId: string,
  taskId: string
): Promise<IColumn[]> => {
  return fetch(`/api/workspaces/${workspaceId}/${colId}/${taskId}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
