import { ApiUtil } from "../ApiUtil";
import {
  ITask,
  ITaskAddResource,
  TaskAddResponse,
  TaskStatus,
} from "./interface";

export class TaskService {
  private static instance: TaskService;

  private constructor() {}

  public static getInstance(): TaskService {
    if (!this.instance) {
      this.instance = new TaskService();
    }

    return this.instance;
  }

  public async createTask(payload: ITaskAddResource): Promise<TaskAddResponse> {
    return await ApiUtil.post<ITaskAddResource, TaskAddResponse>(
      "/task/",
      payload
    );
  }

  public async getAll(): Promise<ITask[]> {
    return await ApiUtil.get<ITask[]>("/task/all");
  }

  public async getById(taskId: number): Promise<ITask> {
    return await ApiUtil.get<ITask>(`/task/task-id/${taskId}`);
  }

  public async updateStatusById(
    taskId: number,
    taskStatus: TaskStatus
  ): Promise<number> {
    return await ApiUtil.update<unknown, number>(
      `/task/update-task-status/task-id/${taskId}/task-status/${taskStatus}`
    );
  }
}
