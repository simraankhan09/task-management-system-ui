import { TaskService } from "./task-service/TaskService";

export class ServiceFactory {
  private static instance: ServiceFactory;

  private constructor() {}

  public static getInstance(): ServiceFactory {
    if (!this.instance) {
      this.instance = new ServiceFactory();
    }

    return this.instance;
  }

  public getTaskService(): TaskService {
    return TaskService.getInstance();
  }
}
