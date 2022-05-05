import { IAction } from "src/models/ActionModel";
import TaskModel, { ITask } from "src/models/TaskModel";
import ActionInterface from "./ActionInterface";

class TaskInterface {
  public static createTask(data: ITask): Promise<ITask> {
    return TaskModel.create(data);
  }

  public static findTask(data: { [key: string]: any }): Promise<ITask[]> {
    return TaskModel.find(data).exec();
  }

  public static findTaskById(id: string): Promise<ITask> {
    return new Promise((resolve, reject) => {
      TaskModel.findById(id, (err: Error | null, result: ITask) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }

  public static findTaskByIdAndUpdate(id: string, data: object): Promise<ITask> {
    return new Promise((resolve, reject) => {
      TaskModel.findByIdAndUpdate(id, data, (err: Error | null, result: ITask) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }

  public static createTaskAndExecute({
    task,
    actions,
  }: {
    task: ITask;
    actions: IAction[];
  }): Promise<ITask> {
    return new Promise(async (resolve, reject) => {
      const taskObject = await this.createTask(task);
      // create actions from task data
      const actionObjects = actions.map(
        async (action) => await ActionInterface.createAction(action)
      );
      // send actions to queue
      actionObjects.forEach(() => {
        // use rabbitmq helper
      });
      // return response to user
      resolve(taskObject);
    });
  }
}
