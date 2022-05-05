import { RabbitMQ } from "../../helpers";
import { RMQOptions, RMQType } from "../../../../types";

function main(data: object): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(data);

    setTimeout(() => {
      console.log("done");
      resolve();
    }, 2000);
  });
}

const options: RMQOptions = {
  queue: "action",
  type: RMQType.CONSUMER,
  callback: main,
};

new RabbitMQ(options);
