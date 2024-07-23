import { Request, Response } from "express";
import pool from "../config/db";
import mqttClient from "../config/mqtt";

export const publishMessage = async (req: Request, res: Response) => {
  const { topic, message } = req.body;

  if (!topic || !message) {
    return res.status(400).json({ error: "Topic and message are required." });
  }

  try {
    // Publish the message to the MQTT broker
    mqttClient.publish(topic, message, (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to publish message." });
      }

      // Store the message in the database
      pool.query(
        "INSERT INTO messages (topic, message) VALUES ($1, $2)",
        [topic, message],
        (dbErr) => {
          if (dbErr) {
            return res.status(500).json({ error: "Failed to store message." });
          }

          res.status(200).json({ success: true, message: "Message published." });
        }
      );
    });
  } catch (error) {
    console.error("Error publishing message:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
