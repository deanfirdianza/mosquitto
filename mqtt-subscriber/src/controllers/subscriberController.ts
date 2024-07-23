import pool from "../config/db";
import mqttClient from "../config/mqtt";

const subscribeToTopic = (topic: string) => {
  mqttClient.subscribe(topic, (err) => {
    if (err) {
      console.error(`Failed to subscribe to topic ${topic}:`, err);
    } else {
      console.log(`Subscribed to topic: ${topic}`);
    }
  });

  mqttClient.on("message", (receivedTopic, message) => {
    if (receivedTopic === topic) {
      const messageText = message.toString();
      console.log(`Received message on topic ${topic}:`, messageText);

      // Store the message in the database
      pool.query(
        "INSERT INTO messages (topic, message) VALUES ($1, $2)",
        [receivedTopic, messageText],
        (dbErr) => {
          if (dbErr) {
            console.error("Failed to store message:", dbErr);
          } else {
            console.log("Message stored in the database.");
          }
        }
      );
    }
  });
};

export default subscribeToTopic;
// Subscribe to a specific topic
// subscribeToTopic("your_topic_name");
