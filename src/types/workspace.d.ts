export interface ITask {
  id: string;
  content: string;
  description: string;
  tags: string[];
  category: "Prototype" | "Design" | "Validation" | "Research";
  associations?: { workspace: string; column: string };
}

export interface IColumn {
  id: string;
  title: string;
  associations: { workspace: string };
  tasks: string[] | ITask[];
}

export interface IWorkspace {
  id: string;
  title: string;
  created_on: Date;
  columns: string[];
  members: string[];
}

export interface IWorkspaceExpanded extends IWorkspace {
  columnsExpanded: IColumnExpanded[];
}
