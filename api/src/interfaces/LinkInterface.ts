import LinkModel, { Link } from "../models/LinkModel";

class LinkInterface {
  static createLinkAndSave(data: Link): Promise<Link> {
    return new Promise((resolve, reject) => {
      LinkModel.create(data, (err: Error | null, result: Link) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }

  static findLinkById(id: string): Promise<Link> {
    return new Promise((resolve, reject) => {
      LinkModel.findById(id, (err: Error | null, result: Link) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }
}

export default LinkInterface;
