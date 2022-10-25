import { IColumn, ITask, IWorkspace } from "../types/workspace";

export interface IData {
  columnOrder: string[];
  tasks: { [key: string]: ITask };
  columns: { [key: string]: IColumn };
  workspaces: { [key: string]: IWorkspace };
}

export const initialData: IData = {
  //Todo: Below to be removed
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
  tasks: {
    "task-1": {
      id: "task-1",
      content: "A/B Testing - Round 3",
      description: "A/B Testing - Round 3",
      tags: ["#IUX-06"],
      category: "Prototype",
      associations: { workspace: "workspace-1", column: "column-1" },
    },
    "task-2": {
      id: "task-2",
      content: "Improve workflow for iOS dark mode application",
      description: "Improve workflow for iOS dark mode application",
      tags: ["#IUX-06"],
      category: "Design",
      associations: { workspace: "workspace-1", column: "column-1" },
    },
    "task-3": {
      id: "task-3",
      content: "User Testing - Round 3",
      description: "User Testing - Round 3",
      tags: ["#IUX-06"],
      category: "Validation",
      associations: { workspace: "workspace-1", column: "column-1" },
    },
    "task-4": {
      id: "task-4",
      content: "Illustration for empty states",
      description: "Illustration for empty states",
      tags: ["#IUX-06"],
      category: "Design",
      associations: { workspace: "workspace-1", column: "column-2" },
    },
    "task-5": {
      id: "task-5",
      content: "Create microinteraction flow",
      description: "Create microinteraction flow",
      tags: ["#IUX-06"],
      category: "Prototype",
      associations: { workspace: "workspace-1", column: "column-2" },
    },
    "task-6": {
      id: "task-6",
      content: "Create prototype for payments flow in Protypr",
      description: "Create prototype for payments flow in Protypr",
      tags: ["#IUX-06"],
      category: "Prototype",
      associations: { workspace: "workspace-1", column: "column-2" },
    },
    "task-7": {
      id: "task-7",
      content: "Copywriting for flow payments",
      description: "Copywriting for flow payments",
      tags: ["#IUX-06"],
      category: "Design",
      associations: { workspace: "workspace-1", column: "column-3" },
    },
    "task-8": {
      id: "task-8",
      content: "Update support Documentations",
      description: "Update support Documentations",
      tags: ["#IUX-06"],
      category: "Prototype",
      associations: { workspace: "workspace-1", column: "column-3" },
    },
    "task-9": {
      id: "task-9",
      content: "Implement users feedback",
      description: "Implement users feedback",
      tags: ["#IUX-06"],
      category: "Design",
      associations: { workspace: "workspace-1", column: "column-3" },
    },
    "task-10": {
      id: "task-10",
      content: "Update Information Architecture (IA)",
      description: "Update Information Architecture (IA)",
      tags: ["#IUX-06"],
      category: "Research",
      associations: { workspace: "workspace-1", column: "column-3" },
    },
    "task-11": {
      id: "task-11",
      content: "User Journey",
      description: "User Journey",
      tags: ["#IUX-06"],
      category: "Research",
      associations: { workspace: "workspace-1", column: "column-4" },
    },
    "task-12": {
      id: "task-12",
      content: "Redesign the home view with the new design system",
      description: "Redesign the home view with the new design system",
      tags: ["#IUX-06"],
      category: "Design",
      associations: { workspace: "workspace-1", column: "column-4" },
    },
    "task-13": {
      id: "task-13",
      content: "In-depth interview users",
      description: "In-depth interview users",
      tags: ["#IUX-06"],
      category: "Research",
      associations: { workspace: "workspace-1", column: "column-4" },
    },
    "task-14": {
      id: "task-14",
      content: "Create exprense report design",
      description: "Create exprense report design",
      tags: ["#IUX-06"],
      category: "Prototype",
      associations: { workspace: "workspace-1", column: "column-4" },
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Backlog",
      associations: { workspace: "workspace-1" },
      tasks: ["task-1", "task-2", "task-3"],
    },
    "column-2": {
      id: "column-2",
      title: "To do",
      associations: { workspace: "workspace-1" },
      tasks: ["task-4", "task-5", "task-6"],
    },
    "column-3": {
      id: "column-3",
      title: "On going",
      associations: { workspace: "workspace-1" },
      tasks: ["task-7", "task-8", "task-9", "task-10"],
    },
    "column-4": {
      id: "column-4",
      title: "Team Review",
      associations: { workspace: "workspace-1" },
      tasks: ["task-11", "task-12", "task-13", "task-14"],
    },
  },
  workspaces: {
    "workspace-1": {
      id: "workspace-1",
      title: "Stripe Payments",
      created_on: new Date("13-05-2022"),
      columns: ["column-1", "column-2", "column-3", "column-4"],
      members: [],
    },
    "workspace-2": {
      id: "workspace-2",
      title: "Lyft Design",
      created_on: new Date("13-05-2022"),
      columns: ["column-1", "column-2", "column-3", "column-4"],
      members: [],
    },
  },
};
