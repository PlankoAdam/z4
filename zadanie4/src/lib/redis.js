import { createClient } from "redis";

let client = null;

export async function getClient() {
  if (!client) {
    client = createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        reconnectStrategy: false,
      },
    });

    // Error handling
    client.on("error", (error) => {
      console.error("Redis connection error:", error);
    });

    // Handle connection success
    client.on("connect", () => {
      console.log("Connected to Redis");
    });
  }

  return client;
}
