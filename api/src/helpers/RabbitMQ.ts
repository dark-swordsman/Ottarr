import amqp, { Connection, Channel, Message } from "amqplib/callback_api";
import { RMQType, RMQOptions } from "../../../types";

class RabbitMQ {
  constructor({ url = "amqp://localhost", queue, type, callback }: RMQOptions) {
    this.queue = queue;
    this.url = url;
    this.type = type;

    if (callback && type === RMQType.PRODUCER) {
      throw "PROUCER cannot use callback";
    } else {
      this.callback = callback;
    }

    this.initialize();
  }

  private url: RMQOptions["url"];
  private queue: RMQOptions["queue"];
  private type: RMQOptions["type"];
  private callback: RMQOptions["callback"];
  private declare connection: Connection;
  private declare channel: Channel;

  private async initialize() {
    await this.connect(this.url!);
    await this.createChannel(this.queue);
  }

  private connect(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      amqp.connect(url, (err, connection) => {
        if (err) return reject(err);

        this.connection = connection;
        resolve();
      });
    });
  }

  private createChannel(queue: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.createChannel((err, channel) => {
        if (err) return reject(err);

        channel.assertQueue(queue, { durable: true });

        if (this.type === RMQType.CONSUMER) {
          channel.prefetch(1);

          channel.consume(
            queue,
            (msg: Message | null) => {
              const data: object | null = msg ? JSON.parse(msg.content.toString()) : null;

              if (data && this.callback) {
                this.callback(data)
                  .then(() => {
                    if (msg) channel.ack(msg);
                  })
                  .catch((err2) => console.error(err2));
              } else {
                console.error("data was null");
              }
            },
            { noAck: true }
          );
        }

        this.channel = channel;
        resolve();
      });
    });
  }

  // eventually create RMQ message interfaces
  // RMQMessage, where the values are other data structure types
  send(message: object): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.type === RMQType.CONSUMER) return reject("Cannot send from consumer.");

      try {
        this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(message)), {
          persistent: true,
        });
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  close() {
    // recommend to close connection before destroying instance
    this.connection.close();
  }
}

export default RabbitMQ;
