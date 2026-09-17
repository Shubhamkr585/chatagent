export class RedisClient {
  async connect(): Promise<void> {
    console.log("Redis client placeholder connected");
  }

  async set(_key: string, _value: string): Promise<void> {
    return;
  }

  async get(_key: string): Promise<string | null> {
    return null;
  }
}
