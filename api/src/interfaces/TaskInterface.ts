// main task update methods + task execution method
// task execution method should refernce a "decide method" method

import { Action, ActionMethod } from "../../../types";

class TaskInterface {
  public static createTask() {}

  public static findTasks() {}

  public static findTaskById() {}

  public static updateTaskById() {}

  public static executeTask() {}

  private static executeInterfaceMethod(action: Action) {
    // based on an action, execute a method from another interface,
    // passing the data of the action to that method.
    // tasks act as delayed/cached data with context/metadata
  }

  private static determineInterfaceMethod(actionMethod: ActionMethod) {
    // determine with method to use on another interface to complete a task,
    // returning that method just to keep the code more visually separate
  }
}
