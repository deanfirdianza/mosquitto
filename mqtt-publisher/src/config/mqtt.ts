import mqtt from "mqtt";
import dotenv from "dotenv";

dotenv.config();

const client = mqtt.connect(process.env.MQTT_BROKER_URL || "mqtt://localhost:1883");

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

client.on("error", (error) => {
  console.error("MQTT connection error:", error);
});

export default client;
