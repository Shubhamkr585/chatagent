export class PostgresClient {
  async connect(): Promise<void> {
    console.log("Postgres client placeholder connected");
  }

  async query(_sql: string): Promise<unknown[]> {
    return [];
  }
}
