export interface ITask {
  taskId: number;
  taskName: string;
  taskDescription: string;
  taskPriority: TaskPriorityLevel;
  taskStatus: TaskStatus;
  createdDate: string;
  lastModifiedDate: string;
}

export interface ITaskAddResource {
  taskName: string;
  taskDescription: string;
  taskPriority: TaskPriorityLevel;
}

export interface TaskAddResponse {
  message: string;
  value: ITask;
}

export enum TaskPriorityLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  HIGHEST = "HIGHEST",
}

export enum TaskStatus {
  TODO = "TODO",
  INPROGRESS = "INPROGRESS",
  DONE = "DONE",
}
