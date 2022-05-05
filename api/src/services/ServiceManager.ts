import pm2 from "pm2";
import fs from "fs";

class ServiceManager {
  instances: object[] = [];
  consumerServers: string[] = [];

  initialize() {
    this.connect();

    // start consumers
    fs.readdir(`src/services/consumers`, async (err, files) => {
      if (err) return console.error(err);

      files.forEach((file) => {
        if (file !== "MessageConsumer.ts")
          this.consumerServers.push(
            `ts-node-dev --project tsconfig.json src/services/consumers/${file}`
          );
      });

      console.log(this.consumerServers);
      this.consumerServers.forEach((script) => this.spawn(script));
      this.list();
    });
  }

  connect() {
    pm2.connect((err: any) => {
      if (err) console.error(err);
    });
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

  spawn(script: string) {
    pm2.start({ script }, (err, apps) => {
      if (err) return console.error(err);
    });
  }
}

export default new ServiceManager();
