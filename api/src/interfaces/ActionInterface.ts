import ActionModel, { IAction } from "src/models/ActionModel";

class ActionInterface {
  static createAction(data: IAction): Promise<IAction> {
    return ActionModel.create(data);
  }

  static findAction(data: { [key: string]: any }): Promise<IAction[]> {
    return ActionModel.find(data).exec();
  }

  static findActionById(id: string): Promise<IAction> {
    return new Promise((resolve, reject) => {
      ActionModel.findById(id, (err: Error | null, result: IAction) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }

  static findActionByIdAndUpdate(id: string, data: object): Promise<IAction> {
    return new Promise((resolve, reject) => {
      ActionModel.findByIdAndUpdate(id, data, (err: Error | null, result: IAction) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }
}

export default ActionInterface;
