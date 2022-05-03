const pm2 = require("pm2");

class ServiceManager {
  connect() {
    pm2.connect((err: any) => {
      if (err) console.error(err);
    });
    this.list();
  }

  list() {
    pm2.list((err: any, list: any) => {
      if (err) console.error(err);

      console.log(
        "instances: ",
        list.map(({ pid, name }: { pid: number; name: string }) => ({ pid, name }))
      );
    });
  }
}

export default new ServiceManager();
