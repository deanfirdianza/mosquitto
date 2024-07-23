import express from "express";
// import mqttClient from "../config/mqtt";
import subscribeToTopic from "../controllers/subscriberController";

const app = express();

app.get("/", (req, res) => {
  res.send("Subscriber Service is running");
});

app.get('/subscribe', (req, res) => {
    const topic = req.query.topic as string;
  
    if (!topic) {
      return res.status(400).send('Topic is required');
    }
  
    // Subscribe to the specified topic
    subscribeToTopic(topic)
  });
  

export default app;
