enum RMQType {
  "PRODUCER",
  "CONSUMER",
}

interface RMQOptions {
  url?: string;
  queue: string;
  type: RMQType;
  callback?: (data: object) => Promise<void>;
}

export { RMQType, RMQOptions };
